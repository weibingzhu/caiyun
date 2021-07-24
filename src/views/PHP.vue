<template>
<!--
  单击‘本月数据’客户的未报数据 ， 刷新下面的‘我的客户’，再在‘我的客户’列表中，单击调到对应模块
  切换报税和会计的页面
-->
  <ms-page-list-layout class="data-adopt">
    <template slot="search">
      <el-row>
        <el-col :span="14">
          <e-section title="个人统计">
            <el-row>
              <el-col :span="8">
                <el-avatar :size="80" :src="circleUrl"></el-avatar>韦小宝
                <span>报税专员</span>
              </el-col>
              <el-col :span="8">
                历史数据：
                <el-row>
                  <el-col :span="12">个税</el-col>
                  <el-col :span="12">1245万家</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">一般人增值税</el-col>
                  <el-col :span="12">1245万家</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">小规模增值税</el-col>
                  <el-col :span="12">1245万家</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">企业季报</el-col>
                  <el-col :span="12">124万家</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">企业年报</el-col>
                  <el-col :span="12">124万家</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                本月数据：
                <el-row>
                  <el-col :span="12">个税</el-col>
                  <el-col :span="12">124家已报（12未报）</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">一般人增值税</el-col>
                  <el-col :span="12">124家已报（12未报）</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">小规模增值税</el-col>
                  <el-col :span="12">124家已报（12未报）</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">企业季报</el-col>
                  <el-col :span="12">124家已报（12未报）</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">企业年报</el-col>
                  <el-col :span="12">124家已报（12未报）</el-col>
                </el-row>
              </el-col>
            </el-row>
          </e-section>
        </el-col>
        <el-col :span="10">
          <e-section title="每天统计">
            <div slot="action">
              <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
            </div>
            <chart-line-smooth :option="chart.lineSmoothMonth" style="height:200px" />
          </e-section>
        </el-col>
      </el-row>
    </template>

    <e-section title="我的客户" slot="table">
      <div slot="action">
        <!-- <el-input placeholder="请输入关键字" ></el-input> -->
        <el-switch size="mini" active-text="已报" inactive-text="未报"></el-switch>
        <el-select placeholder="关键字" size="small" filterable multiple v-model="query.status">
          <el-option v-for="item in znData.autoTaskStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
      </div>
      <el-table
        style="width: 100%"
        stripe
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        :cell-class-name="tablePersonalCellClassName"
        @row-dblclick="handleRowDblclick"
        :data="tableData"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="exChangeHeandler"
      >
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
    </e-section>
  </ms-page-list-layout>
</template>

<script>
import ChartLineSmooth from '@/views/components/chart/LineSmooth'
import MultiName from '@/views/components/MultiName'
import pyfl from 'pyfl'

export default {
  mixins: [
    ms.mixins.pageList
  ],
  components: {
    MultiName,
    ChartLineSmooth
  },
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      forciblyDialogVisible: false,
      formForcibly: {
        status: '',
        des: ''
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
        select: '_id person status declareType company isCurrent errorNum',
        ...this.$route.query
      }),

      expands: [],
      expandsTestIndex: -1,
      pageData: {
        count: 0,
        data: []
      },
      chart: {
        lineSmoothMonth: {
          xAxis: {
            type: 'category',
            data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号']
          },
          // title: {
          //   text: '每天数据'
          // },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['个税', '增值税']
          },
          grid: {
            top: '4%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          series: [{
            name: '个税',
            data: [20, 32, 91, 34, 20, 30, 20],
            type: 'line',
            smooth: true
          },
          {
            name: '增值税',
            data: [20, 12, 61, 34, 90, 30, 12],
            type: 'line',
            smooth: true
          }]
        }
      }
    }
  },

  methods: {
    fetch (query = {}) {
      let params = JSON.parse(JSON.stringify(query))
      this.taxType = params.taxType || this.znData.taxType.taxPersonal
      params.period = params.period || this.Utils.getStorePeriodObj(this)

      let type = this.taxType === this.znDataTaxType.taxPersonal ? 'p' : (this.taxType === this.znDataTaxType.taxGeneral ? 'g' : (this.taxType === this.znDataTaxType.taxSmall ? 's' : 'c'))
      return this.UtilsAxios.handleFetchPost(`/api/zn/taxes/${type}/agent`, (res) => {
        // return this.UtilsAxios.handleFetchPost(`/api/zn/taxes/p/agent`, (res) => {
        // let name = this.$options.filters['filterName'](item.customer.name)
        // let py = pyfl(name)
        // let scl = res.data.map(item => { return { value: item.company._id, label: item.company.name, item } })
        let temp = []
        for (const item of res.data) {
          let name = this.$options.filters.filterName(item.company.name)
          let py = pyfl(name)
          temp.push({ value: item.company._id, label: item.company.name, py, item }) // TODO item 有多余的数据
        }
        this.$store.commit('ALL_COMPANIES', temp)

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

          item['qualification'] === 1 ? ++this.total.gSum : ++this.total.sSum
        }
        this.pageData.count = res.data.length
        res.data.length = 50
        this.pageData.data = res.data
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
      let type = this.$store.state.tax_or_acc ? 'tax' : 'acc'
      if (this.taxType === this.znData.taxType.taxPersonal) {
        this.$router.push({ path: '/data/personal', query: { companyId: row.company._id } })
      } else if (this.taxType === this.znData.taxType.taxGeneral) {
        this.$router.push({ path: `/data/general/${type}Purchase`, query: { companyId: row.company._id } })
      }
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

    handleTab (tab, event) {
      this.taxType = tab.name
      this.fetch({ ...this.query, ...{ taxType: this.taxType } })
      this.keyWork = ''
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
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
.data-adopt {
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

  .operating-area {
    padding-right: 10px;
  }
  .e-page-list-layout--table {
    margin-top: -10px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    // color: #;
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
