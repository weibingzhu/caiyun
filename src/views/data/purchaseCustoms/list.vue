<template>
  <div class="pruchaseCustoms-list">
    <e-page-list-layout>
      <template slot="search">
        <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <pg-up :selectCompanyId="selectCompanyId"></pg-up>
          <span class="operating-area" >
            <el-button size="small" @click="handleAdd">新加</el-button>
            <el-button size="small">提取缴款书</el-button>
            <el-button size="small" @click="handleShowCrawlerStatus">提取状态</el-button>
            <el-button size="small" >执行规则</el-button>
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
        :data="tableData"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column label="发票代码" prop="invoice.no"></el-table-column>
        <el-table-column label="发票号码" prop="invoice.no"></el-table-column>
        <el-table-column label="开票日期" prop="date" sortable>
          <template slot-scope="scope">
            {{scope.row.date ? scope.row.date.substr(0,10) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="销行名称" prop="provider.name"></el-table-column>
        <el-table-column label="金额" prop="total.amount"></el-table-column>
        <el-table-column label="税额(有效税额)" prop="total.tax">
          <template slot-scope="scope">
            {{scope.row.total.tax}}({{scope.row.total.tax}})
          </template>
        </el-table-column>
        <!-- <el-table-column label="有效税额" prop="total.tax"></el-table-column> -->
        <el-table-column label="勾选日期" prop="date" sortable>
          <template slot-scope="scope">
            {{scope.row.date ? scope.row.date.substr(0,10) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="发票类型" prop="invoice.type" sortable>
          <template slot-scope="scope">{{scope.row.invoice.type}}</template>
        </el-table-column>
        <el-table-column label="状态" prop="provider.name"></el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
import PgUp from '../../components/PgUp'
const Form = () => import('./Form')
export default {
  components: {
    PgUp,
    Form
  },
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      selectCompanyId: '',
      isShowCrawlerList: false,
      selectModules: this.znData.modulesMapping.AccauxPurchase,

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
      this.selectCompanyId = query.companyId
      let period = query.period || this.Utils.getStorePeriodObj(this)
      let params = { cond: { 'period.y': period.y, 'period.m': period.m }, select: 'deduction period date payType result provider.name provider.xname invoice.no invoice.currency invoice.type invoice.status invoice.remarks entries accClass utag total other.check evaluated collectionRetreat insteadService accInfo error manual active' }
      this._fetch(params)
    },
    _fetch (p) {
      let url = `/api/yzh/accaux/customspurchase/search?owner=${this.selectCompanyId}`
      return this.UtilsAxios.handleFetchPost(url, (res) => {
        this.total.sum = res.data.length
        this.pageData = res
      }, p)
    },

    // 手动添加
    handleAdd () {
      this._msNavigator(null)
    },
    // 编辑
    handleEdit () {
      this._msNavigator({name: 'test'})
    },
    _msNavigator (params) {
      ms.navigator.push(this, Form, {
        params,
        title: params ? '编辑' : '创建'
      })
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
      let that = this
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
.pruchaseCustoms-list {

  .form-search {
    margin-top: 0px;
    margin-bottom: 10px;
  }
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
