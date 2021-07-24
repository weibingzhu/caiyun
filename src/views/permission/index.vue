<template>
  <ms-page-list-layout class="permission-index">
    <template slot="search"></template>
    <template slot="table">
      <el-row>
        <el-col :span="7" class="col-left-tree" >
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
          <el-tree
            :data="data"
            ref="tree"
            :filter-node-method="filterNode"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <el-button-group>
                <el-button type="text" icon="el-icon-remove-outline" size="mini" @click="() => remove(node, data)"></el-button>
                <el-button type="text" icon="el-icon-circle-plus-outline" size="mini" @click="() => append(data)"></el-button>
              </el-button-group>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="17">
          <el-row type="flex" align="middle">
            <el-col :span="24">
              <el-tooltip class="item" effect="dark" placement="bottom" content="添加根节点">
                <el-button size="small">添加</el-button>
              </el-tooltip>
            </el-col>
            <span>
              <el-button size="small">刷新</el-button>
            </span>
          </el-row>
          <el-scrollbar>
            <e-section
              v-for="(item, index) in [{id:'xxx',name:'合同管理'},{id:'yyy',name:'客户管理'},{id:'xxx2',name:'初值化管理'},{id:'yyy2',name:'货币汇率'},{id:'33',name:'系统配置'}, {id:'1212',name:'合同管理'},{id:'yyy',name:'客户管理'},{id:'xxx2',name:'初值化管理'},{id:'yyy2',name:'货币汇率'},{id:'33',name:'系统配置'}]"
              :title="item.name"
              name="1"
              :key="index"
            >
              <el-link type="primary" slot="action">
                <el-button type="text" size="mini" @click="() => remove(node, data)">添加</el-button>
                <el-button type="text" size="mini" @click="() => append(data)">删除</el-button>
              </el-link>
              <span v-for="(item2, index2) in [{name:'btn1'},{name:'添加'},{name:'删除'},{name:'提交任务'},{name:'取消任务'}]" :key="index2">
                <el-checkbox v-model="checked">{{item2.name}}</el-checkbox>
                <el-tooltip class="item" effect="dark" placement="bottom">
                  <div slot="content">asd</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </e-section>
          </el-scrollbar>
        </el-col>
      </el-row>
    </template>
  </ms-page-list-layout>
</template>

<script>
export default {
  mixins: [
    $mixins.pageList,
    $mixins.popupManager
  ],
  data () {
    return {
      query: this.getQuery({
        type: '1',
        title: '',
        key_word: '',
        ...this.$route.query
      }),
      filterText: '',
      data: [{
        id: 1,
        label: '我的客户',
        children: [{
          id: 11,
          label: '合同管理'
        },
        {
          id: 12,
          label: '客户列表'
        }]
      }, {
        id: 2,
        label: '初值化管理'
      }, {
        id: 3,
        label: '右边差不多的菜单',
        children: [{
          id: 7,
          label: '还有隐藏页面的权限'
        }, {
          id: 8,
          label: '还有弹窗的页面权限'
        }]
      }, {
        id: 3,
        label: '系统配置',
        children: [{
          id: 7,
          label: '货币汇率'
        }, {
          id: 8,
          label: '系统配置'
        }]
      }],
      activeNames: ['1'],
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
    addRoot () {

    },
    addNode (data) {
      this.$prompt('请节点名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '成功添加节点' + value
        })
        const newChild = { id: new Date().getDate(), label: value, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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
.permission-index {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .col-left-tree{
    min-width: 260px;
  }
}
</style>
