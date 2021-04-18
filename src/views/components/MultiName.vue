<template>
  <span class="mutli-name">
    <el-tooltip class="item" effect="dark" :content="name" placement="top" v-for="name in namesStr.split(',')" :key="name">
      <span>
        <el-button class="btn-for" size="mini" circle>{{name.toString().substr(0, 1)}}</el-button>
      </span>
    </el-tooltip>
  </span>
</template>

<script>
export default {
  componentName: 'MultiName',
  props: {
    namesStr: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" >
.mutli-name {
  .btn-for {
    margin-left: -8px;
  }
}
</style>
