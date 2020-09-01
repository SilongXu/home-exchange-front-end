<template>
  <div class="userAuthorityManage">
    <div class="userAuthorityManage-tab">
      <el-tabs v-model="activeName" @click="changePane()">
        <el-tab-pane label="用户管理" name="userManage">
          <div class="userAuthorityManage-tab-userManage">
            <div class="userAuthorityManage-tab-userManage-top">
              <div class="userAuthorityManage-tab-userManage-top-search">
                <el-input
                  placeholder="请输入关键字搜索"
                  v-model="inputFilter"
                  @change="search">
                </el-input>
                <svg-icon icon="search" size="21px"></svg-icon>
              </div>
              
              <div class="userAuthorityManage-tab-userManage-top-new">
                <el-button type="primary" size="mini" @click="addNewUser()">
                  <svg-icon icon="plus"></svg-icon>
                  添加用户
                </el-button>
              </div>

            </div>
            <div class="userAuthorityManage-tab-userManage-middle">

            </div>

            <div class="userAuthorityManage-tab-userManage-bottom">
              <el-pagination></el-pagination>
              
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="组管理" name="groupManage">

        </el-tab-pane>
        <el-tab-pane label="角色管理" name="roleManage">
            
        </el-tab-pane>
        <el-tab-pane label="权限管理" name="authorityManage">
            
        </el-tab-pane>
      </el-tabs>
    </div>  

  </div>
</template>

<script>
export default {
  name: 'userAuthorityManage',
  data() {
    return {

    }
  },
  methods: {
    addNewUsers(){

    },
  },

  
}
</script>

<style lang="scss" scoped>

</style>