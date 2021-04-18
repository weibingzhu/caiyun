<template>
  <div class="invoice-components">
    <div></div>
    <div></div>
    <div class="invoiceContainer">
      <el-row class="invoiceHeade">
        <el-col :span="7">
          <div class="headeLeft">&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div class="headeMiddle">
            <span class="title">xxx增值税电子普通发票</span>
            <hr />
            <hr />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="headeRight">
            <ul>
              <li>
                <label>发票代码：</label>
                <span>1234</span>
              </li>

              <li>
                <label>发票号码：</label>
                <span>223</span>
              </li>

              <li>
                <label>开票日期：</label>
                <span>2019年11月11日</span>
              </li>

              <li>
                <label>校&nbsp;&nbsp;验&nbsp;&nbsp;码：</label>
                <span>111111</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <div class="invoiceBody">
        <el-row class="userInfo" type="flex" justify="center">
          <el-col :span="12">
            <div>
              <span class="buyTxt">购买方</span>
              <span class="buyInfo">
                <ul>
                  <li>
                    <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
                    <span>xxxxxxx公司</span>
                  </li>

                  <li>
                    <label>纳税人识别号：</label>
                    <span>12443536377484848</span>
                  </li>

                  <li>
                    <label>地址、&nbsp;&nbsp;&nbsp;电话：</label>
                    <span>11223443532</span>
                  </li>

                  <li>
                    <label>开户行及账号：</label>
                    <span>中国农业银行</span>
                  </li>
                </ul>
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span class="passwordTxt">密码区</span>
              <span class="password">asdfasdfasdf</span>
            </div>
          </el-col>
        </el-row>
        <el-table
          class="detail"
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          show-summary
          :data="details"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column label="货物或应税劳务名称" prop="name" min-width="120"></el-table-column>
          <el-table-column label="规格型号" prop="model"></el-table-column>
          <el-table-column label="单位" prop="unit"></el-table-column>
          <el-table-column label="数量" prop="qty"></el-table-column>
          <el-table-column label="单价" prop="price"></el-table-column>
          <el-table-column label="金额" prop="amount"></el-table-column>
          <el-table-column label="税率" prop="taxRate"></el-table-column>
          <el-table-column label="税额" prop="tax"></el-table-column>
        </el-table>
        <el-row class="userInfo" type="flex" justify="center">
          <el-col :span="12">
            <div>
              <span class="buyTxt">销售方</span>
              <span class="buyInfo">
                <ul>
                  <li>
                    <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
                    <span>xxxxxxx公司</span>
                  </li>

                  <li>
                    <label>纳税人识别号：</label>
                    <span>12443536377484848</span>
                  </li>

                  <li>
                    <label>地址、&nbsp;&nbsp;&nbsp;电话：</label>
                    <span>11223443532</span>
                  </li>

                  <li>
                    <label>开户行及账号：</label>
                    <span>中国农业银行</span>
                  </li>
                </ul>
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span class="passwordTxt">备注</span>
              <span class="password">asdfasdfasdf</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="invoiceFooter">
        <el-col :span="6">
          <label>&nbsp;收款人：</label>
          <span>张三</span>
        </el-col>
        <el-col :span="6">
          <label>复核：</label>
          <span>李四</span>
        </el-col>
        <el-col :span="6">
          <label>开票人：</label>
          <span>王五</span>
        </el-col>
        <el-col :span="6">
          <label>销售方：（章）</label>
        </el-col>
      </el-row>
    </div>
    <e-section title="标记" class="sign">
      <el-button slot="action" size="small">保存发票</el-button>
      <el-button slot="action" size="small">保存标记</el-button>
      <el-form :inline="true">
        <el-col :span="6">
          <el-form-item label="产品名称">
            <el-input size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="版本号">
            <el-input size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售金额">
            <el-input size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="即征即退">
            <el-checkbox></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="是否折扣">
            <el-checkbox></el-checkbox>
          </el-form-item>
        </el-col>
      </el-form>
    </e-section>
  </div>
</template>

<script>
export default {
  componentName: 'Invoice',
  mixins: [
    $mixins.pageList
  ],
  props: {
    data: {},
    selectCompany: '',
    invioceId: ''
  },
  data () {
    return {
      details: [{ name: 'asd', model: 'asd', amount: 100, tax: 13 }, { name: 'asd', model: 'asd', amount: 1010, tax: 113 }, { name: 'asd', model: 'asd', amount: 1010, tax: 113 }, { name: 'asd', model: 'asd', amount: 1010, tax: 113 }],
      curr: 0
    }
  },
  watch: {
    invioceId: function (newValue, oldValue) {
      debugger
      let _id = newValue
      let url = `/api/yzh/accaux/sales/search?owner=${this.selectCompany}`
      return this.UtilsAxios.handleFetchPost(url, (res) => {
        debugger
        this.data = res.data
      }, {cond: {_id}})
    }
  }
}
</script>
<style  lang="scss">
.invoice-components {
  .invoiceContainer {
    width: 100%;
    margin: 0 auto;
    border-top: 1px solid black;
    ul {
      list-style-type: none;
      margin: 0;
      padding-left: 6px;
    }
    .invoiceHeade {
      width: 100%;
      height: 110px;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      border-right: 1px solid black;
      .headeLeft {
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
      }
      .headeMiddle {
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        .title {
          font-size: 2.4rem;
          display: inline-block;
          margin-top: 40px;
        }
      }
      .headeRight {
        width: 100%;
        height: 100%;
        line-height: 26px;
        text-align: left;
      }
    }
    .invoiceBody {
      .userInfo {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        .buyTxt {
          width: 30px;
          height: 100px;
          font-size: 18px;
          text-align: center;
          border-right: 1px solid black;
          border-left: 1px solid black;
          float: left;
        }
        .buyInfo {
          height: 100%;
          text-align: left;
          li {
            padding-left: 40px;
          }
        }
        .passwordTxt {
          width: 30px;
          height: 100px;
          font-size: 18px;
          text-align: center;
          border-left: 1px solid black;
          border-right: 1px solid black;
          float: left;
        }
        .password {
          margin: 8px !important;
        }
      }
      .detail {
        width: 100%;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        .gutter {
          width: 0 !important;
        }
      }
    }
  }
  .sign {
    box-shadow: none;
    padding: 0;
    margin-top: 10px;
    margin-bottom: 30px;

    .e-section--header {
      margin: 0;
    }
    .el-form-item {
      margin-right: 0px;
      margin-bottom: 0px;
    }
    .el-input {
      min-width: 50px !important;
      max-width: 100px !important;
    }
  }
}
</style>
