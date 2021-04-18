<template>
  <div class="personal-pay">
    <create-form-person-popup title="创建人员信息" :drawer="{size:'690px'}"></create-form-person-popup>
    <update-form-person-popup title="编辑人员信息" :drawer="{size:'690px'}"></update-form-person-popup>
    <e-page-list-layout>
      <el-breadcrumb slot="breadcrumb" separator-class="el-icon-arrow-right" style="top: -26px; border-top-color: white;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/data/adopt' }">数据采取</el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-dropdown @command="handleTaxCommand">
            <span class="el-dropdown-link">
              个税数据确认
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/data/general">一般纳税人</el-dropdown-item>
              <el-dropdown-item>小规模</el-dropdown-item>
              <el-dropdown-item>企业所得</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template slot="search">
        <el-form slot="search" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <pg-up :selectCompanyId="selectCompanyId"></pg-up>
          <span class="operating-area">
            <span v-if="$store.state.tax_or_acc">
              <el-button size="small" @click="pushOpen('create')">新加</el-button>
              <el-button size="small" @click="handleCopyNext">复制上月数据</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button size="small" @click="handleRule">执行规则</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button size="small" @click="handleStatistics">统计数据</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button size="small" :type="declareBtnType">{{declareStatus | declareStatusTxt(this, declareStatus)}}</el-button>
              <el-dropdown size="small" @command="handleCommand">
                <el-button type="primary" size="small">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item commonad="asdf">Excel上传</el-dropdown-item>
                  <el-dropdown-item commonad="asdf">优先插队</el-dropdown-item>
                  <el-dropdown-item>紧急插队</el-dropdown-item>
                  <el-dropdown-item>删除选中数据</el-dropdown-item>
                  <el-dropdown-item commonad="asdf">已删除数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="div-statistics">
                申报人数:
                <em>{{personTotal.sum}}</em>
                ; 申报总额:
                <em>{{personTotal.amount}}</em>
                <span v-if="personTotal.tax == '无' || !personTotal.tax ">
                  ; 申报税额:
                  <em>{{personTotal.tax}}</em>
                </span>
                <span v-else @click="handleClicCheckIamge">
                  ; 申报税额:
                  <el-tooltip class="item" effect="dark" content="1：跟进'本期收入'大于5000来算，所以如果有专项扣除就不准
                  2：单击查看申报截图" placement="bottom-end">
                    <span>
                      <em>{{personTotal.tax}}</em>
                      <i type="info" class="el-icon-question"></i>
                    </span>
                  </el-tooltip>
                </span>
                。
              </div>
            </span>
            <span v-else>
              <el-button size="small">执行规则</el-button>
              <i class="el-icon-arrow-righ"></i>
              <el-button size="small">统计数据</el-button>
              <el-dropdown size="small" @command="handleCommand">
                <el-button type="primary" size="small">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>删除选中数据</el-dropdown-item>
                  <el-dropdown-item commonad="asdf">已删除数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div style="font-weight: bold;">申报人数：13 人收入总额：91000.00 元免税收入总计：0.00 元</div>
            </span>
          </span>
        </el-form>
        <el-tabs v-model="tabActiveName" @tab-click="handleClickTabs">
          <el-tab-pane label="人员信息" name="first"></el-tab-pane>
          <el-tab-pane label="综合工资薪金" name="second"></el-tab-pane>
          <el-tab-pane label="工资条打印" name="third"></el-tab-pane>
          <el-tab-pane label="非居民工资薪金" name="xxx"></el-tab-pane>
          <el-tab-pane label="一次年终奖" name="xxx"></el-tab-pane>
          <el-tab-pane label="生产经营所得" name="xxx"></el-tab-pane>
          <el-tab-pane label="年度汇缴" name="xxx"></el-tab-pane>
        </el-tabs>
      </template>
      <el-table
        v-if="tabActiveName == 'first'"
        slot="table"
        style="width: 100%"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        :row-key="getRowKeys"
        @expand-change="exChangeHeandler"
        :cell-class-name="tableCellClassName"
        :data="tableData"
      >
        <!-- :expand-row-keys="expands" -->
        <el-table-column type="selection" />
        <el-table-column label="姓名" prop="person.name" min-width="20px">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePersonUpdate(scope.row)">{{scope.row.person.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="启用" prop="person" min-width="15px">
          <template slot-scope="scope">
            <el-checkbox :v-model="true"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="报税" prop="person" min-width="15px">
          <template slot-scope="scope">
            <el-checkbox :v-model="true"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="person.gender" min-width="20px"></el-table-column>
        <el-table-column label="证件号码" prop="person.idno" min-width="50px"></el-table-column>
        <el-table-column label="证件类型" prop="person.idtype" min-width="30px"></el-table-column>
        <el-table-column label="人员状态" prop="person.status" min-width="20px"></el-table-column>
        <el-table-column label="国籍(地区)" prop="person.countryRegion" min-width="20px"></el-table-column>
        <el-table-column label="手机号码" prop="person.phone" min-width="30px"></el-table-column>
        <el-table-column label="银行卡状态" prop="person.tax" min-width="20px"></el-table-column>
        <el-table-column label="是否残疾" prop="person.是否残疾" min-width="20px"></el-table-column>
        <el-table-column label="是否烈属" prop="person.是否烈属" min-width="20px"></el-table-column>
        <el-table-column label="是否孤老" prop="person.是否孤老" min-width="20px"></el-table-column>
        <el-table-column label="任职受雇从业类型" prop="person.任职受雇从业类型" min-width="20px"></el-table-column>
        <el-table-column label="入职年度就业情形" prop="person.入职年度就业情形" min-width="20px"></el-table-column>
        <el-table-column label="备注" prop="person.tax" min-width="20px"></el-table-column>
        <el-table-column label="更新时间" prop="total.tax" min-width="20px"></el-table-column>

        <!-- <el-table-column label="操作" min-width="20px">
          <template slot-scope="scope">
            <i class="el-icon-edit"/>
            <i class="el-icon-delete"/>
          </template>
        </el-table-column>-->
      </el-table>
      <el-table
        v-else-if="tabActiveName == 'second'"
        slot="table"
        style="width: 100%"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        :cell-class-name="tableCellClassName"
        :data="tableData"
      >
        <el-table-column label="姓名" prop="person.name" min-width="20px" fixed />
        <el-table-column label="性别" prop="person.gender" min-width="20px"></el-table-column>
        <el-table-column label="证件号码" prop="person.idno" min-width="50px"></el-table-column>
        <el-table-column label="证件类型" prop="date"></el-table-column>
        <el-table-column label="本期收入" prop="total.amount" sortable></el-table-column>
        <el-table-column label="本期免税收入" prop="total.tax" sortable></el-table-column>
        <el-table-column label="基本养老保险费" prop="total.tax"></el-table-column>
        <el-table-column label="基本医疗保险费" prop="total.tax"></el-table-column>
        <el-table-column label="失业保险费" prop="total.tax"></el-table-column>
        <el-table-column label="住房公积金" prop="total.tax"></el-table-column>

        <el-table-column label="累计子女教育" prop="total.tax"></el-table-column>
        <el-table-column label="累计继续教育" prop="total.tax"></el-table-column>
        <el-table-column label="累计住房贷款利息" prop="total.tax"></el-table-column>
        <el-table-column label="累计住房租金" prop="total.tax"></el-table-column>
        <el-table-column label="累计赡养老人" prop="total.tax"></el-table-column>

        <el-table-column label="企业(职业)年金" prop="total.tax"></el-table-column>
        <el-table-column label="商业健康保险" prop="total.tax"></el-table-column>
        <el-table-column label="税延养老保险" prop="total.tax"></el-table-column>
        <el-table-column label="其他" prop="total.tax"></el-table-column>
        <el-table-column label="准予扣除的捐赠额" prop="total.tax"></el-table-column>
        <el-table-column label="减免税额" prop="total.tax"></el-table-column>
        <el-table-column label="备注" prop="total.tax"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit" />
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else
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
    </e-page-list-layout>
  </div>
