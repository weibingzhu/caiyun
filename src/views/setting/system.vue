<template>
  <div class="setting-system">
    <e-section title="自能系统配置">
      <span slot="action">
        <el-button  size="small">重置</el-button>
        <el-button  size="small">保存</el-button>
      </span>
      <el-divider content-position="left">基础配置</el-divider>
      <el-form v-bind="getFormProps()" :inline="true" @submit.native.prevent="handleSubmit">
        <el-form-item label="登录税局  账号">
          <el-input size="small" :min="1" v-model.trim="urgent"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input size="small" :min="1" v-model.trim="urgent"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="运维人员">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in [{value:'asd',label:'xxxx'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button-group>
            <el-button size="small" icon="el-icon-circle-plus-outline"></el-button>
            <el-button size="small" icon="el-icon-edit"></el-button>
            <el-button size="small" icon="el-icon-delete"></el-button>
          </el-button-group>
          <span>189595959595</span>
          <span>系统异常时，会往改运维人员发送短信提示</span>
        </el-form-item>
        <br />
        <el-form-item label="代理人员">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in [{value:'asd',label:'xxxx'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button-group>
            <el-button size="small" icon="el-icon-circle-plus-outline"></el-button>
            <el-button size="small" icon="el-icon-edit"></el-button>
            <el-button size="small" icon="el-icon-delete"></el-button>
          </el-button-group>
          <span>189595959595</span>
          <span>税局'代理登录'的代理人员信息</span>
        </el-form-item>
        <br />
        <el-form-item label="办税人员">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in [{value:'asd',label:'xxxx'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button-group>
            <el-button size="small" icon="el-icon-circle-plus-outline"></el-button>
            <el-button size="small" icon="el-icon-edit"></el-button>
            <el-button size="small" icon="el-icon-delete"></el-button>
          </el-button-group>
          <span>189595959595</span>
          <span>税局'企业登录'的办税人员信息</span>
        </el-form-item>
        <br />
        <el-form-item label="允许优先排队数量">
          <el-input-number size="small" :min="1" v-model.trim="urgent"></el-input-number>
          <span>当有很多人在排队时，可以优先排在前面</span>
        </el-form-item>
        <br />
        <el-form-item label="允许紧急排队数量">
          <el-input-number size="small" :min="1" v-model.trim="urgent"></el-input-number>
          <span>当有很多人在排队时，紧急会排在优先的前面</span>
        </el-form-item>
        <br />
        <el-divider content-position="left">税种自动化配置</el-divider>
        <el-form-item label="个税" class="tax">
          批量的启始数
          <el-input-number size="small" :min="1" v-model.trim="urgent"></el-input-number>月初自动复制时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>自动执行规则时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>自动结果校验时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>
        </el-form-item>
        <el-form-item label="小规模增值税" class="tax">
          批量的启始数
          <el-input-number size="small" :min="1" v-model.trim="urgent"></el-input-number>月初自动复制时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>自动执行规则时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>自动结果校验时间
          <el-time-picker arrow-control v-model="value2" :picker-options="{ selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点"></el-time-picker>
          <br />
        </el-form-item>
      </el-form>
    </e-section>
  </div>
</template>
<script>

export default {
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      value2: '',
      data: {
        priority: 1,
        urgent: 1,
        batchTime: -14400000
      }
    }
  },

  methods: {
    fetch (query) {
      let params = JSON.parse(JSON.stringify(query))
      let type = this.taxType === this.znDataTaxType.taxPersonal ? 'p' : (this.taxType === this.znDataTaxType.taxGeneral ? 'g' : (this.taxType === this.znDataTaxType.taxSmall ? 's' : 'c'))
      return this.UtilsAxios.handleFetchPost(`/api/zn/taxes/${type}/agent`, (res) => {

      }, params)
    }
  }
}
</script>

<style lang="scss">
.setting-system {
  padding: 20px;
  h1 {
    padding: 10px 10px 20px 10px;
  }
  .el-form {
    .el-form-item {
      .el-select {
        width: 120px;
      }
      .el-button-group {
        margin-left: -5px;
        margin-top: -2px;
      }
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 140px;
  }
  .tax {
    .el-form-item__label{
      width: 100px;
      font-weight: bold;
    }
  }
}
</style>
