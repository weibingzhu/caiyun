<template>
  <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="角色名称" prop="title" :rules="[{ required: true, message: '请输入业主姓名' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title"></el-input>
    </el-form-item>
    <el-form-item label="权限" prop="title" :rules="[{ required: true, message: '请输入联系电话' }]">
      <el-input v-model.trim="form.title" disabled=false></el-input>
      <el-tree :data="data" ref="tree" :filter-node-method="filterNode" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"></el-tree>
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
      filterText: '',
      data: [{
        id: 1,
        label: '我的客户',
        children: [{
          id: 11,
          label: '合同管理'
        },
        {
          id: 12,
          label: '客户列表'
        }]
      }, {
        id: 2,
        label: '初值化管理'
      }, {
        id: 3,
        label: '右边差不多的菜单',
        children: [{
          id: 7,
          label: '还有隐藏页面的权限'
        }, {
          id: 8,
          label: '还有弹窗的页面权限'
        }]
      }, {
        id: 3,
        label: '系统配置',
        children: [{
          id: 7,
          label: '货币汇率'
        }, {
          id: 8,
          label: '系统配置'
        }]
      }]

    }
  },
  methods: {
    fetch () {

    },
    submit () {
      // let data = JSON.parse(JSON.stringify(this.form))
    }
  }
}
</script>
<style lang="scss">
</style>
