<template>
  <div class="dashboard-page">
    <div class="header"><h1 class="main-title">农业专家 - 控制台</h1></div>
    <div class="tech-container">
      <div class="data-item tech-card"><p>待回复咨询</p><div class="tech-number">32</div></div>
      <div class="data-item tech-card"><p>病例诊断</p><div class="tech-number">86</div></div>
      <div class="data-item tech-card"><p>知识分享</p><div class="tech-number">54</div></div>
      <div class="data-item tech-card"><p>待审核报告</p><div class="tech-number">19</div></div>
      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">功能菜单</h3>
        <div class="menu-grid">
          <div class="menu-item">专家咨询</div>
          <div class="menu-item">病例诊断</div>
          <div class="menu-item">知识分享</div>
          <div class="menu-item">报告审核</div>
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