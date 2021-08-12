<template>
  <div class="customer-list">
    <e-page-list-layout>
      <template slot="search">
        <el-form slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="">
            <el-select v-model="ddd" multiple placeholder="请选择状态">
              <el-option key="tttt" label="未激活" value="2"></el-option>
              <el-option key="tttt" label="已激活" value="2"></el-option>
              <el-option key="1111" label="已流失" value="1"></el-option>
              <el-option key="1111" label="回头客" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-button size="small">搜索</el-button>
          <el-button size="small" @click="$router.push({path: '/init/index'})">添加</el-button>
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
            <span style=" font-weight: bolder;">操作员:</span>
            {{props.row.operatorNames}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="qualification" min-width="10%" />
        <el-table-column label="类型" prop="qualification" min-width="10%" />
        <el-table-column label="合同日期" prop="qualification" min-width="10%">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="2020-10-10 至 2022-10-10" placement="top-start">
              <!-- <span> {{scope.row.companyName | filterName}}</span> -->
              <span>还有{{scope.row.qualification}}个月</span>
            </el-tooltip>
            <el-button size="mini">续签</el-button>
            <el-button size="mini">提醒</el-button>
          </template>
        </el-table-column>
        <el-table-column label="工商年审" prop="qualification" min-width="10%" />
        <el-table-column label="操作员" prop="operatorNames" min-width="10%">
          <template slot-scope="scope">
            <el-tag size="mini"
              :key="item._id"
              v-for="item in scope.row.operator"
              closable
              :disable-transitions="false"
              @close="handleTagClose(item)"
            >{{item.name}}</el-tag>
            <el-button type="text" @click="handleAddOperator(scope.row)"><icon size="mini" class="el-icon-plus"/></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text"  @click="$router.push({path: ''})">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
import Icon from '../../components/Icon.vue'

export default {
  components: { Icon },
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
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

    handleTagClose (tag) {
      console.log(tag)
    },

    handleAddOperator (row) {
      console.log(row)
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
.customer-list {
  .operating-area {
    position: absolute;
    right: 12px;
  }
  .el-tag--mini {
    margin: 0 2px;
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
