<template>
  <ms-frame-layout title="后台管理系统" :menus="menus">
    <template slot="logo" slot-scope="scope">
      <i :style="`font-size:${scope.isCollapse?14:26}px;font-style:normal;`">LOGO</i>
    </template>
    <div slot="title" class="e-frame-layout--nav-item">
      <el-tag size="small" v-if="qualification === 1">一般</el-tag>
      <el-tag size="small" v-if="qualification === 2">小规模</el-tag>
      {{selectCompanyId}}
      <el-popover placement="bottom-start" width="260" trigger="hover">
        <div>
          <div style=" text-align: right;">
            <el-link
              type="primary"
              href="https://etax.shenzhen.chinatax.gov.cn/bszm-web/apps/views/beforeLogin/indexBefore/pageIndex.html#/?taxId=91440300697101134F&pw=asdasdf"
              target="_blank"
            >进入税局</el-link>|
            <el-link type="primary">寄快递(EMS)</el-link>
          </div>
          <div>
            公司简介和必要得字段这个后面
            如果是 管理员 显示 专员名字
          </div>
        </div>
        <el-select
          slot="reference"
          class="w150"
          placeholder="请选择要操作的公司"
          size="small"
          filterable
          :filter-method="filterMethod"
          v-model="selectCompanyId"
          @change="handleSelect"
        >
          <el-option v-for="item in allCompanies" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-popover>
      <el-date-picker
        @change="handleChangePeriod"
        :clearable="false"
        class="main-period"
        v-model="period"
        size="small"
        type="month"
        placeholder="操作属期"
      ></el-date-picker>
      <el-switch size="mini" v-model="type" active-text="报税" inactive-text="记账" @change="handleSwitch"></el-switch>
    </div>
    <div slot="nav" class="nav">
      <div class="e-frame-layout--nav-item">
        <router-link class="e-frame-layout--nav-trigger" :to="{path:'/message', query: {state: '1'}}">
          <icon>&#xe60c;</icon>消息
        </router-link>
      </div>
      <div class="e-frame-layout--nav-item">
        <a class="e-frame-layout--nav-trigger">
          <icon>&#xe604;</icon>
          {{$store.state.user? ($store.state.user.person ? $store.state.user.person.name: '请登录') : '请登录'}}
        </a>
      </div>
      <div class="e-frame-layout--nav-item">
        <span class="e-frame-layout--nav-trigger" @click="handleLogout">
          <icon>&#xe6a9;</icon>退出
        </span>
      </div>
    </div>
  </ms-frame-layout>
</template>

<script>

import visitor from '@/visitor/index'

export default {
  data () {
    return {
      allCompanies: this.$store.state.allCompanies,
      type: true,
      menus: visitor.visitor1.menus,
      qualification: 0
    }
  },
  methods: {
    // 选择公司
    handleSelect () {
      this.$store.commit('SELECT_COMPANY_ID', this.selectCompanyId)
      let routerPath = this.$route.path
      this.$router.push({ path: routerPath, query: { companyId: this.selectCompanyId } })

      this.allCompanies = this.$store.state.allCompanies // 必须的因为搜索的时候 allCompanies发生了改变
    },
    // 选择属期
    handleChangePeriod (e) {
      let period = this.Utils.strTime2PeriodObj(e)
      let routerPath = this.$route.path
      this.$router.push({ path: routerPath, query: { companyId: this.selectCompanyId, period } })
    },
    // 切换 报税和记账
    handleSwitch () {
      this.$message({
        type: 'warning',
        duration: 2000,
        showClose: true,
        message: this.type ? ' 报税月份：2020-07' : ' 记账月份：2020-07'
      })
      this.$store.commit('TAX_OR_ACC', this.type)
      if (this.type) {
        // this.menus = visitor.visitor1_acc.menus
      } else {
        // this.menus = visitor.visitor1_tax.menus
      }
    },
    handleLogout () {
      this.$router.push({
        path: '/signin'
      })
    },
    // 公司搜索过滤
    filterMethod (keyWork) {
      if (/[a-z]/i.test(keyWork)) {
        let scl = this.$store.state.allCompanies
        keyWork = keyWork.toUpperCase()
        let filterItmes = this._.filter(scl, (e) => { return e.py.indexOf(keyWork) !== -1 })
        this.allCompanies = JSON.parse(JSON.stringify(filterItmes))
        return filterItmes
      } else if (keyWork) {
        let scl = this.$store.state.allCompanies
        let filterItmes = this._.filter(scl, (e) => { return e.label.indexOf(keyWork) !== -1 })
        this.allCompanies = JSON.parse(JSON.stringify(filterItmes))
      } else {
        this.allCompanies = this.$store.state.allCompanies
      }
    }
  },
  computed: {
    selectCompanyId: {
      get () {
        return this.$store.state.selectCompanyId
      },
      set (value) {
        this.$store.commit('SELECT_COMPANY_ID', value)
      }
    },
    period: {
      get () {
        return this.$store.state.period
      },
      set (value) {
        let period = value.getFullYear() + '-' + (value.getMonth() + 1)
        this.$store.commit('PERIOD', period)
      }
    },
    tax_or_acc: {
      get () {
        return this.$store.state.tax_or_acc
      },
      set (value) {
        this.$store.commit('TAX_OR_ACC', value)
      }
    }
  },
  watch: {
    selectCompanyId: function SC (v) {
      let all = this.$store.state.allCompanies
      let arr = this._.filter(all, (e) => { return e.value === v })
      this.qualification = this._.get(arr[0], 'item.category.qualification')
      if (!this.qualification) this.qualification = this._.get(arr[0], 'item.qualification')
    }
  }
}
</script>

<style lang="scss">
.ms-frame-layout{
  height:100vh;
  max-height:100vh;
}
.main-index {
  .main-period {
    max-width: 114px;
  }
  .el-popover-title {
    text-align: right !important;
  }
  .nav {
    .e-frame-layout--nav-item {
      .e-frame-layout--nav-trigger {
        padding: 0 2px;
      }
    }
  }
}
</style>
