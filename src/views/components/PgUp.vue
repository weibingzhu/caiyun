<template>
    <el-button-group class="pgup">
      <el-button size="small" @click="handleLast" icon="el-icon-arrow-left">上家</el-button>
      <el-badge :value="sum+'/'+(curr+1)" type="info" class="pgup-badge">
        <el-button size="small" @click="handleNext" >下家<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-badge>
    </el-button-group>
</template>

<script>
export default {
  componentName: 'PgUp',
  props: {
    selectCompanyId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sum: this.$store.state.allCompanies.length,
      curr: 0
    }
  },
  methods: {
    handleNext () {
      this.curr = this.Utils.offsetCompany(this, 1, [])
    },
    handleLast () {
      this.curr = this.Utils.offsetCompany(this, -1, [])
    }
  },
  watch: {
    selectCompanyId: function (newValue, oldValue) {
      if (!newValue) newValue = this.$store.state.allCompanies
      this.curr = this.Utils.getIndexByCompanyId(this, newValue)
    }
  }
}
</script>
<style lang="scss" >
.pgup {
  .pgup-badge{
    .el-badge__content {
      // top: -2px ;
      right: 90px ;
      z-index: 9;
    }
  }
}
</style>
