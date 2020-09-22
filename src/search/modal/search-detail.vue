<template>
  <el-dialog :title="detail.name" :visible="visible" @close="onClose" width="88%" top="4%">
    <div class="dialog">
      <div class="dialog-top">
        <div class="dialog-top-topside">
          <div class="dialog-top-topside-title">
            <svg-icon icon="file" size="32px"></svg-icon>
            <span :title="detail.name">{{detail.name}}</span>
          </div>
          <div class="dialog-top-topside-download">
            <div class="link-btn" @click="detailDownload(detail)">
              <svg-icon icon="download"></svg-icon>
              下载 
            </div>
          </div>
        </div>

        <div class="dialog-top-info">
          <div class="dialog-top-info-property" :size="detail.fileSize">文件大小：{{detail.fileSize}}byte</div>
          <div class="dialog-top-info-property" :title="detail.time">入库时间：{{detail.time}}</div>
        </div>
        <div class="dialog-top-tags">
          <div class="dialog-top-tags-property" v-for="tag in detail.tags" :key="tag.id">
            {{tag.name}}
          </div>
          <div class="dialog-top-tags-add">
            <el-popover
              v-model="popoverVisible"
              placement="bottom"
              title="添加标签"
              width="360"
              trigger="click">
              <el-select
                v-model="tags"
                multiple
                filterable
                allow-create
                placeholder="请选择标签"
                :loading="loadingTags"
                @visible-change="onTagsVisibleChange">
                <el-option
                  v-for="tagOption in tagOptions"
                  :key="tagOption.id"
                  :label="tagOption.name"
                  :value="tagOption.id">
                </el-option>
              </el-select>
              <div class="dialog-top-tags-add-operation">
                <el-button size="small" @click="cancelAdd">取消</el-button>
                <el-button type="primary" size="small" :disabled="tags.length === 0" @click="confirmTag">确定</el-button>
              </div>
              <el-button slot="reference" size="mini"><svg-icon icon="plus" size="sm"></svg-icon></el-button>
            </el-popover>
          </div>
        </div>
      </div>

      <div class="dialog-bottom">
        <div class="dialog-bottom-left">
          <div class="dialog-bottom-left-title">
            <div class="dialog-bottom-rectangle"></div>
            <p>拇指图</p>
          </div>
          <div class="dialog-bottom-left-preview">
            <img class="dialog-bottom-left-preview-img" :src="imagePath" alt="图像预览图">
          </div>
        </div>
        <div class="dialog-bottom-right">
          <div class="dialog-bottom-right-title">
            <div class="dialog-bottom-rectangle"></div>
            <p>元数据</p>
          </div>
          <div class="dialog-bottom-right-metadata" 
          v-loading="metadataLoading" 
          element-loading-background="rgba(0, 0, 0, 0.4)">
            <el-table
              :data="metaData"
              row-key="code"
              :tree-props="{children: 'subs'}"
              >
              <el-table-column
                prop="code"
                label=元数据编号
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="元数据名称"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="value"
                label="元数据值"
                min-width="250">
              </el-table-column>
              <el-table-column
                prop="dataType"
                label="元数据类型"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="enumName"
                label="枚举名称"
                min-width="80">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>  
  </el-dialog>
</template>

<script>
import apiService from '../search.service';
import saveAs from 'file-saver';

