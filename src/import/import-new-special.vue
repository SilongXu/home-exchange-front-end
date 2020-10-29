<template>
  <div class="import-new" >
    <div class="import-new-form">
      <div class="import-new-form-title">
        <div class="title-nav icon-btn" @click="navBack()">
          <svg-icon icon="collapser"></svg-icon>
        </div>
        <svg-icon class="title-icon" icon="import-manage" color="primary" size="xlg"></svg-icon>
        <span class="title-text">网络数据导入</span>
      </div>
      <el-form ref="dir" :model="dir" label-position="left" label-width="120px" size="small">

        <el-form-item label="业务数据类型" :required="true">
            <el-select v-model="value" placeholder="请选择" @change="setformDataType()">
              <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name" 
              :value="item.updateDataType">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="业务数据" :required="true">
          <el-upload
            action=""
            :auto-upload="false"
            :on-change="onFileChange"
            :on-remove="onFileChange"
            multiple>
            <el-button plain size="small" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="目标目录">
          <div class="directory">
            <div class="directory-selected">
              {{dir.dirBasePath}}
            </div>
            <div class="directory-selector">
              <el-tree
                :props="treeProps"
                :load="loadNode"
                lazy
                icon-class="el-icon-arrow-right"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent"
                @node-click="onNodeClick">
              </el-tree>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="descInfo" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="import-new-footer">
      <div class="import-new-footer-content">
        <el-button plain @click="navBack()">
          取消
        </el-button>
        <el-button type="primary" @click="importIntData">
          确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from './import.service';
import debounce from "lodash-es/debounce";

export default {
  name: 'ImportNewSpecial',
  data() {
    return {
      options: [],
      value: '',
      descInfo: '',
      dir: {
        dir: [],
        dirBasePath: '',
        updateDataType: '',
      },
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      count: 1,
    }
  },
  methods: {
    importIntData(){
      const formData = new FormData();
      this.dir.dir.forEach(file => {
        formData.append('dir', file.raw);
      })
      formData.append('dirBasePath', this.dir.dirBasePath);
      formData.append('updateDataType', this.dir.updateDataType);
      apiService.importIntData(formData)
      .then((data) => {
        if(data.data.result == "false"){
          this.$message(data.data.rejectReason);
        }else if(data.data.result == "true"){
          this.$message({
            message: '导入成功',
            type: 'success'
          });
          this.navBack();
        }       
      }).catch(() =>{
      });
    },

    setformDataType(){
      this.dir.updateDataType = this.value;
    },
    navBack() {
      this.$router.push('/import');
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }]);
      }
      if (node.level > 2) return resolve([]);
      const hasChild = true;
      setTimeout(() => {
        const data = [];
        if (hasChild) {
          for (let i = 0; i < 5; i++) {
            data.push({
              name: 'zone' + this.count++,
            });
          }
        }

        resolve(data);
      }, 500);
    },
    renderContent(h, { node }) {
      return (
        <span class="directory-node">
          {
            (() => {
              return node.expanded ? <svg-icon icon="folder-open"></svg-icon> : <svg-icon icon="folder-close"></svg-icon>;
            })() 
          }
          <span domPropsTitle={node.label}>{node.label}</span>
        </span>);
    },
    onNodeClick(data, node) {
      const nameStack = [];
      let currentNode = node;
      while(currentNode && currentNode.data) {
        nameStack.unshift(currentNode.data.name);
        currentNode = currentNode.parent;
      }
    },
    onFileChange(file, fileList) {
      apiService.getImportPath()
      .then((path) => {
        this.dir.dirBasePath = path.data;
        this.dir.dir = fileList;
      }).catch(() => {
      });
      
    }
  },
  mounted() {
    apiService.getUpdateDataType()
    .then((options) => {
      this.options = options.data;
    }).catch(() => {
    });
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.import-new {
  @include flex-align(flex-start, center);
  position: relative;
  flex: 1;
  overflow: auto;

  &-form {
    width: 100%;
    max-width: 1200px;
    margin: 0 32px;
    padding: 20px 20px 100px 20px;
    background: $bg-light;

    &-title {
      @include flex-align(center, flex-start);
      margin-bottom: 20px;

      .title-nav {

        .svg-icon {
          transform: rotate(180deg);
          margin-right: 16px;
          cursor: pointer;
        }
      }

      .title-icon {
        margin-right: 8px;
      }

      .title-text {
        font-size: $font-xlg;
      }
    }

    .el-form {
      max-width: 700px;
    }

    .el-select {
      width: 100%;
    }

    .directory {
      width: 100%;

      &-selected {
        margin-bottom: 16px;
      }

      &-selector {
        width: 100%;
        height: 500px;
        border-radius: 4px;
        background: $bg-default;
        overflow: auto;

        .el-tree {
          background: transparent;
        }
      }
    }
  }

  &-footer {
    @include flex-xy-center;
    position: fixed;
    bottom: 40px;
    left: 0;
    height: 72px;
    width: 100%;
    background: $bg-light;
    box-shadow: rgba(0, 0, 0, 0.298) 0px -10px 18px;

    &-content {
      @include flex-align(center, flex-end);
      width: 100%;
      max-width: 1200px;
      padding: 0 20px;
    }
  }
}

.el-tree ::v-deep .directory-node {
  @include flex-align(center, flex-start);
  padding-right: 4px;
  font-size: $font-md;
  overflow: hidden;
}
.el-tree ::v-deep .directory-node .svg-icon {
  flex-shrink: 0;
  margin-right: 8px;
}
.el-tree ::v-deep .directory-node span {
  @include text-ellipsis;
}
.el-tree ::v-deep .el-tree-node:focus:not(.is-current) > .el-tree-node__content {
  background: transparent;
}
.el-tree ::v-deep .el-tree-node > .el-tree-node__content {
  border-left: 2px solid transparent;
}
.el-tree ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  background: $bg-hover;
  border-left: 2px solid $brand-primary;
}
</style>