<template >
  <el-form class="salesCustoms-form" label-width="auto" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-row>
      <el-col :span="3" class="fixed">出口日期:</el-col>
      <el-col :span="9">
        <el-form-item prop="Password">
          <el-input size="small" v-model.trim="form.Password"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">海关编号:</el-col>
      <el-col :span="9">a</el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        销
        <br />售
        <br />方
      </el-col>
      <el-col :span="2">
        <el-row>
          <el-col>全名</el-col>
        </el-row>
        <el-row>
          <el-col>账号</el-col>
        </el-row>
        <el-row>
          <el-col>开户银行</el-col>
        </el-row>
      </el-col>
      <el-col :span="9">ab'b'bbbb</el-col>
      <el-col :span="1">
        购
        <br />买
        <br />方
      </el-col>
      <el-col :span="2">
        <el-row>
          <el-col>全名</el-col>
        </el-row>
        <el-row>
          <el-col>账号</el-col>
        </el-row>
        <el-row>
          <el-col>开户银行</el-col>
        </el-row>
      </el-col>
      <el-col :span="9">adddddd</el-col>
    </el-row>
    <!-- <el-table :show-header="false" style="width: 100%" border :data="tableData" :span-method="spanMethod">
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="total"></el-table-column>
      <el-table-column label="" prop="ddd"></el-table-column>
      <el-table-column label="" prop="ddd"></el-table-column>
    </el-table> -->
    <el-table
      style="width: 100%"
      border
      v-bind="getTableProps()"
      v-on="getTableListeners()"
      highlight-current-row
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="exChangeHeandler"
      :cell-class-name="tableCellClassName"
      :data="tableData"
    >
      <el-table-column label="序号" prop="total"></el-table-column>
      <el-table-column label="商品编码" prop="total"></el-table-column>
      <el-table-column label="应税类型" prop="total"></el-table-column>
      <el-table-column label="商品名称及规格型号" prop="total"></el-table-column>
      <el-table-column label="单价" prop="total"></el-table-column>
      <el-table-column label="数量" prop="total"></el-table-column>
      <el-table-column label="金额" prop="total"></el-table-column>
      <el-table-column label="税率" prop="total"></el-table-column>
      <el-table-column label="税额" prop="total"></el-table-column>
      <el-table-column label="币别" prop="total"></el-table-column>
      <el-table-column label="汇率" prop="total"></el-table-column>
      <el-table-column label="总价" prop="ddd"></el-table-column>
    </el-table>aa
  </el-form>
</template>

<script>
export default {
  name: 'salesCustomsForm',
  mixins: [
    ms.mixins.pageList
  ],
  data () {
    return {
      type: false,
      form: {
      },
      roles: [],
      tableData: [{ total: 'asd' }, { ddd: 'asdf' }, { total: 'asd' }, { ddd: 'asdf' }]
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
    // spanMethod ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0 && rowIndex === 0) return {rowspan: 1, colspan: 2}
    //   if (columnIndex === 1 && rowIndex === 0) return {rowspan: 1, colspan: 5}

    //   if (columnIndex === 2 && rowIndex === 0) return {rowspan: 1, colspan: 2}
    //   if (columnIndex === 3 && rowIndex === 0) return {rowspan: 1, colspan: 5}

    //   if (columnIndex === 0 && rowIndex === 1) return {rowspan: 3, colspan: 1}
    //   if (columnIndex === 7 && rowIndex === 1) return {rowspan: 3, colspan: 1}
    // }
  }
}
</script>
<style lang="scss">
.salesCustoms-form {
  width: 100%;
  // background: white;
  .el-col {
    text-align: center;
    border: 1px solid #000000;
  }
  .fixed {
    text-align: center;
    background: white;
    font: bold;
  }
}
</style>
