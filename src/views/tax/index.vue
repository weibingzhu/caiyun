<template>
  <div class="tax-index">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >税务管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <el-row align="middle">
      <el-col :span="8">
        <e-section title="总进度">
          <chart-pie-doughnut :option="chart.optionTotal" style="height:300px" />
        </e-section>
      </el-col>
      <el-col :span="16">
        <e-section title="明星专员">
          <el-link type="primary" slot="action">更多</el-link>
          <el-table style="width: 100%" highlight-current-row :data="tableData">
            <el-table-column label="专员姓名" prop="a"></el-table-column>
            <el-table-column label="个税" prop="a">
              <template slot-scope="scope">
                <el-rate v-model="value1"></el-rate>
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
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col :span="14">
        <e-section title="每天申报统计">
          <chart-area-stack :option="chart.optionDay" style="height:300px"></chart-area-stack>
        </e-section>
      </el-col>
      <el-col :span="10">
        <e-section title="模块确认数据统计">
          <chart-category-stack :option="chart.optionModules" style="height:300px" />
        </e-section>
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col :span="12">
        <e-section title="专员报税统计">
          <el-select slot="action" size="mini" value="1" style="width:100px;">
            <el-option label="本期" value="1"></el-option>
            <el-option label="当天" value="2"></el-option>
          </el-select>
          <chart-category-stack :option="chart.optionTax" style="height:300px" />
        </e-section>
      </el-col>
      <el-col :span="12">
        <e-section title="专员提取数据统计">
          <chart-category-stack :option="chart.optionCrawler" style="height:300px" />
        </e-section>
      </el-col>
    </el-row>
    <e-section title="专员总进度">
      <el-select slot="action" size="mini" value="1" style="width:100px;">
        <el-option label="本期" value="1"></el-option>
        <el-option label="当天" value="2"></el-option>
      </el-select>
      <el-table style="width: 100%" highlight-current-row :data="tableData">
        <el-table-column label="专员姓名" prop="a"></el-table-column>
        <el-table-column label="总数" prop="a"></el-table-column>
        <el-table-column label="个税" prop="a"></el-table-column>
        <el-table-column label="一般纳税人增值税" prop="a"></el-table-column>
        <el-table-column label="小规模增值税" prop="a"></el-table-column>
        <el-table-column label="企业所得税" prop="a"></el-table-column>
        <el-table-column label="其他" prop="b"></el-table-column>
        <el-table-column label="提取次数" prop="c"></el-table-column>
        <el-table-column label="初值化表" prop="c"></el-table-column>
        <el-table-column label="进项" prop="d"></el-table-column>
        <el-table-column label="销项" prop="e"></el-table-column>
        <el-table-column label="海关" prop="f"></el-table-column>
        <el-table-column label="代开" prop="f"></el-table-column>
        <el-table-column label="小规模" prop="f"></el-table-column>
      </el-table>
    </e-section>
    <e-section title="需要扣款的公司">
      <el-link type="primary" slot="action">更多</el-link>
      <el-table style="width: 100%" highlight-current-row :data="tableData">
        <el-table-column label="公司名称" prop="a"></el-table-column>
        <el-table-column label="专员姓名" prop="a"></el-table-column>
        <el-table-column label="税种+金额" prop="a"></el-table-column>
        <el-table-column label="申报时间" prop="a"></el-table-column>
        <el-table-column label="扣款时间" prop="b"></el-table-column>
      </el-table>
    </e-section>
  </div>
</template>

<script>
// import  from '@/views/components/chart/Pie'
import ChartCategoryStack from '@/views/components/chart/CategoryStack'
import ChartPolyline from '@/views/components/chart/Polyline'
import ChartPieDoughnut from '@/views/components/chart/PieDoughnut'
import ChartAreaStack from '@/views/components/chart/AreaStack'
export default {
  components: {
    ChartCategoryStack,
    ChartPolyline,
    ChartAreaStack,
    ChartPieDoughnut
  },
  data () {
    return {
      tableData: [{ a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }],
      value1: 5,
      chart: {
        optionTotal: {},
        optionDay: {
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
        },
        optionTax: {
          legend: {
            data: ['个税', '一般纳税人增值税', '小规模增值税', '企业所得', '其他']
          },
          xAxis: {
            type: 'category',
            data: ['小1', '小2', '小3', '小4', '小5', '小6']
          },
          series: [
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '个税',
              data: [32, 30, 30, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '一般纳税人增值税',
              data: [32, 30, 30, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '小规模增值税',
              data: [32, 30, 30, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '企业所得',
              data: [32, 30, 30, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '其他',
              data: [32, 30, 30, 33, 39, 33]
            }
          ]
        },
        optionModules: {
          legend: {
            data: ['已确认', '错误数据', '无数据']
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['费用', '进项', '销项', '工资', '缴款书', '报关单', '固定资产']

          },
          series: [
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '已确认',
              data: [32, 30, 30, 33, 39, 33, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '错误数据',
              data: [32, 30, 30, 33, 39, 33, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '无数据',
              data: [32, 30, 30, 33, 39, 33, 33]
            }
          ]
        },

        optionCrawler: {
          legend: {
            data: ['表格初值化', '进销项', '进项', '销项', '代开', '小规模提取', '小规模申报', '海关']
          },
          xAxis: {
            type: 'category',
            data: ['小1', '小2', '小3', '小4', '小5', '小6']
          },
          series: [
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '表格初值化',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '进销项',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '进项',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '销项',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '代开',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '小规模提取',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '小规模申报',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            },
            {
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              name: '海关',
              data: [32, 30, 30, 33, 39, 33, 39, 33]
            }
          ]
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.tax-index {
  // padding: 0 10px;
  .title {
    text-align: center;
    background-color: white;
    padding: 14px;
  }
  .el-rate__icon {
    margin-right: 0px;
  }
  .el-rate{
    .el-rate__icon{
      margin-right:0;
      // font-size:12px;
    }
  }
}
</style>
