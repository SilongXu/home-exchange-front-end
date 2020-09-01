<template>
  <svg
    class="svg-icon"
    :class="iconColorTheme"
    :style="{ height: iconUnit, width: iconUnit, fill: iconColor }"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String
    },
    size: {
      type: String,
    },
    color: {
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
      },
      colorThemes: [
        'primary',
      ],
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
      return '';
    },
    iconColor() {
      if (this.color) {
        if (!this.iconColorTheme) {
          return this.color;
        }
      } else if (this.type) {
        const color = this.colorMappings[this.type];
        return color;
      }
      return '';
    },
    iconColorTheme() {
      const matchTheme = this.colorThemes.indexOf(this.color) > -1;
      return matchTheme ? `svg-icon-${this.color}` : '';
    },
    iconUnit () {
      let unit;
      switch (this.size) {
        case 'xlg':
          unit = '24px';
          break;
        case 'lg':
          unit = '20px';
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

@mixin svg-icon-mixin($type, $color) {
  .svg-icon-#{$type} {
    fill: $color
  }
}

@include svg-icon-mixin(primary, $brand-primary)
</style>