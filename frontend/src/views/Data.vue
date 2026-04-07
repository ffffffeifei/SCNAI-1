<template>
  <div class="page-container">
    <h2 class="page-title">系统数据监控</h2>
    <div class="data-grid">
      <div class="data-card">
        <h3>总用户量</h3>
        <div class="num">246</div>
      </div>
      <div class="data-card">
        <h3>今日活跃</h3>
        <div class="num">89</div>
      </div>
      <div class="data-card">
        <h3>累计识别</h3>
        <div class="num">1862</div>
      </div>
      <div class="data-card">
        <h3>咨询总量</h3>
        <div class="num">342</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container { padding:20px; color:#fff; }
.page-title { margin-bottom:20px; color:#00d4ff; }
.data-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
.data-card { padding:24px; background:rgba(0,26,41,0.6); border:1px solid rgba(0,212,255,0.2); border-radius:12px; text-align:center; }
.num { font-size:32px; font-weight:bold; color:#00d4ff; margin-top:10px; }
</style>