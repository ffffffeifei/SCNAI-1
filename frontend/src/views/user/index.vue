<template>
  <div class="dashboard-page">
    <div class="header"><h1 class="main-title">普通农户 - 控制台</h1></div>
    <div class="tech-container">
      <div class="data-item tech-card"><p>累计识别</p><div class="tech-number">76</div></div>
      <div class="data-item tech-card"><p>图鉴浏览</p><div class="tech-number">132</div></div>
      <div class="data-item tech-card"><p>我的提问</p><div class="tech-number">18</div></div>
      <div class="data-item tech-card"><p>已回复</p><div class="tech-number">16</div></div>

      <div class="panel tech-card" style="width:100%">
        <h3 class="tech-title">功能菜单</h3>
        <div class="menu-grid">
          <div class="menu-item" @click="show('recognition')">基础识别</div>
          <div class="menu-item" @click="show('atlas')">图鉴浏览</div>
          <div class="menu-item" @click="show('chat')">问答咨询</div>
        </div>
      </div>

      <div class="content-container" style="width:100%;margin-top:20px;">
        <Recognition v-if="currentPage === 'recognition'" />
        <Atlas v-if="currentPage === 'atlas'" />
        <Chat v-if="currentPage === 'chat'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Recognition from '@/views/Recognition.vue'
import Atlas from '@/views/Atlas.vue'
import Chat from '@/views/Chat.vue'

// 默认一进来就显示第一个功能：基础识别
const currentPage = ref('recognition')
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