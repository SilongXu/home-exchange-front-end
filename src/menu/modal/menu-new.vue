<template>
  <el-dialog 
    title="新建目录"
    :visible="visible"
    width="450px"
    @close="onClose">
    <el-form ref="validateForm" :model="validateForm" label-width="80px">
      <div class="menu-new-dialog-type">
        <el-form-item 
        label="目录类型"
        :rules="[
          { required : true ,message: '请选择目录类型', trigger: 'blur'},
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

      <div class="menu-new-dialog-select">
        <el-form-item 
        label="目录选择" 
        :rules="[
          { required : true ,message: '请选择目录', trigger: 'blur'},
        ]">
          <el-checkbox-group v-model="checkList">
            <div class="menu-new-dialog-select-choose" v-for="select in menuSelect.items" :key="select.itemCode">
              <el-checkbox :name="select.itemName" :label="select.itemCode" v-model="select.itemCode">
                <svg-icon icon="file" size="md"></svg-icon>
                {{select.itemName}}</el-checkbox>
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
      checkList: [
      ],
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
    itemChange(item) {
      this.currentItem=item;
      console.log(item.code);
    },
    onClose() {
      this.$emit('close', 'menuNew');
    }, 
    fetchMenuTypeData() {
      if (this.node) {
        apiService.getMetaField(this.node.id)
        .then((type) => {
          this.menuTypes = type.data;
        })
      }
    },
    fetchMenuSelectData(classValue) {
      if(this.node) {
        apiService.enumfield(classValue)
        .then((selects) => {
          console.log(selects.data);
          this.menuSelect = selects.data;
        }).catch(() => {

        })
      }
    },
    commitData() {
      const catalogId = this.node.id;
      const fieldCode = this.menuSelect.fieldCode;
      const currentClassItems = this.menuSelect.items;
      const metaEnumFieldDTO = new Object();
      metaEnumFieldDTO.fieldCode = fieldCode;
      metaEnumFieldDTO.items = currentClassItems.filter((item) => this.checkList.includes(item.itemCode));
      apiService.createMenuNode(catalogId, metaEnumFieldDTO)
      .then((commitData) => {
        console.log(commitData);
      })

      this.visible = false;
    },
  },
  mounted() {
    this.fetchMenuTypeData();
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.menu {
  &-new {
    &-dialog {
      &-type {
        display: flex;
        margin-bottom: 20px;
        &-choose {
          @include flex-align(flex-start, flex-start);
          width: 40vh;
        }
      }
      &-select {
        display: flex;
        margin-bottom: 20px;
        &-title {
          @include flex-align(flex-start, flex-start);
          margin-right: 40px;
        }
        &-choose {
          @include flex-align(flex-start, flex-start);
          background: $bg-default;
          width: 40vh;
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
  }
}
.el-checkbox-group {
  padding: 10px;
  background: $bg-default;
}

</style>