export default {
  name: 'SearchDetail',
  props: ['visible', 'detail'],
  data: () => {
    return {
      loadingTags: false,
      tags: [],
      tagOptions: [],
      popoverVisible: false,
      metadataLoading: true,
      metaData: [],
      imagePath: '',
    };
  },
  mounted() {
    this.imagePath = 'data:image/jpg;base64,' + this.detail.thumb;
    this.imagePath = apiService.getDetailImage(this.detail.browseFilePath).then((res) => {
      this.imagePath =  `data:image/jpg;base64,` + res.data;
    });
    apiService.getMetadata(this.detail.id)
    .then((meta) => {
      this.metaData = meta.data.fieldValues;
      this.metadataLoading=false; 

      //console.log(this.metaData);
      this.filterObject(this.metaData);
    }).catch(() => {
    });

  },
  methods: {
    filterObject(obj){
      obj.forEach((item) => {
        if(item.dataType=="object"){
          item.value = '';
        }
        if(item.subs != null){
          filterObject(item.subs);
        }
      })
    },
    detailDownload(detail) {
      apiService.getDetailDownload(detail.id)
      .then((href) => {
        const blob = new Blob([href.data], {type: 'application/octet-stream'});
        const fileName = href.header['content-disposition'].split(";")[1].split("filename=")[1];
        const fileNameFinal = fileName.substring(0, fileName.length - 1);
        saveAs(blob, fileNameFinal);
      }).catch(() => {
      });
    },
    getTagList() {
      apiService.getTagList()
      .then((tags) => {
        this.tagOptions = tags.data || [];
      }) 
      .catch(() => {});
    },
    cancelAdd() {
      this.popoverVisible = false;
    },
    confirmTag() {
      apiService.addTag(this.detail.id, this.getSelectedTags())
      .then(() => {
        this.$message({
          message: '添加标签成功',
          type: 'success'
        });
        apiService.getTagByFileId(this.detail.id)
        .then((list) => {
          this.detail.tags = list.data;
        });
      })
      .catch(() => {
        this.$message.error('添加标签失败，请稍后重试');
      });
    },
    onTagsVisibleChange(visible) {
      if (visible) {
        this.loadingTags = true;
        apiService.getTagList()
        .then((tags) => {
          this.tagOptions = tags.data;
          this.loadingTags = false;
        })
        .catch(() => {
          this.loadingTags = false;
        });
      }
    },
    onClose() {
      this.$emit('close', 'searchDetail');
    },
    getSelectedTags() {
      const selectedTags = [];
      this.tags.forEach((tag) => {
        const selectedOption = this.tagOptions.find((option) => option.id === tag);
        if (selectedOption) {
          selectedTags.push(selectedOption);
        } else {
          selectedTags.push({
            id: null,
            name: tag,
          });
        }
      });

      return selectedTags;
    },
  },
}

</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.dialog {
  height: auto;
  background: $bg-light;

  &-top {
    height: 100px;
    padding-bottom: 60px;
    border-bottom: 1px solid $border-default;

    &-topside {
      @include flex-align( center, space-between);
      margin-bottom: 25px;
      
      &-title {
        @include flex-align( center, flex-start);
        padding-right: 16px;
        margin-left: 10px;
        font-weight: 500;
        font-size: 25px;
        overflow: hidden;

        .svg-icon {
          fill: $brand-primary;
          margin-right: 8px;
        }

        span {
          @include text-ellipsis();
        }
      }

      &-download {
        @include flex-align( center, flex-end);
        flex-shrink: 0;

        .link-btn {
          @include flex-align( center, flex-start);
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
      }
    }

    &-info {
      display: flex;
      margin-bottom: 15px;
      margin-left: 50px;
      
      &-property {
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
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      margin-left: 50px;
      margin-bottom: -8px;

      &-property {
        @include flex-align( center, center);
        height: 20px;
        margin: 7px 10px 0 0;
        padding: 0 10px 0 10px;
        border-radius: 40px;
        border: solid 1px;
        border-color: $text-mute;
        color: $text-mute;
      }

      &-add {
        height: 20px;
        margin-top: 7px;
        border-radius: 40px;
        border: solid 1px;
        border-color: $text-mute;
        
        .el-button {
          display: flex;
          align-items: center;
          height: 20px;
          border-radius: 40px;
          border: transparent;
        }

        &-operation {
          @include flex-align(center, flex-end);
          margin-top: 16px;
        }
      }
    }
  }

  &-bottom {
    display: flex;

    &-rectangle {
      width: 3px;
      height: 14px;
      margin-right: 6px;
      margin-left: 5px;
      background: $brand-primary;
    }

    &-left {
      flex:0;
      margin-left: 10px;

      &-title {
        @include flex-align( center, flex-start);
        font-size: $font-sm;
      }

      &-preview {
        width: 400px;
        height: 400px;
        border: 1px solid $icon-default;

        &-img {
          width: 400px;
          height: 400px;
        }
      }
    }

    &-right {
      flex: 1;
      min-width: 0;
      margin-left: 20px;

      &-title {
        @include flex-align( center, flex-start);
        font-size: $font-sm;
      }
      
      &-metadata {
        .el-table ::v-deep thead tr th {
          padding: 6px 0;
          background: $bg-default;
        }
      }
    }
  }
}

.el-select {
  width: 360px;
}
/deep/ .el-dialog{
  height: auto;
}
</style>