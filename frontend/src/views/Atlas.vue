<template>
  <div class="user-crop-detail">
    <!-- 头部 -->
    <div class="crop-header">
      <div class="crop-title">丝瓜图鉴</div>
      <div class="crop-subtitle">Luffa cylindrica (L.) Roem</div>
    </div>

    <!-- 内容 -->
    <div class="crop-content">
      <!-- 作物介绍 -->
      <div class="crop-intro">
        <div class="intro-left">
          <img src="@/assets/images/icons/shigua.jpeg" alt="丝瓜" class="crop-img" />
        </div>
        <div class="intro-right">
          <h3 class="section-title">作物介绍</h3>
          <div class="intro-text">
            <p>丝瓜是葫芦科丝瓜属一年生攀援藤本植物，原产于印度，在我国南北方均有广泛栽培，是夏季常见的优质蔬菜。</p>
            <p>丝瓜口感清甜、营养丰富，具有清热化痰、凉血解毒的功效。同时丝瓜生长速度快、采收期长，非常适合家庭及规模化种植。</p>
            <p>成熟后的丝瓜络可用于清洁、药用、工业原料等用途，是一种兼具食用、药用、经济价值的高效作物。</p>
          </div>
        </div>
      </div>

      <!-- 种植要点 -->
      <div class="crop-planting">
        <h3 class="section-title">种植要点</h3>
        <div class="planting-grid">
          <div class="plant-card" v-for="(item, i) in plantList" :key="i">
            <div class="plant-title">{{ item.title }}</div>
            <div class="plant-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 常见病虫害（每张都带图片） -->
      <div class="crop-diseases">
        <h3 class="section-title">常见病虫害</h3>
        <div class="disease-grid">
          <div class="disease-card" v-for="(item, i) in diseaseList" :key="i">
            <div class="disease-img-box">
              <img :src="item.img" :alt="item.name" class="disease-img"/>
            </div>
            <div class="disease-info">
              <div class="disease-name">{{ item.name }}</div>
              <div class="disease-tip">
                <p><strong>症状：</strong>{{ item.symptom }}</p>
                <p><strong>防治：</strong>{{ item.prevent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 1. 先在 script 标签最顶部，用 import 引入所有图片
import diseaseSM from '@/assets/images/luffa/SM.png'
import diseaseBF from '@/assets/images/luffa/BF.png'
import diseaseYc from '@/assets/images/luffa/YC.png'
import diseaseTJ from '@/assets/images/luffa/TJ.png'

export default {
  name: "UserCropLuffa",
  data() {
    return {
      plantList: [
        {
          title: "土壤与施肥",
          desc: "喜欢疏松肥沃、排水良好的土壤，pH值6.0-7.5最佳。基肥以腐熟有机肥为主，生长期追施氮磷钾复合肥。"
        },
        {
          title: "温度与光照",
          desc: "丝瓜喜温耐热，适宜生长温度25-30℃。需要充足光照，光照不足会影响开花结果。"
        },
        {
          title: "播种与育苗",
          desc: "春季气温稳定在15℃以上可播种。育苗移栽更佳，2-3片真叶时定植，成活率更高。"
        },
        {
          title: "搭架引蔓",
          desc: "丝瓜为蔓生作物，必须搭架栽培。及时引蔓上架，保持通风透光，提高产量。"
        },
        {
          title: "水分管理",
          desc: "生长期需水量大，保持土壤湿润，但严禁积水。干旱会导致果实畸形、苦味加重。"
        },
        {
          title: "授粉与采收",
          desc: "丝瓜为雌雄同株异花，可自然授粉。花谢后7-10天即可采收，过晚影响品质。"
        }
      ],

      // 病虫害数据（每张都带图片）
      diseaseList: [
        {
          name: "霜霉病",
          img: diseaseSM,
          symptom: "叶片出现黄色不规则病斑，潮湿时背面产生黑灰色霉层，叶片快速干枯。",
          prevent: "加强通风降湿，发病初期用霜脲·锰锌、烯酰吗啉喷雾，7天一次，连喷2-3次。"
        },
        {
          name: "白粉病",
          img: diseaseBF,
          symptom: "叶片、茎蔓出现白色粉状物，后期变为灰白色，植株生长衰弱。",
          prevent: "合理密植，发病初期用嘧菌酯、三唑酮喷雾，交替使用效果更好。"
        },
        {
          name: "蚜虫",
          img: diseaseYc,
          symptom: "群集在嫩叶、嫩梢吸食汁液，导致叶片卷曲、皱缩、发黄。",
          prevent: "黄板诱杀，喷施吡虫啉、啶虫脒，低毒高效，持效期长。"
        },
        {
          name: "炭疽病",
          img: diseaseTJ,
          symptom: "叶片出现褐色圆形病斑，后期病斑中央灰白色、边缘深褐色；果实上出现凹陷褐色病斑，湿度大时产生粉红色黏质孢子团，严重时果实腐烂。",
          prevent: "加强通风降湿，避免田间积水；发病初期喷施咪鲜胺、苯醚甲环唑，7-10天一次，连喷2-3次，交替用药防止抗性。"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* 整体页面 */
.user-crop-detail {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 26, 41, 0.7);
  min-height: 100vh;
}

/* 头部 */
.crop-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}
.crop-title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px;
}
.crop-subtitle {
  font-size: 14px;
  color: #666;
}

/* 内容容器 */
.crop-content {
  max-width: 1100px;
  margin: 0 auto;
}

/* 介绍区域 */
.crop-intro {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  background: #1e324d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.intro-left {
  flex: 1;
  min-width: 280px;
}
.crop-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 6px;
}
.intro-right {
  flex: 2;
  min-width: 280px;
}
.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15px;
  padding-bottom: 6px;
  border-bottom: 2px solid #28a745;
  display: inline-block;
}
.intro-text {
  font-size: 15px;
  line-height: 1.7;
  color: #fff;
}
.intro-text p {
  margin-bottom: 10px;
}

/* 种植要点卡片 */
.crop-planting {
  background: #1e324d;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.planting-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}
.plant-card {
  background: #1e3a5f;
  border-left: 3px solid #28a745;
  padding: 15px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
.plant-title {
  font-weight: bold;
  margin-bottom: 6px;
  color: #f8f9fa;
}
.plant-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #f8f9fa;
}

/* 病虫害卡片（带图片） */
.crop-diseases {
  background: #1e324d;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.disease-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 20px;
}
.disease-card {
  display: flex;
  align-items: stretch; /* 关键：让卡片高度完全一致 */
  background: #1e3a5f;
  border-left: 3px solid #28a745;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
/* 图片容器：固定尺寸 + 居中裁剪，保证所有图片大小一致 */
.disease-img-box {
  width: 160px; /* 固定宽度 */
  height: 160px; /* 固定高度，和宽度一致，正方形 */
  flex-shrink: 0; /* 禁止压缩 */
  overflow: hidden;
  background: #1e293b; /* 图片背景，避免留白 */
}
.disease-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 核心：等比例裁剪，居中显示，保证图片不变形、大小统一 */
  object-position: center; /* 居中裁剪，避免只显示局部 */
}
.disease-info {
  flex: 1;
  padding: 15px;
}
.disease-name {
  font-weight: bold;
  font-size: 16px;
  color: #28a745;
  margin-bottom: 8px;
}
.disease-tip {
  font-size: 13px;
  line-height: 1.6;
  color: #fff;
}
.disease-tip p {
  margin: 0 0 6px 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .disease-grid {
    grid-template-columns: 1fr;
  }
  .disease-card {
    flex-direction: column;
  }
  .disease-img {
    width: 100%;
    height: 180px;
  }
}
</style>