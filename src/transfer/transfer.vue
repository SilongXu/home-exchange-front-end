<template>
  <div class="transfer">
    <div class="transfer-left">
      <transfer-menu @menuChange="onMenuChange"> </transfer-menu>
    </div>
    <div class="transfer-right">
      <transfer-config></transfer-config>
    </div>
  </div>
</template>

<script>
import TransferMenu from "./transfer-menu";
import TransferConfig from "./transfer-config";

export default {
  name: "Transfer",
  components: {
    TransferMenu,
    TransferConfig,
  },
  data: () => {
    return {
      node: null,
    };
  },
  methods: {
    onMenuChange(node) {
      console.log(node);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
.transfer {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: stretch;
  background: $bg-light;

  &-left {
    flex-shrink: 0;
    width: 400px;
    min-height: 100vh;
    border-right: 1px solid $border-dark;
  }

  &-right {
    flex: 1;
    min-width: 0;
  }
}
</style>
