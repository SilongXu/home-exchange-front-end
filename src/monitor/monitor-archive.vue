 <template>
  <div class="monitorArchive">
    <div class="monitorArchive-title">
      <b>归档统计</b>
    </div>
    <div class="monitorArchive-filters">
      <div class="monitorArchive-filters-topFilter">
        <div class="monitorArchive-filters-topFilter-dateType">
          <span>时间类型</span>
          <el-select v-model="dateType" placeholder="请选择时间类型">
            <el-option
              v-for="option in dateTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </div>

        <div class="monitorArchive-filters-topFilter-dateRange">
          <span>时间范围</span>
          <el-date-picker 
            v-model="dateRange"
            type="daterange" 
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>

      </div>
      <div class="monitorArchive-filters-bottomFilter">
        <div class="monitorArchive-filters-bottomFilter-chartType">
          <span>图表类型</span>
          <el-select v-model="chartType" placeholder="请选择图表类型" @change="chartInitial()">
            <el-option
              v-for="option in chartTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </div>
        <div class="monitorArchive-filters-bottomFilter-dataType">
          <span>数据类型</span>
          <el-select v-model="dataType" placeholder="请选择数据类型(默认选中所有数据类型)" multiple collapse-tags @change="dataTypeChange()" filterable>
            <el-option
              v-for="option in dataTypeOptions" 
              :key="option.itemCode"
              :label="option.itemName"
              :value="option.itemCode">
            </el-option>
          </el-select>
        </div>

      </div>
    </div>
    <div class="monitorArchive-operation">
      <el-button @click="trendCharts()">检索</el-button>
      <el-button @click="resetAll()">重置</el-button>
      <el-button>导出Excel</el-button>

    </div>
    <div class="monitorArchive-chart" v-loading="monitorArchiveLoading" element-loading-background="rgba(0, 0, 0, 0.4)">

    </div>
  </div>
</template>

<script>
import apiService from './monitor.service'

const monitorArchiveLine = {
  title: {
    text: '历史趋势',
    borderColor: 'rgb(255, 250, 250)',
    textStyle: {
      color: 'rgb(255, 250, 250)'
    }
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['产品数量','数据量'],
    textStyle: {
      color: 'rgb(255, 250, 250)'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '7%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],//要给值！
    axisLine: {
      lineStyle: {
        color: 'rgb(255, 250, 250)',
      },
    },
  },
  yAxis: [
    {
      type: 'value',
      name: '产品数量',
      axisLine: {
        lineStyle: {
          color: 'rgb(255, 250, 250)',
        },
      },
    },
    {
      type: 'value',
      name: '数据量',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(255, 250, 250)',
        },
      },
    }
  ],
  dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      bottom: 5,
      start: 10,
      end: 80 //初始化滚动条  
  }],
  series: [
    {
      name: '产品数量',
      type: 'line',
      data: []//给值！
    },
    {
      name: '数据量',
      type: 'line',
      yAxisIndex: 1,
      data: []//给值！
    },
  ]
};

const monitorArchiveBar = {
  title: {
    text: '历史趋势',
    borderColor: 'rgb(255, 250, 250)',
    textStyle: {
      color: 'rgb(255, 250, 250)'
    }
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['产品数量','数据量'],
    textStyle: {
      color: 'rgb(255, 250, 250)'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '7%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
    axisLine: {
      lineStyle: {
        color: 'rgb(255, 250, 250)',
      },
    },
  },
  yAxis: [
    {
      type: 'value',
      name: '产品数量',
      axisLine: {
        lineStyle: {
          color: 'rgb(255, 250, 250)',
        },
      },
    },
    {
      type: 'value',
      name: '数据量',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(255, 250, 250)',
        },
      },
    }
  ],
  dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      bottom: 5,
      start: 10,
      end: 80 //初始化滚动条  
  }],
  series: [
    {
      name: '产品数量',
      type: 'bar',
      data: []
    },
    {
      name: '数据量',
      type: 'bar',
      yAxisIndex: 1,
      data: []
    },
  ]
}

export default {
  name: 'monitorArchive',
  data() {
    return {
      monitorArchiveLoading: false,
      dateRange: '',
      dateType: '',
      dateTypeOptions: [{
        value: 'DAY',
        label: '日'
      }, {
        value: 'MONTH',
        label: '月'
      }, {
        value: 'YEAR',
        label: '年'
      }],
      chartType: '',
      chartTypeOptions: [{
        value: '折线图',
        label: '折线图'
      }, {
        value: '柱状图',
        label: '柱状图'
      }],
      dataType: [],
      dataTypeOptions: [],
      monitorArchiveDraw: '',
    }
  },
  mounted(){
    apiService.getArchiveDataType("dataType")
    .then((data) => {
      this.dataTypeOptions = data.data.detail[0].items;
    }).catch(() => {
    });
  },
  methods: {
    resetAll(){
      this.dateType = '';
      this.dateRange ='';
      this.chartType ='';
      this.dataType='';
    },
    trendCharts(){
      this.monitorArchiveLoading = true;

      monitorArchiveLine.xAxis.data=[];
      monitorArchiveLine.series[0].data=[];
      monitorArchiveLine.series[1].data=[];
      monitorArchiveBar.xAxis.data=[];
      monitorArchiveBar.series[0].data=[];
      monitorArchiveBar.series[1].data=[];

      apiService.getArchiveTrendeCharts(this.dateType, this.dataType, this.dateRange[0], this.dateRange[1])
      .then((data) => {
        this.monitorArchiveDraw ='';
        this.monitorArchiveDraw = this.$echarts.init(document.querySelector('.monitorArchive-chart'));

        data.data.detail.forEach(target => {
          monitorArchiveLine.xAxis.data.push(target.dataTime);
          monitorArchiveLine.series[0].data.push(target.dataAmount);
          monitorArchiveLine.series[1].data.push(target.dataSize);
          monitorArchiveBar.xAxis.data.push(target.dataTime);
          monitorArchiveBar.series[0].data.push(target.dataAmount);
          monitorArchiveBar.series[1].data.push(target.dataSize);
        })
        if(this.chartType == '折线图'){
          this.monitorArchiveDraw.setOption(monitorArchiveLine);
        }else if(this.chartType == '柱状图'){
          this.monitorArchiveDraw.setOption(monitorArchiveBar);
        }else{
          this.monitorArchiveDraw.setOption(monitorArchiveLine);
        }
        this.monitorArchiveLoading = false;
      }).catch(() => {
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitorArchive{
  overflow: auto;
  width: 70%;
  height: 100%;
  margin-left: 15%;
  background: $bg-light;
  &-title{
    padding: 30px;
    font-size: 35px;
    font-family: $text-mute;
  }
  &-filters{
    &-topFilter{
      padding: 30px 0px;
      display: flex;
    }
    &-bottomFilter{
      display: flex;
    }
    span{
      padding: 30px 30px;
    }
  }
  &-operation{
    @include flex-align(center, flex-end);
    padding: 30px 30px;
    border-bottom: 1px solid $border-dark;
  }
  &-chart{
    padding-top: 20px;
    width: 100%;
    height: 70vh;
  }
}

</style>