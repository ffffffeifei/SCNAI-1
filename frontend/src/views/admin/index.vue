<template>
  <div class="dashboard-page">
    <div class="header"><h1 class="main-title">系统管理员 - 控制台</h1></div>
    <div class="tech-container">
      <div class="data-item tech-card"><p>用户总数</p><div class="tech-number">246</div></div>
      <div class="data-item tech-card"><p>设备在线</p><div class="tech-number">98%</div></div>
      <div class="data-item tech-card"><p>数据总量</p><div class="tech-number">1.2T</div></div>
      <div class="data-item tech-card"><p>系统状态</p><div class="tech-number">正常</div></div>

      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">功能菜单</h3>
        <div class="menu-grid">
          <div class="menu-item" @click="show('profile')">用户管理</div>
          <div class="menu-item" @click="show('device')">设备管理</div>
          <div class="menu-item" @click="show('dashboard')">数据监控</div>
        </div>
      </div>

      <div class="content-container" style="width:100%;margin-top:20px;">
        <Profile v-if="currentPage === 'profile'" />
        <div v-if="currentPage === 'device'" class="tech-card" style="padding:30px;text-align:center;color:#fff;">设备管理页面</div>
        <Dashboard v-if="currentPage === 'dashboard'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/Dashboard.vue'

// 默认显示第一个功能：用户管理
const currentPage = ref('profile')
const show = (page) => {
  currentPage.value = page
}
</script>

<style scoped>
.dashboard-page { width:100%; min-height:100vh; }
.header { padding:20px; text-align:center; }
.main-title { font-size:28px; background:linear-gradient(90deg,#00d4ff,#1890ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.data-item { flex:1; min-width:220px; text-align:center; }
.menu-grid { display:flex; flex-wrap:wrap; gap:16px; margin-top:16px; }
.menu-item { width:160px; height:80px; background:rgba(0,212,255,0.1); border:1px solid rgba(0,212,255,0.3); border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; cursor:pointer; transition:0.3s; }
.menu-item:hover { background:rgba(0,212,255,0.2); transform:translateY(-3px); }
</style>