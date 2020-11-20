<template>
  <div class="import-new-batch">
    <div class="import-new-batch-form">
      <div class="import-new-batch-form-title">
        <div class="title-nav icon-btn" @click="navBack()">
          <svg-icon icon="collapser"></svg-icon>
        </div>
        <svg-icon class="title-icon" icon="import-manage" color="primary" size="xlg"></svg-icon>
        <span class="title-text">批量数据导入</span>
      </div>
      <div class="import-new-batch-form-productionNode">
        <el-tabs v-model="activeTabName" @tab-click="handelTabClick(tabsOptions)">
          <el-tab-pane v-for="tab in tabsOptions" :key="tab.itemCode" :label="tab.itemName" :name="tab.itemName">
            <div class="top">
              <span>写入路径</span>
              <div class="diskIdentify">
                <span>磁盘标识</span>
                <el-radio-group v-model="radioDiskIdentify">
                  <el-radio v-for="item in importNewBatchInfoList.path" :key="item.itemCode" :label="item.itemName" @change="radioChange(item)">
                    {{item.itemName}}
                  </el-radio>
                </el-radio-group>
              </div>

              <div class="folderName">
                <span>文件夹名称</span>
                <el-input v-model="folderName" @input="folderNameInput()"></el-input>  
              </div>

              <div class="importPath">
                <span>导入路径</span>
                <el-input v-model="importPath" readonly ></el-input>
              </div>
            </div>

            <div class="checkboxArea">
              <div class="checkbox">
                <span>卫星编号</span>
                <el-checkbox-group v-model="checkboxListSelectedSatellite">
                  <el-checkbox v-for="check in importNewBatchInfoList.satellite" :key="check.itemCode" :label="check.itemCode">
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="checkbox">
                <span>载荷标识</span>
                <el-checkbox-group v-model="checkboxListSelectedSensor">
                  <el-checkbox v-for="check in importNewBatchInfoList.sensor" :key="check.itemCode" :label="check.itemCode">
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="checkbox">
                <span>产品级别</span>
                <el-checkbox-group v-model="checkboxListSelectedProductLevel">
                  <el-checkbox v-for="check in importNewBatchInfoList.productLevel" :key="check.itemCode" :label="check.itemCode">
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="import-new-batch-footer">
      <div class="import-new-batch-footer-content">
        <el-button plain @click="navBack()">
          取消
        </el-button>
        <el-button type="primary" @click="importDataBatch()">
          确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from './import.service';

export default {
  name: 'importNewBatch',
  data() {
    return {
      folderName: '',
      tabsOptions: [],
      radioDiskIdentify: '',
      importNewBatchInfoList: '',
      importPathFronted: '',
      importPath: '',
      checkboxListSelectedSatellite: [],
      checkboxListSelectedSensor: [],
      checkboxListSelectedProductLevel: [],
      activeTabName: '测绘地理',
    };
  },
  methods: {
    navBack(){
      this.$router.push('/import');
    },
    handelTabClick(tab){
      this.folderName='';
      this.radioDiskIdentify='';
      this.importPath= '';
      this.importPathFronted='';
      this.checkboxListSelectedSatellite=[];
      this.checkboxListSelectedSensor=[];
      this.checkboxListSelectedProductLevel=[];
      const tabSelected = tab.filter((target) => {
        return this.activeTabName == target.itemName;
      })
      apiService.getImportBatchInfoList(tabSelected.itemCode)
      .then((target) => {
        this.importNewBatchInfoList=target.data;
      })
    },
    radioChange(item){
      this.importPathFronted = item.itemCode;
      this.importPath = this.importPathFronted+'/'+this.folderName;
    },
    folderNameInput(){
      this.importPath = this.importPathFronted+'/'+this.folderName;
    },
    importDataBatch(){
      if(this.radioDiskIdentify != '' && this.folderName !=''){
        apiService.importDataBatch(this.importPath, this.checkboxListSelectedProductLevel, this.checkboxListSelectedSatellite, this.checkboxListSelectedSensor)
        .then((data) => {
          if(data.data.result == "true"){
            this.$message({
              type: 'success',
              message: '导入成功'
            });
          }else if(data.data.result == "false"){
            this.$message(data.data.rejectReason);
          }
        }).catch(() => {
        })
      }else{
        this.$message("请填写必选内容");
      }

    }
  },
  mounted(){
    apiService.getImportBatchNodeList()
    .then((nodes) => {
      this.tabsOptions = nodes.data;
      apiService.getImportBatchInfoList(this.tabsOptions[0].itemCode)
      .then((target) => {
        this.importNewBatchInfoList = target.data;
      }).catch(() => {
      });
    }).catch(() =>{});
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.import-new-batch{
  @include flex-align(flex-start, center);
  position: relative;
  flex: 1;
  overflow: auto;
  &-form{ 
    width: 100%;
    max-width: 1200px;
    margin: 0 32px;
    padding: 20px 20px 100px 20px;
    background: $bg-light;
    &-title{
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

    &-productionNode{
      .top{
        border-bottom: 1px solid $border-dark;
        
        .diskIdentify{
          padding: 5px 10px;
          .el-radio-group{
            padding-left: 103px;
          }
        }

        .folderName{
          display: flex;
          padding: 5px 10px;
        }

        .importPath{
          display: flex;
          padding: 5px 10px;
        }
        .el-input{
          padding-left: 70px;
          width: 57%;
          ::v-deep .el-input__inner{
            background: $bg-default;
          }
        }
      }

      .checkboxArea{
        .checkbox{
          display: flex;
          padding: 5px 0px;
        }
        span{ 
          // justify-content: ;
          padding: 10px;  
        }
      }
      .el-checkbox-group{ 
        padding-left: 60px;
        z-index: 0;
        .el-checkbox{
          padding: 10px 0px;
        }
      }
      span{
        width: 100px;
        flex-shrink: 0;
      }
    }
  }

  &-footer{
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

</style>