<template>
  <div class="search-result" ref="result">
    <add-tag-modal v-if="tagDialogVisible" :visible="tagDialogVisible" @addTagChange="onAddTag" @cancel="onCancelAddTag"></add-tag-modal>
    <search-detail v-if="dialogVisible" :visible="dialogVisible" :detail="currentEntry" @close="onDetailClose"></search-detail>

    <div class="search-result-operation">
      <el-button type="primary" size="mini" @click="clearItems()" class="search-result-operation-left">
        清空所选项
      </el-button>
      <el-button type="primary" size="mini" @click="addTag()" class="search-result-operation-right">
        批量添加标签
      </el-button>
    </div>

    <div class="result" v-loading="resultLoading" element-loading-background="rgba(0, 0, 0, 0.4)">
      <div class="entry" v-for="entry in searchResult" :key="entry.id">
        <div class="entry-left">
          <img class="entry-left-img" :src="getThumbImgPath(entry.thumb)"/>
        </div>
        <div class="entry-right">
          <div class="entry-right-top">
            <div class="entry-right-top-info">
              <svg-icon icon="file"></svg-icon>
              <span :title="entry.name">{{entry.name}}</span>
            </div>
            <div class="entry-right-top-operation">
              <div class="link-btn" @click="viewDetail(entry)">
                <svg-icon icon="view-detail"></svg-icon>
                查看详情
              </div>
              <div class="link-btn" @click="download(entry)">
                <svg-icon icon="download"></svg-icon>
                下载
              </div>

            </div>
          </div>
          <div class="entry-right-path">
            <div class="property" :title="entry.path">资源路径: {{entry.path}}</div>
          </div>
          <div class="entry-right-tags">
            <div class="entry-right-tags-property" v-for="tag in entry.tags" :key="tag.id">
              {{tag.name}}
            </div>
          </div>
          <div class="entry-right-property">
            <div class="property">数据类型: {{entry.type}}</div>
            <div class="property">文件大小: {{entry.fileSize}}</div>
            <div class="property">归属节点: {{entry.node}}</div>
            <div class="property">归属分系统: {{entry.subSystem}}</div>
            <div class="property">入库时间: {{entry.time}}</div>
            <div class="property">是否同步：{{entry.syncFlag == 0 ? '否' : '是'}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="search-result-footer">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="pagination.page + 1" 
        :page-sizes="[5, 10, 20]"
        :page-size.sync="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import apiService from './search.service';
import saveAs from 'file-saver';

export default {
  name: 'SearchResult',
  components: {
    'add-tag-modal': () => import('./modal/add-tag'),
    'search-detail': () => import('./modal/search-detail'),
  },
  props: ['filters'],
  data() {
    return {
      tagDialogVisible: false,
      dialogVisible: false,
      filterPagination: 0,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      resultLoading: false,
      searchResult: [],
      currentEntry: {},
    };
  },
  mounted(){
    document.documentElement.scrollTop = 0;
  },
  methods: {
    download(entry) {
      apiService.getDetailDownload(entry.id, entry.productType)
      .then((href) => {
        const blob = new Blob([href.data], {type: href.header['content-type']});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        saveAs(blob, fileName);
      }).catch(() => {
      });
    },
    getThumbImgPath(path) {
      return `data:image/jpg;base64,${path}`;
    },
    viewDetail(entry) {
      this.currentEntry = entry;
      this.dialogVisible = true;
    },
    clearItems(){
        this.$emit('clearItems')
    },
    addTag() {
      this.tagDialogVisible = true;
    },
    onCancelAddTag() {
      this.tagDialogVisible = false;
    },
    onAddTag(tags) {
      if (tags && tags.length > 0) {
        apiService.batchAddTag((this.filters && this.filters.filters) || [], tags)
        .then(() => {
          this.tagDialogVisible = false;
          this.$message({
            message: '批量添加标签成功',
            type: 'success'
          });
        })
        .catch(() => {
          this.$message.error('批量添加标签失败，请稍后重试');
        });
      }
    },
    onSizeChange(size) {
      this.pagination.size = size;
      this.fetchResult(this.filters);
    },
    onPageChange(page) {
      this.pagination.page = page;
      this.fetchResult(this.filters);
    },
    onDetailClose() {
      this.dialogVisible = false;
    },
    fetchResult(searchParam = {}) {
      const page =this.pagination.page;
      const size =this.pagination.size;
      this.searchResult = [];
      //返回到顶端
      // 缓存上一次搜索的filterList
      // this.filters = searchParam;
      this.resultLoading = true;
      apiService.getSearchResults(page-1===-1?0:page-1, size, searchParam)
      .then((results) => {
        this.resultLoading = false;
        if (results.data) {
          this.searchResult = results.data.data;
          this.searchResult.forEach((target) => {
            if(target.fileSize > 1024){
              if(target.fileSize > 1024*1024){
                if(target.fileSize > 1024*1024*1024){
                  target.fileSize = target.fileSize / (1024*1024*1024);
                  target.fileSize = parseInt(target.fileSize) + 'GB';
                }else{
                  target.fileSize = target.fileSize / (1024*1024);
                  target.fileSize = parseInt(target.fileSize) + 'MB';
                }
              }else{
                target.fileSize = target.fileSize / 1024;
                target.fileSize = parseInt(target.fileSize) + 'KB';
              }
            }else{
              target.fileSize = parseInt(target.fileSize) + 'bytes';
            }
          })
          this.pagination = results.data.pagination || {
            page: 1,
            size: 10,
            total: 0,
          };
        }
        document.getElementsByClassName('search-content-right')[0].scrollTop=0;
      })
      .catch(() => {});      
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.search-result {

  &-operation {
    @include flex-align(center, space-between);
    height: 48px;
    padding: 0 20px;
    border-bottom: 1px solid $border-dark;
  }

  &-footer {
    @include flex-align(center, flex-end);
    padding: 16px;
  }
}

.result {
  min-height: 500px;
  overflow: auto;
  height: 50%;
}

.entry {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid $bg-default;

  &-left {
    margin-right: 16px;

    &-img {
      width: 100px;
      height: 100px;
      border: 1px solid $brand-primary;
    }
  }

  &-right {
    flex: 1;
  
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
          @include text-ellipsis()
        }
      }

      &-operation {
        @include flex-align(center, space-between);
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

    &-tags {
      display: flex;;
      flex-wrap: wrap;
      margin-bottom: 8px;

      &-property {
        @include flex-align( center, center);
        height: 20px;
        margin-right: 10px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 40px;
        border: solid 1px;
        border-color: $text-mute;
        color: $text-mute;
      }
    }
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