<template>
  <div class="taxPersonal-index">
    <create-form-person-popup title="创建人员信息" :drawer="{size:'690px'}"></create-form-person-popup>
    <update-form-person-popup title="编辑人员信息" :drawer="{size:'690px'}"></update-form-person-popup>
    <create-form-tax-popup title="创建人员薪金" :drawer="{size:'690px'}"></create-form-tax-popup>
    <update-form-tax-popup title="编辑人员薪金" :drawer="{size:'690px'}"></update-form-tax-popup>
    <!-- 图片预览 -->
    <e-preview v-if="imgSrc" :visible.sync="visible" :src="imgSrc"></e-preview>
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
    <!-- 第一次视界页面 -->
    <e-page-list-layout>
      <el-breadcrumb slot="breadcrumb" separator-class="el-icon-arrow-right" style="top: -26px; border-top-color: white;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/data/adopt', query:{taxType: 'taxPersonal'} }">数据采取</el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-dropdown @command="handleTaxCommand">
            <span class="el-dropdown-link">
              个税数据确认
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/data/general/">一般纳税人</el-dropdown-item>
              <el-dropdown-item>小规模</el-dropdown-item>
              <el-dropdown-item>企业所得</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <template slot="search">
        <el-row type="flex" align="middle">
          <el-col>
            <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
              <el-form-item label="搜索">
                <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
              </el-form-item>
              <pg-up :selectCompanyId="selectCompanyId"></pg-up>
            </el-form>
          </el-col>
          <span class="operating-area">
            <span v-if="$store.state.tax_or_acc">
              <!-- <el-button size="small" @click="handleCreate">新加</el-button> -->
              <el-button size="small" @click="handleCopyNext">复制上月数据</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button size="small" @click="handleRule">执行规则</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button size="small" @click="handleStatistics">统计数据</el-button>
              <icon class="el-icon-arrow-right" />
              <el-button-group>
                <el-button size="small" :type="declareBtnType">{{declareStatus | declareStatusTxt(this, declareStatus)}}</el-button>
                <el-button size="small" v-if="declareStatus === 'declare-queue-up'" @click="handleDeclareBack">撤回</el-button>
                <el-button size="small" v-else-if="declareStatus === 'declare-fail'" @click="handleDeclareAgain">再报</el-button>
                <el-button size="small" v-else-if="declareStatus === 'declare-success'" @click="handleDeclareOff">作废</el-button>
                <el-button size="small" v-if="declareStatus === 'pay-queue-up'" @click="handlePayBack">撤回</el-button>
                <el-button size="small" v-if="declareStatus === 'pay-fail'" @click="handlePayAgain">再扣</el-button>
              </el-button-group>
              <el-dropdown size="small" @command="handleCommandTax">
                <el-button type="primary" size="small">
                  更多操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="asdf">Excel上传</el-dropdown-item>
                  <el-dropdown-item command="asdf">Excel导出</el-dropdown-item>
                  <el-dropdown-item command="asdf">优先插队</el-dropdown-item>
                  <el-dropdown-item>紧急插队</el-dropdown-item>
                  <el-dropdown-item command="forcibly">强行处理</el-dropdown-item>
                  <el-dropdown-item command="addPerson">新加人员</el-dropdown-item>
                  <el-dropdown-item>新加薪资</el-dropdown-item>
                  <el-dropdown-item>删除选中数据</el-dropdown-item>
                  <el-dropdown-item command="asdf">已删除数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="div-statistics">
                申报人数:
                <em>{{personTotal.sum}}</em>
                ; 申报总额:
                <em>{{personTotal.amount | formatMoney}}</em>
                ; 申报税额:
                <el-tooltip class="item" effect="dark" content="1：跟进'本期收入'大于5000来算，所以如果有专项扣除就不准
                  2：单击查看申报截图" placement="bottom-end">
                  <span @click="handleClicCheckIamge">
                    <em>{{personTotal.tax | formatMoney}}</em>
                    <i type="info" class="el-icon-question"></i>。
                  </span>
                </el-tooltip>
                <span>
                  <i v-show="!showStepDiv" type="info" class="el-icon-arrow-right" @click="handleClickArrow"></i>
                  <i v-show="showStepDiv" type="info" class="el-icon-arrow-down" @click="handleClickArrow"></i>
                </span>
              </div>
            </span>
            <span v-else>
              <el-button size="small">执行规则</el-button>
              <i class="el-icon-arrow-righ"></i>
              <el-button size="small">统计数据</el-button>
              <el-dropdown size="small" @command="handleCommandAcc">
                <el-button type="primary" size="small">
                  更多操作
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
        </el-row>
        <transition>
          <div v-if="showStepDiv">
            <el-steps align-center>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
              <el-step title="小伟" icon="el-icon-edit" description="20200101 12:12:12">
                <span slot="icon">开始排队</span>
              </el-step>
            </el-steps>
          </div>
        </transition>
        <el-tabs v-model="tabActiveName" @tab-click="handleClickTabs">
          <el-tab-pane label="人员信息" name="Person"></el-tab-pane>
          <el-tab-pane label="综合工资薪金" name="Tax"></el-tab-pane>
          <el-tab-pane label="非居民工资薪金" name="NonResident"></el-tab-pane>
          <el-tab-pane label="工资条打印" name="PayStub"></el-tab-pane>
          <el-tab-pane label="一次年终奖" name="YearAwards"></el-tab-pane>
          <el-tab-pane label="生产经营所得" name="IncomeProduction"></el-tab-pane>
          <el-tab-pane label="年度汇缴" name="YearPay"></el-tab-pane>
        </el-tabs>
      </template>
      <span slot="table">
        <el-table
          v-show="tabActiveName == 'Person'"
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          :row-key="getRowKeys"
          :cell-class-name="tableCellClassName"
          :data="tableData"
        >
          <el-table-column type="selection" />
          <el-table-column label="姓名" fixed prop="person.name">
            <template slot-scope="scope">
              <el-button type="text" @click="handlePersonUpdate(scope.row)">{{scope.row.person.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="启用" prop="person">
            <template slot-scope="scope">
              <el-checkbox :v-model="true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="报税" prop="person">
            <template slot-scope="scope">
              <el-checkbox :v-model="true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="证件类型" prop="person.idtype"></el-table-column>
          <el-table-column label="证件号码" prop="person.idno" min-width="170"></el-table-column>
          <el-table-column label="性别" prop="person.gender"></el-table-column>
          <el-table-column label="人员状态" prop="person.status"></el-table-column>
          <el-table-column label="手机号码" prop="person.phone" min-width="106"></el-table-column>
          <el-table-column label="银行卡状态" prop="person.tax"></el-table-column>
          <el-table-column label="残疾" prop="person.是否残疾"></el-table-column>
          <el-table-column label="烈属" prop="person.是否烈属"></el-table-column>
          <el-table-column label="孤老" prop="person.是否孤老"></el-table-column>
          <el-table-column label="任职受雇从业类型" prop="person.任职受雇从业类型"></el-table-column>
          <el-table-column label="入职年度就业情形" prop="person.入职年度就业情形"></el-table-column>
          <el-table-column label="国籍(地区)" prop="person.countryRegion"></el-table-column>
          <el-table-column label="备注" prop="person.tax"></el-table-column>
          <!-- <el-table-column label="更新时间" prop="total.tax"></el-table-column> -->
        </el-table>
        <el-table
          v-show="tabActiveName == 'Tax'"
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          :cell-class-name="tableCellClassName"
          :data="tableData"
        >
          <el-table-column label="姓名" prop="person.name">
            <template slot-scope="scope">
              <el-button type="text" @click="handleTaxUpdate(scope.row)">{{scope.row.person.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="本期收入" prop="taxes.本期收入" sortable></el-table-column>
          <el-table-column label="本期免税收入" prop="taxes.本期免税收入" sortable></el-table-column>
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
          <el-table-column label="减免费用标准" prop="total.tax"></el-table-column>
          <el-table-column label="已缴税额" prop="total.tax"></el-table-column>
          <el-table-column label="备注" prop="total.tax"></el-table-column>
        </el-table>
        <el-table
          v-show="tabActiveName == 'NonResident'"
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          :row-key="getRowKeys"
          :cell-class-name="tableCellClassName"
          :data="tableData"
        >
          <el-table-column label="姓名" prop="person.name">
            <template slot-scope="scope">
              <el-button type="text" @click="handleTaxUpdate(scope.row)">{{scope.row.person.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="证件类型" prop="person.idtype">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.person.idno" placement="bottom-end">
                <span>{{scope.row.person.idtype}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="收入" prop="yearAwards.收入" sortable></el-table-column>
          <el-table-column label="免税收入" prop="date" sortable></el-table-column>
          <el-table-column label="其他" prop="provider.name"></el-table-column>
          <el-table-column label="实际捐赠额" prop="total.tax"></el-table-column>
          <el-table-column label="捐赠方式" prop="total.tax"></el-table-column>
          <el-table-column label="准予扣除的捐赠额" prop="total.tax"></el-table-column>
          <el-table-column label="减免税额" prop="total.tax"></el-table-column>
          <el-table-column label="备注" prop="total.tax"></el-table-column>
          <!-- <el-table-column label="适用公式" prop="person.idtype"></el-table-column>
          <el-table-column label="境内工作天数" prop="person.idtype"></el-table-column>
          <el-table-column label="境外工作天数" prop="person.idtype"></el-table-column>
          <el-table-column label="境内支付" prop="person.idtype"></el-table-column>
          <el-table-column label="境外支付" prop="person.idtype"></el-table-column>-->
        </el-table>
        <el-table
          v-show="tabActiveName == 'YearAwards'"
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          :row-key="getRowKeys"
          :cell-class-name="tableCellClassName"
          :data="tableData"
        >
          <el-table-column label="姓名" prop="person.name">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.person.idno" placement="bottom-end">
                <el-button type="text" @click="handleTaxUpdate(scope.row)">{{scope.row.person.name}}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="是否申报" prop="total.tax">
            <template slot-scope="scope">
              <el-checkbox :v-model="true"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="全年一次性奖金额" prop="yearAwards.收入" sortable></el-table-column>
          <el-table-column label="免税收入" prop="date" sortable></el-table-column>
          <el-table-column label="其他" prop="provider.name"></el-table-column>
          <el-table-column label="准予扣除的捐赠额" prop="total.tax"></el-table-column>
          <el-table-column label="减免税额" prop="total.tax"></el-table-column>
          <el-table-column label="备注" prop="total.tax"></el-table-column>
        </el-table>
      </span>
    </e-page-list-layout>
  </div>
</template>

<script>
import PgUp from '../../components/PgUp'
const FormPerson = () => import('./components/FormPerson')
const FormTax = () => import('./components/FormTax')
const CreateFormPersonPopup = $mixins.popupManager.$('createPerson', FormPerson)
const UpdateFormPersonPopup = $mixins.popupManager.$('updatePerson', FormPerson)
const CreateFormTaxPopup = $mixins.popupManager.$('createTax', FormTax)
const UpdateFormTaxPopup = $mixins.popupManager.$('updateTax', FormTax)

export default {
  components: {
    PgUp,
    CreateFormPersonPopup,
    UpdateFormPersonPopup,
    CreateFormTaxPopup,
    UpdateFormTaxPopup
  },
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
  data () {
    return {
      showStepDiv: false,
      forciblyDialogVisible: false,
      formForcibly: {
        status: '',
        des: ''
      },
      imgSrc: '',
      visible: false,

      selectIndex: 20,
      personTotal: {
        sum: '',
        amount: '',
        tax: ''
      },
      declareStatus: '',
      declareBtnType: '',
      taxType: this.znData.taxType.taxPersonal,
      tabActiveName: 'Person',
      selectCompanyId: '',
      isShowCrawlerList: false,
      selectModules: this.znData.modulesMapping.AccauxPurchase,

      keyWork: '',
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
      let params1 = { cond: { 'period.y': period.y, 'period.m': period.m }, select: 'person taxes yearAwards mark active updatedAt result joinTax source' }
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
        if (res.code !== 0) this.$message({ message: (res.msg && res.msg[0]) ? res.msg[0].msg : '复制失败', type: 'warning' })
      }, params)
    },

    // 查看申报截图
    handleClicCheckIamge () {
      let period = this.Utils.getStorePeriodObj(this)
      let params = { period: { 'y': period.y, 'm': period.m }, company: this.selectCompanyId }
      let url = '/api/zn/taxes/p/image'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        if (res.code === 0 && res.data && res.data.image) {
          this.visible = true
          this.imgSrc = res.data.image
        } else {
          this.$message('没有申报截图')
        }
      }, params)
    },

    // 执行规则
    handleRule () {
      let params = { service: 'accaux-rule', payload: { company: this.selectCompanyId, model: 'AccauxPayroll', type: 'tax', _id: null } }
      let url = '/api/zn/do'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        if (res.code === 0) {
          console.log('asd')
        }
      }, params)
    },

    // 统计
    handleStatistics () {
      let { y, m } = this.Utils.getStorePeriodObj(this)
      let params = {
        service: 'taxes-form',
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
        if (res.code === 0) {
          console.log('asd')
        }
      }, params)
    },
    // 新建
    handleCreate () {
      this.pushOpen('create' + this.tabActiveName)
    },
    // 修改人员信息
    handlePersonUpdate (row) {
      this.pushOpen('updatePerson', row)
    },

    // 强行处理状态
    handleForciblyStatus () {
      this.forciblyDialogVisible = false
    },
    // 修改工资信息
    handleTaxUpdate (row) {
      this.pushOpen('updateTax', row)
    },
    // 切换 tab
    handleClickTabs () {
    },
    // 申报排队撤回
    handleDeclareBack () {
    },
    // 扣款排队撤回
    handlePayBack () {
    },
    // 再报
    handleDeclareAgain () {
    },
    // 再扣
    handlePayAgain () {
    },
    // 作废
    handleDeclareOff () {
    },
    // 切换申报进度
    handleClickArrow () {
      this.showStepDiv = !this.showStepDiv
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
      let model = this.$store.state.tax_or_acc ? 'taxPurchase' : 'accPurchase'

      this.$router.push({ path: command + model, query: { companyId: this.selectCompanyId } })
    },
    handleCommandTax (command) {
      this.$message('click on item ' + command)
      if (command === 'addPerson') {
        this.handleCreate()
      } else if (command === 'forcibly') {
        this.forciblyDialogVisible = !this.forciblyDialogVisible
      }
    },
    handleCommandAcc (command) {
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
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getRowKeys: (row) => {
      return row._id
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
    tableData (value) {
      const search = this.keyWork
      if (search) {
        return this.pageData.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      if (this.tabActiveName === 'NonResident') {
        return this.pageData.data.reduce((arr, data) => {
          if (data.person.idtype !== '居民身份证') arr.push(data)
          return arr
        }, [])
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
.taxPersonal-index {
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
  .form-search {
    margin-top: -6px;
  }

  .operating-area {
    padding-top: 10px;
    padding-right: 10px;
    text-align: right;
    em {
      font-size: 1.2rem;
      color: red;
    }
    i {
      font-size: 1.2rem;
    }
  }
  .el-tabs {
    margin-top: -4px;
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
