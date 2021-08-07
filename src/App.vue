<template>
  <div id="App">
    <router-view v-if="$route.meta && $route.meta.other"></router-view>
    <main v-else></main>
  </div>
</template>

<script>

import main  from '@/views/index.vue'

export default {
  name: 'App',
  components: {
    main
  }
}
</script>

<style lang="scss">

</style>
