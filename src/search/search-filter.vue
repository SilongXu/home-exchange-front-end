<template>
  <div class="search-filter">
    <div class="search-filter-entry" v-for="(filter, index) in filterList" :key="index">
      <div class="label">{{filter.name}}{{filter.queryType}}</div>
      <el-select v-if="filter.queryType === 11" v-model="filter.value" placeholder="请选择" size="small">
        <el-option
          v-for="item in filter.options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input v-if="filter.queryType === 12" v-model="filter.value" placeholder="请输入" size="small"></el-input>
      <el-input-number v-if="filter.queryType === 21" v-model="filter.value" :min="0" placeholder="请输入数字" size="small"></el-input-number>
      <div class="input-group" v-if="filter.queryType === 22">
        <el-input-number v-model="filter.fromValue" :min="0" placeholder="请输入数字" size="small"></el-input-number>
        至
        <el-input-number v-model="filter.toValue" :min="0" placeholder="请输入数字" size="small"></el-input-number>
      </div>
    </div>
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
      <div class="input-group">
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
    <div class="search-filter-entry">
      <div class="label">标签</div>
       <el-select
        v-model="tags"
        multiple
        filterable
        placeholder="请选择标签"
        size="small"
      >
        <el-option
          v-for="tag in tagOptions"
          :key="tag"
          :label="tag"
          :value="tag">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import http from '../shared/services/http'

export default {
  name: 'SearchFilter',
  data() {
    return {
      filterList: [],
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
      tags: [],
      tagOptions: ['tag1', 'tag2', 'tag3'],
    };
  },
  methods: {
    onFilterChange() {
      this.$emit('filterChange', 'filter');
    },
    fetchFilterList(nodeId) {
      // 获取过滤条件列表
      http.get(`retrieval/system/search/forms/${nodeId}`)
      .then((filters) => {
        console.log(JSON.parse(JSON.stringify(filters)))
        this.filterList = filters;
      })
      .catch(() => {

      });
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

.search-filter {
  @include flex-align(flex-start, flex-start);
  flex-wrap: wrap;
  padding: 20px 20px 4px 20px;

  &-entry {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 32px;
    line-height: 32px;
    margin-bottom: 16px;
    font-size: $font-md;

    &:not(:last-of-type) {
      margin-right: 32px;
    }

    .label {
      min-width: 60px;
      margin-right: 12px;
      white-space: nowrap;
    }
  }

  .input-group {
    display: flex;
    flex-wrap: nowrap;

    .el-input-number:not(:last-of-type) {
      margin-right: 10px;
    }
    .el-input-number:not(:first-of-type) {
      margin-left: 10px;
    }
  }
}

.el-cascader {
  width: 360px;
}
.el-select {
  width: 360px;
}
.input-group {
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
}

</style>