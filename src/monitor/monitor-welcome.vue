<template>
  <div class="monitor">
    <monitor-top></monitor-top>
    <monitor-chart></monitor-chart>
    <monitor-chart-panel></monitor-chart-panel>
  </div>
</template>

<script>
import MonitorTop from './modal/monitor-top';
import MonitorChart from './modal/monitor-chart';
import MonitorChartPanel from './modal/monitor-chart-panel';

export default {
  name: 'Monitor',
  components: {
    MonitorTop,
    MonitorChart,
    MonitorChartPanel,
  },
  methods: {
    goToArchive(){
      this.$router.push('./monitor/monitorArchive');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitor {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  overflow: auto;
}

</style>