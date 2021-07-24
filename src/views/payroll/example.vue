<template>
  <div>
    <e-page-list-layout>
      <template slot="search">
        <el-tabs v-model="query.type" type="card" @tab-click="handleTab">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="未报" name="2"></el-tab-pane>
          <el-tab-pane label="已报" name="0"></el-tab-pane>
        </el-tabs>
        <el-form slot="search"
          v-bind="getFormProps()"
          @submit.native.prevent="handleSubmit">
          <el-form-item label="资格">
            <el-select class="w150" placeholder="请选择纳税人资格" size="small" filterable multiple v-model="query.qualification">
              <el-option v-for="item in znData.qualificationItem" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input placeholder="请输入公司名称" v-model.trim="query.name"></el-input>
          </el-form-item>
          <el-button native-type="submit" size="small">搜索</el-button>
          <el-button @click="testCreate" size="small">创建</el-button>
        </el-form>
      </template>
      <el-table slot="table"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        highlight-current-row
        border

        :row-key='getRowKeys'
        :expand-row-keys="expands"
        @expand-change="exChangeHeandler"

        :data="conmpanise">
        <el-table-column type="selection" width="35"/>
        <el-table-column label="商品名称" prop="name" fixed />
        <el-table-column type="expand"  width="15" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="类别">
                <span>{{ props.row.qualification }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="操作员">
                <span>{{ props.row.operator }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商品名称" prop="name" fixed /> -->
        <el-table-column label="类别" prop="qualification" sortable
          :filters="[{text: '一般纳税人', value: '1'}, {text: '小规模', value: '2'}, {text: '未知', value: '0'}, {text: '全部', value: '3'}]"
          :filter-method="filterHandler" />
        <el-table-column label="状态" prop="status" sortable
          :filters="[{text: '1', value: '1'}, {text: '0', value: '0'}]"
          :filter-method="filterHandler" />
        <el-table-column label="操作员" prop="operator"/>
        <el-table-column label="商品名称" prop="name"/>
        <el-table-column label="类别" prop="qualification"  />
        <el-table-column label="状态" prop="status"/>
        <el-table-column label="操作员" prop="operator"/>

        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text"  @click="$router.push({path: '/user/detail'})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      query: this.getQuery({
        qualification: '全部',
        type: '1',
        name: '',
        key_word: '',
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
  created () {
    document.addEventListener('keydown', this.handleEvent)
  },
  methods: {
    fetch (query) {
      let params = JSON.parse(JSON.stringify(query))
      return this.$axios({
        url: '/v1/article',
        params
      }).then(res => {
        this.pageData = res
      })
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    testCreate () {
      this.expands = []
      this.expands = [this.conmpanise[this.expandsTestIndex++].idp]
    },

    getRowKeys: (row) => {
      return row.idp
    },
    exChangeHeandler (row, rowList) {
      let that = this
      if (rowList.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.idp)
        }
      } else {
        that.expands = []
      }
    },
    handleEvent (event) {
      if (event.keyCode === 37 || event.keyCode === 38) { // && event.ctrlKey
        // event.preventDefault()
        // event.returnValue = false
        this.expands = []
        this.expandsTestIndex = --this.expandsTestIndex < 0 ? 0 : this.expandsTestIndex
        this.expands = [this.conmpanise[this.expandsTestIndex].idp]
      } else if (event.keyCode === 39 || event.keyCode === 40) {
        this.expands = []
        this.expandsTestIndex = ++this.expandsTestIndex > this.conmpanise.length - 1 ? this.conmpanise.length - 1 : this.expandsTestIndex
        this.expands = [this.conmpanise[this.expandsTestIndex].idp]
      } else if (event.keyCode === 27) {
        this.expands = []
        this.expandsTestIndex = -1
      }
    }

  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEvent)
  }
}
</script>

<style lang="scss">
</style>
