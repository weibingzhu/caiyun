<template>
  <el-form  v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
      <el-form-item label="申报状态">
        <el-select size="small" v-model="form.status" placeholder="请选择要返回到的状态">
          <el-option label="准备" value="calc"></el-option>
          <el-option label="申报排队" value="declare-queue-up"></el-option>
          <el-option label="申报成功" value="declare-success"></el-option>
          <el-option label="扣款排队" value="pay-queue-up"></el-option>
          <el-option label="扣款成功" value="pay-success"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明原因">
        <el-input v-model="form.des" size="small"></el-input>
      </el-form-item>
    </el-form>
</template>

<script>

export default {
  mixins: [
    ms.mixins.form
  ],
  data () {
    return {
      form: {
        status: '',
        des: ''
      }
    }
  },

  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        setTimeout(resolve(this.params), 2000)
      })
    },
    submit () { // 表单校验通过后调用的方法，一般是请求后台接口的方法
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
