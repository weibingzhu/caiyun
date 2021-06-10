<template>
  <div class="samll-tableProcess">
    <e-page-list-layout>
      <el-form style="text-align: right;" slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-button size="small" @click="handleGoBack">返回</el-button>
          <el-button size="small">税表初值化</el-button>
          <icon class="el-icon-arrow-right"/>
          <el-button size="small">计算</el-button>
          <icon class="el-icon-arrow-right"/>
          <el-button size="small">保存</el-button>
          <icon class="el-icon-arrow-right"/>
          <el-button size="small">统计</el-button>
          <icon class="el-icon-arrow-right"/>
          <el-button size="small">报税</el-button>
          <el-dropdown size="small" @command="handleCommand">
            <el-button type="primary" size="small">
              更多操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="asdf" v-if="$store.state.tax_or_acc" >优先提取</el-dropdown-item>
              <el-dropdown-item>税表上传</el-dropdown-item>
              <el-dropdown-item>优先报税</el-dropdown-item>
              <el-dropdown-item>excel导出</el-dropdown-item>
              <el-dropdown-item>查看申报数据</el-dropdown-item>
              <el-dropdown-item>初值化数据</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <el-tabs v-model="taxType" type="card" @tab-click="handleTab">
          <el-tab-pane label="附列资料三" name="1"></el-tab-pane>
          <el-tab-pane label="附列资料一" name="2"></el-tab-pane>
          <el-tab-pane label="附列资料二" name="3"></el-tab-pane>
          <el-tab-pane label="附列资料四" name="4"></el-tab-pane>
          <el-tab-pane label="增值税纳税申请表" name="5"></el-tab-pane>
          <el-tab-pane label="申报明细表" name="6"></el-tab-pane>
          <el-tab-pane label="附加税" name="7"></el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="table">
        asdf
      </div>
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
      selectCompany: '',
      module: 'Purchase',
      isShowCrawlerList: false,
      showCrawlerListData: [{ time: 'asdf', classity: 1, status: 'asdf', reson: 'xxxxx' }, { time: 'asdf', classity: 1, status: 'asdf', reson: 'yyy' }],

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
      this.selectCompany = query.companyId
      this.module = query.module || 'Purchase'
      let period = query.period || this.Utils.getStorePeriodObj(this)
      let params = { cond: { 'period.y': period.y, 'period.m': period.m }, select: 'deduction period date payType result provider.name provider.xname invoice.no invoice.currency invoice.type invoice.status invoice.remarks entries accClass utag total other.check evaluated collectionRetreat insteadService accInfo error manual active' }
      this._fetch(params)
    },
    _fetch (p) {
      // let url = `/api/yzh/accaux/sales/search?owner=${this.selectCompany}`
      // return this.UtilsAxios.handleFetchPost(url, (res) => {
      //   this.total.sum = res.data.length
      //   this.pageData = res
      // }, p)
    },

    handleGoBack () {
      let type = this.$store.state.tax_or_acc ? 'tax' : 'acc'
      this.$router.push({ path: `/data/general/${type}${this.module}`, query: {companyId: this.selectCompany, module: this.module} })
    },

    handleShowCrawlerList () {
      this.isShowCrawlerList = !this.isShowCrawlerList
    },
    handleClickModule (m) {
      this.selectModules = m
      this.isShowCrawlerList = false
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    },

    handleTab (tab, event) {
      this.taxType = tab.name
      this.fetch(this.query)
      this.keyWork = ''
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
.samll-tableProcess {
  .e-page-list-layout .el-tabs {
    margin-top: 0;
    padding: 0;
}
}
</style>
