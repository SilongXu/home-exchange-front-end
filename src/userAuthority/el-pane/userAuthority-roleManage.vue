<template>
<div class="userAuthorityManage-tab-roleManage">
  <div class="userAuthorityManage-tab-roleManage-top">
    <div class="userAuthorityManage-tab-roleManage-top-search">
      <div class="userAuthorityManage-tab-roleManage-top-search-input">
        <el-input
          placeholder="输入用户名、邮箱查询"
          v-model="inputFilter"
          @change="search">
        </el-input>
      </div>
      <div class="userAuthorityManage-tab-roleManage-top-search-icon">
        <svg-icon icon="search" size="20px"></svg-icon>
      </div>
    </div>

  </div>
    <div class="userAuthorityManage-tab-roleManage-middle">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="角色类型"
          min-width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="userAuthorityManage-tab-roleManage-bottom">
      <el-pagination
      :current-page="pagination.page"
      :page-sizes="[10, 20]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
      </el-pagination>      
    </div>
</div>
</template>

<script>
export default {
  name: 'roleManage',
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 400
      },
      tableData: [
        {
          rolepName: 'role-1',
          description: 'description-1',
          roleType: 'type-1',
        },
        {
          roleName: 'role-2',
          description: 'description-2',
          roleType: 'type-2',
        },
        {
          roleName: 'role-3',
          description: 'description-3',
          roleType: 'type-3',
        },
        {
          roleName: 'group-1',
          description: 'description-4',
          roleType: 'type-4',
        },
      ]

    }
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';
.userAuthorityManage {
  &-tab {
    &-roleManage {
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
      }
      &-middle {
        position: relative;
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