<template>
  <div class="layout-header">
    <div class="layout-header-top">
      <div class="layout-header-top-current">
        <div class="nav-item active" v-if="currentNavItem">
          <svg-icon :icon="currentNavItem.icon"/>
          {{currentNavItem.name}}
        </div>
      </div>
      <div class="layout-header-top-profile">
        <div class="nav-item" @click="navPath('/search')">
          <svg-icon icon="search"/>
        </div>
        <div class="nav-item">
          <svg-icon icon="avator"/>
          admin
        </div>
      </div>
    </div>
    <div class="layout-header-nav">
      <div class="layout-header-nav-left">
        <div class="nav-item" v-for="navItem in leftNavItems" :key="navItem.name">
          <svg-icon :icon="navItem.icon"/>
          {{navItem.name}}
        </div>
      </div>
      <div class="layout-header-nav-right">
        <div class="nav-item" v-for="navItem in rightNavItems" :key="navItem.name">
          <svg-icon :icon="navItem.icon"/>
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
  name: 'layout-header',
  data: () => {
    return {
      leftNavItems: [
        {
          icon: 'folder-open',
          name: '目录管理',
        },
        {
          icon: 'transfer',
          name: '同步管理',
        },
        {
          icon: 'import-manage',
          name: '导入管理',
        },
        {
          icon: 'export-manage',
          name: '导出管理',
        },
        {
          icon: 'operation',
          name: '监控运维',
        },
      ],
      rightNavItems: [
        {
          icon: 'connection',
          name: '连接中心',
        },
        {
          icon: 'user-admin',
          name: '用户与权限管理',
        },
        {
          icon: 'life-cycle',
          name: '生命周期管理',
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
      this.$router.push(path);
    }
  },
  computed: {
    currentNavItem() {
      const path = this.$route.path;
      const navItem = [...this.leftNavItems, ...this.rightNavItems, ...this.extraNavItems].find((_navItem) => {
        return _navItem.path === path;
      });
      return navItem;
    }
  },
}
</script>

<style scoped>
.layout-header {
  position: relative;
  background: #01202F;
  border-bottom: 1px solid #0C2D40;
}

.layout-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  background: #0C2D40;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.26);
}
.layout-header-top-current {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
}
.layout-header-top-profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}
.layout-header-top-profile .nav-item:not(:last-of-type) {
  margin-right: 32px;
}

.layout-header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
}

.layout-header-nav-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-width: calc(50% - 240px);
  padding-left: 20px;
}

.layout-header-nav-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-width: calc(50% - 280px);
  padding-right: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 120px;
  color: #C4D1DD;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
}
.nav-item:hover,
.nav-item.active {
  color: #00AADD;
}
.nav-item:not(:last-of-type) {
  margin-right: 8px;
}
.nav-item .svg-icon {
  margin-right: 4px;
  fill: #C4D1DD;
}
.nav-item:hover .svg-icon,
.nav-item.active .svg-icon {
  fill: #00AADD;
}

.layout-header-banner {
  position: absolute;
  top: 0;
  left: 50%;
  height: 90px;
  width: 480px;
  transform: translateX(-50%);
}
.layout-header-banner-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
  color: #EEF5FB;
  font-size: 24px;
  z-index: 1;
}
.layout-header-banner-content img {
  height: 36px;
  width: 36px;
}
.layout-header-banner-box {
  position: absolute;
  top: 45px;
  width: calc(100% - 90px);
  border-top: 45px solid #0C2D40;
  border-left: 45px solid transparent;
  border-right: 45px solid transparent;
  filter: drop-shadow(0 4px 2px rgba(0,0,0,0.26));
}
</style>