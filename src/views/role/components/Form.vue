<template>
  <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="角色名称" prop="Name" :rules="[{ required: true, message: '请输入角色名称' }]">
      <el-input v-model.trim="form.Name"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="Description" :rules="[{ required: true, message: '请输入角色描述' }]">
      <el-input v-model.trim="form.Description"></el-input>
    </el-form-item>
    <el-form-item label="权限" prop="PermissionSet">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
      <el-tree
        :data="treeData"
        ref="tree"
        node-key="key"
        :filter-node-method="filterNode"
        @check-change="handleTreeCheckChange"
        show-checkbox
        default-expand-all
        :expand-on-click-node="false"
        :default-checked-keys="defaultCheckedKeys"
      ></el-tree>
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
        Description: '',
        PermissionSet: []
      },
      defaultCheckedKeys: [],
      treeData: [],
      filterText: ''
    }
  },
  methods: {
    fetch () {
      this.UtilsAxios.handleFetchPost('/api/SystemRole/FormPrep', (res) => {
        this.treeData = res.AvailablePermissions
      }, null)
      if (this.params) {
        this.form = this.params
        this.defaultCheckedKeys = this.params.PermissionSet
      }
    },
    handleSubmit1 () {
      this.form.PermissionSet = this.$refs.tree.getCheckedKeys()
      let url = `/api/SystemRole/${this.params ? 'Update' : 'Create'}`
      this.UtilsAxios.handleFetchPost(url, (res) => {
        this.$message({ type: 'success', message: res ? '创建成功' : '修改成功' })
      }, this.form)
    },
    submit () { // 表单校验通过后调用的方法，一般是请求后台接口的方法
      this.form.PermissionSet = this.$refs.tree.getCheckedKeys()
      return this.$axios({
        url: `/api/SystemRole/${this.params ? 'Update' : 'Create'}`,
        method: 'POST',
        data: this.form
      })
    },

    handleTreeCheckChange () {

    },

    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
<style lang="scss">
</style>
