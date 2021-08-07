<template>
  <div id="App">
    <router-view v-if="$route.meta && $route.meta.other"></router-view>
    <mainn v-else></mainn>
  </div>
</template>

<script>

import mainn from '@/views/index.vue'

export default {
  name: 'App',
  components: {
    mainn
  }
}
</script>

<style lang="scss">

</style>
