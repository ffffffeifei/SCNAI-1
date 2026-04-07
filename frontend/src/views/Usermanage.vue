<template>
  <div class="page-container">
    <h2 class="page-title">用户管理（农场经营者 / 农户）</h2>
    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>账号</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>farmer01</td>
            <td>农场经营者</td>
            <td><span class="status normal">正常</span></td>
            <td>2026-01-10</td>
          </tr>
          <tr>
            <td>2</td>
            <td>user01</td>
            <td>普通农户</td>
            <td><span class="status normal">正常</span></td>
            <td>2026-02-11</td>
          </tr>
          <tr>
            <td>3</td>
            <td>farmer02</td>
            <td>农场经营者</td>
            <td><span class="status warning">异常</span></td>
            <td>2026-03-15</td>
          </tr>
          <tr>
            <td>4</td>
            <td>user02</td>
            <td>普通农户</td>
            <td><span class="status normal">正常</span></td>
            <td>2026-04-01</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-container { padding:20px; color:#fff; }
.page-title { margin-bottom:20px; color:#00d4ff; }
.table-card { background:rgba(0,26,41,0.6); border:1px solid rgba(0,212,255,0.2); border-radius:12px; padding:20px; }
table { width:100%; border-collapse:collapse; }
th,td { padding:14px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.1); }
th { color:#00d4ff; }
.status { padding:4px 10px; border-radius:6px; font-size:12px; }
.normal { background:#00c85322; color:#00c853; }
.warning { background:#ffc10722; color:#ffc107; }
</style>