<template>
  <div id="app">
    <router-view/>
    <el-dialog :visible.sync="visible">
      vdsafdsa
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.addEventListener('keyup', this.handleMouseUp)
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleMouseUp (event) {
      if (event.ctrlKey && event.shiftKey && event.altKey && event.keyCode === 13) {
        this.visible = true
      } else if (event.ctrlKey && event.shiftKey && event.keyCode === 13) {
        console.log('2个')
      } else if (event.ctrlKey && event.keyCode === 13) {
        console.log('1个')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
