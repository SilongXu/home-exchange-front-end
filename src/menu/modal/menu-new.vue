<template>
  <el-dialog 
    title="新建目录"
    :visible="visible"
    width="650px"
    @close="onClose">
    <el-form ref="validateForm" :model="validateForm" label-width="80px">
      <div class="menu-new-dialog-type">
        <el-form-item 
          label="目录类型"
          :rules="[
            { required : true, message: '请选择目录类型', trigger: 'blur'},
          ]">
          <div class="menu-new-dialog-type-choose">
            <el-select v-model="classValue" placeholder="请选择" @change="fetchMenuSelectData(classValue)">
              <el-option
                v-for="type in menuTypes"
                :key="type.code"
                :label="type.name"
                :value="type.code">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </div>

      <div class="menu-new-dialog-all" v-if="this.menuSelect.length != 0">
        <el-checkbox 
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="checkAllChange()">
          全选
        </el-checkbox>
      </div>

      <div class="menu-new-dialog-select">
        <el-form-item 
          label="目录选择" 
          :rules="[
            { required : true ,message: '请选择目录', trigger: 'blur'},
          ]">
          <div class="menu-new-dialog-select-content" v-if="!menuSelect['items'] || (menuSelect['items'].length === 0)">请先选择目录类型</div>
          <el-checkbox-group v-model="checkList" class="menu-new-dialog-select-content" @change="checkMenuChange()">
            <div class="menu-new-dialog-select-choose" v-for="select in menuSelect['items']" :key="select.itemCode">
              <el-checkbox :name="select.itemName" :label="select.itemCode" v-model="select.itemCode">
                <svg-icon icon="file" size="md"></svg-icon>
                {{select.itemName}}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="menu-new-dialog-button">
        <el-form-item>
          <el-button @click="onClose()">取消</el-button>
          <el-button type="primary" @click="commitData()">确定</el-button>
        </el-form-item>
      </div>
    </el-form>   
  </el-dialog>
</template>

<script>
import apiService from '../menu.service';

export default {
  name: 'menuNew',
  props: ['visible','node'],
  data() {
    return {  
      isIndeterminate: false,
      checkAll: true,
      checkList: [],
      validateForm: {
        typeItem: '',
      } ,   
      classValue: '',
      currentItem: '',
      menuTypes: {
      },
      menuSelect: [],
    }
  },
  methods:{
    checkMenuChange() {
      let checkedCount = this.checkList.length;
      this.checkAll = checkedCount ===this.menuSelect.items.length;
      this.isIndeterminate = checkedCount>0 && checkedCount <this.menuSelect.items.length;
    },

    checkAllChange() {
      if(this.checkList.length == this.menuSelect.items.length){
        this.checkList=[];
        this.isIndeterminate=false;
        this.checkAll=false;
      }else if(this.checkList.length < this.menuSelect.items.length){
        this.checkList=[];
        this.menuSelect.items.forEach(item => {
          this.checkList.push(item.itemCode);
          this.checkAll=true;
          this.isIndeterminate=false;
        });
      }
    },

    itemChange(item) {
      this.currentItem = item;
    },
    onClose(flag) {
      this.$emit('close', !!flag);
    }, 
    fetchMenuTypeData() {
      if (this.node) {
        apiService.getMetaField(this.node.id)
        .then((type) => {
          this.menuTypes = type.data;
        });
      }
    },
    fetchMenuSelectData(classValue) {
      this.menuSelect = [];
      this.checkList = [];
      this.isIndeterminate=false;
      this.checkAll=true;
      if(this.node) {
        apiService.enumfield(classValue, this.node.id)
        .then((selects) => {
          this.menuSelect = selects.data;
          this.menuSelect.items.forEach(item => {
            this.checkList.push(item.itemCode);
          });
        }).catch(() => {});
      }
    },
    commitData() {
      const catalogId = this.node.id;
      const fieldCode = this.menuSelect.fieldCode;
      const nodeCode = this.node.nodeCode ? this.node.nodeCode : 'ALL';
      const metaEnumFieldDTO = {
        fieldCode,
        items: this.menuSelect.items.filter((item) => this.checkList.includes(item.itemCode)),
      };

      apiService.createMenuNode(catalogId, metaEnumFieldDTO, nodeCode)
      .then((commitData) => {
        this.onClose(true);
        this.$message({
          type: 'success',
          message: '新增目录成功!'
        });
      })
      .catch(() => {
        this.$message.error('新增目录错误');
      });
    },
  },
  mounted() {
    this.fetchMenuTypeData();
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu-new-dialog {
  &-all{
    @include flex-align(center, flex-start);
    position: relative;
    top: -20px;
    left: 80px;
  }
  &-type {
    display: flex;
    margin-bottom: 20px;

    &-choose {
      @include flex-align(flex-start, flex-start);
      width: 500px;

      .el-select {
        width: 100%;
      }
    }
  }
  &-select {
    display: flex;
    margin-bottom: 20px;

    &-title {
      @include flex-align(flex-start, flex-start);
      margin-right: 40px;
    }
    &-content {
      @include flex-xy-center;
      flex-direction: column;
      min-height: 50px;
      width: 480px;
      background: $bg-default;
      padding: 10px;
    }
    &-choose {
      @include flex-align(center, flex-start);
      width: 100%;
      height: 40px;

      &-checkbox {
        font-size: 16px;
      }
    }
  }
  &-button {
    @include flex-align(center, center);
  }
}

.el-checkbox {
  @include flex-xy-center;
}

.el-checkbox ::v-deep .el-checkbox__label {
  @include flex-xy-center;

  .svg-icon {
    margin-right: 4px;
  }
}
</style>