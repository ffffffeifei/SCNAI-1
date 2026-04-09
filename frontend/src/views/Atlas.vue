<template>
  <div class="plant-atlas-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2 class="page-title">植物图鉴</h2>
      <div class="header-right">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索植物名称或学名..."
          clearable
          class="search-input"
          @input="handleSearch"
        />
        <span class="total-count">共 {{ plantList.length }} 种植物</span>
        <el-tooltip content="刷新" placement="top">
          <el-button type="primary" circle icon="Refresh" @click="refreshList" />
        </el-tooltip>
      </div>
    </div>

    <!-- 植物卡片列表 -->
    <div class="plant-card-list">
      <el-card
        v-for="plant in filteredPlantList"
        :key="plant.id"
        class="plant-card"
        shadow="hover"
        @click="openDetailDialog(plant)"
      >
        <!-- 植物真实图片（修复require问题） -->
        <div class="plant-cover">
          <el-image
            :src="plant.image"
            fit="cover"
            class="plant-img"
            :preview-src-list="[plant.image]"
            loading="lazy"
          >
            <template #error>
              <div class="img-placeholder">
                <el-icon :size="48" color="#67C23A"><Document /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <!-- 植物信息 -->
        <div class="plant-info">
          <h3 class="plant-name">{{ plant.name }}</h3>
          <p class="plant-scientific-name">{{ plant.scientificName }}</p>
          <div class="plant-meta">
            <span class="meta-item">{{ plant.family }}</span>
            <span class="meta-item">{{ plant.origin }}</span>
          </div>
          <p class="plant-desc">{{ plant.description }}</p>
        </div>
      </el-card>
    </div>

    <!-- 植物详情弹窗（修复空指针问题） -->
    <el-dialog
      v-if="currentPlant"
      v-model="detailDialogVisible"
      :title="currentPlant.name + ' 详情'"
      width="800px"
      :close-on-click-modal="false"
      class="plant-detail-dialog"
    >
      <div class="detail-content">
        <!-- 顶部图片+基础信息 -->
        <div class="detail-header">
          <div class="detail-img-box">
            <el-image
              :src="currentPlant.image"
              fit="cover"
              class="detail-img"
              :preview-src-list="[currentPlant.image]"
            />
          </div>
          <div class="detail-basic-info">
            <h3>{{ currentPlant.name }}</h3>
            <p class="scientific-name">{{ currentPlant.scientificName }}</p>
            <div class="info-tags">
              <el-tag type="success">{{ currentPlant.family }}</el-tag>
              <el-tag type="info">{{ currentPlant.origin }}</el-tag>
              <el-tag type="warning">{{ currentPlant.type }}</el-tag>
            </div>
            <p class="basic-desc">{{ currentPlant.description }}</p>
          </div>
        </div>

        <!-- 种植要点 -->
        <div class="detail-section">
          <h4 class="section-title">🌱 种植要点</h4>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="适宜温度">{{ currentPlant.planting.temp }}</el-descriptions-item>
            <el-descriptions-item label="光照需求">{{ currentPlant.planting.light }}</el-descriptions-item>
            <el-descriptions-item label="土壤要求">{{ currentPlant.planting.soil }}</el-descriptions-item>
            <el-descriptions-item label="浇水频率">{{ currentPlant.planting.water }}</el-descriptions-item>
            <el-descriptions-item label="施肥周期">{{ currentPlant.planting.fertilizer }}</el-descriptions-item>
            <el-descriptions-item label="生长周期">{{ currentPlant.planting.cycle }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 常见病虫害 -->
        <div class="detail-section">
          <h4 class="section-title">🐛 常见病虫害与防治</h4>
          <el-table :data="currentPlant.pests" border style="width: 100%">
            <el-table-column prop="name" label="病虫害名称" width="180" />
            <el-table-column prop="symptom" label="症状" />
            <el-table-column prop="prevention" label="防治方法" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Document } from '@element-plus/icons-vue'

