<template>
  <div class="layout-header">
    <div class="layout-header-top">
      <div class="layout-header-top-current">
      </div>
      <div class="layout-header-top-profile">
        <div class="nav-item" @click="navPath('/search')">
          <svg-icon icon="search"></svg-icon>
        </div>
        <!-- <div class="nav-item">
          <svg-icon icon="avator"></svg-icon>
          admin
        </div> -->
      </div>
    </div>
    <div class="layout-header-nav">
      <div class="layout-header-nav-left">
        <div :class="navItem.path==currentNavItem.path?'nav-item active':'nav-item'" 
            v-for="navItem in leftNavItems" :key="navItem.name" @click="navPath(navItem.path)">
          <svg-icon :icon="navItem.icon"></svg-icon>
          {{navItem.name}}
        </div>
      </div>
      <div class="layout-header-nav-right">
        <div :class="navItem.path==currentNavItem.path?'nav-item active':'nav-item'" 
            v-for="navItem in rightNavItems" :key="navItem.name" @click="navPath(navItem.path)">
          <svg-icon :icon="navItem.icon"></svg-icon>
          {{navItem.name}}
        </div>
      </div>
    </div>
    <div class="layout-header-banner">
      <div class="layout-header-banner-content">
        <img src="../assets/images/tds-logo.svg">
        航天网络化服务系统数据管理平台
      </div>
      <div class="layout-header-banner-box"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutHeader',
  data: () => {
    return {
      leftNavItems: [
        {
          icon: 'search', 
          name: '数据检索',
          path: '/search',
        },
        {
          icon: 'folder-open',
          name: '目录管理',
          path: '/menu',
        },
        {
          icon: 'import-manage',
          name: '任务管理',
          path: '/import'
        },
      ],
      rightNavItems: [
        {
          icon: 'operation',
          name: '监控运维',
          path: '/monitor',
        },
        {
          icon: 'taskflow',
          name: '接口管理',
          path: '/interface',
        },
        {
          icon: 'transfer',
          name: '同步管理',
          path: '/transfer',
        },
      ],
      extraNavItems: [
        {
          icon: 'search',
          name: '搜索',
          path: '/search',
        },
      ],
    };
  },
  methods: {
    navPath(path) {
      if (path) {
        location.hash = path;
      }
    }
  },
  computed: {
    currentNavItem() {
      const path = this.$route.path;
      const navItem = [...this.leftNavItems, ...this.rightNavItems, ...this.extraNavItems].find((_navItem) => {
        return _navItem.path && path==_navItem.path; //path.indexOf(_navItem.path) > -1;
      });
      return navItem;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.nav-item {
  @include flex-align(center, flex-start);
  font-size: $font-lg;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &.active {
    color: $brand-primary;
  }

  &:not(:last-of-type) {
    margin-right: 32px;
  }

  .svg-icon {
    margin-right: 4px;
  }

  &:hover .svg-icon,
  &.active .svg-icon {
    fill: $brand-primary;
  }
}

.layout-header {
  position: relative;
  background: $bg-default;
  border-bottom: 1px solid $border-dark;

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    background: $bg-light;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.26);

    &-current {
      @include flex-align(center, flex-start);
      padding-left: 20px;
    }

    &-profile {
      @include flex-align(center, flex-end);
      padding-right: 20px;

      .nav-item {
        font-size: $font-md;

        &:not(:last-of-type) {
          margin-right: 32px;
        }
      }
    }
  }

  &-nav {
    @include flex-align(center, space-between);
    height: 65px;

    &-left {
      @include flex-align(center, center);
      flex: 1;
      max-width: calc(50% - 200px);
    }

    &-right {
      @include flex-align(center, center);
      flex: 1;
      max-width: calc(50% - 200px);
    }

    .nav-item{
      padding-left: 5%;
    }
  }

  &-banner {
    position: absolute;
    top: 0;
    left: 50%;
    height: 90px;
    width: 480px;
    transform: translateX(-50%);

    &-content {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 90px;
      color: $text-light;
      font-size: 24px;
      z-index: 1;

      img {
        height: 36px;
        width: 36px;
      }
    }

    &-box {
      position: absolute;
      top: 45px;
      width: calc(100% - 90px);
      border-top: 45px solid $bg-light;
      border-left: 45px solid transparent;
      border-right: 45px solid transparent;
      filter: drop-shadow(0 4px 2px rgba(0,0,0,0.26));
    }
  }
}

@media screen and (max-width: 1700px) {
  .layout-header-nav .nav-item:not(:last-of-type) {
    margin-right: 16px;
  }
}
@media screen and (max-width: 1500px) {
  .nav-item {
    font-size: 1rem;
  }
}
@media screen and (max-width: 1400px) {
  .nav-item {
    font-size: $font-md;
  }
}
</style>