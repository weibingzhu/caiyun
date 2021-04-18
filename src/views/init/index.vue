<template>
  <div class="init">
    <el-tabs v-model="initType" @tab-click="handleTab">
      <el-tab-pane label="公司参数" name="company-parameter"></el-tab-pane>
      <el-tab-pane label="会计科目" name="account-item"></el-tab-pane>
      <el-tab-pane label="扩展科目" name="expand-item"></el-tab-pane>
    </el-tabs>
    <div v-if="initType === 'company-parameter'">
      <e-section title="派伯斯食品（深圳）有限公司">
        <el-divider content-position="left">公司信息</el-divider>
        <div slot="action">
          <el-button size="small">取消</el-button>
          <el-button size="small">重置</el-button>
          <el-button size="small">保存</el-button>
          <el-button size="small">上传excel</el-button>
          <el-button size="small">下载模板</el-button>
        </div>
        <el-form :inline="true">
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司全称" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会信用代码" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="key_word"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册日期" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="纳税人资格" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册类型" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="key_word"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营行业" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">账务属性</el-divider>
        <el-form :inline="true">
          <el-row>
            <el-col :span="8">
              <el-form-item label="经营行业" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="记账类型" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会计制度" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="成本要求" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据要求" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">税务属性</el-divider>
        <el-form :inline="true">
          <el-row>
            <el-col :span="8">
              <el-form-item label="办税人员" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="绑定手机" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税局密码" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="个税登录方式" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                  <el-option v-for="item in znData.bookkeepingType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税号密码" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>等等
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">报表设置</el-divider>
        <el-form :inline="true">
          <el-form-item label="资产负债表" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
            <el-radio-group v-model="radio">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
              <el-radio :label="9"> </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">财务指标</el-divider>
        <el-form :inline="true" class="el-form-label-width">
          <el-row>
            <el-col :span="6">
              <el-form-item label="年预计收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年利润要求" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="key_word"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="增值税税负" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所得税税负" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="总资产增加" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="净资产增加" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="资产负债率" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="key_word"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="成本费用利润率" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="企业年度计划" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">结转比例</el-divider>
        <el-form :inline="true" class="el-form-label-width">
          <el-row>
            <el-col :span="6">
              <el-form-item label="内销商品收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="外销商品收入" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
                <el-input v-model.trim="key_word"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提供劳务收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提供服务收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="建造合同收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="让渡资产使用权收入" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
                <el-input v-model.trim="title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">初值化科目映射表</el-divider>不应该在这个页面
      </e-section>
    </div>
    <div v-else-if="initType === 'account-item'">
      <e-section title="派伯斯食品（深圳）有限公司">
        <div slot="action">
          <el-button size="small">清空初值化内容</el-button>
          <el-button size="small">上传数据</el-button>
          <el-button size="small">刷新</el-button>
        </div>
        <el-table
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
          <el-table-column label="进项" prop="qualification" min-width="10%" sortable>123456.23</el-table-column>
          <el-table-column label="销售" prop="qualification" min-width="10%" sortable>234567.13</el-table-column>
          <el-table-column label="个税" prop="taxPersonal" min-width="10%">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="11:12 12:12:01" placement="top-start">
                <span>
                  {{znData.taxStatus[scope.row.taxPersonal] }}
                  <i class="el-icon-picture-outline" />
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="增值税" prop="addTax" min-width="10%">
            <template slot="header" slot-scope="scope">增值税{{total.a.curr}}/{{total.a.pay}}</template>
            <template
              slot-scope="scope"
            >{{scope.row.qualification === 1 ? znData.taxStatus[scope.row.addTax.taxGeneral] : znData.taxStatus[scope.row.addTax.taxSmall] }}</template>
          </el-table-column>
          <el-table-column label="企所税" prop="taxCompany" min-width="10%">
            <template slot="header" slot-scope="scope">企所税{{total.c.curr}}/{{total.c.pay}}</template>
            <template slot-scope="scope">{{znData.taxStatus[scope.row.taxCompany] }}</template>
          </el-table-column>
          <el-table-column label="其他税" prop="qualification" min-width="10%" />
          <el-table-column label="其他税" prop="qualification" min-width="10%" />
          <!-- <el-table-column label="操作员" prop="operatorNames" min-width="10%" /> -->

          <!-- <el-table-column label="操作" fixed="right" min-width="10%">
            <template slot-scope="scope">
              <el-button type="text"  @click="$router.push({path: ''})">继续</el-button>
              <el-button type="text"  @click="$router.push({path: ''})">回退</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </e-section>
    </div>
    <div v-else-if="initType === 'expand-item'">
      <e-section title="派伯斯食品（深圳）有限公司">
        <div slot="action">
          <el-button size="small">刷新</el-button>
        </div>asdf
      </e-section>
    </div>
  </div>
</template>

<script>

export default {
  mixins: [
    $mixins.pageList
  ],
  beforeRouteLeave (to, from, next) {
    alert('aaa')
    next()
  },
  data () {
    return {
      title: '',
      key_word: 'a',
      radio: '',
      initType: 'company-parameter',
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
        // period: {y: 2020, m: 10},
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
        // debugger
      }, params)
    },

    handleRowDblclick (row, column, event) {
      debugger
      this.$router.push({ path: `/data/${this.taxType}`, query: { companyId: row.company._id } })
    },

    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 7 && this.znData.paySuccessStatus.includes(row.taxCompany)) {
        return 'paysuccess'
      } else if (row && columnIndex === 6 && (this.znData.paySuccessStatus.includes(row.addTax.taxGeneral) || this.znData.paySuccessStatus.includes(row.addTax.taxSmall))) {
        return 'paysuccess'
      } else if (row && columnIndex === 5 && this.znData.paySuccessStatus.includes(row.taxPersonal)) {
        return 'paysuccess'
      } else if (row && columnIndex === 5 && this.znData.declareSuccessStatus.includes(row.taxPersonal)) {
        return 'declaresuccess'
      } else if (row && columnIndex === 6 && (this.znData.declareSuccessStatus.includes(row.addTax.taxGeneral) || this.znData.declareSuccessStatus.includes(row.addTax.taxSmall))) {
        return 'declaresuccess'
      } else if (row && columnIndex === 7 && this.znData.declareSuccessStatus.includes(row.taxCompany)) {
        return 'declaresuccess'
      }
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
      var that = this
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
.init {
  .el-divider {
    font-weight: bold;
  }
  .el-tabs {
    background-color: white;
    padding: 0px 14px;
  }
  .e-section {
    padding: 0px 14px;
    .e-section--header {
      margin-bottom: 0px;
    }
  }
  .operating-area {
    position: absolute;
    right: 12px;
  }
  .el-form {
    .el-form-item {
      width: 100%;
      margin-bottom: 18px;
    }
    .el-form-item__label {
      width: 27%;
    }
    .el-form-item__content {
      width: 72%;
      .el-input {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
  }

  .el-form-label-width {
    .el-form-item__label {
      width: 49%;
    }
    .el-form-item__content {
      width: 50%;
      .el-input {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
  }
}
</style>
