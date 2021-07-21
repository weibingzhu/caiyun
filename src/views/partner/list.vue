<template>
  <ms-page-list-layout class="partner-list">
    <template slot="search">
      <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-form-item label="业务属区">
          <el-cascader :options="options" :props="props" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="搜索">
          <el-input placeholder="请输入关键字" v-model.trim="keyWork" size="small"></el-input>
        </el-form-item>
        <el-button native-type="submit" size="small" @click="handleCreate">添加</el-button>
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
      <!-- <el-table-column type="selection" width="58"></el-table-column> -->
      <el-table-column label="公司全名">
        <template v-slot="scope">朵朵彩云</template>
      </el-table-column>
      <el-table-column label="联系电话">
        <template v-slot="scope">14578562559</template>
      </el-table-column>
      <el-table-column label="业务属区">
        <template v-slot="scope">
          <el-tooltip effect="dark" content="公司地址：xxxxxxxxxxxxxxxx" placement="top-start">
            <span>深圳</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="客户数">
        <template v-slot="scope">100</template>
      </el-table-column>
      <el-table-column label="税务进度">
        <template v-slot="scope">
          <el-tooltip effect="dark" content="要求负责人跟进" placement="top-start">
            <span>
              个税99/100
              <br />增值税87/100
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="账务进度">
        <template v-slot="scope">
          <el-tooltip effect="dark" content="要求负责人跟进" placement="top-start">
            <span>
              本月66/88
              <br />上个月66/88
              <br />上上个月66/88
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="负责人">
        <template v-slot="scope">
          <el-tooltip effect="dark" content="18978956586" placement="top-start">
            <span>小明</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="创建人">
        <template v-slot="scope">
          <el-tooltip effect="dark" content="2020-20-10 12:12:45" placement="top-start">
            <span>黄晓明</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="状 态">
        <template v-slot="scope">
          <template v-if="scope.$index % 3">未激活</template>
          <template v-else-if="scope.$index % 5">离职</template>
          <template v-else>正常</template>
        </template>
      </el-table-column>
      <el-table-column label="服务评价">
        <template v-slot="scope">100</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">看数据</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }]
      }],
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
      }, params)
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
.partner-list{
  width: 100%;
}
</style>
