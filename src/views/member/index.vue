<template>
  <ms-page-list-layout>
    <template slot="search">
      <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-form-item label="搜索">
          <el-input placeholder="请输入关键字" v-model.trim="keyWork" size="small"></el-input>
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
    <el-table
      slot="table"
      v-bind="getTableProps()"
      v-on="getTableListeners()"
      stripe
      @row-dblclick="handleRowDblclick"
      :data="[{},{},{},{},{},{},{},{},{}]"
    >
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="成员昵称">
        <template v-slot="scope">搬砖小强</template>
      </el-table-column>
      <el-table-column label="真实姓名">
        <template v-slot="scope">王强</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template v-slot="scope">46345955@qq.com</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template v-slot="scope">14578562559</template>
      </el-table-column>
      <el-table-column label="部门">
        <template v-slot="scope">服务部</template>
      </el-table-column>
      <el-table-column label="配分权限">
        <template v-slot="scope">管理员，合同用户</template>
      </el-table-column>
      <el-table-column label="入职时间">
        <template v-slot="scope">1212-12-12</template>
      </el-table-column>
      <el-table-column label="状 态">
        <template v-slot="scope">
          <template v-if="scope.$index % 3">未激活</template>
          <template v-else-if="scope.$index % 5">离职</template>
          <template v-else>在职</template>
        </template>
      </el-table-column>
    </el-table>
  </ms-page-list-layout>
</template>

<script>
import ExcelUtils from '@/excel/utils'
const Form = () => import('./components/Form')
export default {
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
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
      },
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          children: [{
            id: 11,
            label: '三级 3-2-1'
          }, {
            id: 12,
            label: '三级 3-2-2'
          }, {
            id: 13,
            label: '三级 3-2-3'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    fetch (query) {
      let params = { page: 1, size: 20 } // JSON.parse(JSON.stringify(query))
      this.UtilsAxios.handleFetchPost('/api/admin/user/page', (res) => {
        debugger
      }, params)
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
    handleClickUploadInput (e) {
    },
    // 双击人员编辑
    handleRowDblclick (row, column, event) {
      ms.navigator.push(this, Form, { params: row, title: '编辑' })
    },
    // 手动添加人员
    handleCreate () {
      ms.navigator.push(this, Form, { params: null, title: '创建' })
    },

    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="scss">
</style>
