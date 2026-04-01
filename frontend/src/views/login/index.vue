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
    router.push('/admin')
  } 
  else if (user === 'farmer' && pwd === '123456') {
    router.push('/farmer')
  }
  else if (user === 'expert' && pwd === '123456') {
    router.push('/expert')
  }
  else if (user === 'user' && pwd === '123456') {
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
.login-btn {
  width: 100%;
  height: 42px;
  font-size: 16px;
}
</style>