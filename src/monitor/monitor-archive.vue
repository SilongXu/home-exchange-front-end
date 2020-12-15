 <template>
  <div class="monitorArchive">
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
            type="datetimerange" 
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="monitorArchive-filters-bottomFilter-satellite">
          <span>卫星编号</span>
          <el-select v-model="satellitesSelected" placeholder="请选择卫星编号" multiple filterable collapse-tags>
            <el-option
              v-for="item in satellitesOptions"
              :key="item.itemCode"
              :label="item.itemCode"
              :value="item.itemCode">
            </el-option>
          </el-select>
        </div>
        <div class="monitorArchive-filters-bottomFilter-sensor">
          <span>载荷标识</span>
          <el-select v-model="sensorsSelected" placeholder="请选择载荷标识" multiple filterable collapse-tags>
            <el-option
              v-for="item in sensorsOptions"
              :key="item.itemCode"
              :label="item.itemCode"
              :value="item.itemCode">
            </el-option>
          </el-select>
        </div>
        <div class="monitorArchive-filters-bottomFilter-productLevel">
          <span>产品级别</span>
          <el-select v-model="productLevelsSelected" placeholder="请选择产品级别" multiple filterable collapse-tags>
            <el-option
              v-for="item in productLevelsOptions"
              :key="item.itemCode"
              :label="item.itemCode"
              :value="item.itemCode">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="monitorArchive-filters-bottomFilter">
        <div class="monitorArchive-filters-bottomFilter-chartType">
          <span>图表类型</span>
          <el-select v-model="chartType" placeholder="请选择图表类型">
            <el-option
              v-for="option in chartTypeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
        </div>
        <div style="text-align: right;flex:1;padding-right:30px">
          <el-button type="primary" @click="trendCharts()">检索</el-button>
          <el-button type="primary" @click="resetAll()">重置</el-button>
          <el-button type="primary" @click="downloadExcel()">导出Excel</el-button>

        </div>

      </div>
    </div>
    <!-- <div class="monitorArchive-operation">

    </div> -->
    <div class="monitorArchive-chart" v-loading="monitorArchiveLoading" element-loading-background="rgba(0, 0, 0, 0.4)">

    </div>
  </div>
</template>

<script>
import apiService from './monitor.service';
import saveAs from "file-saver";

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
    show: false,
  },
  color: ['#E1BC43','#6CCBFA'],
  legend: {
    data: [{name: '产品数量',icon: 'rect'},{name: '数据量', icon: 'rect'}],
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
      start: 0,
      end: 100 //初始化滚动条  
  }],
  series: [
    {
      name: '产品数量',
      type: 'line',
      data: [],
      label: {
      	normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'rgb(255, 250, 250)'
          }
        },
      }
    },
    {
      name: '数据量',
      type: 'line',
      yAxisIndex: 1,
      data: [],
      label: {
      	normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'rgb(255, 250, 250)'
          }
        },
      }
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
  color: ['#E1BC43','#6CCBFA'],
  tooltip: {
    trigger: 'axis',
    show: false,
  },
  legend: {
    data: [{name: '产品数量',icon: 'rect'},{name: '数据量', icon: 'rect'}],
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
      start: 0,
      end: 100 //初始化滚动条  
  }],
  series: [
    {
      name: '产品数量',
      type: 'bar',
      data: [],
      label: {
      	normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'rgb(255, 250, 250)'
          }
        },
      }
    },
    {
      name: '数据量',
      type: 'bar',
      yAxisIndex: 1,
      data: [],
      label: {
      	normal: {
          show: true,
          position: 'top',
          textStyle: {
            color: 'rgb(255, 250, 250)'
          }
        },
      }
    },
  ]
}

export default {
  name: 'monitorArchive',
  data() {
    return {
      satellitesSelected: [],
      sensorsSelected: [],
      productLevelsSelected: [],
      satellitesOptions: [],
      sensorsOptions: [],
      productLevelsOptions: [],
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
    this.dateType = "DAY";//"日";
    this.chartType = "折线图";

    apiService.getArchiveBottomOptions("CHDL")
    .then((data) => {
      this.satellitesOptions = data.data.satellite;
      this.sensorsOptions=data.data.sensor;
      this.productLevelsOptions=data.data.productLevel;
    }).catch(() => {
    });

    this.trendCharts();
  },
  methods: {
    resetAll(){
      this.dateType = "DAY";//"日";
      this.dateRange ='';
      this.chartType ='';
      this.dataType='';
      this.satellitesSelected = [];
      this.sensorsSelected = [];
      this.productLevelsSelected = [];
    },
    trendCharts(){
      this.monitorArchiveLoading = true;

      monitorArchiveLine.xAxis.data=[];
      monitorArchiveLine.series[0].data=[];
      monitorArchiveLine.series[1].data=[];
      monitorArchiveBar.xAxis.data=[];
      monitorArchiveBar.series[0].data=[];
      monitorArchiveBar.series[1].data=[];

      apiService.getArchiveTrendeCharts(this.dateType, 
        this.satellitesSelected, 
        this.sensorsSelected, 
        this.productLevelsSelected, 
        this.dateRange && this.dateRange[0] || null, 
        this.dateRange && this.dateRange[1] || null
      ).then((data) => {
        this.monitorArchiveDraw ='';
        this.monitorArchiveDraw = this.$echarts.init(document.querySelector('.monitorArchive-chart'));

        data.data.detail.importTrends.forEach(target => {
          monitorArchiveLine.xAxis.data.push(target.dataTime);
          monitorArchiveLine.series[0].data.push(target.dataAmount);
          monitorArchiveLine.series[1].data.push(target.dataSizeUnitValue);
          monitorArchiveBar.xAxis.data.push(target.dataTime);
          monitorArchiveBar.series[0].data.push(target.dataAmount);
          monitorArchiveBar.series[1].data.push(target.dataSizeUnitValue);
        })

        monitorArchiveLine.yAxis[1].name = '数据量('+data.data.detail.dataSizeUnit+')';
        monitorArchiveBar.yAxis[1].name = '数据量('+data.data.detail.dataSizeUnit+')';

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
    downloadExcel(){
      apiService.downloadArchiveExcel(this.dateType, this.satellitesSelected, this.sensorsSelected,this.productLevelsSelected, this.dateRange[0], this.dateRange[1])
      .then((href) => {    
        const blob = new Blob([href.data], {
          type: href.header["content-type"],
        });

        // const fileName = href.header["content-disposition"]
        //   .split(";")[1]
        //   .split("filename=")[1];
        const fileName = "Excel.xlsx"
        saveAs(blob, fileName);
      }).catch(() => {
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitorArchive{
  overflow: auto;
  width: 100%;
  height: 100%;
  // margin-left: 10%;
  background: $bg-light;
  &-title{
    padding: 30px 15px 15px 30px;
    // font-size: 35px;
    font-family: $text-mute;
  }
  &-filters{
    padding-bottom: 20px;
    border-bottom: 1px solid #034866;
    &-topFilter{
      padding: 20px 0px;
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
    height: 60vh;
  }
}

</style>