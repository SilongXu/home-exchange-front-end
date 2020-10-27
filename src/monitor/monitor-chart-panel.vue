<template>
  <div class="monitor-panel" v-loading="loadingTabs" element-loading-background="rgba(0, 0, 0, 0.4)">
    <el-tabs v-model="activeTab" :before-leave="toggleTab">
      <el-tab-pane :lazy="true" v-for="tab in tabs" :key="tab.nodeCode" :label="tab.nodeName" :name="tab.nodeCode + ''">
        <monitor-history-trend v-if="activeTab === tab.nodeCode" :nodeCode="tab.nodeCode"></monitor-history-trend>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MonitorHistoryTrend from './monitor-history-trend';
import apiService from './monitor.service';

export default {
  name: 'MonitorChartPanel',
  components: {
    MonitorHistoryTrend,
  },
  data() {
    return {
      activeTab: null,
      tabs: [],
      loadingTabs: false,
    };
  },
  mounted() {
    this.getTabs();
  },
  methods: {
    getTabs() {
      this.loadingTabs = true;
      apiService.getMenuTabs()
      .then((tabs) => {
        this.tabs = tabs.data || [];
        if (this.tabs.length > 0) {
          this.activeTab = this.tabs[0].nodeCode + '';
        }
        this.loadingTabs = false;
      })
      .catch(() => {
        this.loadingTabs = false;
      });
    },
    toggleTab() {
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitor-panel {
  display: flex;
  flex: 1;
  margin-top: 20px;
}
.el-tabs {
  flex: 1;
  height: 100%;
  min-height: 400px;
  border-radius: 4px 4px 0 0;
  background: $bg-light;
}
.el-tabs ::v-deep .el-tabs__header {
  margin: 0;
  padding-left: 20px;
  border-bottom: 1px solid $border-dark;
}
.el-tabs ::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
.el-tabs ::v-deep .el-tabs__item {
  height: 48px;
  line-height: 48px;
}
</style>