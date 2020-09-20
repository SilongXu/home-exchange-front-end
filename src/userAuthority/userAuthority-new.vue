<template>
<div class="outside">
  <div class="new">
    <div class="new-top">
      <div class="new-top-title">
        <div @click="navBack()">
          <svg-icon icon="angle-left" size="sm" class="new-top-title-back"></svg-icon>
        </div>
        <svg-icon icon="user-add" class="new-top-title-add"></svg-icon>
        添加用户
      </div>
      <div class="new-top-inform">
        通知方式:
        <el-radio v-model="inform" label="1">邮箱</el-radio>
        <el-radio v-model="inform" label="2">手机</el-radio>
        <el-radio v-model="inform" label="3">创建账号</el-radio>
      </div>

      <el-form ref="userCreateInfo" :model="userCreateInfo" label-width="90px">
        <el-form-item label="邮箱"
          prop= "email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
          v-if="this.inform==1">
            <el-input 
              v-model="userCreateInfo.email"
              placeholder="可以同时添加多个账户，请以分号隔开"
              @change="update()">
            </el-input>
        </el-form-item>

        <el-form-item label="手机"
          prop= "phoneNumber"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur'},
            { type: 'number', message: '请输入正确手机号' },
          ]"
          v-else-if="this.inform==2">
          <el-input v-model="userCreateInfo.phoneNumber"
            placeholder="请输入手机号">
          </el-input>
        </el-form-item>

        <el-form-item label="账号"
          prop= "createCount"
          :rules="[
            { required : true, message: '请输入想创建的账号名', trigger: 'blur'},
          ]"
          v-else-if="this.inform==3">
          <el-input v-model="userCreateInfo.createCount" 
            placeholder="请输入您想创建的账号">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="new-middle">
      <div class="new-middle-title">
        权限设置
      </div>
      <div class="new-middle-content">
        <div class="new-middle-content-left">
          <div class="new-middle-content-left-title">
            {{"角色" + "(" + this.checkListOptions.length + ")"}}
          </div>
          <div class="new-middle-content-left-content">
            <el-checkbox-group v-model="checkListOptions">
              <div v-for="option in this.options" :key="option.name">
                <el-checkbox :label="option.label">
                  {{option.name}}
                  <div class="checkBox">
                    {{option.desc}}
                  </div>
                </el-checkbox>
              </div>
            </el-checkbox-group>

          </div>
        </div>
        <div class="new-middle-content-right">
          <div class="new-middle-content-right-title">
            {{"组" + "(" + this.checkListGroups.length + ")"}}
          </div>
          <div class="new-middle-content-right-content">
            <el-checkbox-group v-model="checkListGroups">
              <div v-for="group in this.groups" :key="group.name">
                <el-checkbox :label="group.label">
                  {{group.name}}
                  <div class="checkBox">
                    {{group.desc}}
                  </div>
                </el-checkbox>
              </div>
            </el-checkbox-group>
            
          </div>
        </div>
      </div>
    </div>

    <div class="new-bottom">
      <div class="new-bottom-title">
        {{"权限" + "(" + Number(this.checkListMission.length + this.checkListData.length + this.checkListProgramme.length) +")"}}
      </div>
      <div class="new-bottom-mission">
        <div class="new-bottom-mission-title">
          <svg-icon icon="connection"></svg-icon>
          任务流
        </div>
        <div class="new-bottom-mission-options">
          <el-checkbox-group v-model="checkListMission">
            <div v-for="mission in this.missionAuthority" :key="mission.name">
              <el-checkbox :label="mission.label">
                {{mission.name}}
              </el-checkbox>
            </div>
          </el-checkbox-group> 
        </div>
      </div>
      <div class="new-bottom-data">
        <div class="new-bottom-data-title">
          <svg-icon icon="transfer"></svg-icon>
          数据流转
        </div>
        <div class="new-bottom-data-options">
          <el-checkbox-group v-model="checkListData">
            <div v-for="data in this.dataAuthority" :key="data.name">
              <el-checkbox :label="data.label">
                {{data.name}}
              </el-checkbox>
            </div>
          </el-checkbox-group> 
        </div>
      </div>
      <div class="new-bottom-programme">
        <div class="new-bottom-programme-title">
          <svg-icon icon="script"></svg-icon>
          程序脚本
        </div>
        <div class="new-bottom-programme-options">
          <el-checkbox-group v-model="checkListProgramme">
            <div v-for="programme in this.programmeAuthority" :key="programme.name">
              <el-checkbox :label="programme.label">
                {{programme.name}}
              </el-checkbox>
            </div>
          </el-checkbox-group> 

        </div>

      </div>
    </div>
  </div>
  <div class="commit">
    <div class="commit-button">
      <el-button type="" @click="navBack()">取消</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "userAuthorityNew",
  data() {
    return {
      inform: '1',
      roleSelected: '',
      groupSelected: '',
      checkListOptions: [],
      checkListGroups: [],
      checkListMission: [],
      checkListData: [],
      checkListProgramme: [],

      userCreateInfo: {
        email: '',
        phoneNumber: '',
        createCount: '',
      },

      options: [
        {
          name: 'option1',
          label: 'option1',
          desc: 'This is the first option, which means the property includes option 1',
        },
        {
          name: 'option2',
          label: 'option2',
          desc: 'This is the second option, which means the property includes option 2',
        },
        {
          name: 'option3',
          label: 'option3',
          desc: 'This is the third option, which means the property includes option 3',
        },
        {
          name: 'option4',
          label: 'option4',
          desc: 'This is the forth option, which means the property includes option 4',
        },
        {
          name: 'option5',
          label: 'option5',
          desc: 'This is the fifth option',
        },
      ],
      groups: [
        {
          name: 'group1',
          label: 'grop1',
          desc: 'This is the option group 1,choose this option to set the authority gorup1 to the user',
        },
        {
          name: 'group2',
          label: 'group2',
          desc: 'This is the option group 1,choose this option to set the authority gorup1 to the user',
        },
        {
          name: 'group3',
          label: 'group3',
          desc: 'This is the option group 1,choose this option to set the authority gorup1 to the user',
        }
      ],
      missionAuthority:[
        {
          name: '新建',
          label: 'create',
        },
        {
          name: '删除',
          label: 'delete',
        },
        {
          name: '重命名',
          label: 'rename',
        },
        {
          name: '保存',
          label: 'save',
        },
        {
          name: '调试',
          label: 'test',
        },
        {
          name: '发布',
          label: 'publish',
        },
        {
          name: '运行',
          label: 'run',
        },
      ],
      dataAuthority: [
        {
          name: '新建',
          label: 'create',
        },
        {
          name: '删除',
          label: 'delete',
        },
        {
          name: '重命名',
          label: 'rename',
        },
        {
          name: '保存',
          label: 'save',
        },
        {
          name: '调试',
          label: 'test',
        },
        {
          name: '发布',
          label: 'publish',
        },
        {
          name: '运行',
          label: 'run',
        },
      ],
      programmeAuthority: [
        {
          name: '新建',
          label: 'create',
        },
        {
          name: '删除',
          label: 'delete',
        },
        {
          name: '重命名',
          label: 'rename',
        },
        {
          name: '保存',
          label: 'save',
        },
        {
          name: '调试',
          label: 'test',
        },
        {
          name: '发布',
          label: 'publish',
        },
        {
          name: '运行',
          label: 'run',
        },
      ],
    }
  },
  methods: {
    navBack() {
      this.$router.push('/userAuthority');
    },
    update() {
      
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';
.new{
  overflow-y: auto;
  background: $bg-light;
  margin-left: 20%;
  margin-bottom: 90px;
  padding: 20px;
  width: 60%;

  &-top{
    border-bottom: 1px solid $border-dark;
    padding-bottom: 20px;

    &-title{
      @include flex-align(center, flex-start);
      margin-bottom: 20px;
      &-back{
        margin-right: 15px;
        cursor: pointer;
        &:hover{
          fill: $brand-primary;
        }
      }
      &-add{
        fill: $brand-primary;
        margin-bottom: -2px;
        margin-right: 5px;
      }
    }

    &-inform{
      margin-bottom: 20px;
      .el-radio{
        margin-left: 20px;
      }
    }

    /deep/ .el-form-item{
      margin-bottom: 5px;
    }

    /deep/ .el-form-item__label{
      margin-left: -35px;
      font-size: 16px;
    }

  }

  &-middle{
    &-title{
      width: 100%;
      @include flex-align(center, flex-start);
      margin: 15px 0px 15px;
    }

    &-content{
      display: flex;
      border-bottom: 1px solid $border-dark;
      border-top: 1px solid $border-dark;
      
      &-left{ 
        border-right: 1px solid $border-dark;
        width: 50%;
        height: 100%;

        &-title{
          background: $bg-default;
          padding: 10px 10px 10px;
        }

        &-content{
          padding: 15px 10px 15px;

          /deep/ .el-checkbox__input{
            top:-17px; 
          }  

          .checkBox{
            display: grid;
            white-space: pre-line;
            height: auto;
            width: 100%;
            font-size: 12px;
            color: $text-mute;
          }

          .el-checkbox-group{
            .el-checkbox{
            }
          }
        }
      }

      &-right{
        width: 50%;
        height: 100%;

        &-title{
          background: $bg-default;
          padding: 10px 10px 10px;
        }
        &-content{
          padding: 15px 10px 15px;

          /deep/ .el-checkbox__input{
            top:-17px; 
          }

          .checkBox{
            display: grid;
            white-space: pre-line;
            color: $text-mute;
            font-size: 12px;
            height: auto;
            width: 100%
          }

          .el-checkbox-group{
            .el-checkbox{
            }
          }
        }
      }
    }
  }
  &-bottom{
    &-title{
      background: $bg-default;
      padding: 10px 10px 10px;
    }

    &-mission{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
      padding: 10px 10px 10px;
      height: auto;

      &-title{
        width: 120px;
        margin-right: 80px;
      }

      &-options{
        @include flex-align(center, center);
        width: 100%;

        .el-checkbox-group{
          display: flex;
          flex-wrap: wrap;

          .el-checkbox{
            margin: 5px 40px 0px 0px;
          }
        }
      }
    }

    &-data{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
      padding: 10px 10px 10px;
      height: auto;

      &-title{
        width: 120px;
        margin-right: 80px;
      }

      &-options{
        @include flex-align(center, center);
        width: 100%;
        .el-checkbox-group{
          display: flex;
          flex-wrap: wrap;
          
          .el-checkbox{
            margin: 5px 40px 0px 0px;
          }
        }
      }
    }

    &-programme{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
      padding: 10px 10px 10px;
      height: auto;

      &-title{
        width: 120px;
        margin-right: 80px;
      }

      &-options{
        @include flex-align(center, center);
        width: 100%;

        .el-checkbox-group{
          display: flex;
          flex-wrap: wrap;
          
          .el-checkbox{
            margin: 5px 40px 0px 0px;
          }
        }
      }
    }
    .svg-icon{
      fill: $brand-primary;
    }
  }
}



.outside{
  overflow: auto;
  .commit{
    width: 100%;
    height: 50px;
    background: $bg-light;
    position: absolute;
    bottom: 40px;
    z-index: 1;
    &-button{
      position:absolute;
      right: 18%;
      margin-top: 11px;
      /deep/ .el-button{
        padding: 6px 20px;
        font-size: 10px;
     }
    }

  }
}
</style>