<template>
  <ms-page-list-layout class="permission-index">
    <template slot="search"></template>
    <template slot="table">
      <el-row>
        <el-col :span="3">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
          <el-tree
            :data="data"
            node-key="id"
            ref="tree"
            default-expand-all
            :filter-node-method="filterNode"
            @check-change="handleCheckChange"
          ></el-tree>
        </el-col>
        <el-col :span="21">
          <el-row type="flex" align="middle">
            <el-col :span="24">姓名，所属部门， 职位，xxxx</el-col>
            <span>
              <el-button size="small">添加</el-button>
              <el-button size="small">删除</el-button>
            </span>
          </el-row>
          <el-scrollbar>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                v-for="(item, index) in [{id:'xxx',name:'mk1'},{id:'yyy',name:'mk2'},{id:'xxx2',name:'mk1'},{id:'yyy2',name:'mk2'},{id:'33',name:'mk2'},{id:'333',name:'mk1'},{id:'44',name:'mk2'},{id:'444',name:'mk2'},{id:'55',name:'mk1'},{id:'555',name:'mk2'}]"
                :title="item.name"
                name="1"
                :key="index"
              >
                <span v-for="(item2, index2) in [{name:'btn1'},{name:'添加'},{name:'删除'},{name:'管理员2'},{name:'管理员'},{name:'管理员3'}]" :key="index2">
                  <el-checkbox v-model="checked">{{item2.name}}</el-checkbox>
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content">asd</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
              </el-collapse-item>
            </el-collapse>
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
        label: 'ddddd',
        children: [{
          id: 4,
          label: '合同管理',
          children: [{
            id: 9,
            label: '审核'
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
            disabled: true,
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
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
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
}
</style>
