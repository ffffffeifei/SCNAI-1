<template>
  <div class="dashboard-page">
    <div class="header">
      <h1 class="main-title">系统管理员 - 控制台</h1>
      <div class="user-avatar-top" @click="goProfile">
        <i class="fas fa-user"></i>
      </div>
    </div>
    <div class="tech-container">
      <div class="data-item tech-card"><p>用户总数</p><div class="tech-number">246</div></div>
      <div class="data-item tech-card"><p>设备在线</p><div class="tech-number">98%</div></div>
      <div class="data-item tech-card"><p>数据总量</p><div class="tech-number">1.2T</div></div>
      <div class="data-item tech-card"><p>系统状态</p><div class="tech-number">正常</div></div>

      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">功能菜单</h3>
        <div class="menu-grid">
          <div class="menu-item" @click="show('usermanage')">用户管理</div>
          <div class="menu-item" @click="show('device')">设备管理</div>
          <div class="menu-item" @click="show('data')">数据监控</div>
        </div>
      </div>

      <!-- 内容区域：显示你新建的3个页面 -->
      <div class="content-container" style="width:100%;margin-top:20px;">
        <Usermanage v-if="currentPage === 'usermanage'" />
        <Device v-if="currentPage === 'device'" />
        <Data v-if="currentPage === 'data'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入你新建的3个页面
import Usermanage from '@/views/Usermanage.vue'
import Device from '@/views/Device.vue'
import Data from '@/views/Data.vue'

// 登录默认显示：用户管理
const router = useRouter()
const currentPage = ref('usermanage')

const show = (page) => {
  currentPage.value = page
}
</script>

<style scoped>
.dashboard-page { width:100%; min-height:100vh; background: linear-gradient(135deg, #001529 0%, #0a192f 100%); }
.header {
  padding:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.main-title {
  font-size:28px;
  background:linear-gradient(90deg,#00d4ff,#1890ff);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  margin: 0;
}
.data-item { flex:1; min-width:220px; text-align:center; color:#fff; }
.tech-card { background: rgba(0,26,41,0.6); border:1px solid rgba(0,212,255,0.2); border-radius:12px; padding:24px; backdrop-filter: blur(6px); }
.tech-number { font-size:26px; font-weight:bold; color:#00d4ff; margin-top:10px; }
.menu-grid { display:flex; flex-wrap:wrap; gap:16px; margin-top:16px; }
.menu-item { width:160px; height:80px; background:rgba(0,212,255,0.1); border:1px solid rgba(0,212,255,0.3); border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; cursor:pointer; transition:0.3s; }
.menu-item:hover { background:rgba(0,212,255,0.2); transform:translateY(-3px); }

.user-avatar-top {
  position: absolute;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  font-size: 20px;
  cursor: pointer;
}
</style>