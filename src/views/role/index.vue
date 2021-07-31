<template>
  <ms-page-list-layout class="role-index">
    <template slot="search">
      <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-form-item label="搜索">
          <el-input placeholder="请输入关键字" v-model.trim="query.Search" size="small"></el-input>
        </el-form-item>
        <el-button native-type="submit" size="small" @click="handleCreate">添加角色</el-button>
      </el-form>
    </template>
    <template slot="table">
      <el-table v-bind="getTableProps()" v-on="getTableListeners()" stripe @row-dblclick="handleRowDblclick" :data="pageData.data">
        <el-table-column label="角色名称" prop="Name"></el-table-column>
        <el-table-column label="描述">
          <template v-slot="scope">doto</template>
        </el-table-column>
        <el-table-column label="配分权限">
          <template v-slot="scope">
            <el-button type="text" @click="handlePermissionUpdate(scope.row)">{{scope.row.PermissionSet}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="修改">
          <template v-slot="scope">1212-12-12/小伟</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">1212-12-12</template>
        </el-table-column>
        <el-table-column label="状 态">
          <template v-slot="scope">
            <template v-if="scope.$index % 3">未激活</template>
            <template v-else-if="scope.$index % 5">离职</template>
            <template v-else>在职</template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="handleDelect(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleRowDblclick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </ms-page-list-layout>
</template>

<script>
const Form = () => import('./components/Form')
export default {
  mixins: [
    ms.mixins.pageList
  ],
  data () {
    return {
      query: {
        Search: '',
        Skip: 0,
        Take: 10
      },
      pageData: {
        count: 0,
        data: []
      }
    }
  },
  methods: {
    fetch () {
      this.UtilsAxios.handleFetchPost('/api/SystemRole/List', (res) => {
        this.pageData.count = res.TotalRecord
        this.pageData.data = res.Items
      }, this.query)
    },
    // 手动添加人员
    handleCreate () {
      ms.navigator.push(this, Form, { params: null, title: '创建' })
    },
    // 双击人员编辑
    handleRowDblclick (row, column, event) {
      ms.navigator.push(this, Form, { params: row, title: '编辑' })
    },
    handleDelect (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.UtilsAxios.handleFetchPost('/api/SystemRole/Delete', (res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        }, { Id: row.Id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.role-index {
  width: 100%;
  height: 100%;
}
</style>
