<template>
  <div class="farmer-field-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2 class="page-title">数据可视化查看</h2>
      <div class="header-actions">
        <div class="search-box">
          <select v-model="dateRange" class="filter-select" style="width:auto">
            <option value="week">近7天</option>
            <option value="month">近30天</option>
            <option value="quarter">本季度</option>
            <option value="year">本年度</option>
          </select>
          <button class="btn btn-primary" @click="refreshData">刷新数据</button>
        </div>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-section">
      <div class="filter-item">
        <label class="filter-label">数据类型：</label>
        <select v-model="filterDataType" class="filter-select">
          <option value="all">全部数据</option>
          <option value="field">地块数据</option>
          <option value="task">任务数据</option>
          <option value="crop">作物产量</option>
        </select>
      </div>
      <div class="filter-item">
        <label class="filter-label">展示维度：</label>
        <select v-model="filterDimension" class="filter-select">
          <option value="day">按日统计</option>
          <option value="week">按周统计</option>
          <option value="month">按月统计</option>
        </select>
      </div>
      <button class="btn btn-default" @click="resetFilter">重置</button>
    </div>

    <!-- 科技感统计卡片 -->
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:20px">
      <div class="tech-card">
        <div class="tech-label">总地块面积(亩)</div>
        <div class="tech-num">342.6</div>
        <div class="tech-sub">较上期 ↑ 12.3%</div>
      </div>
      <div class="tech-card blue">
        <div class="tech-label">累计完成任务</div>
        <div class="tech-num">286</div>
        <div class="tech-sub">执行率 92.7%</div>
      </div>
      <div class="tech-card green">
        <div class="tech-label">作物总产量(kg)</div>
        <div class="tech-num">128600</div>
        <div class="tech-sub">同比 ↑ 18.2%</div>
      </div>
      <div class="tech-card orange">
        <div class="tech-label">活跃作业人员</div>
        <div class="tech-num">24</div>
        <div class="tech-sub">当日出勤 21 人</div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:20px;">
      <!-- 折线图：产量趋势 -->
      <div class="chart-wrapper">
        <div class="chart-title">作物产量趋势</div>
        <div id="yieldChart" style="width:100%;height:280px"></div>
      </div>

      <!-- 饼图：地块状态分布 -->
      <div class="chart-wrapper">
        <div class="chart-title">地块状态占比</div>
        <div id="fieldStatusChart" style="width:100%;height:280px"></div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px">
      <!-- 柱状图：任务类型统计 -->
      <div class="chart-wrapper">
        <div class="chart-title">各类任务完成量</div>
        <div id="taskTypeChart" style="width:100%;height:280px"></div>
      </div>

      <!-- 柱状图：片区产量对比 -->
      <div class="chart-wrapper">
        <div class="chart-title">各片区产量对比</div>
        <div id="areaCompareChart" style="width:100%;height:280px"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 注意：项目需安装 echarts
// npm install echarts
import * as echarts from 'echarts';

export default {
  name: 'DataViewPage',
  data() {
    return {
      dateRange: 'week',
      filterDataType: 'all',
      filterDimension: 'day',

      yieldChart: null,
      fieldStatusChart: null,
      taskTypeChart: null,
      areaCompareChart: null
    }
  },
  mounted() {
    this.initAllCharts()
  },
  methods: {
    refreshData() {
      this.disposeCharts()
      this.initAllCharts()
    },
    resetFilter() {
      this.dateRange = 'week'
      this.filterDataType = 'all'
      this.filterDimension = 'day'
      this.refreshData()
    },

    initAllCharts() {
      this.initYieldChart()
      this.initFieldStatusChart()
      this.initTaskTypeChart()
      this.initAreaCompareChart()
    },

    // 产量趋势
    initYieldChart() {
      const dom = document.getElementById('yieldChart')
      this.yieldChart = echarts.init(dom)
      this.yieldChart.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: { left: '10%', right: '10%', bottom: '10%', top: '15%' },
        xAxis: {
          type: 'category',
          data: ['1日','2日','3日','4日','5日','6日','7日'],
          axisLine: { lineStyle: { color: '#ccc' } }
        },
        yAxis: { type: 'value', axisLine: { lineStyle: { color: '#ccc' } } },
        series: [{
          name: '产量(kg)',
          type: 'line',
          smooth: true,
          data: [1200, 1400, 1350, 1600, 1800, 1700, 2100],
          itemStyle: { color: '#007bff' },
          lineStyle: { width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0,0,0,1,[
              { offset:0, color:'rgba(0,123,255,0.3)' },
              { offset:1, color:'rgba(0,123,255,0)' }
            ])
          }
        }]
      })
    },

    // 地块状态饼图
    initFieldStatusChart() {
      const dom = document.getElementById('fieldStatusChart')
      this.fieldStatusChart = echarts.init(dom)
      this.fieldStatusChart.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        series: [{
          name: '地块',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 32, name: '耕种中' },
            { value: 18, name: '已收获' },
            { value: 8, name: '休耕' },
            { value: 5, name: '未耕种' }
          ],
          color: ['#28a745','#17a2b8','#ffc107','#6c757d']
        }]
      })
    },

    // 任务类型统计
    initTaskTypeChart() {
      const dom = document.getElementById('taskTypeChart')
      this.taskTypeChart = echarts.init(dom)
      this.taskTypeChart.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: { left: '10%', right: '5%', bottom: '10%' },
        xAxis: {
          type: 'category',
          data: ['种植','施肥','灌溉','除草','收割','巡查'],
          axisLine: { lineStyle: { color: '#ccc' } }
        },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [65, 48, 72, 56, 32, 40],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0,0,0,1,[
              { offset:0, color:'#007bff' },
              { offset:1, color:'#28a745' }
            ])
          }
        }]
      })
    },

    // 片区对比
    initAreaCompareChart() {
      const dom = document.getElementById('areaCompareChart')
      this.areaCompareChart = echarts.init(dom)
      this.areaCompareChart.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: { left: '10%', right: '5%', bottom: '10%' },
        xAxis: {
          type: 'category',
          data: ['东区','西区','南区','北区'],
          axisLine: { lineStyle: { color: '#ccc' } }
        },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [42000, 36000, 28000, 22600],
          itemStyle: { color: '#fd7e14' }
        }]
      })
    },

    disposeCharts() {
      this.yieldChart?.dispose()
      this.fieldStatusChart?.dispose()
      this.taskTypeChart?.dispose()
      this.areaCompareChart?.dispose()
    }
  },
  beforeUnmount() {
    this.disposeCharts()
  }
}
</script>

<style scoped>
@import '@/assets/css/field_task.css';

/* 科技感卡片 */
.tech-card {
  background: #00D4FF1A;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border-left: 4px solid #007bff;
}
.tech-card.blue { border-left-color: #007bff; }
.tech-card.green { border-left-color: #28a745; }
.tech-card.orange { border-left-color: #fd7e14; }

.tech-label {
  font-size: 14px;
  color: #FFF;
  margin-bottom: 8px;
}
.tech-num {
  font-size: 28px;
  font-weight: bold;
  color: #FFF;
  line-height: 1.2;
}
.tech-sub {
  font-size: 12px;
  color: #28a745;
  margin-top: 6px;
}

/* 图表容器 */
.chart-wrapper {
  background: #00D4FF1A;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  position: relative;
}
.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #FFF;
  margin-bottom: 12px;
}
</style>