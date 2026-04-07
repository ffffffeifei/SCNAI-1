<template>
  <div class="login-page">
    <div class="login-card tech-card">
      <h2 class="tech-title">智慧农业AI识别系统</h2>
      <div class="form-item">
        <label>账号</label>
        <input v-model="username" type="text" placeholder="请输入账号" />
      </div>
      <div class="form-item">
        <label>密码</label>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <button class="tech-btn login-btn" @click="login">登录系统</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')

const login = () => {
  const user = username.value
  const pwd = password.value

  if (user === 'admin' && pwd === '123456') {
    localStorage.setItem('userRole', 'admin')
    router.push('/admin')
  } 
  else if (user === 'farmer' && pwd === '123456') {
    localStorage.setItem('userRole', 'farmer')
    router.push('/farmer')
  }
  else if (user === 'user' && pwd === '123456') {
    localStorage.setItem('userRole', 'user')
    router.push('/user')
  }
  else {
    alert('账号或密码错误！')
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #001529 0%, #0a192f 100%);
}
.login-card {
  width: 420px;
  padding: 40px 30px;
  background: rgba(0,26,41,0.6);
  border: 1px solid rgba(0,212,255,0.3);
  border-radius: 12px;
  backdrop-filter: blur(6px);
}
.tech-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 30px;
  background: linear-gradient(90deg,#00d4ff,#1890ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.form-item {
  margin-bottom: 24px;
}
.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #ffffffd3;
}
.form-item input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  background: rgba(0,26,41,0.5);
  border: 1px solid rgba(0,212,255,0.3);
  border-radius: 4px;
  color: #fff;
  outline: none;
}
.tech-btn {
  width: 100%;
  height: 42px;
  font-size: 16px;
  background: linear-gradient(90deg,#00d4ff,#1890ff);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.tech-btn:hover {
  opacity: 0.9;
}
</style>