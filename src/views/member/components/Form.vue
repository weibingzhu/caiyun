<template >
  <el-form class="member-form" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="真实姓名" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-row type="flex" align="middle">
        <el-col>
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-button type="text" size="mini" @click="headlePermission">分配权限</el-button>
      </el-row>
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
