<template>
  <div class="general-inex">
    <e-page-list-layout>
      <template slot="search">
        <el-button-group class="all-module" style="display:flex; padding: 10px">
          <el-badge class="item">
            <el-button
              v-bind:class="{selectModeule: selectModules === 'Purchase'}"
              ref="btnPurchase"
              size="small"
              @click="handleClickModule('Purchase')"
              @dblclick.native="handleDblClickModule('Purchase','进项')"
            >进项</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button
              ref="btnSales"
              v-bind:class="{selectModeule: selectModules === 'Sales'}"
              size="small"
              @click="handleClickModule('Sales')"
              @dblclick.native="handleDblClickModule('Sales','销项')"
            >销项</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button
              ref="btnPurchaseCustoms"
              v-bind:class="{selectModeule: selectModules === 'PurchaseCustoms'}"
              size="small"
              @click="handleClickModule('PurchaseCustoms')"
              @dblclick.native="handleDblClickModule('PurchaseCustoms','海关缴款书')"
            >海关缴款书</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button
              ref="btnSalesCustoms"
              v-bind:class="{selectModeule: selectModules === 'SalesCustoms'}"
              size="small"
              @click="handleClickModule('SalesCustoms')"
              @dblclick.native="handleDblClickModule('SalesCustoms','海关报关单')"
            >海关报关单</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button
              ref="btnManualBill"
              v-bind:class="{selectModeule: selectModules === 'ManualBill'}"
              size="small"
              @click="handleClickModule('ManualBill')"
              @dblclick.native="handleDblClickModule('ManualBill','手工票据')"
            >手工票据</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button
              ref="btnCharge"
              v-bind:class="{selectModeule: selectModules === 'Charge'}"
              size="small"
              @click="handleClickModule('Charge')"
              @dblclick.native="handleDblClickModule('Charge','手工票据')"
            >费用</el-button>
          </el-badge>
          <span>
            <icon class="el-icon-caret-right" />
          </span>
          <el-badge value class="item">
            <el-tooltip class="item" effect="dark" content="asd fjaldsfj asdfasdfasdfsa" placement="bottom-end">
              <el-button class="w-100" ref="btnManualBil" size="small" type="primary" @click="headleCreateTabale">生成税表</el-button>
            </el-tooltip>
          </el-badge>
        </el-button-group>
      </template>
      <div slot="table">
        <router-view :key="$route.path" class="sub-view"></router-view>
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
      isDbClick: '',
      selectModules: '',
      selectCompanyId: '',
      query: this.getQuery({
        qualification: '全部',
        name: '',
        operator: false,
        select: '_id person status declareType company isCurrent errorNum',
        ...this.$route.query
      })
    }
  },

  methods: {
    fetch (query) {
      this.selectCompanyId = query.companyId
      this.selectModules = query.module || 'Purchase'
      this.$store.commit('SELECT_COMPANY_ID', this.selectCompanyId)
      let period = query.period || this.Utils.getStorePeriodObj(this)
      let url = '/api/yzh/accaux/trace/search' // 所有模块的数据状态
      return this.UtilsAxios.handleFetchPost(url, (res) => {
        console.log('res', res)
      }, { cond: { company: this.selectCompanyId, 'period.m': period.m, 'period.y': period.y }, select: '_id company' })
    },

    /**
     * 切换模块数据
     */
    handleClickModule (moduleName) {
      clearTimeout(this.isDbClick) // 首先清除计时器
      this.isDbClick = setTimeout(() => {
        this.selectModules = moduleName
        let tax_or_acc = this.$store.state.tax_or_acc
        let path = `/data/${moduleName}`
        let query = { companyId: this.selectCompanyId, module: moduleName, tax_or_acc }
        this.$router.push({ path, query })
      }, 300) // 大概时间300ms
    },

    /**
     * 双击确认无数据
     */
    handleDblClickModule (module, name) {
      clearTimeout(this.isDbClick) // 清除
      console.log('asdf')
    },

    /**
     * 切换头部的面包屑
     */
    handleTaxCommand (command) {
      this.$router.push({ path: command, query: { companyId: this.selectCompanyId } })
    },

    // 税表
    headleCreateTabale () {
      this.$router.push({ path: `/data/general/tableGeneral`, query: { companyId: this.selectCompanyId } })
    }
  }
}
</script>

<style lang="scss">
.general-inex {
  .el-icon-caret-right {
    font-size: 1.6rem;
    line-height: 30px;
  }
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
    .selectModeule {
      font-size: 1.2rem;
      font-weight: bold;
      // color: white;
      background-color: #c2f6f8;
    }
  }
  // 子页面调整样式
  .sub-view {
    .e-page-list-layout {
      border-left: 0px !important;
      border-top: 0px !important;
    }
    .form-search {
      margin-left: 0px !important;
    }
    .e-page-list-layout--table {
      padding-left: 0px !important;
    }
  }
}
</style>
