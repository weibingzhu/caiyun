<template functional>
  <i :class="['iconfont', data.staticClass, data.class]"
    :style="data.staticStyle && data.style ? [data.staticStyle,data.style] : data.staticStyle || data.style"
    v-bind="data.attrs"
    v-on="listeners">
    <slot></slot>
  </i>
</template>

<script>
export default {
  componentName: 'Icon'
}
</script>
