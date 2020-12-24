<template>
  <div class="export">
    <div class="export-topSide">
      <div class="export-filters"></div>
      <div class="export-operations"></div>
    </div> 
    <div class="export-bottomSide">
      <div class="export-content"></div>
      <div class="export-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exportPage",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.export{
  &-topSide{
    .export-filters{
      background: $bg-default;
    }
  }
}
</style>