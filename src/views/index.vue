<template>
  <ms-frame-layout title="后台管理系统" :menus="menus" class="home-index" :asideCollapse="false">
    <template slot="logo" slot-scope="scope">
      <div>
        <div>
          <el-image @dblclick="handleDblclickLogo" @click="handleClickLogo" style="width: 100%; height: 70px" src="/static/images/logo.jpg"></el-image>
        </div>
        <el-switch size="mini" v-model="type" active-text="报税" inactive-text="记账" @change="handleSwitch"></el-switch>
      </div>
    </template>
    <div slot="title" class="tittle">
      <!-- TODO -->
      <!-- <el-tag size="small" type="success" v-if="qualification === 1">一般人</el-tag> -->
      <!-- <el-tag type="success">一般人</el-tag> -->
      <!-- <el-tag size="small" else="qualification === 2">小规模</el-tag> -->
      <el-tag>小规模</el-tag>
      <!-- {{selectCompanyId}} -->
      <el-popover placement="bottom-start" width="300" trigger="hover">
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
          class="selectCompany"
          :style="'width:' + companyNameChars+ 'px'"
          slot="reference"
          placeholder="请选择要操作的公司"
          size="small"
          filterable
          :filter-method="filterMethod"
          v-model="selectCompanyId"
          @change="handleSelect"
        >
          <el-option v-for="item in allCompanies" :key="item.value" :label="item.label" :value="item.label"></el-option>
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
    </div>
    <div slot="nav" class="nav">
      <div class="e-frame-layout--nav-item">
        <router-link class="e-frame-layout--nav-trigger" :to="{path:'/message', query: {state: '1'}}">
          <icon>&#xe60c;</icon>消息
        </router-link>
      </div>
      <div class="e-frame-layout--nav-item">
        <router-link class="e-frame-layout--nav-trigger" :to="{path:'/php', query: {state: '1'}}">
          <icon>&#xe604;</icon>
          {{$store.state.user? ($store.state.user.person ? $store.state.user.person.name: '请登录') : '请登录'}}
        </router-link>
      </div>
      <div class="e-frame-layout--nav-item">
        <span class="e-frame-layout--nav-trigger" @click="handleLogout">
          <icon>&#xe6a9;</icon>退出
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="uploadDialog" width="88%">
      <div slot="title">
        <el-row type="flex" align="middle">
          <el-col>
            Excel上传:
            <el-select placeholder="请选择要操作的公司" size="small" filterable :filter-method="filterMethod" v-model="selectCompanyId" @change="handleSelect">
              <el-option v-for="item in allCompanies" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-date-picker
              @change="handleChangePeriod"
              :clearable="false"
              class="main-period"
              v-model="period"
              size="small"
              type="month"
              placeholder="操作属期"
            ></el-date-picker>&nbsp;&nbsp;
            <el-checkbox v-model="isPreview">直接上传</el-checkbox>
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content">
                上传Excel说明：
                <br />1 有头Excel(excel中有公司名称或税号和月份的)
                <br />2 无头Excel，必须选择公司，月份，种类
                <br />3 '直接上传'上传时不在下面预览
              </div>
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
          <span class="tilte-right-area">
            <el-dropdown size="small">
              <el-button size="small">
                模板下载
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="asdf">银行对账单</el-dropdown-item>
                <el-dropdown-item commonad="asdf">海关报关单</el-dropdown-item>
                <el-dropdown-item>海关缴款书</el-dropdown-item>
                <el-dropdown-item>费用</el-dropdown-item>
                <el-dropdown-item>个税人员信息</el-dropdown-item>
                <el-dropdown-item>个税人员工资</el-dropdown-item>
                <el-dropdown-item>银行汇票</el-dropdown-item>
                <el-dropdown-item>固定资产</el-dropdown-item>
                <el-dropdown-item>手工票据</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </el-row>
      </div>
      <div class="load-error">{{uploadError}}</div>
      <input ref="uploadInput" accept=".xlsx, .xls" type="file" style="display:none" @change="handleClickUploadInput($event)" />
      <el-row type="flex" align="middle">
        <el-col :span="24">
          <el-button-group style="display:flex; width:100%">
            <el-button ref="btnPurchase" size="small" @click="handleUpload('purchase')">进项</el-button>
            <el-button ref="btnSales" size="small" @click="handleUpload('sales')">销项</el-button>
            <el-button ref="btnBank" size="small">银行对账单</el-button>
            <el-button ref="btnPayroll" size="small" @click="handleUpload('person')">人员信息</el-button>
            <el-button ref="btnPayroll" size="small" @click="handleUpload('personTax')">人员工资</el-button>
            <el-button ref="btnPurchaseCustoms" size="small">海关缴款书</el-button>
            <el-button ref="btnSalesCustoms" size="small">海关报关单</el-button>
            <el-button ref="btnCharge" size="small">费用</el-button>
            <el-button ref="btnFixedAsset" size="small">固定资产</el-button>
            <el-button ref="btnManualBil" size="small">手工票据</el-button>
            <el-button ref="btnTicket" size="small">银行承兑汇票</el-button>
          </el-button-group>
        </el-col>
        <el-dropdown size="small">
          <el-button size="small" type="primary">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleUpload('foreigners')">外籍人员信息</el-dropdown-item>
            <el-dropdown-item @click.native="handleUpload('tax')">无住所工资薪金</el-dropdown-item>
            <el-dropdown-item @click.native="handleUpload('yearAwards')">全年一次性奖金</el-dropdown-item>
            <el-dropdown-item>银行汇票</el-dropdown-item>
            <el-dropdown-item>固定资产</el-dropdown-item>
            <el-dropdown-item>手工票据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row>
        <el-upload class="upload-demo22" drag multiple :auto-upload="false" :on-change="handleUploadChange">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
            ，或单击上面对应类型上传
          </div>
        </el-upload>
      </el-row>
      <!-- <el-row>
        内容table
      </el-row>-->
      <el-row>
        <el-row type="flex" align="middle">
          <el-col :span="24">
            <el-button native-type="submit" size="small">重新上传</el-button>
          </el-col>
          <span>
            <el-button native-type="submit" size="small">定位错误</el-button>
            <el-button native-type="submit" size="small">放弃上传</el-button>
            <el-button native-type="submit" type="primary" size="small">确认上传</el-button>
          </span>
        </el-row>
      </el-row>
    </el-dialog>
  </ms-frame-layout>