// 植物完整数据（含图片、种植要点、病虫害）
const plantList = ref([
  {
    id: 1,
    name: '丝瓜',
    scientificName: 'Luffa cylindrica',
    family: '葫芦科',
    origin: '印度',
    type: '藤本蔬菜',
    image: 'https://picsum.photos/id/106/800/600',
    description: '一年生攀援藤本，果实为夏季常见蔬菜，成熟后网状纤维可作清洁工具，适应性强，南北均可种植。',
    planting: {
      temp: '20-30℃，耐热不耐寒',
      light: '全日照，每天6小时以上',
      soil: '疏松肥沃、排水良好的壤土',
      water: '保持土壤湿润，忌积水',
      fertilizer: '生长期每10天追一次肥',
      cycle: '播种后60-90天采收'
    },
    pests: [
      {
        name: '霜霉病',
        symptom: '叶片出现黄色角斑，背面生白色霉层，严重时叶片枯死',
        prevention: '发病初期用75%百菌清可湿性粉剂600倍液喷雾，7天一次，连喷2-3次'
      },
      {
        name: '瓜蚜',
        symptom: '成虫、若虫群集在叶片背面吸食汁液，叶片卷曲、生长不良',
        prevention: '用10%吡虫啉可湿性粉剂2000倍液喷雾，或悬挂黄板诱杀'
      }
    ]
  },
  {
    id: 2,
    name: '月季',
    scientificName: 'Rosa chinensis',
    family: '蔷薇科',
    origin: '中国',
    type: '观赏花卉',
    image: 'https://picsum.photos/id/104/800/600',
    description: '被誉为“花中皇后”，四季开花，花色丰富，适应性强，是全球最受欢迎的观赏花卉之一。',
    planting: {
      temp: '15-25℃，耐寒-15℃',
      light: '全日照，每天至少6小时',
      soil: '疏松肥沃、微酸性的沙壤土',
      water: '见干见湿，忌积水',
      fertilizer: '生长期每15天追一次复合肥',
      cycle: '全年开花，盛花期4-10月'
    },
    pests: [
      {
        name: '黑斑病',
        symptom: '叶片出现圆形黑斑，周围黄色晕圈，严重时叶片脱落',
        prevention: '定期修剪通风，发病初期用50%多菌灵可湿性粉剂800倍液喷雾'
      },
      {
        name: '红蜘蛛',
        symptom: '叶片出现灰白色小点，严重时叶片枯黄脱落',
        prevention: '用1.8%阿维菌素乳油3000倍液喷雾，重点喷洒叶片背面'
      }
    ]
  },
  {
    id: 3,
    name: '绿萝',
    scientificName: 'Epipremnum aureum',
    family: '天南星科',
    origin: '所罗门群岛',
    type: '室内观叶',
    image: 'https://picsum.photos/id/107/800/600',
    description: '阴性植物，喜温暖湿润，生命力顽强，可水培可土培，是优良的室内净化空气植物。',
    planting: {
      temp: '20-30℃，越冬不低于10℃',
      light: '散射光，忌阳光直射',
      soil: '疏松透气的腐叶土',
      water: '保持盆土湿润，空气干燥时喷水增湿',
      fertilizer: '生长期每月施一次稀薄液肥',
      cycle: '全年生长，无明显休眠期'
    },
    pests: [
      {
        name: '叶斑病',
        symptom: '叶片出现褐色圆形病斑，逐渐扩大，严重时叶片腐烂',
        prevention: '加强通风，发病初期用70%甲基托布津可湿性粉剂1000倍液喷雾'
      },
      {
        name: '介壳虫',
        symptom: '叶片、茎干出现白色蜡质虫体，吸食汁液，导致叶片发黄',
        prevention: '用酒精擦拭虫体，或用40%氧化乐果乳油1000倍液喷雾'
      }
    ]
  },
  {
    id: 4,
    name: '向日葵',
    scientificName: 'Helianthus annuus',
    family: '菊科',
    origin: '北美洲',
    type: '油料作物',
    image: 'https://picsum.photos/id/108/800/600',
    description: '一年生草本，花盘形似太阳，种子可食用、榨油，适应性强，耐旱耐贫瘠，是重要的经济作物。',
    planting: {
      temp: '15-30℃，耐热',
      light: '全日照，每天8小时以上',
      soil: '排水良好的沙壤土，耐贫瘠',
      water: '苗期耐旱，花期需充足水分',
      fertilizer: '现蕾期追一次磷钾肥',
      cycle: '播种后80-120天成熟'
    },
    pests: [
      {
        name: '锈病',
        symptom: '叶片出现黄褐色锈状孢子堆，严重时叶片枯死',
        prevention: '发病初期用25%三唑酮可湿性粉剂1500倍液喷雾'
      },
      {
        name: '向日葵螟',
        symptom: '幼虫蛀食花盘和种子，造成空壳、腐烂',
        prevention: '用2.5%溴氰菊酯乳油3000倍液喷雾，花期防治'
      }
    ]
  },
  {
    id: 5,
    name: '蝴蝶兰',
    scientificName: 'Phalaenopsis aphrodite',
    family: '兰科',
    origin: '热带亚洲',
    type: '观赏兰花',
    image: 'https://picsum.photos/id/105/800/600',
    description: '多年生附生草本，花姿优美，花期长达数月，是高档室内观赏花卉，被誉为“兰花皇后”。',
    planting: {
      temp: '20-28℃，越冬不低于15℃',
      light: '散射光，忌阳光直射',
      soil: '水苔、树皮等透气基质',
      water: '见干见湿，忌积水',
      fertilizer: '生长期每10天施一次兰花专用肥',
      cycle: '花期2-3个月，全年可开花'
    },
    pests: [
      {
        name: '炭疽病',
        symptom: '叶片出现褐色凹陷病斑，逐渐扩大，严重时叶片腐烂',
        prevention: '加强通风，发病初期用50%多菌灵可湿性粉剂800倍液喷雾'
      },
      {
        name: '蜗牛',
        symptom: '啃食嫩叶、花朵，造成孔洞、缺刻',
        prevention: '人工捕捉，或撒施四聚乙醛颗粒诱杀'
      }
    ]
  },
  {
    id: 6,
    name: '番茄',
    scientificName: 'Solanum lycopersicum',
    family: '茄科',
    origin: '南美洲',
    type: '果蔬两用',
    image: 'https://picsum.photos/id/292/800/600',
    description: '一年生草本，果实营养丰富，可生食、烹饪，全球广泛种植，是最受欢迎的果蔬作物之一。',
    planting: {
      temp: '20-25℃，耐热不耐寒',
      light: '全日照，每天6小时以上',
      soil: '疏松肥沃、排水良好的壤土',
      water: '见干见湿，花期控水防徒长',
      fertilizer: '坐果后追一次磷钾肥',
      cycle: '播种后90-120天采收'
    },
    pests: [
      {
        name: '晚疫病',
        symptom: '叶片出现暗绿色病斑，背面生白色霉层，果实腐烂',
        prevention: '发病初期用72%霜脲氰锰锌可湿性粉剂800倍液喷雾'
      },
      {
        name: '棉铃虫',
        symptom: '幼虫蛀食果实，造成孔洞、腐烂',
        prevention: '用2.5%氯氟氰菊酯乳油2000倍液喷雾，花期防治'
      }
    ]
  }
])

