<template >
  <el-form class="member-form" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="税号" prop="Code" :rules="[{ required: true, message: '请输入企业税号' }]">
      <el-input v-model.trim="form.Code"></el-input>
    </el-form-item>
    <el-form-item label="公司全名" prop="Name" :rules="[{ required: true, message: '请输入公司全名' }]">
      <el-input v-model.trim="form.Name"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="AdminPassword" :rules="[{ required: true, message: '请输入登录密码' }]">
      <el-input v-model.trim="form.AdminPassword" show-password></el-input>
    </el-form-item>
    <!-- <el-form-item label="确认密码" prop="AdminPassword2" :rules="[{ required: true, message: '请重复输入登录密码' }]">
      <el-input v-model.trim="form.AdminPassword2"></el-input>
    </el-form-item>-->
    <!-- <el-form-item label="法人姓名" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="公司地址" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <e-area-cascader v-model="form.region" filterable expand-trigger="hover"></e-area-cascader>
    </el-form-item>
    <el-form-item label="业务属区" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">TODO不一定是公司地址</el-form-item>
    <el-form-item label="负责人" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">负责人</el-form-item>-->
    <el-form-item label="立即启用" prop="IsEnable">
      <el-checkbox v-model="form.IsEnable">立即启用</el-checkbox>
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
        Code: '',
        Name: '',
        AdminPassword: '',
        IsEnable: true
      },
      value1: []
    }
  },
  methods: {
    fetch () {
      if (this.params) this.form = this.params
    },
    submit () {
      let url = `/api/SpCustomerService/${this.params ? 'Update' : 'Create'}`
      return this.$axios({ url, method: 'POST', data: this.form })
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
