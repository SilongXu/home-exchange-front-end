  <template>
  <div class="userAuthorityManage">
    <div class="userAuthorityManage-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="userManage" >
          <user-manage></user-manage>
        </el-tab-pane>
        
        <el-tab-pane label="组管理" name="groupManage">
          <group-manage></group-manage>
        </el-tab-pane>

        <el-tab-pane label="角色管理" name="roleManage">
          <role-manage></role-manage>
        </el-tab-pane>

        <el-tab-pane label="权限管理" name="authorityManage">
          <authority-manage></authority-manage>
        </el-tab-pane>
      </el-tabs>
    </div>  

  </div>
</template>

<script>
export default {
  name: 'userAuthorityManage',
  components: {
    'user-manage': () => import('./el-pane/userAuthority-userManage') ,
    'group-manage': () => import('./el-pane/userAuthority-groupManage') ,
    'role-manage': () => import('./el-pane/userAuthority-roleManage') ,
    'authority-manage': () => import('./el-pane/userAuthority-authorityManage') , 
  },
  data() {
    return {
      activeName: 'userManage',

    }
  },
  methods: {
  },

  
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.el-tabs {
  background: $bg-light;
}

.el-tabs ::v-deep .el-tabs__header {
  padding-left: 20px;
  border-bottom: 1px solid $border-dark;
}
.el-tabs ::v-deep .el-tabs__item {
  height: 48px;
  line-height: 48px;
}

.el-tabs ::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
</style>