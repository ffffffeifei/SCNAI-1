<template>
  <div class="dashboard-page">
    <div class="header"><h1 class="main-title">农场经营者 - 控制台</h1></div>
    <div class="tech-container">
      <div class="data-item tech-card"><p>农场数量</p><div class="tech-number">12</div></div>
      <div class="data-item tech-card"><p>地块总数</p><div class="tech-number">58</div></div>
      <div class="data-item tech-card"><p>今日任务</p><div class="tech-number">24</div></div>
      <div class="data-item tech-card"><p>识别次数</p><div class="tech-number">186</div></div>
      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">功能菜单</h3>
        <div class="menu-grid">
          <div class="menu-item">农场管理</div>
          <div class="menu-item">地块管理</div>
          <div class="menu-item">任务派发</div>
          <div class="menu-item">识别任务</div>
          <div class="menu-item">记录查看</div>
          <div class="menu-item">专家咨询</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page { width:100%; min-height:100vh; }
.header { padding:20px; text-align:center; }
.main-title { font-size:28px; background:linear-gradient(90deg,#00d4ff,#1890ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.data-item { flex:1; min-width:220px; text-align:center; }
.menu-grid { display:flex; flex-wrap:wrap; gap:16px; margin-top:16px; }
.menu-item { width:160px; height:80px; background:rgba(0,212,255,0.1); border:1px solid rgba(0,212,255,0.3); border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; cursor:pointer; transition:0.3s; }
.menu-item:hover { background:rgba(0,212,255,0.2); transform:translateY(-3px); }
</style>