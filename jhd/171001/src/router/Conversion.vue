<template>
  <div class="root">
    <div class="tips">请输入口令码：</div>
    <div class="input-wrap">
      <div>
        <span :class="{current:text.length==0}">{{text[0]}}</span>
        <span :class="{current:text.length==1}">{{text[1]}}</span>
        <span :class="{current:text.length==2}">{{text[2]}}</span>
        <span :class="{current:text.length==3}">{{text[3]}}</span>
      </div>
      <input type="tel" v-model="text" @input="chagngeText" />
    </div>

    <button class="btn submit-btn" :disabled="text.length<4" @click="submit">确定</button>
    <div class="rule">
      <p>
        口令码领卡：
        <br/> 搜索关注【约糖】公众号回复关键词，获取当天的口令码，在平台内输入口令码即可获取随机卡牌。
      </p>
    </div>

    <div class="layer-gift" @click="showLayer=false" v-if="showLayer">
      <div class="prize-content">
        <img :src="giftInfo.giftUrl">
        <div class="text">
          <div>恭喜你获得了{{giftInfo.name}}</div>
          <div>请到“我的卡包”里查看</div>
        </div>
        <button class="btn" @click.stop="$router.push('index')">我的卡包</button>
      </div>
    </div>
  </div>
</template>
<script>
import { tips } from '@/store/actions'
export default {
  data() {
    return {
      text: '',
      showLayer: false,
      giftInfo: null,
    }
  },
  methods: {
    chagngeText() {
      this.text = this.text.slice(0, 4)
    },
    async submit() {
      if (this.text.length < 4) return
      const { data } = await axios.get('service.activity_jhd.kouLing.getcard', {
        params: {
          accountId: appSDK.param.accountId,
          code: this.text,
        }
      })
      if (!data.success) {
        tips(data.msg)
        return
      }
      this.giftInfo = data.data.gifts[0]
      this.showLayer = true
      this.text = ''
    },
  },
}
</script>

<style scoped  lang="scss">
.root {
  min-height: 100vh;
}

.tips {
  font-size: 40px;
  color: #515151;
  text-align: center;
  padding: 170px 0 40px 0;
}

.input-wrap {
  position: relative;
  overflow: hidden;
  width: 300px;
  margin: 0 auto;
  >div {
    display: flex;
    >* {
      margin-right: 40px;
      border-bottom: 10px solid #777;
      display: block;
      text-align: center;
      font-size: 60px;
      width: 60px;
      height: 90px;
      color: #E8C28E;
      &.current {
        border-bottom-color: #E8C28E;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  input {
    position: absolute;
    width: 200%;
    height: 100%;
    left: -100%;
    top: 0;
    opacity: 0;
  }
}


.btn {
  border: 0;
  background: #ffd77c;
  color: #9b6d0b;
  text-align: center;
  font-size: 30px;
  border-radius: 50px;
  outline: none;
  &.gray,
  &[disabled] {
    background: #d2d1d2;
    color: #9e9e9e;
  }
}

.submit-btn {
  width: 270px;
  line-height: 66px;
  margin: auto;
  display: block;
  margin-top: 84px;
}

.rule {
  background: #f0f0f0;
  padding: 20px 40px;
  margin-top: 80px;
  p {
    background: rgba(232, 194, 142, 0.2);
    padding: 20px;
    border-radius: 8px;
    color: #C39D68;
    font-size: 24px;
    line-height: 36px;
  }
}


.layer-gift {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1;
  display: flex;
  align-items: center;
  .prize-content {
    text-align: center;
    flex: 1;
    >img {
      width: 404px;
    }
    .text {
      font-size: 48px;
      color: #FFFFFF;
      margin-top: 56px;
      >*:nth-child(2) {
        font-size: 28px;
      }
    }
    .btn {
      width: 270px;
      line-height: 66px;
      margin-top: 140px;
    }
  }
}
</style>
