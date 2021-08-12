<template >
  <el-form class="manualBill-form" label-width="auto" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="费用类型" prop="Name">
      <el-switch size="mini" v-model="type" active-text="进项" inactive-text="销项" @change="handleSwitch"></el-switch>
    </el-form-item>
    <el-form-item label="开票日期" prop="date" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-date-picker class="main-period" v-model="date" size="small" type="date"></el-date-picker>
    </el-form-item>
    <!-- 进项 -->
    <el-form-item label="用途" prop="Name" :rules="[{ required: true, message: '请选择进项发票类型' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="电子普通发票" value="2"></el-option>
        <el-option key="1111" label="道路通行费发票" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="采购类型" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="一般项目" value="2"></el-option>
        <el-option key="1111" label="一般项目2" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="科目类型" prop="Name" :rules="[{ required: true, message: '请选择进项发票类型' }]">级联</el-form-item>
    <el-form-item label="适合抵扣" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-switch size="mini" v-model="type" active-text="是" inactive-text="否" @change="handleSwitch"></el-switch>
    </el-form-item>
    <el-form-item label="价税合计" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <!-- 销项 -->
    <el-form-item label="收入类型" prop="Name" :rules="[{ required: true, message: '请选择进项发票类型' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="电子普通发票" value="2"></el-option>
        <el-option key="1111" label="道路通行费发票" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="销售类别" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="一般项目" value="2"></el-option>
        <el-option key="1111" label="一般项目2" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="价税合计" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="金额" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="税率" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="税额" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.Password"></el-input>
    </el-form-item>
    <el-form-item label="计税方式" prop="Password" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-select v-model="form.Roles" multiple placeholder="请选择">
        <el-option key="tttt" label="一般计税" value="2"></el-option>
        <el-option key="1111" label="简易征收" value="1"></el-option>
        <el-option key="1111" label="免税" value="1"></el-option>
        <el-option key="1111" label="免抵退税" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="即征即退" prop="LoginName" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-switch size="mini" v-model="type" active-text="是" inactive-text="否" @change="handleSwitch"></el-switch>
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
      type: false,
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
.manualBill-form {
  .el-select {
    width: 100%;
  }
}
</style>
