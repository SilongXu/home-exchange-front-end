<template>
  
<div class="userAuthorityManage-tab-userManage">
  <div class="userAuthorityManage-tab-userManage-top">
    <div class="userAuthorityManage-tab-userManage-top-search">
      <div class="userAuthorityManage-tab-userManage-top-search-input">
        <el-input
          placeholder="输入用户名、邮箱查询"
          v-model="inputFilter"
          @change="search">
        </el-input>
      </div>
      <div class="userAuthorityManage-tab-userManage-top-search-icon">
        <svg-icon icon="search" size="20px"></svg-icon>
      </div>
    </div>
              
    <div class="userAuthorityManage-tab-userManage-top-new">
      <el-button type="primary" size="mini" @click="addNewUser()">
        <svg-icon icon="plus"></svg-icon>
        <div class="userAuthorityManage-tab-userManage-top-new-para">
          添加用户
        </div>
      </el-button>
    </div>

    </div>
      <div class="userAuthorityManage-tab-userManage-middle">
        <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
          prop="userName"
          label="用户名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="fullName"
          label="全名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="180">
        </el-table-column>

        <el-table-column
        prop="operation"
        label="操作"
        min-width="180px">
        <template >
          <div class="row-operation">
            <div class="icon-btn" title="详情">
              <svg-icon icon="view-detail"></svg-icon>
            </div>
            <div class="icon-btn" title="编辑">
              <svg-icon icon="edit"></svg-icon>
            </div>
            <div class="icon-btn" title="删除">
              <svg-icon icon="delete"></svg-icon>
            </div>
          </div>
        </template>

        </el-table-column>
      </el-table>
      </div>

      <div class="userAuthorityManage-tab-userManage-bottom">
        <el-pagination
        :current-page="pagination.page"
        :page-sizes="[10, 20]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        >
        </el-pagination>      
      </div>
    </div>
    
</template>

<script>
export default {
  name: 'userManage',
  data() {
    return{
      tableData: [
        {
          userName: 'name-1',
          email: 'email-1',
          phone: 'phone-1',
          fullName: 'full-1',
          createTime: '9.1',
        },
        {
          userName: 'name-2',
          email: 'email-2',
          phone: 'phone-2',
          fullName: 'full-2',
          createTime: '9.2',
        },
        {
          userName: 'name-3',
          email: 'email-3',
          phone: 'phone-3',
          fullName: 'full-3',
          createTime: '9.3',
        },
        {
          userName: 'name-4',
          email: 'email-4',
          phone: 'phone-4',
          fullName: 'full-4',
          createTime: '9.4',
        },
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 400
      },
    }
  },
  methods: {
    addNewUser() {
      this.$router.push('/userAuthority/new');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.userAuthorityManage {
  &-tab {
    &-userManage {
      &-top {
        display: flex;
        position: relative;
        width: 100%;
        margin-left: 10px;
        margin-bottom: 10px;
        &-search {
          @include flex-align(center, flex-start);
          &-input {
            width: 400px;
          }
          &-icon {
            position: absolute;
            top: 10px;
            left: 370px;
            cursor: pointer; 
          }
        }
        &-new {
          @include flex-align(center, flex-end);
          display: flex;
          position: absolute;
          right: 25px;
          ::v-deep .el-button{
            padding: 5px 10px 10px 10px;
          }
          .svg-icon{
            margin-top: 5px;
            vertical-align: middle;
            fill: $icon-default;
          }
          &-para{
            display: inline-flex;
            vertical-align: middle;
            margin-top: 5px;

          }
        }
      }
      &-middle {
        .row-operation {
          @include flex-align(center, flex-start);
        }
      }
      &-bottom {
        @include flex-align(flex-end, flex-end);
        background: $bg-body;
      }
    }
  }
}

.el-table ::v-deep thead tr th {
  padding: 6px 0;
  background: $bg-default;
  height: 45px;
}
</style>