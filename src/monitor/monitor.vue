<template>
  <div class="monitor">
    <monitor-top></monitor-top>
    <monitor-chart></monitor-chart>
    <monitor-chart-panel></monitor-chart-panel>
  </div>
</template>

<script>
import MonitorTop from './monitor-top';
import MonitorChart from './monitor-chart';
import MonitorChartPanel from './monitor-chart-panel';

export default {
  name: 'Monitor',
  components: {
    MonitorTop,
    MonitorChart,
    MonitorChartPanel,
  },
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