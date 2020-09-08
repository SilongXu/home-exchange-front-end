<template>
  <div class="userAuthorityManage-tab-authorityManage">
    <div class="userAuthorityManage-tab-authorityManage-left">
      <el-tree
        :data="authorities"
        :props="defaultProps"
        accordion>
      </el-tree>
    </div>


    <div class="userAuthorityManage-tab-authorityManage-right">
      <p> 1 </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userAuthorityNew',
  data() {
    return {
      authorities: [
        {
          label: 'level1',
          children: [
            {
              label: 'level1-1',
              children: [
                {
                  label: '1-1-1',
                },
                {
                  label: '1-1-2'
                },
                {
                  label: '1-1-3',
                }
              ]
            },
            {
              label: 'level1-2',
              children: [
                {
                  label: '1-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'level2',
          children: [
            {
              label: 'level2-1',
              children: [
                {
                  label: 'level2-1-1',
                }
              ]
            },
            {
              label: 'level-2-2',
              children: [
                {
                  label: 'level2-2-1'
                },
                {
                  label: 'level2-2-2',
                }
              ]
            }
          ]
        }
        
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.userAuthorityManage {
  &-tab {
    &-authorityManage {
      display: flex;
      height: 60vh;
      &-left {
        flex: 0;
        border-right: solid 1px $border-default;
        padding-right: 15px;
        .el-tree {
          width: 280px;
        }
      }
      &-right {
        flex: 1;
      }
    }
  }
}
</style>