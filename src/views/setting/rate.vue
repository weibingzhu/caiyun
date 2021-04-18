<template>
  <div class="setting-rate">
    <h1>{{year}}人民币汇率中间牌价</h1>
      <!-- <el-table
          style="width: 100%"
          v-bind="getTableProps()"
          v-on="getTableListeners()"
          highlight-current-row
          :data="tableData"
        >
          <el-table-column label="日期" prop="日期"></el-table-column>
          <el-table-column label="美元" prop="美元"></el-table-column>
          <el-table-column label="日元" prop="日元"></el-table-column>
          <el-table-column label="港元" prop="港元"></el-table-column>
          <el-table-column label="英镑" prop="英镑"></el-table-column>
          <el-table-column label="林吉特" prop="林吉特"></el-table-column>
          <el-table-column label="卢布" prop="卢布"></el-table-column>
          <el-table-column label="澳元" prop="澳元"></el-table-column>
          <el-table-column label="加元" prop="加元"></el-table-column>
          <el-table-column label="新西兰元" prop="新西兰元"></el-table-column>
          <el-table-column label="新加坡元" prop="新加坡元"></el-table-column>
          <el-table-column label="瑞士法郎" prop="瑞士法郎"></el-table-column>
          <el-table-column label="兰特" prop="兰特"></el-table-column>
          <el-table-column label="韩元" prop="韩元"></el-table-column>
          <el-table-column label="迪拉姆" prop="迪拉姆"></el-table-column>
          <el-table-column label="里亚尔" prop="里亚尔"></el-table-column>
          <el-table-column label="福林" prop="福林"></el-table-column>
          <el-table-column label="兹罗提" prop="兹罗提"></el-table-column>
          <el-table-column label="丹麦克朗" prop="丹麦克朗"></el-table-column>
          <el-table-column label="瑞典克朗" prop="瑞典克朗"></el-table-column>
          <el-table-column label="挪威克朗" prop="挪威克朗"></el-table-column>
          <el-table-column label="里拉" prop="里拉"></el-table-column>
          <el-table-column label="比索" prop="比索"></el-table-column>
          <el-table-column label="泰铢" prop="泰铢"></el-table-column>
      </el-table> -->
  </div>
</template>

<script>

export default {
  mixins: [
    $mixins.pageList
  ],
  data () {
    return {
      year: '2021',
      tableData: {'日期': 2021}
    }
  },

  methods: {
    fetch (query) {
    }
  }
}
</script>

<style lang="scss">
.setting-rate {
  h1 {
    padding-top: 1rem;
    text-align: center;
    margin: auto;
  }
}
</style>
