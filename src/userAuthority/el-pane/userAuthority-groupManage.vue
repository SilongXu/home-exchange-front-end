<template>
<div class="userAuthorityManage-tab-groupManage">
  <div class="userAuthorityManage-tab-groupManage-top">
    <div class="userAuthorityManage-tab-groupManage-top-search">
      <div class="userAuthorityManage-tab-groupManage-top-search-input">
        <el-input
          placeholder="输入用户名、邮箱查询"
          v-model="inputFilter"
          @change="search">
        </el-input>
      </div>
      <div class="userAuthorityManage-tab-groupManage-top-search-icon">
        <svg-icon icon="search" size="20px"></svg-icon>
      </div>
    </div>

  </div>
    <div class="userAuthorityManage-tab-groupManage-middle">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="groupName"
          label="组名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="totalGroup"
          label="用户数量"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="groupAdmin"
          label="组管理员"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="userAuthorityManage-tab-groupManage-bottom">
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
  name: 'groupManage',
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 400
      },
      tableData: [
        {
          groupName: 'group-1',
          description: 'description-1',
          totalGroup: 'total-1',
          groupAdmin: 'admin-1',
          createTime: '9-1',
        },
        {
          groupName: 'group-2',
          description: 'description-2',
          totalGroup: 'total-2',
          groupAdmin: 'admin-2',
          createTime: '9-2',
        },
        {
          groupName: 'group-3',
          description: 'description-3',
          totalGroup: 'total-3',
          groupAdmin: 'admin-3',
          createTime: '9-3',
        },
        {
          groupName: 'group-1',
          description: 'description-4',
          totalGroup: 'total-4',
          groupAdmin: 'admin-4',
          createTime: '9-4',
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
    &-groupManage {
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
      &-bottom{
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