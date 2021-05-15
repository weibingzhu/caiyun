<template>
<!--  Personal Home Page 个人页面 -->
  <div class="php">
    <el-row>
      <el-col :span="7">
        头像
      </el-col>
      <el-col :span="10" class="statis-box">

      </el-col>
      <el-col :span="7">
        统计
      </el-col>
    </el-row>
    <e-section title="我的客户">
      <div slot="action">
        <el-select placeholder="状态" size="small" filterable multiple v-model="query.status">
          <el-option v-for="item in znData.autoTaskStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
      </div>
      <el-table style="width: 100%" highlight-current-row :data="tableData">
        <el-table-column label="专员姓名" prop="a"></el-table-column>
        <el-table-column label="个税" prop="a">
          <template slot-scope="scope">
            <el-rate class="eleeeee" v-model="value1"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="一般纳税人增值税" prop="a">
          <template slot-scope="scope">
            <el-rate v-model="value1"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="小规模增值税" prop="a"></el-table-column>
        <el-table-column label="企业所得税" prop="a"></el-table-column>
        <el-table-column label="其他" prop="a"></el-table-column>
      </el-table>
    </e-section>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      month: null,
      tableData: [{}, {}],
      query: {
        status: '排队中'
      }
    }
  },
  mothods: {
    fetch () {
    }
  }
}
</script>

<style lang="scss">
.php {
  padding: 10px;
}
</style>
