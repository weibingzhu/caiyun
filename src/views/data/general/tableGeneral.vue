<template>
  <div class="general-tableGeneral">
    <e-page-list-layout>
      <el-form slot="search" style="text-align: right;" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-button size="small" @click="handleGoBack">返回</el-button>
        <el-button size="small">税表初值化</el-button>
        <icon class="el-icon-arrow-right" />
        <el-button size="small">计算</el-button>
        <icon class="el-icon-arrow-right" />
        <el-button size="small">保存</el-button>
        <icon class="el-icon-arrow-right" />
        <el-button size="small">统计</el-button>
        <icon class="el-icon-arrow-right" />
        <el-button size="small">报税</el-button>
        <el-dropdown size="small" @command="handleCommand">
          <el-button type="primary" size="small">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item commonad="asdf" v-if="$store.state.tax_or_acc">优先提取</el-dropdown-item>
            <el-dropdown-item>税表上传</el-dropdown-item>
            <el-dropdown-item>优先报税</el-dropdown-item>
            <el-dropdown-item>excel导出</el-dropdown-item>
            <el-dropdown-item>查看申报数据</el-dropdown-item>
            <el-dropdown-item>初值化数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form>
      <div slot="table">
        <el-tabs v-model="tableType" type="card" @tab-click="handleTab">
          <el-tab-pane label="附列资料三" name="1"></el-tab-pane>
          <el-tab-pane label="附列资料一" name="2"></el-tab-pane>
          <el-tab-pane label="附列资料二" name="3"></el-tab-pane>
          <el-tab-pane label="附列资料四" name="4"></el-tab-pane>
          <el-tab-pane label="增值税纳税申请表" name="5"></el-tab-pane>
          <el-tab-pane label="申报明细表" name="6"></el-tab-pane>
          <el-tab-pane label="附加税" name="7"></el-tab-pane>
        </el-tabs>
        <div class="div-tax-table">
          <!-- <el-table
            slot="table"
            style="width: 100%"
            :span-method="spanMethod"
            v-bind="getTableProps()"
            v-on="getTableListeners()"
            highlight-current-row
          >
            <el-table-column v-for="item in tableData" :key="item._" label="认证日期">
              <template slot-scope="scope">
                <span>
                  {{scope.row.item.A || scope.row.item.B || scope.row.item.B}}
                </span>
              </template>
            </el-table-column>
          </el-table>-->
          <table class="native-table">
            <tr v-for="(itemTr, indexTr) of tableData" :key="indexTr">
              <td
                v-for="(itemTd, indexTd) in itemTr"
                :key="indexTd"
                :rowspan="itemTd instanceof Object ? itemTd.rowspan : '1'"
                :colspan="itemTd instanceof Object ? itemTd.colspan : '1'"
                :align="itemTd instanceof Object ? itemTd.align : 'center'"
              >
                <!-- <span v-if="itemTd instanceof Object">
                  <span v-if="itemTd.editable == true">
                    <span v-if="itemTd.type == 'select'">
                      <select v-model="itemTd.value">
                        <option label="按月支付" value="m"></option>
                        <option label="按季支付" value="q"></option>
                        <option label="按年支付" value="y"></option>
                      </select>
                    </span>
                    <span v-else>
                      <input v-model="itemTd.value" />
                    </span>
                  </span>
                  <span v-else>{{itemTd.value}}</span>
                </span>
                <span v-else>{{itemTd}}</span>-->
                {{itemTd}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </e-page-list-layout>
  </div>
</template>
<script>
import table1Json from '../../../taxTableConfig/sz-test.json'
import table2Json from '../../../taxTableConfig/sz-test2.json'
export default {
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      t1: table1Json,
      t2: table2Json,
      tableData: table1Json.config,

      selectCompany: '',
      tableType: '1',
      query: this.getQuery({
      })
    }
  },

  methods: {
    fetch (query) {
      this.selectCompany = query.companyId
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
      this.$router.push({ path: `/data/general/${type}${this.module}`, query: { companyId: this.selectCompany, module: this.module } })
    },

    handleCommand (command) {
      this.$message('click on item ' + command)
    },

    handleTab (tab, event) {
      this.tableType = tab.name
      this.fetch(this.query)
    },

    // 跨行列
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      debugger
      return {
        rowspan: row.rowspan || 1,
        colspan: row.colspan || 1
      }
    },
    // 快捷键
    handleEvent (event) {
      if (event.keyCode === 65 || event.keyCode === 37) { // A 左
        this.tableType = (--this.tableType < 1 ? 7 : this.tableType) + ''
      } else if (event.keyCode === 68 || event.keyCode === 39) { // D 右
        this.tableType = (++this.tableType > 7 ? 1 : this.tableType) + ''
      }
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
.general-tableGeneral {
  .form-search {
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .el-tabs {
    margin-top: 0;
    padding: 0;
  }
  .div-tax-table {
    text-align: right;
    .native-table {
      //width: 100%;
      text-align: center;
      input {
        text-align: center;
      }
    }
  }
}
</style>
