<template>
<div class="outside">
  <div class="new">
    <div class="new-top">
      <div class="new-top-title">
        <svg-icon icon="user-add"></svg-icon>
        添加用户
      </div>
      <div class="new-top-inform">
        通知方式
        <el-radio v-model="inform" label="1">邮箱</el-radio>
        <el-radio v-model="inform" label="2">手机</el-radio>
        <el-radio v-model="inform" label="3">创建账号</el-radio>
      </div>
      <div class="new-top-email">
        <div class="new-top-email-title">
          邮箱
        </div>
        <el-input v-model="email" placeholder="可以同时添加多个账户，请以分号隔开"></el-input>
      </div>
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
        {{"权限" + "()"}}
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
    <el-button type="">取消</el-button>
    <el-button type="primary">确认</el-button>

  </div>

</div>
</template>

<script>
export default {
  name: "userAuthorityNew",
  data() {
    return {
      inform: '1',
      email: '',
      roleSelected: '',
      groupSelected: '',
      checkListOptions: [],
      checkListGroups: [],
      checkListMission: [],
      checkListData: [],
      checkListProgramme: [],
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
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';
.new{
  overflow-y: auto;
  background: $bg-light;
  width: 60%;
  margin-left: 20%;
  padding: 20px;
  margin-bottom: 90px;

  &-top{
    border-bottom: 1px solid $border-dark;
    padding-bottom: 20px;

    &-title{
    }

    &-inform{
    }

    &-email{
      @include flex-align(center, flex-start);

      &-title{
        width: 60px;
      }

      .el-input{
        margin-left: 10px;
      }
    }
  }

  &-middle{
    &-title{
      width: 100%;
      @include flex-align(center, flex-start);
    }

    &-content{
      display: flex;
      border-top: 1px solid $border-dark;
      border-bottom: 1px solid $border-dark;
      
      &-left{ 
        width: 50%;
        height: 100%;
        border-right: 1px solid $border-dark;

        &-title{
          background: $bg-default;
        }

        &-content{
          /deep/ .el-checkbox__input{
            top:-17px; 
          }  

          .checkBox{
            font-size: 12px;
            color: $text-mute;
            display: grid;
            height: auto;
            width: 350px;
            white-space: pre-line;
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
        }
        &-content{
          /deep/ .el-checkbox__input{
            top:-17px; 
          }

          .checkBox{
            display: grid;
            white-space: pre-line;
            font-size: 12px;
            color: $text-mute;
            height: auto;
            width: 350px;
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
    }

    &-mission{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
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
            margin-top: 5px;
            margin-right: 40px;
          }
        }
      }
    }

    &-data{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
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
            margin-top: 5px;
            margin-right: 40px;
          }
        }
      }
    }

    &-programme{
      @include flex-align(center, flex-start);
      border-bottom: 1px solid $border-dark;
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
            margin-top: 5px;
            margin-right: 40px;
          }
        }
      }
    }
  }

}

.svg-icon{
  fill: $brand-primary;
}
.outside{
  overflow: auto;
  .commit{
    width: 100%;
    height: 50px;
    background: $bg-light;
    position: absolute;
    bottom: 40px;
    .el-button{
      padding: -5px;
    }
  }
}
</style>