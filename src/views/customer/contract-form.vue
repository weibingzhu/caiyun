<template>
  <div>
    <el-form :inline="true" @submit.native.prevent="handleSubmit">
      <div title="添加新公司">
        <span slot="action">
          <el-button size="small" @click="$router.push({path: '/customer/contract'})">取消</el-button>
          <el-button size="small">确定</el-button>
          <el-button size="small">上传数据</el-button>
          <el-button size="small">下载模板</el-button>
        </span>
        <el-divider content-position="left">公司信息</el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司全称" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
              <el-input v-model.trim="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="社会信用代码" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
              <el-input v-model.trim="form.key_word"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册日期" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
              <el-input v-model.trim="form.key_word"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="注册地址" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>

        <el-form-item label="营业期限" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>
        <el-form-item label="实缴资本" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="纳税人资格" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="经营范围" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>
        <el-form-item label="公司法人" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号码" size="small" prop="title" :rules="[{ required: true, message: '请输入公司全称' }]">
          <el-input v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="法人电话" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>

        <el-divider content-position="left">合同情况</el-divider>
        <el-form-item label="跟进专员" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>
        <el-form-item label="当前状态" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">
          <el-input v-model.trim="form.key_word"></el-input>
        </el-form-item>
        <el-form-item label="合同日期" size="small" prop="time">
          <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="支付方式" size="small" prop="payType">
          <el-select v-model="form.payType">
            <el-option label="按月支付" value="m"></el-option>
            <el-option label="按季支付" value="q"></el-option>
            <el-option label="按年支付" value="y"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附件" size="small" prop="key_word" :rules="[{ required: true, message: '请输入社会信用代码' }]">上传附件图片</el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        payType: 'y',
        title: '',
        time: null,
        key_word: ''
      }
    }
  },
  methods: {
    fetch () {
    },
    submit () {
    }
  }
}
</script>
<style lang="scss">
</style>
