<template>
  <div class="small-accSales">
    <e-page-list-layout>
      账务销项
      <el-breadcrumb slot="breadcrumb" separator-class="el-icon-arrow-right" style="top: -26px; border-top-color: white;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/data/adopt' }">数据采取</el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-dropdown @command="handleTaxCommand">
            <span class="el-dropdown-link">
              一般纳税人
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/data/personal">个税</el-dropdown-item>
              <el-dropdown-item>小规模</el-dropdown-item>
              <el-dropdown-item>企业所得</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template slot="search">
        <el-button-group class="all-module" style="display:flex; padding: 10px">
          <el-badge :value="12" class="item">
            <el-button class="width: 100%" ref="btnPurchase" size="small" @click="handleClickModule('purchase')">进项</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnSales" size="small" @click="handleClickModule('sales')">销项</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnBank" size="small">银行对账单</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnPayroll" size="small">工资</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnPurchaseCustoms" size="small">海关缴款书</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnSalesCustoms" size="small">海关报关单</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnCharge" size="small">费用</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnFixedAsset" size="small">固定资产</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnManualBil" size="small">手工票据</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnTicket" size="small">银行承兑汇票</el-button>
          </el-badge>
        </el-button-group>
        <div class="status-list" v-if="isShowCrawlerList" style="padding: 0 12px">
          <div style="text-align: end;">
            <el-link type="primary" style="padding: 0 4px">更多</el-link>
          </div>
          <el-table style="width: 100%" highlight-current-row :row-style="{padding:'2px 0'}" :data="showCrawlerListData">
            <el-table-column label="时间" prop="time" />
            <el-table-column label="类型" prop="classity" />
          </el-table>
        </div>
        <el-form slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <el-button size="small">上一家</el-button>
          <el-button size="small">下一家</el-button>
          <span class="operating-area" v-if="selectModules === 'purchase'">
            <el-button size="small" @click="handleShowCrawlerList">提取状态</el-button>
            <el-button size="small">一键提取</el-button>
            <el-button size="small">确认无数据</el-button>
            <el-button size="small">执行规则</el-button>
            <span v-if="$store.state.tax_or_acc">
              <el-button size="small">生成税表</el-button>
            </span>
            <span v-else>
              <el-button size="small">打印税表</el-button>
            </span>
            <el-button size="small">更多111</el-button>
          </span>
          <span class="operating-area" v-else-if="selectModules === 'sales'">
            <el-button size="small" @click="handleShowCrawlerList">提取状态</el-button>
            <el-button size="small">一键提取</el-button>
            <el-button size="small">确认无数据</el-button>
            <el-button size="small">执行规则</el-button>
            <span v-if="$store.state.tax_or_acc">
              <el-button size="small">一键报税</el-button>
            </span>
            <el-dropdown size="small" @command="handleCommand">
              <el-button type="primary" size="small">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="asdf">黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
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
        <el-table-column type="expand">
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
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="发票号码" prop="invoice.no" sortable></el-table-column>
        <el-table-column label="认证日期" prop="date" sortable></el-table-column>
        <el-table-column label="销行名称" prop="provider.name"></el-table-column>
        <el-table-column label="金额" prop="total.amount"></el-table-column>
        <el-table-column label="税额" prop="total.tax"></el-table-column>

        <!-- <el-table-column label="操作" fixed="right" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text"  @click="$router.push({path: ''})">继续</el-button>
            <el-button type="text"  @click="$router.push({path: ''})">回退</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- 税表 -->
      <router-view></router-view>
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
      isShowCrawlerList: false,
      showCrawlerListData: [{ time: 'asdf', classity: 1, status: 'asdf', reson: 'xxxxx' }, { time: 'asdf', classity: 1, status: 'asdf', reson: 'yyy' }],
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
      this.selectCompany = query.companyId
      let params = { cond: { 'period.y': query.period.y, 'period.m': query.period.m }, select: 'deduction period date payType result provider.name provider.xname invoice.no invoice.currency invoice.type invoice.status invoice.remarks entries accClass utag total other.check evaluated collectionRetreat insteadService accInfo error manual active' }
      this._fetch(params)
    },
    _fetch (p) {
      let url = `/api/yzh/accaux/${this.selectModules}/search?owner=${this.selectCompany}`
      return this.UtilsAxios.handleFetchPost(url, (res) => {
        this.total.sum = res.data.length
        this.pageData = res
      }, p)
    },
    handleShowCrawlerList () {
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
.small-accSales {
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
