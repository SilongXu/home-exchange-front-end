<template>
  <div class="search-result" ref="result">
    <add-tag-modal
      v-if="tagDialogVisible"
      :visible="tagDialogVisible"
      @addTagChange="onAddTag"
      @cancel="onCancelAddTag"
    ></add-tag-modal>
    <search-detail
      v-if="dialogVisible"
      :visible="dialogVisible"
      :detail="currentEntry"
      @close="onDetailClose"
    ></search-detail>
    <xml-detail
      v-if="xmlDetailVisible"
      :visible="xmlDetailVisible"
      @closeXml="closeXml"
      :detailXml="currentEntry"
    ></xml-detail>

    <div class="search-result-operation">
      <div class="search-result-operation-left">
        <el-button type="primary" size="mini" @click="clearItems()">
          清空所选项
        </el-button>
        <!-- <el-button type="primary" size="mini" @click="addTag()">
          批量添加标签
        </el-button> -->
        <el-button type="primary" size="mini" @click="goSearchMenuTemplate()">
          保存搜索条件
        </el-button>
        <search-menu-template :visible="searchMenutemplateDialogVisible" @closeMenuTemplateDialog="closeMenuTemplateDialog" ref="searchMenuTemplate"></search-menu-template>
      </div>
      <div class="search-result-operation-right">
        <span class="search-result-operation-right-btn">
          <el-button type="primary" size="mini" @click="exportAllAsExcel"> 导出全部为Excel </el-button>
          <el-button type="primary" size="mini" @click="exportSelectedAsExcel"> 导出选中为Excel </el-button>
          <el-button type="primary" size="mini" @click="exportAllAsShapefile">导出全部为Shapefile</el-button>
          <el-button type="primary" size="mini" @click="exportSelectedAsShapefile"> 导出选中为Shapefile</el-button>
        </span>
        <span>
          <el-checkbox
            @change="selectAllToogle"
            :value="selectAll"
            :indeterminate="isIndeterminate"
          >
            全选
          </el-checkbox>
        </span>
      </div>
    </div>

    <div
      class="result"
      v-loading="resultLoading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <div class="entry" v-for="entry in searchResult" :key="entry.id">
        <div class="entry-left">
          <img class="entry-left-img" :src="getThumbImgPath(entry.thumb)" />
        </div>
        <div class="entry-right">
          <div class="entry-right-top">
            <div class="entry-right-top-info">
              <svg-icon icon="file"></svg-icon>
              <span :title="entry.name">{{ entry.name }}</span>
            </div>
            <div class="entry-right-top-operation">
              <div class="link-btn" @click="viewXmlDetail(entry)">
                <svg-icon icon="view-detail"></svg-icon>
                xml详情
              </div>
              <div class="link-btn" @click="viewDetail(entry)">
                <svg-icon icon="view-detail"></svg-icon>
                查看详情
              </div>
              <div class="link-btn" @click="download(entry)">
                <svg-icon icon="download"></svg-icon>
                下载
              </div>
              <div class="link-btn">
                <el-checkbox
                  :value="entry.checked"
                  @change="changeBoxState(entry)"
                >
                </el-checkbox>
              </div>
            </div>
          </div>
          <div class="entry-right-path">
            <div class="property" :title="entry.path">
              资源路径: {{ entry.path }}
            </div>
          </div>
          <div class="entry-right-tags">
            <div
              class="entry-right-tags-property"
              v-for="tag in entry.tags"
              :key="tag.id"
            >
              {{ tag.name }}
            </div>
          </div>
          <div class="entry-right-property">
            <div class="property">数据类型: {{ entry.type }}</div>
            <div class="property">文件大小: {{ entry.fileSize }}</div>
            <div class="property">归属节点: {{ entry.node }}</div>
            <div class="property">归属分系统: {{ entry.subSystem }}</div>
            <div class="property">入库时间: {{ entry.time }}</div>
            <div class="property">
              是否同步：{{ entry.syncFlag == 0 ? "否" : "是" }}
            </div>
            <!-- <div class="property">
              上次同步结果：{{entry.syncResult}}
            </div> -->
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
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import apiService from "./search.service";
import saveAs from "file-saver";
import { getLockReconnect } from "../shared/websocket";

