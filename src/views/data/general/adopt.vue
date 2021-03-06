<template>
  <ms-page-list-layout class="general-adopt">
    <template slot="search">
      <el-row type="flex" align="middle">
        <el-col>
          <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
            <el-form-item label="状态">
              <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                <el-option v-for="item in znData.declareStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搜索">
              <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
            </el-form-item>
            <el-button size="small">搜索</el-button>
          </el-form>
        </el-col>
        <span class="operating-area">
          <el-button size="small">提取状态</el-button>
          <el-button size="small">进项项提取</el-button>
          <el-button size="small">一键报税</el-button>
        </span>
      </el-row>
    </template>
    <el-table
      slot="table"
      style="width: 100%"
      v-bind="getTableProps()"
      v-on="getTableListeners()"
      highlight-current-row
      :cell-class-name="tableGeneralCellClassName"
      :data="tableData"
    >
      <el-table-column type="selection" class-name="table-column-padding"></el-table-column>
      <el-table-column label="公司" min-width="90">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.companyName" placement="top-start">
            <a
              v-bind:style="{ color: $store.state.selectCompanyIds.includes(scope.row.companyId)? '#00000088' : 'back' }"
              @click="handleClickCompanyName(scope.row)"
            >{{scope.row.companyName | filterName}}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="报税通知">通知</el-table-column>
      <el-table-column label="客户回复">OK</el-table-column>
      <el-table-column label="进项" sortable>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="2020-20-10 12:12:45" placement="top-start">
            <span>提取中</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="销项" sortable>234567.13/已清卡</el-table-column>
      <el-table-column label="零申报">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot="header" slot-scope="scope">状态{{total.a.curr}}/{{total.a.pay}}</template>
        <template slot-scope="scope">{{znData.taxStatus[scope.row.addTax.taxGeneral] }}</template>
      </el-table-column>
      <el-table-column label="状态时间">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="2020-20-10 12:12:45" placement="top-start">
            <span>2020-20-10</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="其他税" prop="qualification">
        <template slot-scope="scope">3/1</template>
      </el-table-column>
      <el-table-column label="操作员" prop="operatorNames">
        <template slot-scope="scope">
          <multi-name :namesStr="scope.row.operatorNames"></multi-name>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="qualification">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="作废 | 返回 | 强行处理" placement="top-start">
            <el-button type="text">操作</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认强行操作窗口 -->
    <el-dialog title="强行处理" :visible.sync="forciblyDialogVisible">
      <el-form :model="formForcibly" inline>
        <el-form-item label="申报状态">
          <el-select size="small" v-model="formForcibly.status" placeholder="请选择要返回到的状态">
            <el-option label="准备" value="calc"></el-option>
            <el-option label="申报排队" value="declare-queue-up"></el-option>
            <el-option label="申报成功" value="declare-success"></el-option>
            <el-option label="扣款排队" value="pay-queue-up"></el-option>
            <el-option label="扣款成功" value="pay-success"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明原因">
          <el-input v-model="formForcibly.des" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="handleForciblyStatus">确 定</el-button>
      </div>
    </el-dialog>
  </ms-page-list-layout>
</template>

<script>
import MultiName from '@/views/components/MultiName'

