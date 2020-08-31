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
    <el-dialog :title="currentEntry.name" :visible.sync="dialogVisible" width="88%" top="4%">
      <div class="dialog">
        <div class="dialog-top">
          <div class="dialog-top-topside">
            <div class="dialog-top-topside-title">
              <svg-icon icon="file" size="32px"></svg-icon>
              <span :title="currentEntry.name">{{currentEntry.name}}</span>
            </div>
            <div class="dialog-top-topside-download">
              <div class="link-btn">
                <svg-icon icon="download"></svg-icon>
                下载
              </div>
            </div>
          </div>

          <div class="dialog-top-info">
            <div class="dialog-top-info-property" :size="currentEntry.size">文件大小:{{currentEntry.size}}</div>
            <div class="dialog-top-info-property" :title="currentEntry.importTime">入库时间:{{currentEntry.importTime}}</div>
          </div>
          <div class="dialog-top-tags">
            <div class="dialog-top-tags-property" v-for="tag in currentEntry.tags" :key="tag.id">
              {{tag.name}}
            </div>
            <div class="dialog-top-tags-add">
              <el-button size="small" @click="addNewTag()">
                <svg-icon icon="plus" size="sm"></svg-icon>
              </el-button>
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
              <img src="" alt="图像预览图">
            </div>
          </div>
          <div class="dialog-bottom-right">
            <div class="dialog-bottom-right-title">
              <div class="dialog-bottom-rectangle"></div>
              <p>元数据</p>
            </div>
            <div class="dialog-bottom-right-metadata">
              <el-table
                :data="metaData"                
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  prop="name"
                  label="元数据名称"
                  min-width="300">
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="说明"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="数据类型"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="annex"
                  label="值域/备注"
                  min-width="180">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>  
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
          <div class="link-btn" @click="viewDetail(entry)">
            <svg-icon icon="view-detail" ></svg-icon>
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
      dialogVisible: false,
      pagination: {
        page: 1,
        total: 400,
      },
      searchResult: [],

      metaData: [
        {
          id: 1,
          name:'一级节点',
          desc:'升降轨',
          type:'String',
          annex:'TH03-01',
        }, 
        {
          id: 2,
          name:'一级节点',
          desc:'升降轨',
          type:'String',
          annex:'TH03-02',
        }, 
        {
          id: 3,
          name:'一级节点',
          desc: '升降轨',
          type:'String',
          annex:'TH03-03',
          children: [
            {
              id: 31,
              name:'二级节点',
              desc:'升降轨',
              type:'String',
              annex:'TH03--031',
            }, 
            {
              id: 32,
              name:'二级节点',
              desc:'升降轨',
              type:'String',
              annex:'TH03--032',
              children:[
                {
                  id:321,
                  name:'三级节点',
                  desc:'升降轨',
                  type:'String',
                  annex:'TH03-033',
                }
              ],
            },
          ],
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
      currentEntry: {},
    };
  },
  methods: {
    viewDetail(entry) {
      this.currentEntry = entry;
      this.dialogVisible = true;
    },
    addTag() {
      this.tagForm.tags = [];
      this.tagDialogVisible = true;
    },

    onSizeChange() {

    },
    onPageChange() {

    },
    addNewTag(){

    },
    confirmTag() {
      
    },
    fetchResult() {
      this.searchResult = [
        {
          id: 1,
          name: 'JB20-01_SXZ_20200725_00000005_001_003_L2_001.C1.TIF',
          path: '气象水文/云图',
          type: '类型A',
          size: '657 MB',
          node: '节点A',
          system: '分系统A',
          importTime: '2020/08/18 12:43:21',

          tags:[
            {
              id:'1',
              name:'tag=001'
            },
            {
              id:'2',
              name:'tag-002'
            },
            {
              id:'3',
              name:'tag-003',
            }
          ]
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
          tags:[
            {
              id:'1',
              name:'tag=001',
            },
            {
              id:'2',
              name:'tag-002',
            },
            {
              id:'3',
              name:'tag-003',
            }
          ]
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
          tags:[
            {
              id:'1',
              name:'tag=001',
            },
            {
              id:'2',
              name:'tag-002'
            },
            {
              id:'3',
              name:'tag-003',
            }
          ]
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
          tags:[
            {
              id:'1',
              name:'tag=001',
            },
            {
              id:'2',
              name:'tag-002',
            },
            {
              id:'3',
              name:'tag-003',
            }
          ]
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
          tags:[
            {
              id:'1',
              name:'tag=001'
            },
            {
              id:'2',
              name:'tag-002',
            },
            {
              id:'3',
              name:'tag-003',
            }
          ]
        },
      ];
    },
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
        @include text-ellipsis()
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

.dialog {
  height: 75vh;
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
          cursor: pointer;
          color: $brand-primary;

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
        margin-top: 7px;  
        margin-right: 10px;
        padding-left: 10px;
        padding-right: 10px;
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
        .el-button{
          display: flex;
          align-items: center;
          height: 20px;
          border-radius: 40px;
          border: transparent;
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
</style>