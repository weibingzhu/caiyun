<template>
  <div>
    <create-form-popup title="创建"></create-form-popup>
    <update-form-popup title="编辑"></update-form-popup>
    <e-page-list-layout>
      <template slot="search">
        <el-form
          v-bind="getFormProps()"
          @submit.native.prevent="handleSubmit">
          <el-form-item label="搜索">
            <el-input placeholder="请输入关键字" v-model.trim="keyWork"></el-input>
          </el-form-item>
          <el-button native-type="submit" size="small">添加成员</el-button>
          <el-dropdown size="small" @command="handleCommand">
            <el-button size="small">
              批量处理
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item commonad="asdf">加入部门</el-dropdown-item>
              <el-dropdown-item>移除部门</el-dropdown-item>
              <el-dropdown-item>激活/未激活</el-dropdown-item>
              <el-dropdown-item>离职</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown size="small" @command="handleCommand">
            <el-button size="small">
              导入导出
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item commonad="asdf">导入成员</el-dropdown-item>
              <el-dropdown-item>导出成员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button size="small">成员审批</el-button> -->

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
        <el-table-column label="成员昵称">
          <template v-slot="scope">
            搬砖小强
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" >
          <template v-slot="scope">
            王强
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template v-slot="scope">
            46345955@qq.com
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template v-slot="scope">
            14578562559
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template v-slot="scope">
            服务部
          </template>
        </el-table-column>
        <el-table-column label="部门数">
          <template v-slot="scope">
            2
          </template>
        </el-table-column>
        <el-table-column label="加入时间">
          <template v-slot="scope">
            1212-12-12
          </template>
        </el-table-column>
        <el-table-column label="状 态">
          <template v-slot="scope">
            <template v-if="scope.$index % 3">未激活</template>
            <template v-else-if="scope.$index % 5">离职</template>
            <template v-else> 在职</template>
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
      // let params = JSON.parse(JSON.stringify(query))
      // return this.$axios({
      //   url: '/v1/article',
      //   params
      // }).then(res => {
      //   this.pageData = res
      // })
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
