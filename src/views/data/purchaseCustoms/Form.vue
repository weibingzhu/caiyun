<template>
  <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="真实姓名" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
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
        title: '',
        key_word: ''
      }
    }
  },
  methods: {
    fetch () {

    },
    submit () {
    }
  }
}
</script>
<style lang="scss">
</style>
