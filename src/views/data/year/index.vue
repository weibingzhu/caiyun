<template>
  <div class="company-inex">
    <e-page-list-layout>
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
        <el-button-group v-if="$store.state.tax_or_acc" class="all-module" style="display:flex; padding: 10px">
          <el-badge :value="12" class="item">
            <el-button class="width: 100%" ref="btnPurchase" size="small" @click="handleClickModule('Purchase')" @dblclick="handleDblClickModule('Purchase','进项')">进项</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnSales" size="small" @click="handleClickModule('Sales')">销项</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnPurchaseCustoms" size="small">海关缴款书</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnSalesCustoms" size="small">海关报关单</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnManualBil" size="small" @dblclick="handleDbClickManualBil">手工票据</el-button>
          </el-badge>
          <icon class="el-icon-caret-right"/>
          <el-badge value="" class="item">
            <el-tooltip class="item" effect="dark" content="asd fjaldsfj asdfasdfasdfsa" placement="bottom-end">
              <el-button class="w-100" ref="btnManualBil" size="small" type="primary" @click="headleCreateTabale">生成税表</el-button>
            </el-tooltip>
          </el-badge>
        </el-button-group>
        <el-button-group v-else class="all-module" style="display:flex; padding: 10px">
          <el-badge :value="12" class="item">
            <el-button class="width: 100%" ref="btnPurchase" size="small" @click="handleClickModule('Purchase')">进项</el-button>
          </el-badge>
          <el-badge :value="12" class="item">
            <el-button class="w-100" ref="btnSales" size="small" @click="handleClickModule('Sales')">销项</el-button>
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
      </template>
      <div slot="table">
        <router-view :key="$route.path"></router-view>
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
      this.$store.commit('SELECT_COMPANY_ID', this.selectCompanyId)
      // let type = this.$store.state.tax_or_acc ? 'tax' : 'acc'
      // let module = query.module || 'Purchase'
      // this.$router.push({ path: `/data/general/${type}${module}`, query: { companyId: this.selectCompanyId } })
    },
    handleClickModule (module) {
      this.selectModules = module
      let type = this.$store.state.tax_or_acc ? 'tax' : 'acc'
      let path = `/data/general/${type}${module}`
      let query = {companyId: this.selectCompanyId, module}
      this.$router.push({ path, query })
    },

    /**
     * 双击确认无数据
     */
    handleDblClickModule (module, name) {
      console.log('asdf')
    },

    /**
     * 切换头部的面包屑
     */
    handleTaxCommand (command) {
      this.$router.push({ path: command, query: {companyId: this.selectCompanyId} })
    },

    // 税表
    headleCreateTabale () {
      this.$router.push({ path: `/data/general/tableGeneral`, query: {companyId: this.selectCompanyId} })
    },
    handleDbClickManualBil () {
      console.log('asdf')
    }
  }
}
</script>

<style lang="scss">
.company-inex {
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
}
</style>
