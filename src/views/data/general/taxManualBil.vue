<template>
  <div class="general-taxManualBil">
    <e-page-list-layout>
      <template slot="search">
        <el-form slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <pg-up :selectCompanyId="selectCompanyId"></pg-up>
          <span class="operating-area">
            <el-button size="small">新加发票</el-button>
            <el-button size="small">提取发票</el-button>
            <el-button size="small" @click="handleShowCrawlerStatus">提取状态</el-button>
            <el-button size="small">执行规则</el-button>
            <span v-if="$store.state.tax_or_acc">
              <!-- <el-button size="small" @click="headleCreateTabale">生成税表</el-button> -->
            </span>
            <el-dropdown size="small" @command="handleCommand">
              <el-button type="primary" size="small">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item commonad="asdf" v-if="$store.state.tax_or_acc" >一键报税</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
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
        :data="tableData"
      >
        <el-table-column type="selection" />
        <el-table-column label="发票类型" prop="invoice.type">
          <template slot-scope="scope">{{scope.row.invoice.type}}</template>
        </el-table-column>
        <el-table-column label="认证日期" prop="date" sortable>
          <template slot-scope="scope">
            {{scope.row.date ? scope.row.date.substr(0,10) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="发票代码" prop="invoice.code" sortable></el-table-column>
        <el-table-column label="发票号码" prop="invoice.no" sortable></el-table-column>
        <el-table-column label="金额" prop="total.amount"></el-table-column>
        <el-table-column label="税额" prop="total.tax"></el-table-column>
        <el-table-column label="销行名称" prop="buyer.name"></el-table-column>
        <el-table-column label="发票状态" prop="invoice.status"></el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
import PgUp from '../../components/PgUp'
export default {
  components: {
    PgUp
  },
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      selectCompanyId: '',
      keyWork: '',
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
      this.selectCompanyId = query.companyId
      let period = query.period || this.Utils.getStorePeriodObj(this)
      let params = { cond: { 'period.y': period.y, 'period.m': period.m },
        select: 'date payType result buyer.name buyer.xname invoice insteadService total productName productVer softAmount collectionRetreat invokingAPI.status accFold goodsType goodsEntries manual active taxInfo' }
      this._fetch(params)
    },
    _fetch (p) {
      let url = `/api/yzh/accaux/sales/search?owner=${this.selectCompanyId}`
      return this.UtilsAxios.handleFetchPost(url, (res) => {
        this.pageData = res
      }, p)
    },
    handleShowCrawlerStatus () {
      this.isShowCrawlerList = !this.isShowCrawlerList
    },
    handleClickModule (m) {
      this.selectModules = m
      this.isShowCrawlerList = false
    },
    handleTaxCommand (command) {
      this.$message('click on item ' + command)
      this.$router.push({ path: command })
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
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
      this.expands = [this.pageData.data[this.expandsTestIndex++]._id]
    },
    getRowKeys: (row) => {
      return row._id
    },
    exChangeHeandler (row, rowList) {
      var that = this
      if (rowList.length) {
        that.expands = []
        if (row) {
          that.expands.push(row._id)
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
        this.expands = [this.pageData.data[this.expandsTestIndex]._id]
      } else if (event.keyCode === 40) {
        this.expands = []
        this.expandsTestIndex = ++this.expandsTestIndex > this.pageData.data.length - 1 ? this.pageData.data.length - 1 : this.expandsTestIndex
        this.expands = [this.pageData.data[this.expandsTestIndex]._id]
      } else if (event.keyCode === 27) { // esc
        this.expands = []
        this.expandsTestIndex = -1
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
.general-taxManualBil {
  .all-module {
    display: flex;
    .el-badge {
      flex: 1;
      .el-button {
        width: 100%;
      }
      .is-fixed {
        top: 12px;
        right: 30px;
      }
    }
  }
  .operating-area {
    position: absolute;
    right: 12px;
  }

  .form-search {
    margin: 0 10px;
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
