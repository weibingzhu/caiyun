<template>
  <div>
    <create-form-popup title="创建"></create-form-popup>
    <update-form-popup title="编辑"></update-form-popup>
    <e-page-list-layout>
      <template slot="search">
        <el-tabs v-model="query.type" type="card" @tab-click="handleTab">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="已读" name="2"></el-tab-pane>
          <el-tab-pane label="未读" name="0"></el-tab-pane>
        </el-tabs>
        <el-form slot="search"
          v-bind="getFormProps()"
          @submit.native.prevent="handleSubmit">
          <el-button native-type="submit" size="small">批量删除</el-button>
          <el-button @click="pushOpen('create')" size="small">全部标记为已读</el-button>
        </el-form>
      </template>
      <el-table slot="table"
        v-bind="getTableProps()"
        v-on="getTableListeners()"
        :data="[{},{},{},{},{},{},{},{},{}]">
        <el-table-column
          type="selection"
          width="58">
        </el-table-column>
        <el-table-column label="消息类型">
          <template v-slot="scope">
            报修通知
          </template>
        </el-table-column>
        <el-table-column label="标题内容" >
          <template v-slot="scope">
            C座2层302室提交了报修申请
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">
            2020-02-24 17:09:21
          </template>
        </el-table-column>
        <el-table-column label="状 态">
          <template v-slot="scope">
            <e-danger v-if="scope.$index < 3">未读</e-danger>
            <template v-else>
              已读
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text"  @click="handleUpdate(scope.row, $event)">删除</el-button>
            <el-button type="text"  @click="$router.push({path: '/user/detail'})">详情</el-button>
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
    },
    handleDelete (row, event) {
      this.$confirm('确认删除此文章', '提示', {
        type: 'warning'
      }).then(() => {
        return this.$axios({
          url: `/v1/article/${row.article_id}`,
          method: 'DELETE',
          options: {
            context: event.target
          }
        }).then(() => {
          this.fetch(this.query)
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
