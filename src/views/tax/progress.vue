<template>
  <div class="tax-propress">
    <e-page-list-layout>
      <template slot="search">
        <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
          <div class="step">
            <div class="left unSuccess">
              <chart-pie-doughnut :option="chart.optionTotal" style="height:110px" />
            </div>
            <div class="center">
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-row type="flex" align="middle">
                    <el-col>
                      <el-row class="item-status unSuccessLeft" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>未通知</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>通知</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status unSuccessLeft" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>已通知</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>再通知</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status unSuccessLeft" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>未回复</span>
                        </el-col>
                        <el-col :span="8">112</el-col>
                        <el-col :span="8">
                          <span>再通知</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status unSuccessLeft" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>已回复</span>
                        </el-col>
                        <el-col :span="8">1258</el-col>
                        <el-col :span="8">
                          <span>报税</span>
                        </el-col>
                      </el-row>
                    </el-col>
                    <icon class="el-icon-arrow-right" />
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row type="flex" align="middle">
                    <el-col>
                      <el-row class="item-status" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>未报税</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>报税</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>排队中</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>撤回</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>已报税</span>
                        </el-col>
                        <el-col :span="8">112</el-col>
                        <el-col :span="8">
                          <span>作废</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>报异常</span>
                        </el-col>
                        <el-col :span="8">1258</el-col>
                        <el-col :span="8">
                          <span>再报</span>
                        </el-col>
                      </el-row>
                    </el-col>
                    <icon class="el-icon-arrow-right" />
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row type="flex" align="middle">
                    <el-col>
                      <el-row class="item-status" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>处理中</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span></span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>作废中</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>撤回</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>已成功</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>再报</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>报异常</span>
                        </el-col>
                        <el-col :span="8">112</el-col>
                        <el-col :span="8">
                          <span>再作废</span>
                        </el-col>
                      </el-row>
                    </el-col>
                    <icon class="el-icon-arrow-right" />
                  </el-row>
                </el-col>
                <el-col :span="6">
                  <el-row type="flex" align="middle">
                    <el-col>
                      <el-row class="item-status success successRigth" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>未扣款</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>报税</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success successRigth" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>排队中</span>
                        </el-col>
                        <el-col :span="8">1</el-col>
                        <el-col :span="8">
                          <span>撤回</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success successRigth" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>已扣款</span>
                        </el-col>
                        <el-col :span="8">112</el-col>
                        <el-col :span="8">
                          <span>作废</span>
                        </el-col>
                      </el-row>
                      <el-row class="item-status success successRigth" type="flex" justify="space-between">
                        <el-col :span="8">
                          <span>扣异常</span>
                        </el-col>
                        <el-col :span="8">1258</el-col>
                        <el-col :span="8">
                          <span>再报</span>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div class="right success">
              <chart-pie-doughnut :option="chart.optionDeclare" style="height:110px" />
            </div>
          </div>
          <el-form-item label="时间">
            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
              <el-option v-for="item in znData.declareStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
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
        <el-table-column type="selection" />
        <el-table-column
          label="公司"
          prop="qualification"
          align="left"
          fixed
          min-width="100"
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
        <el-table-column label="报税通知" prop="qualification">123456.23</el-table-column>
        <el-table-column label="通知回复" prop="qualification">234567.13</el-table-column>
        <el-table-column label="个税" prop="taxPersonal">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="11:12 12:12:01" placement="top-start">
              <span>
                {{znData.taxStatus[scope.row.taxPersonal] }}
                <i class="el-icon-picture-outline" />
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="增值税" prop="addTax">
          <template slot="header" slot-scope="scope">增值税{{total.a.curr}}/{{total.a.pay}}</template>
          <template
            slot-scope="scope"
          >{{scope.row.qualification === 1 ? znData.taxStatus[scope.row.addTax.taxGeneral] : znData.taxStatus[scope.row.addTax.taxSmall] }}</template>
        </el-table-column>
        <el-table-column label="企所税" prop="taxCompany">
          <template slot="header" slot-scope="scope">企所税{{total.c.curr}}/{{total.c.pay}}</template>
          <template slot-scope="scope">{{znData.taxStatus[scope.row.taxCompany] }}</template>
        </el-table-column>
        <el-table-column label="其他税" prop="qualification" />
        <el-table-column label="数据状态" prop="qualification" />
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
import ChartPieDoughnut from '@/views/components/chart/PieDoughnut'
export default {
  mixins: [
    $mixins.pageList
  ],
  components: {
    ChartPieDoughnut
  },
  data () {
    return {
      chart: {
        optionTotal: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: false,
            top: '5%',
            left: 'center'
          },
          series: [
            {
              // name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                fontSize: '18',
                position: 'center',
                formatter: function (params) { // 默认显示第一个数据
                  return '1245'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: '未通知' },
                { value: 735, name: '已通知' },
                { value: 580, name: '未回复' },
                { value: 484, name: '已回复' },
                { value: 300, name: '排队中' },
                { value: 300, name: '申报异常' }
              ]
            }
          ]
        },
        optionDeclare: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: false,
            top: '5%',
            left: 'center'
          },
          series: [
            {
              // name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                fontSize: '18',
                position: 'center',
                formatter: function (params) {
                  return '1245'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 300, name: '申报成功' },
                { value: 100, name: '扣款成功' },
                { value: 2, name: '扣款异常' },
                { value: 0, name: '作废异常' }
              ]
            }
          ]
        }
      },
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
  .form-search {
    margin-top: 0px;
    .el-form-item {
      margin-top: 10px;
      margin-bottom: 0px;
    }
  }
  .step {
    align-items: center;     /* 垂直居中 */
    display: flex;
    height: 110px;
    background-color: #a1e2e733;
    // background: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='30%25' font-size='24' fill-opacity='0.5' text-anchor='middle' dominant-baseline='middle' transform='rotate(-45, 100 100)'%3E文字底图%3C/text%3E%3C/svg%3E");
    // & .el-col {
    //   border-radius: 10px;
    //   background-color: #32c1ca;
    // }
    .item-status {
      background-color: #a1e2e766;
      border-radius: 10px;
      span {
        &:hover {
          cursor: pointer;
        }

      }
      & div:nth-child(2) {
        text-align: center;
      }
      & div:nth-child(3) {
        text-align: center;
      }
    }
    .unSuccess {
      background-color: #a1e2e766;
    }
    .success{
      background-color: #a1e2e7;
    }
    .successRigth {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .unSuccessLeft {
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
    }

    .el-icon-arrow-right {
      font-size: 1.4rem;
      font-weight: bolder;
      padding: 0 6px;
    }
    .left,
    .right {
      width: 110px;
    }
    .center {
      flex: 1;
      text-align: center;
      vertical-align: middle;
    }
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    font-weight: bolder;
  }

  .el-table {
    &.declaresuccess {
      background: #d6f3f4;
      opacity: 0.9;
    }
    & .paysuccess {
      margin-left: 2px;
      background: #32c1ca;
      opacity: 0.9;
    }
  }
  .demo-table-expand div {
    margin: 6px;
  }
}
</style>
