<template>
  <div>
    <create-form-popup title="创建"></create-form-popup>
    <update-form-popup title="编辑"></update-form-popup>
    <e-page-list-layout>
      <template slot="search">
        <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
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
      <template slot="table">
        <el-row>
          <el-col :span="3">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
              :data="data"
              node-key="id"
              ref="tree"
              default-expand-all
              :filter-node-method="filterNode"
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
            ></el-tree>
          </el-col>
          <el-col :span="21">
            <el-table v-bind="getTableProps()" v-on="getTableListeners()" :data="[{},{},{},{},{},{},{},{},{}]">
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
              <el-table-column label="部门数">
                <template v-slot="scope">2</template>
              </el-table-column>
              <el-table-column label="加入时间">
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
          </el-col>
        </el-row>
      </template>
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
      debugger
      let params = {page: 1, size: 20} // JSON.parse(JSON.stringify(query))
      this.UtilsAxios.handleFetchPost('/api/admin/user/page', (res) => {
        debugger
      }, params)
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
