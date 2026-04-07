<template>
  <div class="page-container">
    <h2 class="page-title">设备 / 服务监控</h2>
    <div class="device-grid">
      <div class="device-card online">
        <h3>无人机服务</h3>
        <p>运行状态：正常</p>
      </div>
      <div class="device-card online">
        <h3>图像识别服务</h3>
        <p>运行状态：正常</p>
      </div>
      <div class="device-card online">
        <h3>问答咨询服务</h3>
        <p>运行状态：正常</p>
      </div>
      <div class="device-card warning">
        <h3>数据同步服务</h3>
        <p>运行状态：延迟</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container { padding:20px; color:#fff; }
.page-title { margin-bottom:20px; color:#00d4ff; }
.device-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
.device-card { padding:24px; background:rgba(0,26,41,0.6); border:1px solid rgba(0,212,255,0.2); border-radius:12px; }
.device-card.online { border-left:6px solid #00c853; }
.device-card.warning { border-left:6px solid #ffc107; }
</style>