<template>
  <el-container class="signin">
    <el-header height="68px">
      <el-row class="wrapper" align="middle" type="flex">
        <img src="/static/images/logo.png" />
        <el-col>
          <em>自能财税后台管理</em>
          <div class="assist">ZN99 Management</div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="wrapper" align="middle" type="flex">
        <!--<el-col>
          <h4>
            提供服务、反映诉求、规范行业
          </h4>
          <p>Provide services, reflect demands, regulate industries</p>
        </el-col>-->
        <!-- <e-signin
          title="自能财税后台管理"
          :accountProps="{placeholder: '请输入账号'}"
          :code-props="null"
          accpet-text="服务协议"
          action="/api/login"
          @success="handleSuccess" >
        </e-signin>-->

        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <h3 class="login-title">欢迎登录</h3>
          <el-form-item label="代账公司" prop="TenantCode">
            <el-input type="text" placeholder="请输入代账公司ID" v-model="form.TenantCode" />
          </el-form-item>
          <el-form-item label="账号" prop="LoginName">
            <el-input type="text" placeholder="请输入账号" v-model="form.LoginName" />
          </el-form-item>
          <el-form-item label="密码" prop="Password">
            <el-input type="text" placeholder="请输入密码" v-model="form.Password" />
          </el-form-item>
          <el-form-item style>
            <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>请输入账号和密码</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </el-main>
    <el-footer>
      ©copyright 2019-2021 深圳自能财税科技有限公司 版权所有 ICP证:
      <a _href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备xxxxxxx号</a>
    </el-footer>
  </el-container>
</template>

<script>

import pyfl from 'pyfl'
export default {
  data () {
    return {
      form: {
        TenantCode: '',
        LoginName: '',
        Password: '',
        Remember: true
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        LoginName: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => { // 为表单绑定验证功能
        if (valid) {
          this.$axios({
            url: '/api/Session/Login',
            method: 'POST',
            data: this.form
          }).then((res) => {
            localStorage.setItem('token', res) // res = {UserId,UserName}
            this.logonSucceedGetSession(res)
            this.logonSucceedOtherData(res)
          }).catch((res) => {
            let message = this._.get(res, 'response.data.Message')
            if (!message) message = '登录异常，请重新登录'
            this.$message({ type: 'error', message })
          })
        } else {
          this.dialogVisible = true
          return false
        }
      })
    },
    // 登录成功后，获取session
    logonSucceedGetSession (res) {
      this.UtilsAxios.handleFetchPost('/api/Session/GetSession', (res) => {
        this.$store.commit('USRE', res)
        this.$router.push({ path: '/' })
      }, null)
    },

    logonSucceedOtherData () {
      // 代账公司ID ，名称，属区；
      // 该账号下的所有公司[{id，taxId，name，资质}]
    },

    logonSuccess (res) {
      this.$store.commit('USRE', res.data)
      this.$store.commit('SELECT_COMPANY_ID', '')
      this.$store.commit('SELECT_COMPANY_IDS', [])

      let month = new Date().getMonth()
      let year = new Date().getFullYear()
      if (month === 0) {
        --year
        month = 12
      }
      this.$store.commit('PERIOD', year + '-' + month)
      this.$store.commit('TAX_OR_ACC', true)
      res.data && localStorage.setItem('token', res.data.token.token)

      // 登录成功直接获取该账号的所有公司
      this.UtilsAxios.handleFetchPost('/api/yzh/accaux/trace/agent', (res) => { // TODO url 该账号的所有用户
        let temp = []
        for (const item of res.data) {
          let name = this.$options.filters.filterName(item.customer.name)
          let py = pyfl(name)
          temp.push({ value: item.customer._id, label: item.customer.name, py, item }) // TODO item 有多余的数据
        }
        this.$store.commit('ALL_COMPANIES', temp)
      }, { period: { y: 2021, m: 1 } })
      this.$router.push({
        path: '/'
      })
    },
    handleClose () {

    }
  }

}
</script>

<style lang="scss" scoped>
.signin {
  .login-box {
    border: 1px solid #dcdfe6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .wrapper {
    max-width: 1200px;
    margin: auto;
  }
  .el-container {
    height: 100vh;
  }
  .el-header {
    .el-row {
      height: 68px;
      text-align: left;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      em {
        font-size: 1.4rem;
        display: block;
      }
    }
  }
  .el-main {
    background: url("/static/images/signin.png") center center/cover no-repeat
      $color-primary;
    > .el-row {
      height: 100%;
      > .el-col {
        color: #fff;
        h4 {
          font-size: 36px;
          line-height: 1.4;
          margin-top: -15px;
        }
        p {
          font-size: 22px;
          margin-top: 10px;
          opacity: 0.8;
          line-height: 1.2;
          -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, hsla(0, 0%, 100%, 0.2));
        }
      }
    }
    .e-signin {
      border: 0;
    }
  }
  .el-footer {
    text-align: center;
    line-height: 60px;
  }
}
</style>
