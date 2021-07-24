<template>
  <div class="customer-contract">
    <e-page-list-layout>
      <template slot="search">
        <el-form slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="创建/签约时间">
            <span slot="label">
              <el-select v-model="selectTimeType" style="width:100px">
                <el-option label="创建时间" value="create"></el-option>
                <el-option label="签约时间" value="update"></el-option>
                <el-option label="截止时间" value="update"></el-option>
              </el-select>
            </span>
            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <el-button size="small">搜索</el-button>
          <el-button @click="$router.push({path: '/customer/contract-form'})" size="small">创建</el-button>
        </el-form>
      </template>
      <el-table
        slot="table"
        style="width: 100%"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="exChangeHeandler"
        :cell-class-name="tableCellClassName"
        @row-dblclick="handleRowDblclick"
        :data="tableData"
      >
        <el-table-column type="selection" min-width="4%" />
        <el-table-column
          label="公司"
          prop="qualification"
          align="left"
          fixed
          min-width="20%"
          :filters="[{text: '一般纳税人', value: 1}, {text: '小规模', value: 2}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.companyName" placement="top-start">
              <span>{{scope.row.companyName | filterName}}</span>
            </el-tooltip>
            <el-tag size="mini" v-if="scope.row.qualification === 1">一般</el-tag>
            <el-tag size="mini" v-else>小规模</el-tag>
          </template>
        </el-table-column>
        <el-table-column type="expand" min-width="2%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- <el-form-item label="全称" style=" font-weight: bolder;">
                {{ props.row.companyName }}
              </el-form-item>-->
              <div style=" font-weight: bolder">
                <!-- {{ props.row.companyName }} -->
                个税税款
                <span>1000</span>
                增值税税款
                <span>1000</span>
                企业所得税款
                <span>1000</span>
              </div>
              <div>
                <span style=" font-weight: bolder;">进项:</span>
                金额
                <span>100</span>
                税额
                <span>10</span>
                缴款书
                <span>10</span>
                报关单
                <span>10</span>
                留底
                <span>125</span>
                ;
                <span style=" font-weight: bolder;">销项:</span>
                金额
                <span>4515</span>
                税额
                <span>1245</span>
                ;
                <span style=" font-weight: bolder;">银行对账单:</span>
                <span>4515</span>
                ;
                <span style=" font-weight: bolder;">工资:</span>
                金额
                <span>4515</span>
                税额
                <span>1245</span>
                ;
                <span style=" font-weight: bolder;">费用:</span>
                金额
                <span>4515</span>
                税额
                <span>1245</span>
                ;
                <span style=" font-weight: bolder;">手工票据:</span>
                金额
                <span>4515</span>
                税额
                <span>1245</span>
                ;
              </div>
              <div>
                <span style=" font-weight: bolder;">操作员:</span>
                {{props.row.operatorNames}}
              </div>
              <div>
                <span style=" font-weight: bolder;">时间轴:</span>
                <span>小伟排队(1号12:12:01)</span>
                <i class="el-icon-caret-right" />
                <span>机器人开始(1号12:12:01)</span>
                <i class="el-icon-caret-right" />
                <span>报税失败(1号12:12:01)</span>
                <i class="el-icon-caret-right" />
                <span>小明排队(1号12:12:01)</span>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="qualification" min-width="10%" />
        <el-table-column label="业务员" prop="qualification" min-width="10%" />
        <el-table-column label="状态" prop="qualification" min-width="10%" />
        <el-table-column label="签约时间" prop="qualification" min-width="10%" />
        <el-table-column label="截止时间" prop="qualification" min-width="10%" />
        <el-table-column label="支付方式" prop="qualification" min-width="10%" />
        <el-table-column label="收款情况" prop="qualification" min-width="10%" />
        <el-table-column label="附件" prop="qualification" min-width="10%" />

        <el-table-column label="操作" fixed="right" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate">编辑</el-button>
            <el-button type="text" @click="handleDeleta">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
export default {
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      selectTimeType: '创建时间',
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
      taxType: this.znData.taxType.taxPersonal,
      query: this.getQuery({
        qualification: '全部',
        name: '',
        operator: false,
        // period: { y: 2020, m: 10 },
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
    fetch (query) {
      let params = JSON.parse(JSON.stringify(query))
      let type = this.taxType === this.znDataTaxType.taxPersonal ? 'p' : (this.taxType === this.znDataTaxType.taxGeneral ? 'g' : (this.taxType === this.znDataTaxType.taxSmall ? 's' : 'c'))
      return this.UtilsAxios.handleFetchPost(`/api/zn/taxes/${type}/agent`, (res) => {
        // return this.UtilsAxios.handleFetchPost(`/api/zn/taxes/p/agent`, (res) => {
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
        res.data.length = 100
        this.pageData = res
      }, params)
    },

    handleUpdate (row) {
      this.pushOpen('update', row.id)
    },

    handleDeleta (row) {

    },

    handleRowDblclick (row, column, event) {
      this.$router.push({ path: `/data/${this.taxType}`, query: { companyId: row.company._id } })
    },

    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      // if (row && columnIndex === 7 && this.znData.paySuccessStatus.includes(row.taxCompany)) {
      //   return 'paysuccess'
      // } else if (row && columnIndex === 6 && (this.znData.paySuccessStatus.includes(row.addTax.taxGeneral) || this.znData.paySuccessStatus.includes(row.addTax.taxSmall))) {
      //   return 'paysuccess'
      // } else if (row && columnIndex === 5 && this.znData.paySuccessStatus.includes(row.taxPersonal)) {
      //   return 'paysuccess'
      // } else if (row && columnIndex === 5 && this.znData.declareSuccessStatus.includes(row.taxPersonal)) {
      //   return 'declaresuccess'
      // } else if (row && columnIndex === 6 && (this.znData.declareSuccessStatus.includes(row.addTax.taxGeneral) || this.znData.declareSuccessStatus.includes(row.addTax.taxSmall))) {
      //   return 'declaresuccess'
      // } else if (row && columnIndex === 7 && this.znData.declareSuccessStatus.includes(row.taxCompany)) {
      //   return 'declaresuccess'
      // }
    },
    handleTab (tab, event) {
      this.taxType = tab.name
      this.fetch(this.query)
      this.keyWork = ''
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    testCreate () {
      this.expands = []
      this.expands = [this.pageData.data[this.expandsTestIndex++].company._id]
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
    },
    handleEvent (event) {
      if (event.keyCode === 38) { // && event.ctrlKey
        // event.preventDefault()
        // event.returnValue = false
        this.expands = []
        this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
        this.expands = [this.pageData.data[this.expandsTestIndex].company._id]
      } else if (event.keyCode === 40) {
        this.expands = []
        this.expandsTestIndex = ++this.expandsTestIndex > this.pageData.data.length - 1 ? this.pageData.data.length - 1 : this.expandsTestIndex
        this.expands = [this.pageData.data[this.expandsTestIndex].company._id]
      } else if (event.keyCode === 27) { // esc
        this.expands = []
        // this.expandsTestIndex = -1
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
  },

  created () {
    document.addEventListener('keydown', this.handleEvent)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEvent)
  }
}
</script>

<style lang="scss">
.customer-contract {
  .operating-area {
    position: absolute;
    right: 12px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    // color: #fff;
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
