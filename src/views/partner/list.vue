<template>
  <ms-page-list-layout class="partner-list">
    <template slot="search">
      <el-form v-bind="getFormProps()" @submit.native.prevent="handleSubmit">
        <el-form-item label="业务属区">
          <e-area-cascader v-model="query.region" filterable expand-trigger="hover"></e-area-cascader>
        </el-form-item>
        <el-form-item label="搜索">
          <el-input placeholder="请输入关键字" v-model.trim="query.Search" size="small"></el-input>
        </el-form-item>
        <el-form-item label prop="IsEnable">
          <el-checkbox v-model="query.IsEnable">是否启用</el-checkbox>
        </el-form-item>
        <el-button native-type="search" size="small" @click="handleSearch">搜索</el-button>
        <el-button native-type="submit" size="small" @click="handleCreate">添加</el-button>
      </el-form>
    </template>
    <el-table slot="table" v-bind="getTableProps()" v-on="getTableListeners()" stripe @row-dblclick="handleRowDblclick" :data="pageData.data">
      <el-table-column label="公司税号" prop="Code"></el-table-column>
      <el-table-column label="公司全名" prop="Name"></el-table-column>
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
      <el-table-column label="状态" prop="IsEnable"></el-table-column>
      <el-table-column label="服务评价">
        <template v-slot="scope">100</template>
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
const Form = () => import('./components/Form')
export default {
  mixins: [
    ms.mixins.pageList
  ],
  data () {
    return {
      query: this.getQuery({
        Search: '',
        region: '',
        IsEnable: null,
        // "CreateOn": {
        //   "BeginTime": "2021-07-24T08:13:59.722Z",
        //   "EndTime": "2021-07-24T08:13:59.722Z"
        // },
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
      this.UtilsAxios.handleFetchPost('/api/PlatformTenant/List', (res) => {
        this.pageData.count = res.TotalRecord
        this.pageData.data = res.Items
      }, this.query)
    },
    // 双击人员编辑
    handleRowDblclick (row, column, event) {
      ms.navigator.push(this, Form, { params: row, title: '编辑' })
    },
    // 手动添加人员
    handleCreate () {
      ms.navigator.push(this, Form, { params: null, title: '创建' })
    },
    // 删除一家
    handleDelect (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.UtilsAxios.handleFetchPost('/api/PlatformTenant/Delete', (res) => {
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
    },

    // 搜索
    handleSearch () {
      fetch()
    }
  }
}
</script>

<style lang="scss">
.partner-list {
  width: 100%;
}
</style>
