<template>
  <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="业主姓名" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        key_word: ''
      }
    }
  },
  methods: {
    fetch () {
      if (this.query) {
        return this.$axios({
          url: `/v1/article/${this.query}`
        }).then(res => {
          Object.keys(this.form).forEach(item => {
            this.form[item] = res.data[item]
          })
        })
      }
    },
    submit () {
      let data = JSON.parse(JSON.stringify(this.form))
      return this.$axios({
        url: `/v1/article${this.query ? '/' + this.query : ''}`,
        method: this.query ? 'PUT' : 'POST',
        data,
        options: {
          context: this
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
