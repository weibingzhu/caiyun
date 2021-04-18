<template>
  <div class="console">
    <el-row>
      <el-col :span="7">
        <e-section title="税务统计">
          <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
          <chart-pie-doughnut :option="chart.optionTotal" style="height:280px" />
        </e-section>
      </el-col>
      <el-col :span="10" class="statis-box">
        <el-divider content-position="center">本年累计</el-divider>
        <el-row class="statis-box-1">
          <el-col :span="12">
            <div class="statis-item">
              报税
              <br />
              <em>3000</em>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="statis-item">
              记账
              <br />
              <em>205000</em>
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="center">本月统计</el-divider>
        <el-row class="statis-box-2">
          <el-col :span="12">
            <div class="statis-item">
              报税
              <br />
              <em>3000</em>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="statis-item">
              记账
              <br />
              <em>2000万</em>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7">
        <e-section title="账务统计">
          <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
          <chart-pie-doughnut :option="chart.optionTotal" style="height:280px"></chart-pie-doughnut>
        </e-section>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <e-section title="税务每天申报统计">
          <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
          <chart-polyline :option="chart.optionTaxEachDay" style="height:300px"></chart-polyline>
        </e-section>
      </el-col>
      <el-col :span="12">
        <e-section title="账务每天申报统计">
          <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
          <chart-polyline :option="chart.optionAccEachDay" style="height:300px"></chart-polyline>
        </e-section>
      </el-col>
    </el-row>
    <e-section title="明星专员">
      <div slot="action">
        <el-date-picker slot="action" class="main-period" v-model="month" size="small" type="month" placeholder="属期"></el-date-picker>
        <el-link type="primary">更多</el-link>
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

import ChartPieDoughnut from '@/views/components/chart/PieDoughnut'
import ChartAreaStack from '@/views/components/chart/AreaStack'
import ChartPolyline from '@/views/components/chart/Polyline'
export default {
  components: {
    ChartPieDoughnut,
    ChartAreaStack,
    ChartPolyline
  },
  data () {
    return {
      month: null,
      chart: {
        optionTotal: {},
        optionAccEachDay: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['一般纳税人', '小规模']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号', '11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号', '20号', '21号', '22号']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '一般纳税人',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [12, 13, 11, 14, 90, 30, 20, 10, 32, 11, 2, 90, 30, 20, 30, 32, 11, 2, 90, 30, 20, 30]
            },

            {
              name: '小规模',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {},
              data: [20, 32, 21, 34, 90, 30, 20, 20, 32, 11, 0, 90, 30, 10, 30, 32, 11, 2, 90, 30, 20, 30]
            }
          ]
        },
        optionTaxEachDay: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['个税', '一般纳税人增值税', '小规模增值税', '企业所得', '生产经营所得']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号', '11号', '12号', '13号', '14号', '15号']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '个税',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [12, 13, 11, 14, 90, 30, 20, 10, 32, 11, 0, 90, 30, 20, 30]
            },
            {
              name: '一般纳税人增值税',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [22, 82, 91, 34, 90, 30, 30, 20, 12, 41, 0, 90, 20, 20, 30]
            },
            {
              name: '小规模增值税',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [50, 32, 21, 54, 90, 30, 10, 20, 32, 11, 0, 90, 30, 10, 30]
            },
            {
              name: '企业所得',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [30, 32, 31, 34, 90, 30, 20, 20, 32, 31, 0, 90, 30, 10, 30]
            },
            {
              name: '生产经营所得',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {},
              data: [20, 32, 21, 34, 90, 30, 20, 20, 32, 11, 0, 90, 30, 10, 30]
            }
          ]
        }
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
.console {
  padding: 10px;
  .statis-box {
    // max-height: 280px;
    .el-divider {
      font-size: 2.4em;
    }
    .statis-box-1 {
      background: rgba(247, 111, 134, 1);
    }
    .statis-box-2 {
      margin-top: 20px;
      background: rgba(42, 209, 172, 1);
    }
    .el-col {
      div {
        font-size: 1.6em;
        color: #fff;
        // border-radius:12px;
        em {
          display: block;
          font-size: 2.4em;
          line-height: 1.4;
        }
        padding: 10px;
        &:nth-child(2) div {
          border-left-color: lawngreen;
        }
      }
    }
  }
}
</style>
