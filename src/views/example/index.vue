<template>
  <div>
    <create-form-popup title="创建"></create-form-popup>
    <update-form-popup title="编辑"></update-form-popup>
    <e-page-list-layout>
      <template slot="search">
        <el-tabs v-model="query.type" type="card" @tab-click="handleTab">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="进门" name="2"></el-tab-pane>
          <el-tab-pane label="出门" name="0"></el-tab-pane>
        </el-tabs>
        <el-form slot="search"
          v-bind="getFormProps()"
          @submit.native.prevent="handleSubmit">
          <el-form-item label="业主姓名">
            <el-input placeholder="请输入姓名" v-model.trim="query.title"></el-input>
          </el-form-item>
          <el-button native-type="submit" size="small">搜索</el-button>
          <el-button @click="pushOpen('create')" size="small">创建</el-button>
        </el-form>
      </template>
      <el-table slot="table"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        :data="[{},{},{},{},{},{},{},{},{}]">
        <el-table-column label="业主姓名">
          <template v-slot="scope">
            江小杰
          </template>
        </el-table-column>
        <el-table-column label="进出时间" >
          <template v-slot="scope">
            2020-03-10 18:20:32
          </template>
        </el-table-column>
        <el-table-column label="进出门口">
          <template v-slot="scope">
            正门
          </template>
        </el-table-column>
        <el-table-column label="类 型">
          <template v-slot="scope">
            进门
          </template>
        </el-table-column>
        <el-table-column label="监控人员">
          <template v-slot="scope">
            张军保安
          </template>
        </el-table-column>
        <el-table-column label="状 态">
          <template v-slot="scope">
            <e-danger v-if="scope.$index < 3">异常上报</e-danger>
            <template v-else>
              正常
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text"  @click="handleUpdate">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </e-page-list-layout>
  </div>
</template>

<script>
const Form = () => import('./components/Form')
const CreateFormPopup = $mixins.popupManager.$('create', Form)
const UpdateFormPopup = $mixins.popupManager.$('update', Form)

export default {
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
  components: {
    CreateFormPopup,
    UpdateFormPopup
  },
  data () {
    return {
      query: this.getQuery({
        type: '1',
        title: '',
        key_word: '',
        ...this.$route.query
      }),
      pageData: {
        count: 0,
        data: []
      }
    }
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
    handleUpdate (row) {
      this.pushOpen('update', row.article_id)
    }
  }
}
</script>

<style lang="scss">
</style>
