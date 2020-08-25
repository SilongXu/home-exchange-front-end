<template>
  <div class="overflow-container" ref="container">
    <div class="overflow-container-nav left" v-if="canNavLeft" @click="navLeft">
      <svg-icon icon="angle-left"></svg-icon>
    </div>
    <div class="overflow-container-content" ref="containerContent">
      <slot></slot>
    </div>
    <div class="overflow-container-nav right" v-if="canNavRight" @click="navRight">
      <svg-icon icon="angle-right"></svg-icon>
    </div>
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import debounce from "lodash-es/debounce";

const NAV_STEP = 300;
const NAV_WIDTH = 20;

export default {
  name: 'OverflowContainer',
  data() {
    return {
      navOffsetX: 0,
      canNavLeft: false,
      canNavRight: false,
    };
  },
  methods: {
    updateNav() {
      if (this.$refs.container && this.$refs.containerContent) {
        this.canNavLeft = this.navOffsetX > 0;
        this.canNavRight = this.$refs.container.scrollWidth - this.$refs.container.clientWidth > 0;
      }
    },
    navLeft() {
      this.navOffsetX = this.navOffsetX < NAV_STEP ? 0 : this.navOffsetX - NAV_STEP;
      this.$refs.containerContent.style.transform = `translate(-${this.navOffsetX}px, 0)`;
      setTimeout(() => { // update view after animation ends
        this.updateNav();
      }, 300);
    },
    navRight() {
      const remainOffsetX = this.$refs.container.scrollWidth - this.$refs.container.clientWidth + NAV_WIDTH;
      this.navOffsetX = Math.min(this.navOffsetX + remainOffsetX, this.navOffsetX + NAV_STEP);
      this.$refs.containerContent.style.transform = `translate(-${this.navOffsetX}px, 0)`;
      setTimeout(() => { // update view after animation ends
        this.updateNav();
      }, 300);
    },
    updateActiveContent(id) {
      const nodeElement = this.$refs.containerContent.querySelector(id);
      if (nodeElement) {
        if (nodeElement.offsetLeft < this.navOffsetX) {
          this.navLeft(nodeElement.offsetWidth);
          this.updateActiveContent(id);
        }

        if (nodeElement.offsetLeft + nodeElement.offsetWidth - this.navOffsetX > this.$refs.container.clientWidth) {
          this.navRight(nodeElement.offsetWidth);
          this.updateActiveContent(id);
        }
      }
    }
  },
  mounted() {
    this.sizeObserver = new ResizeObserver(debounce((entries) => {
      if (entries.length > 0) {
        this.updateNav();
      }
    }), 100);
    this.sizeObserver.observe(this.$refs.container);
  },
  destroyed() {
    if (this.sizeObserver) {
      this.sizeObserver.disconnect();
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/util.scss';

.overflow-container {
  position: relative;
  height: 100%;
  overflow: hidden;

  &-nav {
    @include flex-xy-center;
    position: absolute;
    top: 0;
    height: 100%;
    width: 20px;
    background: $bg-body;
    cursor: pointer;
    z-index: 1;

    &:hover {
      background: $bg-hover;
    }

    &.left {
      left: 0;
      border-right: 1px solid $bg-light;

      &:before {
        position: absolute;
        top: 0;
        right: -13px;
        content: '';
        height: 100%;
        width: 12px;
        background: linear-gradient(270deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 100%);
        z-index: 1;
      }
    }

    &.right {
      right: 0;
      border-left: 1px solid $bg-light;

      &:before {
        position: absolute;
        top: 0;
        left: -13px;
        content: '';
        height: 100%;
        width: 12px;
        background: linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.1) 100%);
        z-index: 1;
      }
    }
  }
    
  &-content {
    @include flex-align(center, flex-start);
    position: absolute;
    flex-shrink: 0;
    height: 100%;
    transition: all 0.2s ease;
  }
}
</style>