</template>

<script>
import PgUp from '../../components/PgUp'
const FormPerson = () => import('./components/FormPerson')
const CreateFormPersonPopup = $mixins.popupManager.$('create', FormPerson)
const UpdateFormPersonPopup = $mixins.popupManager.$('update', FormPerson)

export default {
  components: {
    PgUp,
    CreateFormPersonPopup,
    UpdateFormPersonPopup
  },
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
  data () {
    return {
      personTotal: {
        sum: '',
        amount: '',
        tax: ''
      },
      declareStatus: '',
      declareBtnType: '',

      tabActiveName: 'first',
      selectCompanyId: '',
      isShowCrawlerList: false,
      showCrawlerListData: [{ time: 'asdf', classity: 1, status: 'asdf', reson: 'xxxxx' }, { time: 'asdf', classity: 1, status: 'asdf', reson: 'yyy' }],
      selectModules: this.znData.modulesMapping.AccauxPurchase,

      keyWork: '',
      time: new Date(),
      znDataTaxType: this.znData.taxType,
      taxType: this.znData.taxType.taxPersonal,
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
    fetch (query) {
      this.selectCompanyId = query.companyId
      this.$store.commit('SELECT_COMPANY_ID', this.selectCompanyId)
      let period = query.period || this.Utils.getStorePeriodObj(this)

      // 该家当期所有人员
      let params1 = { cond: { 'period.y': period.y, 'period.m': period.m }, select: 'person taxes mark active updatedAt result joinTax source' }
      let url = `/api/yzh/accaux/payroll/search?owner=${this.selectCompanyId}`
      let promise1 = this.UtilsAxios.handleFetchPost(url, (res) => {
        if (res.code === 0) this._payrollSearchCallBack(res)
      }, params1)

      // 该家当期状态
      let params2 = { period: { 'y': period.y, 'm': period.m }, operator: false, customer: { _id: this.selectCompanyId }, select: 'result data' }
      let url2 = '/api/yzh/accaux/trace/agent'
      let promise2 = this.UtilsAxios.handleFetchPost(url2, (res) => {
        if (res.data && res.data[0]) {
          let data = res.data[0]
          if (data.result) {
            this.declareStatus = this._.get(data.result, 'taxPersonal.status')
            this.declareBtnType = this.znData.declareStatusColor[this.declareStatus]
          }
          if (data.data) {
            let tax = this._.get(data.data, 'taxPersonal.amt')
            this.personTotal.tax = tax ? `,税款${tax}元` : '无'
          }
        }
      }, params2)
      this.loading = true
      Promise.all([promise1, promise2]).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    // 获取人员信息返回
    _payrollSearchCallBack (res) {
      this.personTotal.sum = res.data.length
      let isPay = res.data.some(p => { return this._.get(p, 'taxes.本期收入') >= 5000 })
      this.personTotal.tax = isPay ? '可能有' : '无'
      let amount = res.data.reduce((amount, p) => {
        amount += parseFloat(this._.get(p, 'taxes.本期收入') || 0)
        return amount
      }, 0)
      this.personTotal.amount = amount

      this.pageData = res
    },

    // 复制上个月数据
    handleCopyNext () {
      let period = this.Utils.getStorePeriodObj(this)
      let params = { period: { 'y': period.y, 'm': period.m }, ids: [this.selectCompanyId], call: 'inside' }
      let url = '/api/yzh/accaux/payroll/copy/next'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        if (res.code === 0) this._payrollSearchCallBack(res)
        if (res.code !== 0) this.$message({message: (res.msg && res.msg[0]) ? res.msg[0].msg : '复制失败', type: 'warning'})
      }, params)
    },

    // 查看申报截图
    handleClicCheckIamge () {
      let period = this.Utils.getStorePeriodObj(this)
      let params = { period: { 'y': period.y, 'm': period.m }, company: this.selectCompanyId }
      let url = '/api/zn/taxes/p/image'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        debugger
        if (res.code === 0) {
          console.log('asd')
        }
      }, params)
    },

    // 执行规则
    handleRule () {
      let params = { service: 'accaux-rule', payload: { company: this.selectCompanyId, model: 'AccauxPayroll', type: 'tax', _id: null } }
      let url = '/api/zn/do'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        debugger
        if (res.code === 0) {
          console.log('asd')
        }
      }, params)
    },

    // 统计
    handleStatistics () {
      let { y, m } = this.Utils.getStorePeriodObj(this)
      let params = { service: 'taxes-form',
        payload: {
          action: 'calc',
          company: this.selectCompanyId,
          model: 'AccauxTaxPersonal',
          period: { y, m },
          region: 'gd-sz'
        }
      }
      let url = '/api/zn/do'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        debugger
        if (res.code === 0) {
          console.log('asd')
        }
      }, params)
    },

    // 修改人员信息
    handlePersonUpdate (row) {
      this.pushOpen('update', row.person._id)
    },

    handleClickTabs () {

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
      this.$router.push({ path: command, query: { companyId: this.selectCompanyId } })
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
.personal-pay {
  .el-badge-person-sum {
    z-index: 10;
    .el-badge__content {
      top: -4px;
      right: 20px;
    }
  }
  .el-dropdown {
    padding-left: 8px;
  }

  .operating-area {
    text-align: right;
    position: absolute;
    right: 12px;
    .div-statistics {
      margin-top: -8px;
    }
    em {
      font-size: 1.2rem;
      color: red;
    }
    i {
      font-size: 1.2rem;
    }
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
