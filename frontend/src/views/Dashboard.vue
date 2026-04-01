<template>
  <div class="dashboard-page">
    <div class="header">
      <h1 class="main-title">智慧农业AI监控大屏</h1>
    </div>

    <div class="tech-container">
      <!-- 数据卡片 -->
      <div class="data-item tech-card">
        <p>农场总数</p>
        <div class="tech-number">128</div>
      </div>
      <div class="data-item tech-card">
        <p>设备在线</p>
        <div class="tech-number">96%</div>
      </div>
      <div class="data-item tech-card">
        <p>AI识别次数</p>
        <div class="tech-number">2431</div>
      </div>
      <div class="data-item tech-card">
        <p>专家咨询</p>
        <div class="tech-number">167</div>
      </div>

      <!-- 功能模块 -->
      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">系统功能入口</h3>
        <div class="menu-grid">
          <div class="menu-item" v-for="item in menuList" :key="item.name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const menuList = [
  { name: '用户管理' },
  { name: '农场管理' },
  { name: '地块管理' },
  { name: 'AI识别' },
  { name: '专家咨询' },
  { name: '数据监控' },
  { name: '图鉴浏览' },
  { name: '报告审核' },
]
</script>

<style scoped>
.dashboard-page {
  width: 100%;
  min-height: 100vh;
}
.header {
  padding: 20px;
  text-align: center;
}
.main-title {
  font-size: 28px;
  background: linear-gradient(90deg, #00d4ff, #1890ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.data-item {
  flex: 1;
  min-width: 220px;
  text-align: center;
}
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}
.menu-item {
  width: 160px;
  height: 80px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}
.menu-item:hover {
  background: rgba(0, 212, 255, 0.2);
  transform: translateY(-3px);
}
</style>