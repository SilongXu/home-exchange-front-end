<template>
  <div class="monitor-top">
    <div class="monitor-top-menu">
      <div class="title">本部门目录数</div>
      <div class="content">
        <div>
          <div v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)"><span class="total">{{topData.catalogCountStat ? topData.catalogCountStat.value : ''}}</span>个</div>
          <div class="subText">总目录数</div>
        </div>
        <div class="subText" v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)">环比上月{{topData.catalogCountStat ? topData.catalogCountStat.monthRate : ''}}%</div>
      </div>
    </div>
    <div class="monitor-top-resource">
      <div class="title">本部门资源数</div>
      <div class="content">
        <div>
          <div v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)"><span class="total">{{topData.resourceCountStat ? topData.resourceCountStat.value : ''}}</span>个</div>
          <div class="subText">总目录数</div>
        </div>
        <div class="subText" v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)">环比上月{{topData.resourceCountStat ? topData.resourceCountStat.monthRate : ''}}%</div>
      </div>
    </div>
    <div class="monitor-top-size">
      <div class="title">数据大小统计</div>
      <div class="content">
        <div>
          <div v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)"><span class="total">{{topData.resourceSizeStat ? topData.resourceSizeStat.value : ''}}</span>GB</div>
          <div class="subText">总目录数</div>
        </div>
        <div class="subText" v-loading="loading" element-loading-background="rgba(113, 186, 215, 0.2)">环比上月{{topData.resourceSizeStat ? topData.resourceSizeStat.monthRate : ''}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from './monitor.service';

export default {
  name: 'MonitorTop',
  mounted() {
    this.loading = true;
    this.getCount();
  },
  data() {
    return {
      topData: {},
      loading: true,
    };
  },
  methods: {
    getCount() {
      apiService.getResourceCount().then((count) => {
        if (count.data) {
          this.topData = count.data;
          this.loading = false;
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.monitor-top {
  @include flex-align(center, space-between);
  height: 160px;
  color: white;
  font-size: 16px;
  font-family: '黑体';

  &-menu, &-resource, &-size {
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 120px;
    border: none;
    border-radius: 4px;
    padding: 20px;

    .title {
      height: 30px;
      font-weight: 650;
    }

    .content {
      @include flex-align(flex-end, space-between);
      flex: 1;

      .total {
        font-weight: 650;
        font-style: normal;
        font-size: 32px;
        margin-right: 4px;
      }

      .subText {
        font-size: 14px;
      }
    }
  }

  &-menu {
    background: linear-gradient(138deg, rgba(113, 186, 215, 1) 0%, rgba(53, 143, 210, 1) 60%);
  }

  &-resource {
    background: linear-gradient(138deg, rgba(152, 170, 231, 1) 0%, rgba(71, 118, 213, 1) 59%);
  }

  &-size {
    background: linear-gradient(138deg, rgba(113, 205, 196, 1) 1%, rgba(20, 178, 163, 1) 59%);
  }
}
</style>