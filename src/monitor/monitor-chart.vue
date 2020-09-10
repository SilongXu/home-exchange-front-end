<template>
  <div class="monitor-chart">
    <div class="monitor-chart-left">
      <div class="monitor-chart-left-title">导入趋势</div>
      <div class="monitor-chart-left-content"></div>
    </div>
    <div class="monitor-chart-right">
      <div class="monitor-chart-right-title">搜索次数</div>
      <div class="monitor-chart-right-content"></div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment-mini';
import apiService from './monitor.service';

const TREND_LINE_OPTIONS = {
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      if (!(params instanceof Array)) {
        params = [params];
      }
      let ret = '';
      params.map((param, index) => {
        ret += `
          <div style="${index !== 0 ? 'margin-top: 8px;' : ''} display: flex; align-items: center;">
            <div style="width: 12px; height: 4px; margin-right: 8px; border-radius: 2px; background: ${param.color};"></div>
            ${param.seriesName}: <div style="color: ${'#FFFFFF'}; margin-left: 4px;">${param.data}</div>
          </div>
        `;
      });
      return ret;
    },
    position: 'right',
  },
  grid: {
    left: 16,
    right: 30,
    top: 20,
    bottom: 48,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#034866',
      },
    },
    axisTick: {
      show: false,
    },
    axisPointer: {
      type: 'none',
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: (value) => {
        return moment(value).format('MM/DD');
      },
    },
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#034866',
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  textStyle: {
    color: '#4A637C',
  },
  legend: {
  },
  series: [],
};

const SEARCH_LINE_OPTIONS = {
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      if (!(params instanceof Array)) {
        params = [params];
      }
      let ret = '';
      params.map((param, index) => {
        ret += `
          <div style="${index !== 0 ? 'margin-top: 8px;' : ''} display: flex; align-items: center;">
            <div style="width: 12px; height: 4px; margin-right: 8px; border-radius: 2px; background: ${param.color};"></div>
            ${param.seriesName}: <div style="color: ${'#FFFFFF'}; margin-left: 4px;">${param.data}</div>
          </div>
        `;
      });
      return ret;
    },
    position: 'right',
  },
  grid: {
    left: 16,
    right: 30,
    top: 20,
    bottom: 48,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#034866',
      },
    },
    axisTick: {
      show: false,
    },
    axisPointer: {
      type: 'none',
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: (value) => {
        return moment(value).format('MM/DD');
      },
    },
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#034866',
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  textStyle: {
    color: '#4A637C',
  },
  legend: {
  },
  series: [],
};

export default {
  name: 'MonitorChart',
  mounted() {
    this.getTrendData();
    this.getSearchData();
  },
  data() {
    return {
      trendLine: null,
      trendLineData: [],
      searchLine: null,
      searchLineData: [],
    };
  },
  methods: {
    getTrendData() {
      apiService.getImportTrend().then((trend) => {
        if (trend) {
          this.trendLineData = trend.data || [];
          this.drawTrendLine();
        }
      })
    },
    getSearchData() {
      apiService.getSearchTrend().then((search) => {
        if (search) {
          this.searchLineData = search.data || [];
          this.drawSearchLine();
        }
      });
    },
    drawTrendLine() {
      this.trendLine = this.$echarts.init(document.querySelector('.monitor-chart-left-content'));
      TREND_LINE_OPTIONS.legend = this.getLegend(['导入数量']);
      TREND_LINE_OPTIONS.series = [{
        name: '导入数量',
        type: 'line',
        smooth: false,
        showSymbol: false,
        data: this.trendLineData.map((data) => data.value),
        itemStyle: {
          color: '#90AEFA',
        },
        lineStyle: {
          color: '#90AEFA',
        },
        areaStyle: {
          color: '#203477',
          opacity: '0.5',
        },
      }];
      TREND_LINE_OPTIONS.xAxis.data = this.trendLineData.map((data) => {
        return data.date;
      });

      this.trendLine.setOption(TREND_LINE_OPTIONS);
    },
    drawSearchLine() {
      const colorMap = ['#58B3E0', '#4D4BD1', '#CE8D3D'];
      this.searchLine = this.$echarts.init(document.querySelector('.monitor-chart-right-content'));
      SEARCH_LINE_OPTIONS.legend = this.getLegend(['需求管理系统', '数据分发系统', '终端应用系统']);
      SEARCH_LINE_OPTIONS.series = [];
      this.searchLineData.trends.map((data, index) => {
        SEARCH_LINE_OPTIONS.series.push({
          name: data.nodeName,
          type: 'line',
          smooth: false,
          showSymbol: false,
          data: data.trend.map((data) => data.value),
          itemStyle: {
            color: colorMap[index],
          },
          lineStyle: {
            color: colorMap[index],
          },
        });
      });

      SEARCH_LINE_OPTIONS.xAxis.data = this.searchLineData.trends[0].trend.map((data) => {
        return data.date;
      });
      this.searchLine.setOption(SEARCH_LINE_OPTIONS);
    },
    getLegend(data) {
      return {
        data,
        left: 16,
        bottom: 12,
        selectedMode: true,
        textStyle: {
          color: 'white',
          fontSize: 12,
        },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
      };
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitor-chart {
  display: flex;
  height: 332px;
  margin-top: 20px;

  &-left, &-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 300px;
    border-radius: 4px;
    padding: 16px;
    background-color: $bg-light;

    &-title {
      height: 30px;
      font-weight: bold;
      font-family: '黑体';
      font-size: 16px;
      color: white;
    }
    
    &-content {
      flex: 1;
    }
  }

  &-left {
    margin-right: 20px;
  }
}
</style>