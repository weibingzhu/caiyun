<template>
  <!--v-bind="getFormProps()" @submit.native.prevent="handleSubmit"是必须的-->
  <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
    <el-form-item label="活动名称" prop="name" :rules="[{ required: true, message: '请输入活动名称' }]">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" :rules="[
      {required: true, message: '请输入邮箱'},
      validator.rule.email
      ]">
      <el-input v-model.trim="form.email"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图片上传">
      <e-img-upload v-model="form.image"></e-img-upload>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch v-model.trim="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input v-model="form.desc" type="textarea" :autosize="{minRows: 2}"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: { // 必须使用form来绑定表单数据
        name: '',
        email: '',
        region: 'shanghai',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    fetch () {
      /*
      if (this.query) {
        return this.$axios({
          url: `/api/v1/account/${this.query.id}`
        }).then(res => {
          Object.assign(this.form, res.data)
        })
      }
      */
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
