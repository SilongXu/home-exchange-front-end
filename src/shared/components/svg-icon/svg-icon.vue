<template>
  <svg class="svg-icon" :style="{ height: unit, width: unit }" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
    }
  },
  computed: {
    iconName () {
      return `#${this.icon}`
    },
    unit () {
      let unit;
      switch (this.size) {
        case 'lg':
          unit = '24px';
          break;
        case 'md':
          unit = '16px';
          break;
        case 'sm':
          unit = '12px';
          break;
        default:
          unit = this.size || '16px';
      }
      return unit;
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/util.scss';

.svg-icon {
  width: 16px;
  height: 16px;
  fill: $icon-default;
  overflow: hidden;
}
</style>