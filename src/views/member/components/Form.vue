<template >
  <el-form class="member-form" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="真实姓名" prop="Name" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Name"></el-input>
    </el-form-item>
    <el-form-item label="登录名称" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.LoginName"></el-input>
    </el-form-item>
    <!-- <el-form-item label="手机号码" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item> -->
    <el-form-item label="默认密码" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-row type="flex" align="middle">
        <el-col>
          <el-select v-model="form.Roles" multiple placeholder="请选择">
            <el-option v-for="item in roles" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </el-col>
        <el-button type="text" size="mini" @click="headleRole">角色列表</el-button>
      </el-row>
    </el-form-item>
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
        Name: '',
        LoginName: '',
        Password: '',
        Roles: [],
        IsEnable: true
      },
      roles: []
    }
  },
  methods: {
    fetch () {
      this.UtilsAxios.handleFetchPost('/api/SystemUser/FormPrep', (res) => {
        this.roles = res.AvailableRoles
      }, null)
      if (this.params) {
        this.form = this.params
      }
    },
    handleSubmit () {
      let url = `/api/SystemUser/${this.params ? 'Update' : 'Create'}`
      this.UtilsAxios.handleFetchPost(url, (res) => {
        this.$message({ type: 'success', message: res ? '创建成功' : '修改成功' })
      }, this.form)
    },
    headleRole () {
      this.$router.push({ path: '/role/index' })
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