// 搜索关键词
const searchKeyword = ref('')
// 详情弹窗控制
const detailDialogVisible = ref(false)
// 当前选中的植物
const currentPlant = ref(null)

// 过滤后的植物列表（搜索功能）
const filteredPlantList = computed(() => {
  if (!searchKeyword.value) return plantList.value
  const keyword = searchKeyword.value.toLowerCase()
  return plantList.value.filter(item => 
    item.name.toLowerCase().includes(keyword) || 
    item.scientificName.toLowerCase().includes(keyword)
  )
})

// 打开详情弹窗
const openDetailDialog = (plant) => {
  currentPlant.value = plant
  detailDialogVisible.value = true
}

// 搜索事件
const handleSearch = () => {
  // 可添加搜索防抖逻辑，这里遵循少代码原则直接过滤
}

// 刷新列表
const refreshList = () => {
  ElMessage.success('列表已刷新')
  // 实际项目中可在这里重新请求接口获取最新数据
}
</script>

<style scoped lang="scss">
// 页面容器
.plant-atlas-page {
  padding: 20px;
  background-color: #1e293b;
  min-height: calc(100vh - 84px);
}

// 页面头部
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .page-title {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    .search-input {
      width: 280px;
      ::v-deep .el-input__inner {
        background-color: #334155;
        border-color: #475569;
        color: #fff;
        &::placeholder {
          color: #94a3b8;
        }
      }
    }
    .total-count {
      color: #94a3b8;
      font-size: 14px;
    }
    ::v-deep .el-button {
      background-color: #67C23A;
      border-color: #67C23A;
    }
  }
}