</template>

<script>

import ExcelManager from '@/excel/Manager'
import visitor from '@/visitor/index'

export default {
  data () {
    return {
      uploadError: '',
      uploadType: '',
      uploadDialog: false,
      companyNameChars: 360,
      isPreview: true,
      allCompanies: this.$store.state.allCompanies,
      type: true,
      menus: visitor.visitor1.menus,
      qualification: 0
    }
  },
  methods: {
    // 选择公司
    handleSelect (e) {
      this.companyNameChars = e ? e.length : 20
      let w = window.innerWidth
      let cw = w > 1440 ? 19 : 16
      this.companyNameChars = 36 + this.companyNameChars * cw

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

    // 双击左边栏的logo
    handleDblclickLogo () {
      this.$router.push({
        path: '/'
      })
    },
    // 切换右边的菜单大小
    handleClickLogo () {
      // TODO
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
    },

    handleEvent (event) {
      if (event.ctrlKey && event.shiftKey && event.altKey && event.keyCode === 13) {
        console.log('ctrl+shift+alt+enter')
      } else if (event.ctrlKey && event.shiftKey && event.keyCode === 13) {
        this.uploadError = ''
        this.uploadDialog = true
        console.log('ctrl+shift+enter')
      } else if (event.ctrlKey && event.keyCode === 13) {
        console.log('ctrl+enter')
      }
    },
    /**
     * 上传excel
     */
    handleUpload (type) {
      this.uploadType = type
      this.$refs.uploadInput.dispatchEvent(new MouseEvent('click'))
    },
    async handleClickUploadInput (e) {
      const file = e.target.files && e.target.files[0]
      let info = { type: this.uploadType, name: '', taxId: '', month: '' }
      await this.parseExcel(file, info)
    },

    async handleUploadChange (file) {
      await this.parseExcel(file.raw, null)
    },

    async parseExcel (file, info) {
      this.uploadError = ''
      let model = await ExcelManager.parse(file, info)
      debugger
      if (this._.isString(model)) {
        this.uploadError = model
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
.ms-frame-layout {
  height: 100vh;
  max-height: 100vh;
}
.home-index {
  .el-date-editor {
    max-width: 110px;
  }
  .selectCompany {
    width: 320px;
    .el-input__inner {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
  .ms-frame-layout--logo {
    .el-switch {
      margin-top: 10px;
    }
  }
  .el-tag {
    margin-right: -4px;
  }
  .el-dialog {
    // .el-dialog__header{
    // }
    .load-error {
      text-align: center;
      color: red;
      font-size: 1.4rem;
    }

    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #f6f3f3;
    }
    .el-button-group {
      .el-button {
        flex: 1;
      }
    }
    .tilte-right-area {
      padding-right: 36px;
    }
    .el-upload {
      display: block;
      padding: 10px 0;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
}
</style>
