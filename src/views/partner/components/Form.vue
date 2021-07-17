<template >
  <el-form class="member-form" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="税号" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="公司全名" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="法人姓名" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="公司地址" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">TODO</el-form-item>
    <el-form-item label="业务属区" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">TODO不一定是公司地址</el-form-item>
    <el-form-item label="负责人" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">负责人</el-form-item>
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
      },
      options: [{
        value: 'xx',
        label: '管理员'
      }, {
        value: 'xxx',
        label: '操作员'
      }, {
        value: 'xxxx',
        label: '普通用户'
      }],
      value1: []
    }
  },
  methods: {
    fetch () {

    },
    submit () {
      // let data = JSON.parse(JSON.stringify(this.form))
    },
    headlePermission () {
      this.$router.push({ path: '/permission/index' })
    }
  }
}
</script>
<style lang="scss">
.member-form {
  .el-select {
    width: 100%;
  }
}
</style>
