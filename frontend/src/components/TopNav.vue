<template>
  <div class="top-nav-bar">
    <div class="nav-left">
      <h2 class="logo">智慧农业AI识别系统</h2>
    </div>

    <div class="nav-menu">
      <div
        v-for="item in menuList"
        :key="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
        @click="go(item.path)"
      >
        {{ item.title }}
      </div>
    </div>

    <div class="nav-right">
      <div class="user-info">
        <i class="fas fa-user"></i>
        <span>{{ roleText }}</span>
      </div>
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const role = computed(() => localStorage.getItem('userRole') || 'user')

const roleText = computed(() => {
  const map = {
    admin: '系统管理员',
    farmer: '农场经营者',
    expert: '农业专家',
    user: '普通农户'
  }
  return map[role.value] || '用户'
})

// 每个角色的顶部导航菜单
const menuList = computed(() => {
  const r = role.value
  if (r === 'admin') {
    return [
      { title: '数据监控', path: '/dashboard' },
      { title: '用户管理', path: '/profile' },
      { title: '设备管理', path: '/dashboard' },
      { title: '系统运维', path: '/dashboard' },
    ]
  }
  if (r === 'farmer') {
    return [
      { title: '数据查看', path: '/dashboard' },
      { title: '农场管理', path: '/dashboard' },
      { title: '地块管理', path: '/dashboard' },
      { title: '任务派发', path: '/dashboard' },
      { title: '识别任务', path: '/recognition' },
      { title: '记录查看', path: '/history' },
      { title: '专家咨询', path: '/chat' },
    ]
  }
  if (r === 'expert') {
    return [
      { title: '专家咨询', path: '/chat' },
      { title: '病例诊断', path: '/dashboard' },
      { title: '知识分享', path: '/dashboard' },
      { title: '报告审核', path: '/dashboard' },
    ]
  }
  // 普通农户
  return [
    { title: '基础识别', path: '/recognition' },
    { title: '图鉴浏览', path: '/atlas' },
    { title: '问答咨询', path: '/chat' },
  ]
})

const go = (path) => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('userRole')
  router.push('/login')
}
</script>

<style scoped>
.top-nav-bar {
  width: 100%;
  height: 70px;
  background: rgba(0, 21, 41, 0.9);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  backdrop-filter: blur(10px);
}

.nav-left .logo {
  font-size: 20px;
  background: linear-gradient(90deg, #00d4ff, #1890ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 6px;
}

.nav-item {
  padding: 10px 18px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: 0.25s ease;
  font-size: 15px;
}

.nav-item:hover {
  background: rgba(0, 212, 255, 0.1);
  color: #fff;
}

.nav-item.active {
  background: linear-gradient(90deg, #00d4ff, #1890ff);
  color: #fff;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a0dfff;
  font-size: 14px;
}

.logout-btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(255, 70, 70, 0.15);
  color: #ff6666;
  border: 1px solid rgba(255, 70, 70, 0.3);
  cursor: pointer;
  transition: 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 70, 70, 0.25);
}
</style>