<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="avatar">
        <i class="fas fa-user"></i>
      </div>
      <h2 class="title">个人信息中心</h2>

      <div class="info-item">
        <label>登录账号</label>
        <div class="value">{{ username }}</div>
      </div>

      <div class="info-item">
        <label>当前角色权限</label>
        <div class="value role">{{ roleText }}</div>
      </div>

      <div class="info-item">
        <label>账户状态</label>
        <div class="value status-normal">正常使用中</div>
      </div>

      <div class="info-item">
        <label>注册时间</label>
        <div class="value">2026-01-01</div>
      </div>

      <div class="info-item">
        <label>最近登录</label>
        <div class="value">刚刚</div>
      </div>

      <div class="info-item">
        <label>电子邮箱</label>
        <input v-model="nickname" class="input-text" placeholder="请输入电子邮箱" />
      </div>

      <div class="info-item">
        <label>联系方式</label>
        <input v-model="phone" class="input-text" placeholder="请输入手机号" />
      </div>

      <div class="btns">
        <button class="save-btn" @click="saveProfile">保存修改</button>
        <button class="logout-btn" @click="logout">退出登录</button>
      </div>

      <div v-if="saveTip" class="save-tip">{{ saveTip }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const roleText = ref('')
const nickname = ref('')
const phone = ref('')
const saveTip = ref('')

// 进入页面时加载保存过的信息
onMounted(() => {
  const role = localStorage.getItem('userRole')
  username.value = role || 'user'

  // 角色显示
  if (role === 'admin') roleText.value = '系统管理员'
  else if (role === 'farmer') roleText.value = '农场经营者'
  else if (role === 'user') roleText.value = '普通农户'
  else roleText.value = '普通用户'

  // 从本地读取已保存的信息
  const profile = JSON.parse(localStorage.getItem('userProfile')) || {}
  nickname.value = profile.nickname || ''
  phone.value = profile.phone || ''
})

// 保存信息到本地存储
const saveProfile = () => {
  const profile = {
    nickname: nickname.value,
    phone: phone.value
  }
  localStorage.setItem('userProfile', JSON.stringify(profile))
  saveTip.value = '✅ 信息已保存'
  setTimeout(() => { saveTip.value = '' }, 2000)
}

// 退出登录时清除角色信息
const logout = () => {
  localStorage.removeItem('userRole')
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #001529 0%, #0a192f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.profile-card {
  width: 100%;
  max-width: 580px;
  background: rgba(0,26,41,0.7);
  border: 1px solid rgba(0,212,255,0.2);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(8px);
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.4);
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  font-size: 38px;
}
.title {
  color: #00d4ff;
  margin-bottom: 30px;
  font-size: 22px;
}
.info-item {
  margin-bottom: 20px;
  text-align: left;
}
.info-item label {
  color: #ccc;
  font-size: 14px;
  display: block;
  margin-bottom: 6px;
}
.value {
  color: #fff;
  font-size: 16px;
}
.role {
  color: #00d4ff;
  font-weight: bold;
}
.status-normal {
  color: #00c853;
  font-weight: 500;
}
.input-text {
  width: 100%;
  height: 44px;
  background: rgba(0,26,41,0.5);
  border: 1px solid rgba(0,212,255,0.3);
  border-radius: 6px;
  padding: 0 14px;
  color: #fff;
  outline: none;
}
.btns {
  display: flex;
  gap: 16px;
  margin-top: 36px;
}
.save-btn {
  flex: 1;
  height: 46px;
  background: #00d4ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}
.logout-btn {
  flex: 1;
  height: 46px;
  background: rgba(255,68,68,0.2);
  color: #ff4444;
  border: 1px solid rgba(255,68,68,0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}
.save-tip {
  margin-top: 16px;
  color: #00c853;
  font-size: 14px;
}
</style>