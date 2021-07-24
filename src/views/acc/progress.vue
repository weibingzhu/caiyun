<template>
  <div class="tax-propress">
    <e-page-list-layout>
      <!-- <el-breadcrumb slot="breadcrumb" separator-class="el-icon-arrow-right" style="top: -26px; border-top-color: white;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >数据采取</el-breadcrumb-item>
      </el-breadcrumb> -->
      <template slot="search">
        <el-tabs v-model="taxType" type="card" @tab-click="handleTab">
          <!-- <el-tab-pane :label="'个税'+total.sum+'家'" name="taxPersonal"></el-tab-pane>
          <el-tab-pane :label="'增值税(一般纳税人)'+total.gSum+'家'" name="taxGeneral"></el-tab-pane>
          <el-tab-pane :label="'增值税(小规模)'+total.sSum+'家'" name="taxSmall"></el-tab-pane> -->
          <el-tab-pane label="个税" name="taxPersonal"></el-tab-pane>
          <el-tab-pane label="增值税(一般纳税人)" name="taxGeneral"></el-tab-pane>
          <el-tab-pane label="增值税(小规模)" name="taxSmall"></el-tab-pane>
          <el-tab-pane label="企业所得税" name="taxCompany"></el-tab-pane>
        </el-tabs>

        <el-form slot="search"
          v-bind="getFormProps()"
          @submit.native.prevent="handleSubmit">
          <!-- <div class="step">
            <el-steps :active="4" simple>
              <el-step title="步骤1" icon="el-icon-edit">
                <template slot="title" slot-scope="scope">
                  <div>准备</div>
                  <div>待统计</div>
                  <div>统计完毕  统计</div>
                  <div>统计异常  统计</div>
                </template>
              </el-step>
              <el-step title="步骤 2" icon="el-icon-upload">
                <template slot="title" slot-scope="scope">
                  <div>报税</div>
                  <div>排队中 撤销</div>
                  <div>报税成功 作废</div>
                  <div>报税异常 再报</div>
                </template>
              </el-step>
              <el-step title="步骤 3" icon="el-icon-picture">
                <template slot="title" slot-scope="scope">
                  <div>扣款</div>
                  <div>排队中 撤销</div>
                  <div>扣款成功 作废</div>
                  <div>扣款异常 再扣</div>
                </template>
              </el-step>
            </el-steps>
          </div> -->
          <el-form-item label="时间">
            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <!-- <el-button native-type="submit" size="small">搜索</el-button>
          <span class="operating-area" v-if="taxType === 'taxPersonal'">
            <el-button size="small">复制上月</el-button>
            <el-button size="small">执行规则</el-button>
            <el-button size="small">计算</el-button>
            <el-button size="small">一键报税</el-button>
          </span>
          <span class="operating-area" v-else-if="taxType === 'taxCompany'">
            <el-button size="small">yyy</el-button>
            <el-button size="small">yyy</el-button>
            <el-button size="small">yyy</el-button>
            <el-button size="small">yyy</el-button>
          </span>
          <span class="operating-area" v-else-if="taxType === 'taxGeneral'">
            <el-button size="small">提取状态</el-button>
            <el-button size="small">进项项提取</el-button>
            <el-button size="small">一键报税</el-button>
          </span>
          <span class="operating-area" v-else-if="taxType === 'taxSmall'">
            <el-button size="small" >xxxx</el-button>
            <el-button size="small">xxxx</el-button>
            <el-button size="small">xxxx</el-button>
            <el-button size="small">xxxx</el-button>
          </span>
          -->
        </el-form>
      </template>
      <el-table slot="table"
        style="width: 100%"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row

        :row-key='getRowKeys'
        :expand-row-keys="expands"
        @expand-change="exChangeHeandler"

        :cell-class-name="tableCellClassName"
        @row-dblclick = "handleRowDblclick"

        :data="tableData">

        <el-table-column type="selection"  min-width="4%"/>
        <el-table-column label="公司" prop="qualification" align="left" fixed min-width="20%"
          :filters="[{text: '一般纳税人', value: 1}, {text: '小规模', value: 2}]"
          :filter-method="filterHandler">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.companyName" placement="top-start">
              <span> {{scope.row.companyName | filterName}}</span>
            </el-tooltip>
            <el-tag size="mini" v-if="scope.row.qualification === 1">一般</el-tag>
            <el-tag size="mini" v-else>小规模</el-tag>
          </template>
        </el-table-column>
        <el-table-column type="expand"  min-width="2%" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- <el-form-item label="全称" style=" font-weight: bolder;">
                {{ props.row.companyName }}
              </el-form-item> -->
              <div style=" font-weight: bolder">
                <!-- {{ props.row.companyName }} -->
                个税税款 <span>1000</span>
                增值税税款 <span>1000</span>
                企业所得税款 <span>1000</span>
              </div>
              <div>
                <span style=" font-weight: bolder;">进项:</span>
                金额 <span>100</span>
                税额 <span>10</span>
                缴款书 <span>10</span>
                报关单 <span>10</span>
                留底 <span>125</span>
                ;
                <span style=" font-weight: bolder;">销项:</span>
                金额 <span>4515</span>
                税额 <span>1245</span>
                ;
                <span style=" font-weight: bolder;">银行对账单:</span>
                <span>4515</span>
                ;
                <span style=" font-weight: bolder;">工资:</span>
                金额 <span>4515</span>
                税额 <span>1245</span>
                ;
                <span style=" font-weight: bolder;">费用:</span>
                金额 <span>4515</span>
                税额 <span>1245</span>
                ;
                <span style=" font-weight: bolder;">手工票据:</span>
                金额 <span>4515</span>
                税额 <span>1245</span>
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
        <el-table-column label="进项" prop="qualification" min-width="10%" sortable>
          123456.23
        </el-table-column>
        <el-table-column label="销售" prop="qualification" min-width="10%" sortable>
          234567.13
        </el-table-column>
        <el-table-column label="个税" prop="taxPersonal" min-width="10%">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="11:12 12:12:01" placement="top-start">
              <span> {{znData.taxStatus[scope.row.taxPersonal] }} <i class="el-icon-picture-outline"/></span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="增值税" prop="addTax" min-width="10%">
          <template slot="header" slot-scope="scope">
            增值税{{total.a.curr}}/{{total.a.pay}}
          </template>
          <template slot-scope="scope">
            {{scope.row.qualification === 1 ?  znData.taxStatus[scope.row.addTax.taxGeneral] : znData.taxStatus[scope.row.addTax.taxSmall] }}
          </template>
        </el-table-column>
        <el-table-column label="企所税" prop="taxCompany" min-width="10%">
          <template slot="header" slot-scope="scope">
            企所税{{total.c.curr}}/{{total.c.pay}}
          </template>
          <template slot-scope="scope">
            {{znData.taxStatus[scope.row.taxCompany] }}
          </template>
        </el-table-column>
        <el-table-column label="其他税" prop="qualification" min-width="10%" />
        <el-table-column label="其他税" prop="qualification" min-width="10%" />
        <!-- <el-table-column label="操作员" prop="operatorNames" min-width="10%" /> -->

        <!-- <el-table-column label="操作" fixed="right" min-width="10%">
          <template slot-scope="scope">
            <el-button type="text"  @click="$router.push({path: ''})">继续</el-button>
            <el-button type="text"  @click="$router.push({path: ''})">回退</el-button>
          </template>
        </el-table-column> -->
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
      }, params)
    },

    handleRowDblclick (row, column, event) {
      this.$router.push({ path: `/data/${this.taxType}`, query: {companyId: row.company._id} })
    },

    tableCellClassName ({row, column, rowIndex, columnIndex}) {
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
.tax-propress {
  .operating-area{
    position: absolute;
    right: 12px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
      // color: #fff;
      font-weight: bolder;
      // background-color: #E1FFFF!important;
  }

  .el-table .declaresuccess{
    background: #d6f3f4;
    opacity:0.9;
  }
  .el-table .paysuccess{
    margin-left: 2px;
    background: #32c1ca;
    opacity:0.9;
  }
  .demo-table-expand div {
    margin: 6px;
  }
}
</style>
