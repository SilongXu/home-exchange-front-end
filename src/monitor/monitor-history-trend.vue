<template>
  <div class="monitor-history-trend" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.4)">
    <div class="top">
      <div class="top-title">历史趋势</div>
      <div class="top-operation">
        <div class="top-operation-view" :class="{active: period === 'LAST_WEEK'}" @click="togglePeriod('LAST_WEEK')">
          近一周
        </div>
        <div class="top-operation-view" :class="{active: period === 'LAST_MONTH'}" @click="togglePeriod('LAST_MONTH')">
          近一月
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="chart-content"></div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment-mini';
import apiService from './monitor.service';

const LINE_OPTIONS = {
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
    left: 50,
    right: 30,
    top: 40,
    bottom: 48,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {},
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: 'none',
      },
    },
  ],
  yAxis: [],
  series: [],
  textStyle: {
    color: '#4A637C',
  },
  legend: {
    data: [],
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
  },
};

export default {
  name: 'MonitorHistoryTrend',
  props: ['nodeCode'],
  mounted() {
    this.getTabInfo();
  },
  data() {
    return {
      trendLine: null,
      period: 'LAST_WEEK',
      loading: false,
      info: {},
      lineChart: null,
    };
  },
  methods: {
    togglePeriod(period) {
      this.period = period;
      this.getTabInfo();
    },
    getTabInfo() {
      this.loading = true;
      apiService.getHistoryTrend(this.nodeCode, this.period)
      .then((info) => {
        this.loading = false;
        if (info.data) {
          this.info = info.data || {};
          this.draw();
        }
      })
      .catch(() => this.loading = false);
    },
    draw() {
      this.lineChart = this.$echarts.init(document.querySelector('.chart-content'));
      LINE_OPTIONS.yAxis = [
        {
          type: 'value',
          name: '个数',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#034866',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          name: 'GB',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#034866',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ];
      LINE_OPTIONS.xAxis[0].data = this.info.resourceCount.map((count) => {
        return moment(count.date).format('MM/DD');
      });
      LINE_OPTIONS.xAxis[0].axisLine = {
        lineStyle: {
          color: '#034866',
        },
      };
      LINE_OPTIONS.legend.data = [
        '资源数量',
        '数据量',
      ],
      LINE_OPTIONS.series = [
        {
          name: '资源数量',
          type: 'line',
          data: this.info.resourceCount.map((count) => count.value),
          yAxisIndex: 0,
          itemStyle: {
            color: '#E1BC43',
          },
        },
        {
          name: '数据量',
          type: 'line',
          data: this.info.resourceSize.map((size) => size.value),
          yAxisIndex: 1,
          itemStyle: {
            color: '#6CCBFA',
          },
        },
      ];
      this.lineChart.setOption(LINE_OPTIONS);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitor-history-trend {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 400px;
 
 .top {
    @include flex-align(center, space-between);
    height: 30px;
    font-family: '黑体';
    font-size: 14px;
    color: white;

    &-title {
      font-weight: bold;
    }

    &-operation {
      @include flex-xy-center;
      height: 30px;
      width: 120px;
      min-width: 120px;
      min-height: 30px;
      margin-right: 16px;
      padding: 2px;
      background-color: $bg-body;
      border-radius: 4px;

      &-view {
        @include flex-xy-center;
        height: 28px;
        width: 58px;
        min-width: 58px;
        min-height: 28px;
        border-radius: 4px;
        cursor: pointer;
      }

      .active {
        background-color: $bg-light;
      }
    }
  }

  .chart {
    flex: 1;
    display: flex;

    &-content {
      flex: 1;
    }
  }
}
</style>