// 卡片列表容器
.plant-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

// 植物卡片
.plant-card {
  background-color: #334155;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  ::v-deep .el-card__body {
    padding: 16px;
  }
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  // 植物图片
  .plant-cover {
    width: 100%;
    height: 160px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 12px;
    .plant-img {
      width: 100%;
      height: 100%;
    }
    .img-placeholder {
      width: 100%;
      height: 100%;
      background-color: #1e293b;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  // 植物信息
  .plant-info {
    .plant-name {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 4px 0;
    }
    .plant-scientific-name {
      color: #94a3b8;
      font-size: 12px;
      font-style: italic;
      margin: 0 0 8px 0;
    }
    .plant-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      .meta-item {
        color: #67C23A;
        font-size: 12px;
        background-color: rgba(103, 194, 58, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }
    .plant-desc {
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

// 详情弹窗样式
::v-deep .plant-detail-dialog {
  .el-dialog__header {
    background-color: #1e293b;
    border-bottom: 1px solid #475569;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
      &:hover {
        color: #67C23A;
      }
    }
  }
  .el-dialog__body {
    background-color: #1e293b;
    padding: 20px;
  }
}

.detail-content {
  color: #fff;
  // 详情头部
  .detail-header {
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
    .detail-img-box {
      width: 300px;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      .detail-img {
        width: 100%;
        height: 100%;
      }
    }
    .detail-basic-info {
      flex: 1;
      h3 {
        font-size: 24px;
        margin: 0 0 8px 0;
        color: #fff;
      }
      .scientific-name {
        color: #94a3b8;
        font-style: italic;
        margin: 0 0 12px 0;
      }
      .info-tags {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }
      .basic-desc {
        color: #cbd5e1;
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  // 详情板块
  .detail-section {
    margin-bottom: 24px;
    .section-title {
      font-size: 18px;
      margin: 0 0 12px 0;
      color: #67C23A;
    }
    ::v-deep .el-descriptions {
      background-color: #334155;
      .el-descriptions__label {
        background-color: #475569;
        color: #fff;
      }
      .el-descriptions__content {
        color: #cbd5e1;
      }
    }
    ::v-deep .el-table {
      background-color: #334155;
      color: #fff;
      .el-table__header-wrapper {
        th {
          background-color: #475569;
          color: #fff;
        }
      }
      .el-table__body-wrapper {
        td {
          color: #cbd5e1;
          border-color: #475569;
        }
      }
    }
  }
}

// 响应式适配
@media screen and (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    .header-right {
      width: 100%;
      .search-input {
        flex: 1;
      }
    }
  }
  .plant-card-list {
    grid-template-columns: 1fr;
  }
  .detail-header {
    flex-direction: column;
    .detail-img-box {
      width: 100%;
      height: 200px;
    }
  }
  ::v-deep .plant-detail-dialog {
    width: 90% !important;
  }
}
</style>