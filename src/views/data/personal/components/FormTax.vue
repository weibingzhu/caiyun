<template>
  <!--v-bind="getFormProps()" @submit.native.prevent="handleSubmit"是必须的-->
  <el-form class="tax-personal-form" v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <e-section title="基本信息">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
            <el-input v-model.trim="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-select v-model="form.idtype" placeholder="请选择证件类型">
              <el-option label="居民身份证" value="shanghai"></el-option>
              <el-option label="居民身份证2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="idno" :rules="[{ required: true, message: '请输入证件号码' }]">
            <el-input v-model.trim="form.idno"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="国籍(地区)">
            <el-select v-model="form.countryRegion" placeholder="请选择国籍(地区)">
              <el-option label="中国" value="中国"></el-option>
              <el-option label="中国2" value="中国2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历">
            <el-select v-model="form.region" placeholder="请选择学历">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="等等" value="等等"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-date-picker disabled type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纳税识别号">
            <el-input disabled ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="特殊情况">
            <el-checkbox-group>
              <el-checkbox label="残疾"></el-checkbox>
              <el-checkbox label="烈属"></el-checkbox>
              <el-checkbox label="孤老"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input disabled ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="残疾证号">
            <el-input ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="烈属证号">
            <el-input ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </e-section>
    <e-section title="任职受雇从业信息">
      <el-row>
        <el-col :span="12">
          <el-form-item label="受雇类型">
            <el-select v-model="form['workType']" placeholder="请选择任职受雇从业信息">
              <el-option label="xxx" value="xxx"></el-option>
              <el-option label="yyy" value="yyy"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="受雇日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form['任职受雇从业日期']" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离职日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form['离职日期']" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="是否扣除减除费用">
            <el-select v-model="form.region" placeholder="请选择性别">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="复制年度就业情形">
            <el-select v-model="form.region" placeholder="请选择复制年度就业情形">
              <el-option label="xxx" value="xxx"></el-option>
              <el-option label="yyy" value="yyy"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务">
            <el-select v-model="form.region" placeholder="请选择职务">
              <el-option label="普通" value="普通"></el-option>
              <el-option label="高管" value="高管"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </e-section>
    <e-section title="联系方式">
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone" :rules="[{ required: true, message: '请输入活动名称' }]">
            <el-input v-model.trim="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model.trim="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经常居住地" prop="address">
            <el-input v-model.trim="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input size="small" v-model.trim="form.address"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系地址" prop="address">
            <el-input v-model.trim="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input size="small" v-model.trim="form.address"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="户籍所在地" prop="address">
            <el-input v-model.trim="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input size="small" v-model.trim="form.address"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="开户银行" prop="开户银行">
            <el-input v-model.trim="form['开户银行']"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="开户行省份" prop="开户行省份">
            <el-input v-model.trim="form['开户行省份']"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="银行账号" prop="银行账号">
            <el-input v-model.trim="form['银行账号']"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </e-section>
    <e-section title="联系方式">
      <el-row>
        <el-col :span="12">
          <el-form-item label="个人投资额" prop="个人投资额">
            <el-input v-model.trim="form['个人投资额']"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="个人投资比例" prop="个人投资比例(%)">
            <el-input v-model.trim="form['个人投资比例(%)']">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </e-section>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      checkList: '',
      form: { // 必须使用form来绑定表单数据
        countryRegion: '',
        dob: '',
        gender: '',
        idno: '',
        idtype: '',
        name: '',
        email: '',
        phone: '',
        status: '',
        workType: '',
        '个人投资比例(%)': '',
        '个人投资额': '',
        '任职受雇从业日期': '',
        '报送状态': '',
        '是否孤老': '',
        '是否扣除减除费用': '',
        '是否残疾': '',
        '是否烈属': '',
        '开户银行': '',
        '开户行省份': '',
        '银行账号': '',
        '纳税人识别号': ''
      }
    }
  },
  methods: {
    fetch () {
      if (this.query) {
        this.form = this.query ? this.query.person : {}
      }
    },
    submit () { // 表单校验通过后调用的方法，一般是请求后台接口的方法
      /*
      return this.$axios({
        url: this.query ? `/api/v1/account/${this.query.id}` : '/api/v1/account',
        method: this.query ? 'PUT' : 'POST',
        data: this.form,
        options: {
          context: this
        }
      })
      */
    }
  }
}
</script>

<style lang="scss">
.tax-personal-form {
  .e-section--title{
    font-size: 1.2rem;
  }
  .el-select {
    width: 100%;
  }
}
</style>
