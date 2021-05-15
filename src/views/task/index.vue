<template>

<!--
  任务页面
  TODO
  1 跟进权限显示
  2 APP 和 WEB的切换
  3 默认时间排序
  4 分页
  5 搜索功能完整
  6 任务历史显示
  7 图片预览 闭关bug
  -->
  <div class="task-index">
    <!-- 图片预览 -->
    <e-preview v-if="imgSrc" :visible.sync="visible" :src="imgSrc"></e-preview>

    <e-page-list-layout>
      <template slot="search">
        <el-row type="flex" align="middle">
          <el-col>
            <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
              <el-form-item label="任务类型" v-if="app_web">
                <el-select placeholder="任务类型" size="small" filterable multiple v-model="query.status">
                  <el-option v-for="item in znData.APP_CLASSIFY_STATUS" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务类型" v-else>
                <el-select placeholder="任务类型" size="small" filterable multiple v-model="query.status">
                  <el-option v-for="item in znData.WEB_CLASSIFY_STATUS" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务状态">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.status">
                  <el-option v-for="item in znData.autoTaskStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="操作员">
                <el-select placeholder="状态" size="small" filterable multiple v-model="query.status">
                  <el-option v-for="item in znData.autoTaskStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关键字">
                <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
              <el-button size="small">搜索</el-button>
            </el-form>
          </el-col>
          <el-row type="flex" align="middle">
            <el-col>
              <el-switch v-model="app_web" active-text="WEB" inactive-text="APP" @change="switchChanges()"></el-switch>
            </el-col>
          </el-row>
        </el-row>
      </template>
      <el-table
        slot="table"
        style="width: 100%"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="exChangeHeandler"
        :cell-class-name="tableCellClassName"
        :data="tableData"
      >
        <el-table-column label="时间" prop="summary.td">
          <template slot-scope="scope">
            <!-- <span>{{new Date(scope.row.summary.dt).getHours()+":"+new Date(scope.row.summary.dt).getMinutes()+":"+new Date(scope.row.summary.dt).getSeconds()}}</span> -->
            <span>{{new Date(scope.row.summary.dt).format('MM-dd HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司" prop="customer.name" min-width="200">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.customer.name" placement="top-start">
              <span>{{scope.row.customer.name | filterName}}</span>
            </el-tooltip>
            <el-tag size="mini" v-if="scope.row.customer.qualification === 1">一般</el-tag>
            <el-tag size="mini" v-else>小规模</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作员" prop="operator.name">
          <template slot-scope="scope">
            <span>{{scope.row.operator.name}} 管理员权限</span>
          </template>
        </el-table-column>
        <el-table-column label="任务类型" prop="classify" />
        <el-table-column label="任务状态" prop="status">
          <template slot-scope="scope">
            <span @click="handleShowIamge(scope.row)">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="失败原因" prop="summary.error" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.summary.error}}</span>
          </template>
        </el-table-column>
        <el-table-column label="失败次数" prop="summary.trys"></el-table-column>
        <el-table-column label="任务历史" prop="history" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push({path: ''})">再来</el-button>
          </template>
        </el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
import Icon from '../../components/Icon.vue'

export default {
  components: { Icon },
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      imgSrc: null,
      app_web: true,
      period: null,
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      total: {
        sum: 0,
        gSum: 100,
        sSum: 100,
        p: {
          curr: 0,
          pay: 0
        },
        a: { // 增值税（一般纳税人和小规模）
          curr: 10,
          pay: 0
        },
        c: {
          curr: 10,
          pay: 0
        }

      },
      keyWork: '',
      time: new Date(),
      znDataTaxType: this.znData.taxType,
      taxType: this.znData.taxType.taxPersonal,
      query: this.getQuery({
        qualification: '全部',
        name: '',
        operator: false,
        // period: { y: 2020, m: 10 },
        select: '_id person status declareType company isCurrent errorNum',
        ...this.$route.query
      }),

      expands: [],
      expandsTestIndex: -1,
      pageData: {
        count: 0,
        data: []
      }
    }
  },

  methods: {
    fetch (query) {
      let params = { period: { y: 2021, m: 3 } } // JSON.parse(JSON.stringify(query))
      let type = this.app_web ? 'puppeteer' : 'sikulix'
      return this.UtilsAxios.handleFetchPost(`/api/yzh/${type}/list`, (res) => {
        res.data.length = 100 // TODO 分页
        this.pageData.data = res.data
        console.log(res)
      }, params)
    },

    // 切换 app_web
    switchChanges (e) {
      this.fetch(this.query)
    },
    // 显示截图
    handleShowIamge (row) {
      let params = { _id: row._id }
      let url = '/api/yzh/actions/puppeteer/image'
      this.UtilsAxios.handleFetchPost(url, (res) => {
        if (res.code === 0 && res.data && res.data.image) {
          this.visible = true
          this.imgSrc = res.data.image
        } else {
          this.$message('没有申报截图')
        }
      }, params)
    },

    handleTagClose (tag) {
      console.log(tag)
    },

    handleAddOperator (row) {
      console.log(row)
    },

    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row && columnIndex === 4 && row.status === 'success') {
        return 'success'
      } else if (row && columnIndex === 4 && row.status === 'fail') {
        return 'fail'
      }
    },
    handleTab (tab, event) {
      this.taxType = tab.name
      this.fetch(this.query)
      this.keyWork = ''
    },
    testCreate () {
      this.expands = []
      this.expands = [this.pageData.data[this.expandsTestIndex++].company._id]
    },
    getRowKeys: (row) => {
      return row._id
    },
    exChangeHeandler (row, rowList) {
      var that = this
      if (rowList.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.company._id)
          this.expandsTestIndex = this.pageData.data.findIndex(e => e.company._id === row.company._id)
        }
      } else {
        that.expands = []
      }
    },
    handleEvent (event) {
      if (event.keyCode === 38) { // && event.ctrlKey
        // event.preventDefault()
        // event.returnValue = false
        this.expands = []
        this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
        this.expands = [this.pageData.data[this.expandsTestIndex].company._id]
      } else if (event.keyCode === 40) {
        this.expands = []
        this.expandsTestIndex = ++this.expandsTestIndex > this.pageData.data.length - 1 ? this.pageData.data.length - 1 : this.expandsTestIndex
        this.expands = [this.pageData.data[this.expandsTestIndex].company._id]
      } else if (event.keyCode === 27) { // esc
        this.expands = []
        // this.expandsTestIndex = -1
      }
    }

  },

  computed: {
    tableData () {
      const search = this.keyWork
      if (search) {
        return this.pageData.data.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.pageData.data
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
.task-index {
  .operating-area {
    position: absolute;
    right: 12px;
  }
  .el-tag--mini {
    margin: 0 2px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    // color: #fff;
    font-weight: bolder;
    // background-color: #E1FFFF!important;
  }
  .el-table .success {
    margin-left: 2px;
    background: #32c1ca;
    opacity: 0.9;
  }
  .el-table .fail {
    margin-left: 2px;
    background: #ddec07;
    opacity: 0.9;
  }
  .demo-table-expand div {
    margin: 6px;
  }
}
</style>
