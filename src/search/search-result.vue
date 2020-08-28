<template>
  <div class="search-result">

    <el-dialog
      title="批量添加"
      :visible.sync="tagDialogVisible"
      width="500px"
      class="search-result-dialog-tag"
    >
      <el-form ref="form" :model="tagForm" label-position="left" label-width="80px" size="small">
        <el-form-item label="标签" :required="true">
          <el-select
            v-model="tagForm.tags"
            multiple
            filterable
            allow-create
            placeholder="请选择标签">
            <el-option
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :value="tag">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="tagDialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="confirmTag">确定</el-button>
      </span>
    </el-dialog>

    <div class="search-result-operation">
      <el-button type="primary" size="mini" @click="addTag()">
        批量添加标签
      </el-button>
    </div>
    <div class="entry" v-for="entry in searchResult" :key="entry.id">
      <div class="entry-top">
        <div class="entry-top-info">
          <svg-icon icon="file"></svg-icon>
          <span :title="entry.name">{{entry.name}}</span>
        </div>
        <div class="entry-top-operation">
          <div class="link-btn" @click="checkDetail(entry)">
            <svg-icon icon="view-detail"></svg-icon>
            查看详情
          </div>
          <div class="link-btn">
            <svg-icon icon="download"></svg-icon>
            下载
          </div>
        </div>
      </div>
      <div class="entry-path">
        <div class="property" :title="entry.path">资源路径: {{entry.path}}</div>
      </div>
      <div class="entry-property">
        <div class="property">数据类型: {{entry.type}}</div>
        <div class="property">文件大小: {{entry.size}}</div>
        <div class="property">归属节点: {{entry.node}}</div>
        <div class="property">归属分系统: {{entry.system}}</div>
        <div class="property">入库时间: {{entry.importTime}}</div>
      </div>
    </div>
    <div class="search-result-footer">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="pagination.page"
        :page-sizes="[5, 10, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchResult',
  data() {
    return {
      tagDialogVisible: false,
      pagination: {
        page: 1,
        total: 400,
      },
      searchResult: [
        {
          id: 1,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 2,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 3,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 4,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
        {
          id: 5,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',
        },
      ],
      tagForm: {
        tags: [],
      },
      tags: [
        'tag1',
        'tag2',
        'tag3',
      ],
    };
  },
  methods: {
    checkDetail(entry) {
      console.log(entry);
      this.$router.push('/menu/manage');
    },
    addTag() {
      this.tagForm.tags = [];
      this.tagDialogVisible = true;
    },
    confirmTag() {
      this.tagDialogVisible = false;
    },
    onSizeChange() {

    },
    onPageChange() {

    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

.search-result {

  &-dialog {

    &-tag {

      .el-select {
        width: 100%;
      }
    }
  }

  &-operation {
    @include flex-align(center, flex-end);
    height: 48px;
    padding: 0 20px;
    border-bottom: 1px solid $border-dark;
  }

  &-footer {
    @include flex-align(center, flex-end);
    padding: 16px;
  }
}
.entry {
  padding: 20px;
  border-bottom: 1px solid $bg-default;

  &-top {
    @include flex-align(center, space-between);
    margin-bottom: 8px;
    font-size: $font-md;

    &-info {
      @include flex-align(center, flex-start);
      padding-right: 16px;
      font-weight: 600;
      overflow: hidden;

      .svg-icon {
        margin-right: 8px;
        flex-shrink: 0;
      }

      span {
        @include text-ellipsis();
      }
    }

    &-operation {
      @include flex-align(center, flex-end);
      flex-shrink: 0;
    }
  }

  &-path {
    margin-bottom: 8px;
  }

  &-property {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -8px;
  }
}

.link-btn {
  @include flex-align(center, flex-start);
  color: $brand-primary;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:not(:last-of-type) {
    margin-right: 24px;
  }

  .svg-icon {
    margin-right: 4px;
    fill: $brand-primary;
  }
}

.property {
  @include text-ellipsis();
  height: 24px;
  line-height: 24px;
  min-width: 120px;
  font-size: $font-sm;
  color: $text-mute;

  &:not(:last-of-type) {
    margin-right: 32px;
  }
}
</style>