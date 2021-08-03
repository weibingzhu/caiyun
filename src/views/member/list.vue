<template>
  <ms-page-list-layout class="member-index">
    <template slot="search">
      <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-form-item label="搜索">
          <el-input placeholder="请输入关键字" v-model.trim="query.Search" size="small"></el-input>
        </el-form-item>
        <el-button native-type="submit" size="small" @click="handleCreate">添加成员</el-button>
        <el-dropdown size="small">
          <el-button size="small">
            批量处理
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>激活/未激活</el-dropdown-item>
            <el-dropdown-item>离职</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <input ref="uploadInput" accept=".xlsx, .xls" type="file" style="display:none" @change="handleClickUploadInput($event)" />
        <el-dropdown size="small">
          <el-button size="small">
            导入导出
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleImport">导入成员</el-dropdown-item>
            <el-dropdown-item @click.native="handleExport">导出成员</el-dropdown-item>
            <el-dropdown-item @click.native="handleDownload">模板下载</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form>
    </template>
    <el-table slot="table" v-bind="getTableProps()" v-on="getTableListeners()" stripe @row-dblclick="handleRowDblclick" :data="pageData.data">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="成员昵称" prop="LoginName"></el-table-column>
      <el-table-column label="真实姓名" prop="Name"></el-table-column>
      <el-table-column label="邮箱">
        <template v-slot="scope">46345955@qq.com</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template v-slot="scope">14578562559</template>
      </el-table-column>
      <el-table-column label="部门">
        <template v-slot="scope">服务部</template>
      </el-table-column>
      <el-table-column label="分配权限" prop="roleNames"></el-table-column>
      <el-table-column label="入职时间">
        <template v-slot="scope">1212-12-12</template>
      </el-table-column>
      <el-table-column label="状 态" prop="IsEnable">
        <template v-slot="scope">{{scope.row.IsEnable? '正常': '未激活'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="handleDelect(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleRowDblclick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </ms-page-list-layout>
</template>

<script>
import ExcelUtils from '@/excel/utils'
import ExcelManager from '@/excel/Manager'
const Form = () => import('./components/Form')
export default {
  mixins: [
    ms.mixins.pageList
  ],
  data () {
    return {
      query: this.getQuery({
        Search: '',
        IsEnable: null,
        ...this.$route.query
      }),
      pageData: {
        count: 0,
        data: []
      }
    }
  },
  methods: {
    fetch () {
      this.UtilsAxios.handleFetchPost('/api/SystemUser/List', (res) => {
        this.pageData.count = res.TotalRecord
        for (const item of res.Items) {
          item['roleNames'] = res.AvailableRoles.reduce((ns, r) => {
            if (item.Roles && item.Roles.includes(r.Id)) ns.push(r.Name)
            return ns
          }, [])
        }
        this.pageData.data = res.Items
      }, this.query)
    },
    // 导入excel
    handleImport (e) {
      this.$refs.uploadInput.dispatchEvent(new MouseEvent('click'))
    },
    // 导出现有员工
    handleExport () {
      let handers = [{ title: '姓名', path: 'name' }, { title: '电话', path: 'phone' }, { title: '职位', path: 'position' }]
      let datas = [{ name: 'xxx', phone: '158959595958', position: '秘书' }, { name: 'yyy', phone: '158959595958', position: '程序员' }]
      ExcelUtils.export(handers, datas, '员工excel.xlsx')
    },
    // 下载模板
    handleDownload () {
      let handers = [{ title: '姓名', path: 'name' }, { title: '电话', path: 'phone' }, { title: '职位', path: 'position' }]
      let datas = []
      ExcelUtils.export(handers, datas, '员工excel模板.xlsx')
    },
    // 解析excel TODO 相同字段替换问题（就是多次上传什么覆盖问题）
    async handleClickUploadInput (e) {
      const file = e.target.files && e.target.files[0]
      let model = await ExcelManager.parse(file)
      console.log('model:', model)
    },
    // 双击人员编辑
    handleRowDblclick (row, column, event) {
      ms.navigator.push(this, Form, { params: row, title: '编辑' })
    },
    // 手动添加人员
    handleCreate () {
      ms.navigator.push(this, Form, { params: null, title: '创建' })
    },
    handleDelect (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.UtilsAxios.handleFetchPost('/api/SystemUser/Delete', (res) => {
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
.member-index {
  width: 100%;
}
</style>
