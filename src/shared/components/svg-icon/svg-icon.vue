<template>
  <svg class="svg-icon" :style="{ height: unit, width: unit, fill: iconColor }" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String
    },
    size: {
      type: String,
    },
    type: {
      type: String,
    }
  },
  data() {
    return {
      iconMappings: {
        TASKFLOW: 'taskflow',
        SQL: 'sql',
        DATALOAD: 'dataload',
        DATASYNC: 'datasync',
      },
      colorMappings: {
        TASKFLOW: '#1D96F3',
        SQL: '#EC9D27',
        DATALOAD: '#65C1E9',
        DATASYNC: '#8265e4',
      }
    };
  },
  computed: {
    iconName () {
      if (this.icon) {
        return `#${this.icon}`
      } else if (this.type) {
        const icon = this.iconMappings[this.type];
        return `#${icon}`;
      }
    },
    iconColor() {
      if (this.type) {
        const color = this.colorMappings[this.type];
        return color;
      }
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