export default {
  mixins: [
    ms.mixins.pageList
  ],
  components: {
    MultiName
  },
  data () {
    return {
      forciblyDialogVisible: false,
      formForcibly: {
        status: '',
        des: ''
      },
      total: {
        sum: 0,
        gSum: 100,
        sSum: 100,
        p: {
          curr: 0,
          pay: 0
        },
        a: { // 增值税（一般纳税人和小规模）
          curr: 10,
          pay: 0
        },
        c: {
          curr: 10,
          pay: 0
        }

      },
      keyWork: '',
      time: new Date(),
      znDataTaxType: this.znData.taxType,
      query: this.getQuery({
        qualification: '全部',
        name: '',
        operator: false,
        select: '_id person status declareType company isCurrent errorNum',
        ...this.$route.query
      }),

      expands: [],
      expandsTestIndex: -1,
      pageData: {
        count: 0,
        data: []
      }
    }
  },

  methods: {
    fetch (query = {}) {
      let params = JSON.parse(JSON.stringify(query))
      params.period = params.period || this.Utils.getStorePeriodObj(this)
      this.UtilsAxios.handleFetchPost(`/api/zn/taxes/g/agent`, (res) => {
        this.total.sum = res.data.length
        this.total.gSum = 0
        this.total.sSum = 0

        let pCurr = 0
        let pPay = 0

        let aCurr = 0
        let aPay = 0

        let cCurr = 0
        let cPay = 0
        for (const item of res.data) {
          item['operatorNames'] = this._.map(item.operator, 'name').toString()
          item['qualification'] = item.category ? item.category.qualification : 0
          item['companyName'] = item.company ? item.company.name : ''
          item['companyId'] = item.company ? item.company._id : ''

          let taxStatusC = item.statuss && item.statuss[this.znDataTaxType.taxCompany] ? item.statuss[this.znDataTaxType.taxCompany].status : ''
          item[this.znDataTaxType.taxCompany] = taxStatusC
          this.total.c.curr = this.znData.declareSuccessStatus.includes(taxStatusC) ? ++cCurr : cCurr
          this.total.c.pay = this.znData.paySuccessStatus.includes(taxStatusC) ? ++cPay : cPay

          let taxStatusP = item.statuss && item.statuss[this.znDataTaxType.taxPersonal] ? item.statuss[this.znDataTaxType.taxPersonal].status : ''
          item[this.znDataTaxType.taxPersonal] = taxStatusP
          this.total.p.curr = this.znData.declareSuccessStatus.includes(taxStatusP) ? ++pCurr : pCurr
          this.total.p.pay = this.znData.paySuccessStatus.includes(taxStatusP) ? ++pPay : pPay

          let taxStatusAG = item.statuss && item.statuss[this.znDataTaxType.taxGeneral] ? item.statuss[this.znDataTaxType.taxGeneral].status : ''
          let taxStatusAS = item[this.znDataTaxType.taxSmall] = item.statuss && item.statuss[this.znDataTaxType.taxSmall] ? item.statuss[this.znDataTaxType.taxSmall].status : ''
          item['addTax'] = { taxGeneral: taxStatusAG, taxSmall: taxStatusAS }
          this.total.a.curr = (this.znData.declareSuccessStatus.includes(taxStatusAG) || this.znData.declareSuccessStatus.includes(taxStatusAS)) ? ++aCurr : aCurr
          this.total.a.pay = (this.znData.paySuccessStatus.includes(taxStatusAG) || this.znData.paySuccessStatus.includes(taxStatusAS)) ? ++aPay : aPay

          item['qualification'] === 1 ? ++this.total.gSum : ++this.total.sSum
        }
        this.pageData.count = res.data.length
        res.data.length = 50 // TODO
        this.pageData.data = res.data
      }, params)
    },
    // 强行处理状态
    handleForciblyStatus (row) {
      this.forciblyDialogVisible = !this.forciblyDialogVisible
    },

    handleRowDblclick (row, column, event) {
      if (this.expands.length > 0) {
        this.expands = []
      } else {
        this.expands = [row.company._id]
      }
      // this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
    },
    handleClickCompanyName (row) {
      let tax_or_acc = this.$store.state.tax_or_acc
      let moduleName = 'Purchase'
      this.$router.push({ path: `/data/${moduleName}`, query: { companyId: row.company._id, tax_or_acc } })
    },
    tablePersonalCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 6 && this.znData.paySuccessStatus.includes(row.taxPersonal)) {
        return 'paysuccess'
      } else if (row && columnIndex === 6 && this.znData.declareSuccessStatus.includes(row.taxPersonal)) {
        return 'declaresuccess'
      }
    },
    tableGeneralCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 8 && (this.znData.paySuccessStatus.includes(row.addTax.taxGeneral))) {
        return 'paysuccess'
      } else if (row && columnIndex === 8 && (this.znData.declareSuccessStatus.includes(row.addTax.taxGeneral))) {
        return 'declaresuccess'
      }
    },
    tableSmallCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 6 && this.znData.paySuccessStatus.includes(row.addTax.taxSmall)) {
        return 'paysuccess'
      } else if (row && columnIndex === 6 && this.znData.declareSuccessStatus.includes(row.addTax.taxSmall)) {
        return 'declaresuccess'
      }
    },
    tableCompanyCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 5 && this.znData.paySuccessStatus.includes(row.taxCompany)) {
        return 'paysuccess'
      } else if (row && columnIndex === 5 && this.znData.declareSuccessStatus.includes(row.taxCompany)) {
        return 'declaresuccess'
      }
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getRowKeys: (row) => {
      return row.company._id
    },
    exChangeHeandler (row, rowList) {
      let that = this
      if (rowList.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.company._id)
          this.expandsTestIndex = this.pageData.data.findIndex(e => e.company._id === row.company._id)
        }
      } else {
        that.expands = []
      }
    }
  },

  computed: {
    tableData () {
      const search = this.keyWork
      if (search) {
        return this.pageData.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.pageData.data
    }
  }
}
</script>

<style lang="scss">
.general-adopt {
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

  .operating-area {
    padding-right: 10px;
  }
  .e-page-list-layout--table {
    margin-top: -10px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    // color: #;
    font-weight: bolder;
    // background-color: #E1FFFF!important;
  }

  .el-table .declaresuccess {
    background: #d6f3f4;
    opacity: 0.9;
  }
  .el-table .paysuccess {
    margin-left: 2px;
    background: #32c1ca;
    opacity: 0.9;
  }
  .demo-table-expand div {
    margin: 6px;
  }
}
</style>
