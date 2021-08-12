<template >
  <el-form class="charge-form" label-width="auto" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="费用类型" prop="Name">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="汽车费用" value="2"></el-option>
        <el-option key="1111" label="差旅费" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="进项发票类型" prop="Name" :rules="[{ required: true, message: '请选择进项发票类型' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="电子普通发票" value="2"></el-option>
        <el-option key="1111" label="道路通行费发票" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="即征即退选项" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="一般项目" value="2"></el-option>
        <el-option key="1111" label="一般项目2" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="价税合计" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="抵扣金额" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="抵扣税率" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="抵扣税额" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="附件数" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="支付方式" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
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
    submit () {
      let url = `/api/SpCustomerService/${this.params ? 'Update' : 'Create'}`
      return this.$axios({ url, method: 'POST', data: this.form })
    }
  }
}
</script>
<style lang="scss">
.charge-form {
  .el-select {
    width: 100%;
  }
}
</style>
