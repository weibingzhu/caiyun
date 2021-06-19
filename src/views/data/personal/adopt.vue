<template>
  <ms-page-list-layout class="personal-adopt">
    <template slot="search">
      <el-row>
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
      </el-row>
      <el-row type="flex" align="middle">
        <el-col>
          <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
            <el-form-item label="状态">
              <el-select placeholder="状态" size="small" filterable multiple v-model="query.qualification">
                <el-option v-for="item in znData.declareStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搜索">
              <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
            </el-form-item>
            <el-button size="small">搜索</el-button>
          </el-form>
        </el-col>
        <span>
          <el-tooltip class="item" effect="dark" content="系统会在每个月的1号凌晨自动复制上个月数据" placement="top-start">
            <el-button size="small">复制上月</el-button>
          </el-tooltip>
          <el-button size="small">数据检验</el-button>
          <el-button size="small">一键报税</el-button>
        </span>
      </el-row>
    </template>
    <el-table
      slot="table"
      style="width: 100%"
      stripe
      v-bind="getTableProps()"
      v-on="getTableListeners()"
      highlight-current-row
      :cell-class-name="tablePersonalCellClassName"
      @row-dblclick="handleRowDblclick"
      :data="tableData"
      :row-key="getRowKeys"
    >
      <!-- :expand-row-keys="expands"
      @expand-change="exChangeHeandler"-->
      <el-table-column type="selection" class-name="table-column-padding"></el-table-column>
      <el-table-column
        label="公司"
        prop="qualification"
        fixed
        :filters="[{text: '一般纳税人', value: 1}, {text: '小规模', value: 2}]"
        :filter-method="filterHandler"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.companyName" placement="top-start">
            <a
              v-bind:style="{ color: $store.state.selectCompanyIds.includes(scope.row.companyId)? '#00000088' : 'back' }"
              @click="handleClickCompanyName(scope.row)"
            >{{scope.row.companyName | filterName}}</a>
          </el-tooltip>
          <el-tag size="mini" v-if="scope.row.qualification === 1">一般</el-tag>
          <el-tag size="mini" v-else type="success">小规模</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="报税通知" prop="qualification">通知</el-table-column>
      <el-table-column label="客户回复" prop="qualification">OK</el-table-column>
      <el-table-column label="人数" prop="qualification">3</el-table-column>
      <el-table-column label="状态" prop="taxPersonal">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="成功申报家数/成功扣款家数" placement="top-start">
            <span>状态{{total.p.curr}}/{{total.p.pay}}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">{{znData.taxStatus[scope.row.taxPersonal] }}</template>
      </el-table-column>
      <el-table-column label="状态时间" prop="qualification" sortable>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="2020-20-10 12:12:45" placement="top-start">
            <span>2020-20-10</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="其他税" prop="qualification">
        <template slot-scope="scope">3/2</template>
      </el-table-column>
      <el-table-column label="操作员" prop="operatorNames">
        <template slot-scope="scope">
          <multi-name :namesStr="scope.row.operatorNames"></multi-name>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="qualification">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="作废 | 返回 | 强行处理" placement="top-start">
            <el-button type="text" @click="handleUpdate(scope.row)">操作</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
  </ms-page-list-layout>
</template>

<script>
import MultiName from '@/views/components/MultiName'
import ChartPieDoughnut from '@/views/components/chart/PieDoughnut'

export default {
  mixins: [
    ms.mixins.pageList
  ],
  components: {
    MultiName,
    ChartPieDoughnut
  },
  data () {
    return {
      forciblyDialogVisible: false,
      formForcibly: {
        status: '',
        des: ''
      },
      total: {
        sum: 0,
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
      query: this.getQuery({ // 初始化query查询条件数据，查询表单数据要绑定到query对象
        active: 'first',
        keyword: '',
        status: '',
        start: null,
        end: null,
        datetime: null,
        start_time: '',
        end_time: '',
        ...this.$route.query
      }),
      multipleSelectionProp: 'asdfasdf',

      expands: [],
      expandsTestIndex: -1,
      pageData: {
        count: 0,
        data: []
      },
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
      }
    }
  },

  methods: {
    fetch (query = {}) {
      let params = JSON.parse(JSON.stringify(query))
      params.period = params.period || this.Utils.getStorePeriodObj(this)
      this.UtilsAxios.handleFetchPost(`/api/zn/taxes/p/agent`, (res) => {
        this.total.sum = res.data.length

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
          item['companyId'] = item.company ? item.company._id : ''

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
        }
        res.data.length = 100 // TODO
        this.pageData.data = res.data
        this.pageData.count = 100
      }, params)
    },
    // 强行处理状态
    handleForciblyStatus (row) {
      this.forciblyDialogVisible = !this.forciblyDialogVisible
    },

    handleRowDblclick (row, column, event) {
      if (this.expands.length > 0) {
        this.expands = []
      } else {
        this.expands = [row.company._id]
      }
      // this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
    },
    handleClickCompanyName (row) {
      // let type = this.$store.state.tax_or_acc ? 'tax' : 'acc'
      this.$router.push({ path: '/data/personal/index', query: { companyId: row.company._id } })
    },
    tablePersonalCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 6 && this.znData.paySuccessStatus.includes(row.taxPersonal)) {
        return 'paysuccess'
      } else if (row && columnIndex === 6 && this.znData.declareSuccessStatus.includes(row.taxPersonal)) {
        return 'declaresuccess'
      }
    },
    tableGeneralCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 8 && (this.znData.paySuccessStatus.includes(row.addTax.taxGeneral))) {
        return 'paysuccess'
      } else if (row && columnIndex === 8 && (this.znData.declareSuccessStatus.includes(row.addTax.taxGeneral))) {
        return 'declaresuccess'
      }
    },
    tableSmallCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 6 && this.znData.paySuccessStatus.includes(row.addTax.taxSmall)) {
        return 'paysuccess'
      } else if (row && columnIndex === 6 && this.znData.declareSuccessStatus.includes(row.addTax.taxSmall)) {
        return 'declaresuccess'
      }
    },
    tableCompanyCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 5 && this.znData.paySuccessStatus.includes(row.taxCompany)) {
        return 'paysuccess'
      } else if (row && columnIndex === 5 && this.znData.declareSuccessStatus.includes(row.taxCompany)) {
        return 'declaresuccess'
      }
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
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

    handleExport () {

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
  }
}
</script>

<style lang="scss">
.personal-adopt {
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.5s;
  }
  .step {
    align-items: center; /* 垂直居中 */
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
    .success {
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

  .fade-enter,
  .fade-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

  .operating-area {
    padding-right: 10px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    // color: #;
    font-weight: bolder;
    // background-color: #E1FFFF!important;
  }
  .el-table {
    height: 100%;
    .declaresuccess {
      background: #d6f3f4;
      opacity: 0.9;
    }
    .paysuccess {
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
