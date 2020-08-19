<template>
  <div class="search-filter">
    <div class="search-filter-entry">
      <div class="label">数据类型</div>
      <el-cascader
        v-model="dataType"
        :options="dataTypeOptions"
        :props="{ expandTrigger: 'hover' }"
        size="small"
        @change="onFilterChange"
      ></el-cascader>
    </div>
    <div class="search-filter-entry">
      <div class="label">导入时间</div>
      <el-date-picker
        v-model="importTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      >
      </el-date-picker>
    </div>
    <div class="search-filter-entry">
      <div class="label">文件大小</div>
      <el-select v-model="fileSizeRelation" placeholder="请选择" size="small">
        <el-option
          v-for="item in fileSizeRelationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="fileSizeValue" min="0" placeholder="请输入大小" size="small"></el-input>
      <el-select v-model="fileSizeUnit" placeholder="请选择" size="small">
        <el-option
          v-for="item in fileSizeUnitOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search-filter',
  data() {
    return {
      dataType: [],
      dataTypeOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      importTime: '',
      fileSizeRelation: '',
      fileSizeRelationOptions: [
        {
          value: 'GT',
          label: '大于',
        },
        {
          value: 'LT',
          label: '小于',
        }
      ],
      fileSizeValue: '',
      fileSizeUnit: '',
      fileSizeUnitOptions: [
        {
          value: 'KB',
        },
        {
          value: 'MB',
        },
        {
          value: 'GB',
        }
      ],
    };
  },
  methods: {
    onFilterChange() {

    },
  },
}
</script>
<style scoped>
.search-filter {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 20px 12px 20px;
}
.search-filter-entry {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  line-height: 32px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #c4d1dd;
}
.search-filter-entry:not(:last-of-type) {
  margin-right: 32px;
}
.search-filter-entry .label {
  margin-right: 12px;
  white-space: nowrap;
}
.el-cascader {
  width: 360px;
}
.el-select {
  width: 120px;
}
.el-input {
  width: 120px;
}
.el-select:not(:last-child),
.el-input:not(:last-child) {
  margin-right: 8px;
}
</style>
