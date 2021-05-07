<template>
  <div class="layout-foot">
    <div class="listTitle">
      <h4>Developer:</h4>
    </div>
    <div class="listName">
      <p v-for="item in developper" :key="item.name">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-foot',
  data:() => {
    return{

      developper: [
        {
          name: "Silong Xu",
        },
        {
          name: "Charles Lefever",
        },
        {
          name: "Yunpeng Huan",
        },
        {
          name: "Arthur Lorphelin",
        }
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
.layout-foot {
  @include flex-align(flex-start, flex-start);
  height: 200px;
  width: 100%;
  background: white;
  margin: 0;
}
</style>