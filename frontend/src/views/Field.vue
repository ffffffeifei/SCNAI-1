<template>
  <div class="top-nav">
    <h2 class="top-nav-title">地块管理</h2>
    <div class="top-nav-user">
      <div class="user-avatar"><i class="fas fa-user"></i></div>
      <div class="user-info">
        <div class="user-name">{{ user?.username || '管理员' }}</div>
      </div>
    </div>
  </div>
  <div class="farmer-field-page">
    <!-- 页面头部：标题 + 操作区 -->
    <!-- <div class="page-header">
      <div class="header-actions">
        <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="请输入地块名称/编号搜索"
            class="search-input"
          />
          <button class="btn btn-primary search-btn" @click="handleSearch">
            搜索
          </button>
        </div>
        <button class="btn btn-success add-btn" @click="handleAdd">
          新增地块
        </button>
      </div>
    </div> -->

    <!-- 筛选区 -->
    <div class="filter-section">
      <div class="item">
      <div class="filter-item">
        <label class="filter-label">地块状态：</label>
        <select v-model="filterStatus" class="filter-select">
          <option value="">全部</option>
          <option value="0">未耕种</option>
          <option value="1">耕种中</option>
          <option value="2">已收获</option>
          <option value="3">休耕</option>
        </select>
      </div>
      <div class="filter-item">
        <label class="filter-label">所属片区：</label>
        <select v-model="filterArea" class="filter-select">
          <option value="">全部</option>
          <option value="area1">东区</option>
          <option value="area2">西区</option>
          <option value="area3">南区</option>
          <option value="area4">北区</option>
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
            placeholder="请输入地块名称/编号搜索"
            class="search-input"
          />
          <button class="btn btn-primary search-btn" @click="handleSearch">
            搜索
          </button>
        </div>
        <button class="btn btn-success add-btn" @click="handleAdd">
          新增地块
        </button>
        </div>
    </div>

    <!-- 地块列表 -->
    <div class="field-list-container">
      <table class="field-table">
        <thead>
          <tr>
            <th>地块编号</th>
            <th>地块名称</th>
            <th>所属片区</th>
            <th>面积(亩)</th>
            <th>土壤类型</th>
            <th>当前状态</th>
            <th>种植作物</th>
            <th>最后更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in filteredFields" :key="field.id" class="field-item">
            <td>{{ field.code }}</td>
            <td>{{ field.name }}</td>
            <td>{{ getAreaName(field.area) }}</td>
            <td>{{ field.areaSize }}</td>
            <td>{{ field.soilType }}</td>
            <td>
              <span :class="['status-tag', `status-${field.status}`]">
                {{ getStatusName(field.status) }}
              </span>
            </td>
            <td>{{ field.crop || '无' }}</td>
            <td>{{ formatTime(field.updateTime) }}</td>
            <td class="operate-col">
              <button class="btn btn-small btn-info" @click="handleView(field)">
                详情
              </button>
              <button class="btn btn-small btn-warning" @click="handleEdit(field)">
                编辑
              </button>
              <button class="btn btn-small btn-danger" @click="handleDelete(field.id)">
                删除
              </button>
            </td>
          </tr>
          <tr v-if="filteredFields.length === 0" class="empty-row">
            <td colspan="9" class="empty-text">暂无地块数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页区 -->
    <div class="pagination-section" v-if="filteredFields.length > 0">
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
          <h3 class="modal-title">{{ isEdit ? '编辑地块' : '新增地块' }}</h3>
          <button class="modal-close" @click="isModalShow = false">×</button>
        </div>
        <div class="modal-body">
          <form class="field-form">
            <div class="form-item">
              <label class="form-label">地块编号：</label>
              <input
                type="text"
                v-model="formData.code"
                class="form-input"
                :disabled="isEdit"
                placeholder="请输入地块编号（新增必填）"
              />
            </div>
            <div class="form-item">
              <label class="form-label">地块名称：</label>
              <input
                type="text"
                v-model="formData.name"
                class="form-input"
                placeholder="请输入地块名称（必填）"
              />
            </div>
            <div class="form-item">
              <label class="form-label">所属片区：</label>
              <select v-model="formData.area" class="form-select">
                <option value="">请选择</option>
                <option value="area1">东区</option>
                <option value="area2">西区</option>
                <option value="area3">南区</option>
                <option value="area4">北区</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">面积(亩)：</label>
              <input
                type="number"
                v-model="formData.areaSize"
                class="form-input"
                placeholder="请输入地块面积（必填）"
                min="0.1"
                step="0.1"
              />
            </div>
            <div class="form-item">
              <label class="form-label">土壤类型：</label>
              <select v-model="formData.soilType" class="form-select">
                <option value="">请选择</option>
                <option value="黑土">黑土</option>
                <option value="黄土">黄土</option>
                <option value="红土">红土</option>
                <option value="沙土">沙土</option>
                <option value="黏土">黏土</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">当前状态：</label>
              <select v-model="formData.status" class="form-select">
                <option value="0">未耕种</option>
                <option value="1">耕种中</option>
                <option value="2">已收获</option>
                <option value="3">休耕</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">种植作物：</label>
              <input
                type="text"
                v-model="formData.crop"
                class="form-input"
                placeholder="请输入当前种植作物（可选）"
              />
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
          <h3 class="modal-title">地块详情</h3>
          <button class="modal-close" @click="isDetailShow = false">×</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <span class="detail-label">地块编号：</span>
            <span class="detail-value">{{ detailData.code }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">地块名称：</span>
            <span class="detail-value">{{ detailData.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">所属片区：</span>
            <span class="detail-value">{{ getAreaName(detailData.area) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">面积：</span>
            <span class="detail-value">{{ detailData.areaSize }} 亩</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">土壤类型：</span>
            <span class="detail-value">{{ detailData.soilType }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">当前状态：</span>
            <span :class="['status-tag', `status-${detailData.status}`]">
              {{ getStatusName(detailData.status) }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">种植作物：</span>
            <span class="detail-value">{{ detailData.crop || '无' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">土壤肥力：</span>
            <span class="detail-value">{{ detailData.fertility || '未检测' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">灌溉方式：</span>
            <span class="detail-value">{{ detailData.irrigation || '未设置' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">最后耕种时间：</span>
            <span class="detail-value">{{ formatTime(detailData.plantTime) || '无' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">最后更新时间：</span>
            <span class="detail-value">{{ formatTime(detailData.updateTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">备注信息：</span>
            <span class="detail-value">{{ detailData.remark || '无' }}</span>
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
  name: 'FarmerFieldPage',
  data() {
    return {
      // 搜索&筛选
      searchKeyword: '',
      filterStatus: '',
      filterArea: '',
      // 分页
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
      // 弹窗控制
      isModalShow: false,
      isDetailShow: false,
      isEdit: false,
      // 表单数据
      formData: {
        id: '',
        code: '',
        name: '',
        area: '',
        areaSize: '',
        soilType: '',
        status: '0',
        crop: '',
        fertility: '',
        irrigation: '',
        plantTime: '',
        updateTime: '',
        remark: ''
      },
      // 详情数据
      detailData: {},
      // 模拟数据源
      fieldList: [
        {
          id: 1,
          code: 'FIELD001',
          name: '东地块1号',
          area: 'area1',
          areaSize: 12.5,
          soilType: '黑土',
          status: 1,
          crop: '小麦',
          fertility: '中等',
          irrigation: '滴灌',
          plantTime: '2024-03-10 08:30:00',
          updateTime: '2024-05-20 15:20:00',
          remark: '该地块排水良好，适合种植小麦'
        },
        {
          id: 2,
          code: 'FIELD002',
          name: '西地块3号',
          area: 'area2',
          areaSize: 8.8,
          soilType: '黄土',
          status: 2,
          crop: '玉米',
          fertility: '肥沃',
          irrigation: '漫灌',
          plantTime: '2024-02-15 09:10:00',
          updateTime: '2024-05-18 10:15:00',
          remark: '已完成收获，待翻耕'
        },
        {
          id: 3,
          code: 'FIELD003',
          name: '南地块5号',
          area: 'area3',
          areaSize: 15.2,
          soilType: '红土',
          status: 3,
          crop: '',
          fertility: '一般',
          irrigation: '喷灌',
          plantTime: '',
          updateTime: '2024-04-30 14:40:00',
          remark: '休耕期，计划下月种植水稻'
        }
      ]
    }
  },
  computed: {
    // 筛选后的列表
    filteredFields() {
      let list = [...this.fieldList]
      // 关键词筛选
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.trim().toLowerCase()
        list = list.filter(
          item =>
            item.code.toLowerCase().includes(keyword) ||
            item.name.toLowerCase().includes(keyword)
        )
      }
      // 状态筛选
      if (this.filterStatus !== '') {
        list = list.filter(item => item.status == this.filterStatus)
      }
      // 片区筛选
      if (this.filterArea !== '') {
        list = list.filter(item => item.area === this.filterArea)
      }
      // 分页处理
      this.totalCount = list.length
      this.totalPages = Math.ceil(this.totalCount / this.pageSize)
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return list.slice(start, end)
    }
  },
  methods: {
    // 格式化时间
    formatTime(time) {
      if (!time) return ''
      const date = new Date(time)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    },
    // 获取片区名称
    getAreaName(areaCode) {
      const areaMap = {
        area1: '东区',
        area2: '西区',
        area3: '南区',
        area4: '北区'
      }
      return areaMap[areaCode] || '未知'
    },
    // 获取状态名称
    getStatusName(status) {
      const statusMap = {
        0: '未耕种',
        1: '耕种中',
        2: '已收获',
        3: '休耕'
      }
      return statusMap[status] || '未知'
    },
    // 搜索
    handleSearch() {
      this.currentPage = 1 // 搜索后重置页码
    },
    // 重置筛选
    handleResetFilter() {
      this.searchKeyword = ''
      this.filterStatus = ''
      this.filterArea = ''
      this.currentPage = 1
    },
    // 新增地块
    handleAdd() {
      this.isEdit = false
      // 重置表单
      this.formData = {
        id: '',
        code: '',
        name: '',
        area: '',
        areaSize: '',
        soilType: '',
        status: '0',
        crop: '',
        fertility: '',
        irrigation: '',
        plantTime: '',
        updateTime: new Date().toISOString(),
        remark: ''
      }
      this.isModalShow = true
    },
    // 编辑地块
    handleEdit(field) {
      this.isEdit = true
      this.formData = { ...field }
      this.isModalShow = true
    },
    // 查看详情
    handleView(field) {
      this.detailData = { ...field }
      this.isDetailShow = true
    },
    // 删除地块
    handleDelete(id) {
      if (confirm('确定要删除该地块吗？删除后不可恢复！')) {
        this.fieldList = this.fieldList.filter(item => item.id !== id)
        alert('删除成功！')
      }
    },
    // 保存地块
    handleSave() {
      // 基础校验
      if (!this.formData.code && !this.isEdit) {
        alert('请输入地块编号！')
        return
      }
      if (!this.formData.name) {
        alert('请输入地块名称！')
        return
      }
      if (!this.formData.areaSize) {
        alert('请输入地块面积！')
        return
      }
      if (!this.formData.area) {
        alert('请选择所属片区！')
        return
      }
      if (!this.formData.soilType) {
        alert('请选择土壤类型！')
        return
      }

      if (this.isEdit) {
        // 编辑逻辑
        const index = this.fieldList.findIndex(item => item.id === this.formData.id)
        if (index > -1) {
          this.fieldList[index] = {
            ...this.formData,
            updateTime: new Date().toISOString()
          }
          alert('编辑成功！')
        }
      } else {
        // 新增逻辑
        const newField = {
          ...this.formData,
          id: Date.now(), // 临时ID
          updateTime: new Date().toISOString()
        }
        this.fieldList.unshift(newField)
        alert('新增成功！')
      }
      this.isModalShow = false
    },
    // 切换页大小
    handlePageSizeChange() {
      this.currentPage = 1 // 切换页大小后重置页码
    }
  }
}
</script>
<style scoped>
@import '@/assets/css/field_task.css';
</style>