<template>
  <div class="profile">
    <div class="profile-layoutHeader">
      <layout-header></layout-header>
    </div>

    <div class="profile-content">
      <div class="profile-content-left">

      </div>
      <div class="profile--content-right">

      </div>
    </div>

    <div class="profile-layoutFoot">
      <layout-foot></layout-foot>
    </div>
  </div>
</template>

<script>
import LayoutFoot from "../../components/layout/layout-foot.vue";
import layoutHeader from "../../components/layout/layout-header.vue";

export default {
  name: "profile",
  components: {
    layoutHeader,
    LayoutFoot,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.profile{
  &-content{
    display: flex;
    width: 100%;
    height: 100%;
    background: blue;
    &-left{
      width: 20%;
      height: 100%;
    }
    &-right{
      width: 80%;
      height: 100%;
    }
  }
}
</style>