<template>
  <div class="acc-index">
    <el-breadcrumb slot="breadcrumb" separator-class="el-icon-arrow-right" style="top: -26px; border-top-color: white;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >账务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row align="middle">
      <el-col :span="10">
        <e-section title="总进度">
          <chart-polar-stack :option="chart.optionTotal" style="height:300px" />
        </e-section>
      </el-col>
      <el-col :span="14">
        <e-section title="专员战绩">
          <el-table style="width: 100%" highlight-current-row :data="tableData">
            <el-table-column label="专员姓名" prop="a"></el-table-column>
            <el-table-column label="个税" prop="a"></el-table-column>
            <el-table-column label="一般纳税人增值税" prop="a"></el-table-column>
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
          <chart-polyline :option="chart.optionDay" style="height:300px"></chart-polyline>
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
import ChartPolarStack from '@/views/components/chart/PolarStack'
export default {
  components: {
    ChartCategoryStack,
    ChartPolyline,
    ChartPolarStack
  },
  data () {
    return {
      tableData: [{ a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }, { a: 12, b: 23, c: 333, d: 2, e: 3, f: 1 }],
      chart: {
        optionTotal: {},
        optionDay: {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0', '第一天', '第二天', '第三天', '第四天', '第五天', '第六天']
          },
          series: [{
            data: [0, 10, 20, 30, 80, 90, 150],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgb(50, 193, 202)',
                lineStyle: {
                  color: 'rgb(50, 193, 202)'
                }
              }
            },
            areaStyle: {
              color: 'rgba(50, 193, 202,0.2)'
            }
          }]
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

<style lang="scss" scoped>
.acc-index {
  padding: 0 10px;
  .title {
    text-align: center;
    background-color: white;
    padding: 14px;
  }
}
</style>
