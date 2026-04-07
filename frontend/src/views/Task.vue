<template>

  <div class="top-nav">
    <h2 class="top-nav-title">任务派发</h2>
    <div class="top-nav-user">
        <div class="user-avatar"><i class="fas fa-user"></i></div>
        <div class="user-info">
        <div class="user-name">{{ user?.username || '管理员' }}</div>
      </div>
    </div>
  </div>
  <div class="farmer-field-page">
    <!-- 页面头部：标题 + 操作区
    <div class="page-header">
     
      <div class="header-actions">
        <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索任务名称/负责人"
            class="search-input"
          />
          <button class="btn btn-primary search-btn" @click="handleSearch">
            搜索
          </button>
        </div>
        <button class="btn btn-success add-btn" @click="handleAdd">
          新建派发任务
        </button>
      </div>
    </div> -->

    <!-- 筛选区 -->
    <div class="filter-section">
      <div class="item">
      <div class="filter-item">
        <label class="filter-label">任务状态：</label>
        <select v-model="filterStatus" class="filter-select">
          <option value="">全部</option>
          <option value="0">待执行</option>
          <option value="1">执行中</option>
          <option value="2">已完成</option>
          <option value="3">已逾期</option>
        </select>
      </div>
      <div class="filter-item">
        <label class="filter-label">任务类型：</label>
        <select v-model="filterType" class="filter-select">
          <option value="">全部</option>
          <option value="1">种植任务</option>
          <option value="2">施肥任务</option>
          <option value="3">灌溉任务</option>
          <option value="4">除草任务</option>
          <option value="5">收割任务</option>
          <option value="6">巡查任务</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label class="filter-label">优先级：</label>
        <select v-model="filterLevel" class="filter-select">
          <option value="">全部</option>
          <option value="1">普通</option>
          <option value="2">紧急</option>
          <option value="3">特急</option>
        </select>
      </div>
      <button class="btn btn-default reset-btn" @click="handleResetFilter">
        重置筛选
      </button>
      </div>
      <div class="item">
      <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索任务名称/负责人"
            class="search-input"
          />
          <button class="btn btn-primary search-btn" @click="handleSearch">
            搜索
          </button>
        </div>
        <button class="btn btn-success add-btn" @click="handleAdd">
          新建派发任务
        </button>
        </div>
      </div>


    <!-- 任务列表 -->
    <div class="field-list-container">
      <table class="field-table">
        <thead>
          <tr>
            <th>任务编号</th>
            <th>任务名称</th>
            <th>任务类型</th>
            <th>优先级</th>
            <th>负责人员</th>
            <th>关联地块</th>
            <th>任务状态</th>
            <th>起止时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredList" :key="task.id" class="field-item">
            <td>{{ task.code }}</td>
            <td>{{ task.name }}</td>
            <td>{{ getTypeName(task.type) }}</td>
            <td>
              <span :class="['level-tag', `level-${task.level}`]">
                {{ getLevelName(task.level) }}
              </span>
            </td>
            <td>{{ task.userName }}</td>
            <td>{{ task.fieldName || '未指定' }}</td>
            <td>
              <span :class="['status-tag', `status-${task.status}`]">
                {{ getStatusName(task.status) }}
              </span>
            </td>
            <td>
              {{ formatTime(task.startTime) }} <br>
              <span style="color:#666;font-size:12px">至</span> <br>
              {{ formatTime(task.endTime) }}
            </td>
            <td class="operate-col">
              <button class="btn btn-small btn-info" @click="handleView(task)">
                详情
              </button>
              <button class="btn btn-small btn-warning" @click="handleEdit(task)">
                编辑
              </button>
              <button
                class="btn btn-small btn-danger"
                @click="handleDelete(task.id)"
                :disabled="task.status === 1 || task.status === 2"
              >
                删除
              </button>
            </td>
          </tr>
          <tr v-if="filteredList.length === 0" class="empty-row">
            <td colspan="9" class="empty-text">暂无任务数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination-section" v-if="filteredList.length > 0">
      <div class="page-info">
        共 {{ totalCount }} 条数据，当前第 {{ currentPage }} / {{ totalPages }} 页
      </div>
      <div class="page-btns">
        <button
          class="btn btn-small btn-default"
          @click="currentPage--"
          :disabled="currentPage === 1"
        >
          上一页
        </button>
        <button
          class="btn btn-small btn-default"
          @click="currentPage++"
          :disabled="currentPage === totalPages"
        >
          下一页
        </button>
        <select v-model="pageSize" class="page-size-select" @change="handlePageSizeChange">
          <option value="10">10条/页</option>
          <option value="20">20条/页</option>
          <option value="50">50条/页</option>
        </select>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <div class="modal-mask" v-if="isModalShow">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">{{ isEdit ? '编辑任务' : '新建任务' }}</h3>
          <button class="modal-close" @click="isModalShow = false">×</button>
        </div>
        <div class="modal-body">
          <form class="field-form">
            <div class="form-item">
              <label class="form-label">任务编号：</label>
              <input
                type="text"
                v-model="formData.code"
                class="form-input"
                :disabled="isEdit"
                placeholder="自动生成或手动填写"
              />
            </div>
            <div class="form-item">
              <label class="form-label">任务名称：</label>
              <input
                type="text"
                v-model="formData.name"
                class="form-input"
                placeholder="请输入任务名称"
              />
            </div>
            <div class="form-item">
              <label class="form-label">任务类型：</label>
              <select v-model="formData.type" class="form-select">
                <option value="">请选择</option>
                <option value="1">种植任务</option>
                <option value="2">施肥任务</option>
                <option value="3">灌溉任务</option>
                <option value="4">除草任务</option>
                <option value="5">收割任务</option>
                <option value="6">巡查任务</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">优先级：</label>
              <select v-model="formData.level" class="form-select">
                <option value="1">普通</option>
                <option value="2">紧急</option>
                <option value="3">特急</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">负责人员：</label>
              <input type="text" v-model="formData.userName" class="form-input" placeholder="负责人姓名" />
            </div>
            <div class="form-item">
              <label class="form-label">关联地块：</label>
              <input type="text" v-model="formData.fieldName" class="form-input" placeholder="选填" />
            </div>
            <div class="form-item">
              <label class="form-label">任务状态：</label>
              <select v-model="formData.status" class="form-select">
                <option value="0">待执行</option>
                <option value="1">执行中</option>
                <option value="2">已完成</option>
                <option value="3">已逾期</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">开始时间：</label>
              <input type="datetime-local" v-model="formData.startTime" class="form-input" />
            </div>
            <div class="form-item">
              <label class="form-label">结束时间：</label>
              <input type="datetime-local" v-model="formData.endTime" class="form-input" />
            </div>
            <div class="form-item">
              <label class="form-label">任务描述：</label>
              <textarea
                v-model="formData.desc"
                rows="3"
                class="form-input"
                style="height:auto;resize:none"
                placeholder="任务说明、注意事项等"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="isModalShow = false">取消</button>
          <button class="btn btn-primary" @click="handleSave">保存</button>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <div class="modal-mask" v-if="isDetailShow">
      <div class="modal-container detail-modal">
        <div class="modal-header">
          <h3 class="modal-title">任务详情</h3>
          <button class="modal-close" @click="isDetailShow = false">×</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">任务编号：</span>
            <span class="detail-value">{{ detailData.code }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">任务名称：</span>
            <span class="detail-value">{{ detailData.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">任务类型：</span>
            <span class="detail-value">{{ getTypeName(detailData.type) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">优先级：</span>
            <span :class="['level-tag', `level-${detailData.level}`]">
              {{ getLevelName(detailData.level) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">负责人：</span>
            <span class="detail-value">{{ detailData.userName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">关联地块：</span>
            <span class="detail-value">{{ detailData.fieldName || '未指定' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">任务状态：</span>
            <span :class="['status-tag', `status-${detailData.status}`]">
              {{ getStatusName(detailData.status) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">开始时间：</span>
            <span class="detail-value">{{ formatTime(detailData.startTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">结束时间：</span>
            <span class="detail-value">{{ formatTime(detailData.endTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">创建时间：</span>
            <span class="detail-value">{{ formatTime(detailData.createTime) }}</span>
          </div>
          <div class="detail-item" style="margin-top:10px">
            <span class="detail-label" style="align-self:flex-start">任务描述：</span>
            <span class="detail-value" style="white-space:pre-line">{{ detailData.desc || '无' }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="isDetailShow = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDispatchPage',
  data() {
    return {
      // 搜索&筛选
      searchKeyword: '',
      filterStatus: '',
      filterType: '',
      filterLevel: '',

      // 分页
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,

      // 弹窗
      isModalShow: false,
      isDetailShow: false,
      isEdit: false,

      // 表单
      formData: {
        id: '',
        code: '',
        name: '',
        type: '',
        level: '1',
        userName: '',
        fieldName: '',
        status: '0',
        startTime: '',
        endTime: '',
        desc: '',
        createTime: ''
      },

      // 详情
      detailData: {},

      // 模拟数据
      taskList: [
        {
          id: 1,
          code: 'TASK2025001',
          name: '东区1号地小麦播种',
          type: '1',
          level: '2',
          userName: '张三',
          fieldName: '东地块1号',
          status: '1',
          startTime: '2025-04-01T08:00',
          endTime: '2025-04-07T18:00',
          desc: '完成东区1号地小麦播种，注意行距均匀，土壤湿度适中',
          createTime: '2025-03-30T10:20:00'
        },
        {
          id: 2,
          code: 'TASK2025002',
          name: '西地块灌溉作业',
          type: '3',
          level: '1',
          userName: '李四',
          fieldName: '西地块3号',
          status: '0',
          startTime: '2025-04-08T09:00',
          endTime: '2025-04-09T17:00',
          desc: '对西地块3号进行滴灌，避免积水',
          createTime: '2025-04-01T15:10:00'
        },
        {
          id: 3,
          code: 'TASK2025003',
          name: '南地块杂草清理',
          type: '4',
          level: '3',
          userName: '王五',
          fieldName: '南地块5号',
          status: '2',
          startTime: '2025-03-25T08:30',
          endTime: '2025-03-27T16:30',
          desc: '清除南地块杂草，保护作物根系',
          createTime: '2025-03-24T09:00:00'
        }
      ]
    }
  },
  computed: {
    filteredList() {
      let list = [...this.taskList]
      // 关键词
      if (this.searchKeyword) {
        const kw = this.searchKeyword.toLowerCase()
        list = list.filter(item =>
          item.name.toLowerCase().includes(kw) ||
          item.userName.toLowerCase().includes(kw) ||
          item.code.toLowerCase().includes(kw)
        )
      }
      // 状态
      if (this.filterStatus !== '') {
        list = list.filter(item => item.status == this.filterStatus)
      }
      // 类型
      if (this.filterType !== '') {
        list = list.filter(item => item.type == this.filterType)
      }
      // 优先级
      if (this.filterLevel !== '') {
        list = list.filter(item => item.level == this.filterLevel)
      }

      this.totalCount = list.length
      this.totalPages = Math.ceil(this.totalCount / this.pageSize)
      const start = (this.currentPage - 1) * this.pageSize
      return list.slice(start, start + this.pageSize)
    }
  },
  methods: {
    formatTime(time) {
      if (!time) return ''
      const date = new Date(time)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date
        .getDate()
        .toString()
        .padStart(2, 0)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date
        .getMinutes()
        .toString()
        .padStart(2, 0)}`
    },
    // 任务类型
    getTypeName(type) {
      const map = {
        1: '种植任务',
        2: '施肥任务',
        3: '灌溉任务',
        4: '除草任务',
        5: '收割任务',
        6: '巡查任务'
      }
      return map[type] || '未知'
    },
    // 优先级
    getLevelName(level) {
      const map = { 1: '普通', 2: '紧急', 3: '特急' }
      return map[level] || ''
    },
    // 状态
    getStatusName(status) {
      const map = {
        0: '待执行',
        1: '执行中',
        2: '已完成',
        3: '已逾期'
      }
      return map[status] || '未知'
    },
    handleSearch() {
      this.currentPage = 1
    },
    handleResetFilter() {
      this.searchKeyword = ''
      this.filterStatus = ''
      this.filterType = ''
      this.filterLevel = ''
      this.currentPage = 1
    },
    handleAdd() {
      this.isEdit = false
      this.formData = {
        id: '',
        code: '',
        name: '',
        type: '',
        level: '1',
        userName: '',
        fieldName: '',
        status: '0',
        startTime: '',
        endTime: '',
        desc: '',
        createTime: new Date().toISOString()
      }
      this.isModalShow = true
    },
    handleEdit(task) {
      this.isEdit = true
      this.formData = { ...task }
      this.isModalShow = true
    },
    handleView(task) {
      this.detailData = { ...task }
      this.isDetailShow = true
    },
    handleDelete(id) {
      if (confirm('确定删除该任务？删除后不可恢复')) {
        this.taskList = this.taskList.filter(item => item.id !== id)
        alert('删除成功')
      }
    },
    handleSave() {
      if (!this.formData.name) {
        alert('请输入任务名称')
        return
      }
      if (!this.formData.type) {
        alert('请选择任务类型')
        return
      }
      if (!this.formData.userName) {
        alert('请填写负责人')
        return
      }
      if (this.isEdit) {
        const idx = this.taskList.findIndex(t => t.id === this.formData.id)
        if (idx > -1) {
          this.taskList[idx] = { ...this.formData, createTime: this.taskList[idx].createTime }
          alert('编辑成功')
        }
      } else {
        this.taskList.unshift({
          ...this.formData,
          id: Date.now(),
          createTime: new Date().toISOString()
        })
        alert('新增任务成功')
      }
      this.isModalShow = false
    },
    handlePageSizeChange() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/field_task.css';

</style>