export default {
  name: "SearchResult",
  components: {
    "add-tag-modal": () => import("./modal/add-tag"),
    "search-detail": () => import("./modal/search-detail"),
    "xml-detail": () => import("./modal/xml-detail"),
    "search-menu-template": () => import("./modal/search-menu-template"),
  },
  props: ["filters"],
  data() {
    return {
      tagDialogVisible: false,
      dialogVisible: false,
      xmlDetailVisible: false,
      filterPagination: 0,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      resultLoading: false,
      selectAll: false, //是否全选
      isIndeterminate: false,  //半选状态
      searchResult: [], 
      currentEntry: {}, 
      checkedList: [],  //全选的数据列表,保存选中的项的dataId和productType数据,
      searchConditions:null,
      searchMenutemplateDialogVisible:false,
      lockReconnectSearchResult: null,
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    goSearchMenuTemplate(){
      this.searchMenutemplateDialogVisible = true;
    },
    closeMenuTemplateDialog(){
      this.searchMenutemplateDialogVisible = false;
    },
    changeBoxState(entry) {
      entry.checked = !entry.checked;
      if (entry.checked) {
        this.checkedList.push({ dataId: entry.id, productType: entry.productType });
      } else {
        for (var j = 0; j < this.checkedList.length; j++) {
          if (this.checkedList[j].dataId == entry.id) {
            this.checkedList.splice(j, 1);
          }
        }
      }
      if (this.checkedList.length == this.pagination.size) {
        this.selectAll = true;
        this.isIndeterminate = false;
      } else {
        this.selectAll = false;
        if (this.checkedList.length > 0 && this.checkedList.length < this.pagination.size) {
          this.isIndeterminate = true;
        }else{
          this.isIndeterminate = false;
        }
      }
    },
    selectAllToogle() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        for (var i = 0; i < this.searchResult.length; i++) {
          this.searchResult[i].checked = true;
          var flag = true;
          for (var j = 0; j < this.checkedList.length; j++) {
            if (this.checkedList[j].dataId == this.searchResult[i].id) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.checkedList.push({
              dataId: this.searchResult[i].id,
              productType: this.searchResult[i].productType,
            });
          }
        }
        this.isIndeterminate = false;
      } else {
        for (var i = 0; i < this.searchResult.length; i++) {
          this.searchResult[i].checked = false;
          this.checkedList = [];
        }
      }
      
      if (this.checkedList.length == this.pagination.size) {
        this.isIndeterminate = false;
      }
    },
    exportSelectedAsExcel(){
      apiService.getExportSelectedAsExcel(this.checkedList).then((href) => {
        const blob = new Blob([href.data], {type: href.header['content-type']});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        saveAs(blob, fileName);
      }).catch(() => {
      });
    },
    exportAllAsExcel(){
      apiService.getExportAllAsExcel(this.searchConditions).then((href) => {
        const blob = new Blob([href.data], {type: href.header['content-type']});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        saveAs(blob, fileName);
      }).catch(() => {
      });
    },
    exportSelectedAsShapefile(){
      apiService.getExportSelectedAsShapefile(this.checkedList).then((href) => {
        const blob = new Blob([href.data], {type: href.header['content-type']});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        saveAs(blob, fileName);
      }).catch(() => {
      });
    },
    exportAllAsShapefile(){
      apiService.getExportAllAsShapefile(this.searchConditions).then((href) => {
        const blob = new Blob([href.data], {type: href.header['content-type']});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        saveAs(blob, fileName);
      }).catch(() => {
      });
    },
    download(entry) {
      apiService
        .getDetailDownload(entry.id, entry.productType)
        .then((href) => {
          const blob = new Blob([href.data], {
            type: href.header["content-type"],
          });
          const fileName = href.header["content-disposition"]
            .split(";")[1]
            .split("filename=")[1];
          saveAs(blob, fileName);
        })
        .catch(() => {});
    },
    getThumbImgPath(path) {
      return `data:image/jpg;base64,${path}`;
    },
    viewXmlDetail(entry) {
      this.currentEntry = entry;
      this.xmlDetailVisible = true;
    },
    viewDetail(entry) {
      this.currentEntry = entry;
      this.dialogVisible = true;
    },
    clearItems() {
      this.$emit("clearItems");
    },
    addTag() {
      this.tagDialogVisible = true;
    },
    onCancelAddTag() {
      this.tagDialogVisible = false;
    },
    onAddTag(tags) {
      if (tags && tags.length > 0) {
        apiService
          .batchAddTag((this.filters && this.filters.filters) || [], tags)
          .then(() => {
            this.tagDialogVisible = false;
            this.$message({
              message: "批量添加标签成功",
              type: "success",
            });
          })
          .catch(() => {
            this.$message.error("批量添加标签失败，请稍后重试");
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
    closeXml() {
      this.xmlDetailVisible = false;
    },
    fetchResult(searchParam = {}) {
      //回到页面顶部
      const page = this.pagination.page;
      const size = this.pagination.size;
      this.searchConditions = searchParam;
      this.searchResult = [];
      //返回到顶端
      // 缓存上一次搜索的filterList
      // this.filters = searchParam;
      this.resultLoading = true;
      apiService
        .getSearchResults(page - 1 === -1 ? 0 : page - 1, size, searchParam)
        .then((results) => {
          this.resultLoading = false;
          if (results.data) {
            // this.searchResult = results.data.data
            this.searchResult = results.data.data.map(function (item) {
              item.checked = false;
              return item;
            });
            this.searchResult.forEach((target) => {
              if (target.fileSize > 1024) {
                if (target.fileSize > 1024 * 1024) {
                  if (target.fileSize > 1024 * 1024 * 1024) {
                    target.fileSize = target.fileSize / (1024 * 1024 * 1024);
                    target.fileSize = parseInt(target.fileSize) + "GB";
                  } else {
                    target.fileSize = target.fileSize / (1024 * 1024);
                    target.fileSize = parseInt(target.fileSize) + "MB";
                  }
                } else {
                  target.fileSize = target.fileSize / 1024;
                  target.fileSize = parseInt(target.fileSize) + "KB";
                }
              } else {
                target.fileSize = parseInt(target.fileSize) + "bytes";
              }
            });
            this.pagination = results.data.pagination || {
              page: 1,
              size: 10,
              total: 0,
            };
          }
          document.getElementsByClassName(
            "search-content-right" 
          )[0].scrollTop = 0;
          
          //把搜索结果传递给QA
          this.lockReconnectSearchResult = getLockReconnect();
          if(this.lockReconnectSearchResult == true){
            this.$parent.$refs.filter.circleArea(0, 3, null);
            this.$parent.$refs.filter.circleArea(0, 4, this.searchResult);
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.search-result {
  &-operation {
    @include flex-align(center, space-between);
    height: 48px;
    padding: 0 20px;
    border-bottom: 1px solid $border-dark;
    &-right-btn {
      margin-right: 10px;
    }
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
          @include text-ellipsis();
        }
      }

      &-operation {
        @include flex-align(center, space-between);
        flex-shrink: 0;
        margin-right: 39px;
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
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8px;

      &-property {
        @include flex-align(center, center);
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