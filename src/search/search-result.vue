<template>
  <div class="search-result">
    <div class="entry" v-for="entry in searchResult" :key="entry.id">
      <div class="entry-top">
        <div class="entry-top-info">
          <svg-icon icon="file"/>
          <span :title="entry.name">{{entry.name}}</span>
        </div>
        <div class="entry-top-operation">
          <div class="link-btn">
            <svg-icon icon="view-detail"/>
            查看详情
          </div>
          <div class="link-btn">
            <svg-icon icon="download"/>
            下载
          </div>
        </div>
      </div>
      <div class="entry-path">
        <div class="property" :title="entry.path">资源路径: {{entry.path}}</div>
      </div>
      <div class="entry-property">
        <div class="property">数据类型: {{entry.type}}</div>
        <div class="property">文件大小: {{entry.size}}</div>
        <div class="property">归属节点: {{entry.node}}</div>
        <div class="property">归属分系统: {{entry.system}}</div>
        <div class="property">入库时间: {{entry.importTime}}</div>
      </div>
    </div>
    <div class="search-result-footer">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="pagination.page"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search-result',
  data() {
    return {
      pagination: {
        page: 1,
        total: 400,
      },
      searchResult: [
        {
          id: 1,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 2,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 3,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 4,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 5,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
      ],
    };
  },
  methods: {
    onSizeChange() {

    },
    onPageChange() {

    }
  },
}
</script>
<style scoped>
.search-result-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}
.entry {
  padding: 20px;
  border-bottom: 1px solid #01202F;
}
.entry-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}
.entry-top-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 16px;
  font-weight: 600;
  color: #C4D1DD;
  overflow: hidden;
}
.entry-top-info .svg-icon {
  margin-right: 8px;
  flex-shrink: 0;
}
.entry-top-info span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.entry-top-operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}
.entry-path {
  margin-bottom: 8px;
}
.entry-property {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
}
.link-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #00AADD;
  cursor: pointer;
}
.link-btn:hover {
  text-decoration: underline;
}
.link-btn:not(:last-of-type) {
  margin-right: 24px;
}
.link-btn .svg-icon {
  margin-right: 4px;
}
.property {
  height: 24px;
  line-height: 24px;
  min-width: 120px;
  font-size: 12px;
  color: #5B748C;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.property:not(:last-of-type) {
  margin-right: 32px;
}
</style>