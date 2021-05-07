<template>
  <div class="welcome">
    <div class="welcome-housePreview">
      <div class="carouselContent">
        <el-carousel  height="100vh">
          <el-carousel-item v-for="item in carouselItems" :key="item.id">
            <img :src="item.src" :alt="item.alt" class="carouselImg">
          </el-carousel-item>
        </el-carousel>
      </div>



    </div>
        <layout-header></layout-header>

    <div class="welcome-houseDetail">

    </div>
    <div class="layout-foot">
      <layout-foot></layout-foot>
    </div>
  </div>
</template>
<script>
import layoutFoot from "../../components/layout/layout-foot.vue";
import LayoutHeader from "../../components/layout/layout-header.vue";

export default {
  name: "welcome",
  components: {
    "layout-foot": layoutFoot,
    "layout-header": LayoutHeader,
  },
  data() {
    return {
      carouselItems: [
        {
          id: 1,
          src: require("../../assets/carouselPicture1.png"),
          alt: "carouselPicture1",
          title: "carouselPicture1",
          desc: "This is the desc of the carouselPicture1",
        },
        {
          id: 2,
          src: require("../../assets/carouselPicture2.png"),
          alt: "carouselPictuer2",
          title: "carouselPicture2",
          desc: "This is the desc of the carouselPicture2",
        },
        {
          id: 3,
          src: require("../../assets/worktable.png"),
          alt: "carouselPicture3",
          title: "carouselPicture3",
          desc: "This is the desc of the carouselPicture3",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow-x: hidden;
  
}
.welcome {
  overflow: hidden;
  &-houseDetail{
    width: 100%;
    height: 100vh;
    background: pink;
  }
}

.carouselContent{
  position: relative;
  width: 100%;
  height: 100vh;
  .carouselImg{
    width: 100%;
    height: 100%;
  }
}
</style>