<template>
  <div class="root">
    <div class="header">
      <img src="../img/index-header.png" alt="">
      <div class="text">
        <i></i>
        <span>瓜分约糖千万现金</span>
        <i></i>
      </div>
    </div>
    <div class="layer-btn">
      <router-link to="prize"><img src="../img/card_1.png"></router-link>
      <router-link to="buyFudai"><img src="../img/card_2.png"></router-link>
      <router-link to="lottery"><img src="../img/card_3.png"></router-link>
      <router-link to="rule" class="guideBtn"><img src="../img/card_4.png"></router-link>
    </div>
    <div class="content">
      <section class="total-time">
        <img src="../img/line_l.png" />
        <div>
          已有
          <span class="num">{{cartNumberInfo.allUser}}</span>人正在集卡
          <br> 活动结束倒计时：
          <Countdown :endTime="store.endDate" :showDay="true" fmt="dd天hh小时mm分"></Countdown>
        </div>
        <img src="../img/line_r.png" />
      </section>
      <section class="card">
        <img :src="currentCard.giftUrl" class="img" />
        <img src="../img/button_hc.png" class="btn_compound" @click="compound" v-if="collected" />
        <div class="text">
          您已集齐
          <span>{{cartNumberInfo.myZQCardNum}}</span>套
        </div>
      </section>
      <div class="card-list">
        <div class="item" v-for="card in cardList" :key="card.id" :class="{hasCard:card.myGiftNum>0}" @click="currentCard=card">
          <template v-if="card.giftType==1">
            <img src="../img/人物/tianpng_df.png" />
            <img src="../img/人物/tianpng_s.png" />
          </template>
          <template v-if="card.giftType==2">
            <img src="../img/人物/yutu_df.png" />
            <img src="../img/人物/yutu_s.png" />
          </template>
          <template v-if="card.giftType==3">
            <img src="../img/人物/houyi_df.png" />
            <img src="../img/人物/houyi_s.png" />
          </template>
          <template v-if="card.giftType==4">
            <img src="../img/人物/yudi_df.png" />
            <img src="../img/人物/yudi_s.png" />
          </template>
          <template v-if="card.giftType==5">
            <img src="../img/人物/change_df.png" />
            <img src="../img/人物/change_s.png" />
          </template>
          <span class="num" v-if="card.myGiftNum">{{card.myGiftNum}}</span>
          <span class="dot" v-if="currentCard==card"></span>
        </div>
      </div>

      <div class="btn-list">
        <button class="btn" :disabled="currentCard.myGiftNum<1" @click="give">送给好友</button>
        <button class="btn" @click="$router.push('conversion')">口令获取</button>
      </div>
    </div>

    <div class="layer-prize" @click="showPrizeLayer=false" v-if="showPrizeLayer">
      <div class="prize-content">
        <img src="https://beta.image.mymaiquan.com/jhd/app_style/guoqin/card_zq.png">
        <div class="text">
          <div>恭喜你成功兑换中秋卡！</div>
          <div>请到“我的宝箱”里查看</div>
        </div>
        <button class="btn" @click.stop="$router.push('prize')">我的宝箱</button>
      </div>
    </div>

    <div class="guideLayer" v-if="showGuideLayer">
    </div>
    <img class="guideLayerImg" src="../img/tip_home.png" v-if="showGuideLayer" />

  </div>
</template>

<script>
import Countdown from '@/components/Countdown'
import store from '@/store'
import { tips, confirm } from '@/store/actions'

export default {
  data() {
    return {
      store,
      currentCard: { giftType: 5 },
      showPrizeLayer: false,
      cartNumberInfo: { allUser: 0, myZQCardNum: 0 },
      showGuideLayer: false,
      cardList: [
        {
          id: 1,
          giftType: 1,
          myGiftNum: 0,
          giftUrl: 'https://beta.image.mymaiquan.com/jhd/app_style/guoqin/tp.png',
        },
        {
          id: 2,
          giftType: 2,
          myGiftNum: 0,
          giftUrl: 'https://beta.image.mymaiquan.com/jhd/app_style/guoqin/yt.png',
        },
        {
          id: 5,
          giftType: 5,
          myGiftNum: 0,
          giftUrl: 'https://beta.image.mymaiquan.com/jhd/app_style/guoqin/ce.png',
        },
        {
          id: 3,
          giftType: 3,
          myGiftNum: 0,
          giftUrl: 'https://beta.image.mymaiquan.com/jhd/app_style/guoqin/hy.png',
        },
        {
          id: 4,
          giftType: 4,
          myGiftNum: 0,
          giftUrl: 'https://beta.image.mymaiquan.com/jhd/app_style/guoqin/yd.png',
        },
      ],
    }
  },
  components: { Countdown },
  computed: {
    collected() {
      return this.cardList.filter(item => item.myGiftNum > 0).length == 5
    },
  },
  methods: {
    async compound() {
      const { data } = await axios.post('jhd.activity.userGift.merge', {
        accountId: appSDK.param.accountId,
      })
      if (data.data) {
        this.showPrizeLayer = true
        this.getCardNum()
        this.getCardList()
      } else {
        tips(data.msg)
      }
    },
    give() {
      store.giveCardType = this.currentCard.giftType
      this.$router.push('searchUser')
    },
    async getCardList() {
      const localTime = Date.now()
      const { headers, data } = await axios.get('jhd.activity.userGift.userCards', {
        params: {
          accountId: appSDK.param.accountId,
        }
      })
      try {
        store.timeLag = new Date(headers.date) - localTime
      } catch (e) {
        //
      }
      const list = data.data || []
      this.cardList = this.cardList.map(card => {
        card.myGiftNum = 0
        return list.find(item => item.giftType == card.giftType) || card
      })
      this.currentCard = this.cardList[2]
    },
    async getCardNum() {
      const { data } = await axios.get('jhd.activity.userGift.index', {
        params: {
          accountId: appSDK.param.accountId,
        }
      })
      this.cartNumberInfo = data.data
    }
  },
  async mounted() {
    const key = 'activity171001'
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, '1')
      this.showGuideLayer = true
    }

    this.getCardList()
    this.getCardNum()
  },

}
</script>

<style scoped lang="scss">
@keyframes scale {
  from {
    transform: scale(1)
  }
  to {
    transform: scale(0.9)
  }
}

.root {
  background: url(../img/fudaibg.png);
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 30px 0;
}

.guideLayer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1;
}

.guideLayerImg {
  width: 396px;
  position: absolute;
  top: 420px;
  left: 150px;
  z-index: 1;
}

.header {
  text-align: center;
  >img {
    width: 558px;
  }
  .text {
    width: 500px;
    margin: auto;
    display: flex;
    box-shadow: 0 2px 11px 0 #BA5A34;
    border-radius: 8px;
    overflow: hidden;
    height: 74px;
    >*:nth-child(1),
    >*:nth-child(3) {
      display: block;
      background: #FFF3C8;
      width: 24px;
    }
    span {
      flex: 1;
      background: #F16B51;
      font-size: 36px;
      color: #fff4d2;
      padding: 0 20px;
      letter-spacing: 4px;
      line-height: 74px;
    }
  }
}

.layer-btn {
  position: absolute;
  left: 0;
  top: 290px;
  >* {
    display: block;
    clear: both;
    position: relative;
    z-index: 1;
    &.guideBtn {
      z-index: 2;
    }
  }
  img {
    width: 164px;
    vertical-align: middle;
  }
}

.content {
  margin: 0 30px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(132, 6, 0, 0.65);
  border-radius: 9px;
}

.total-time {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  color: #505050;
  >img {
    width: 120px;
  }
  >*:nth-child(2) {
    margin: 0 9px;
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    flex: 1;
    .num {
      color: #ee634b;
    }
  }
}

.card {
  text-align: center;
  position: relative;
  .img {
    width: 404px;
    height: 572px;
  }
  .btn_compound {
    position: absolute;
    top: 350px;
    left: 240px;
    width: 200px;
    animation: scale 1s infinite;
    animation-direction: alternate;
  }
  .text {
    font-size: 28px;
    color: #7B7B7B;
    span {
      font-size: 48px;
      color: #F06B51;
    }
  }
}

.card-list {
  display: flex;
  padding: 0 26px;
  margin-top: 30px;
  .item {
    // flex: 1;
    width: 210px;
    position: relative;
    text-align: center;
    img {
      width: 114px;
    }
    >*:nth-child(2) {
      display: none;
    }
    &.hasCard {
      >*:nth-child(1) {
        display: none;
      }
      >*:nth-child(2) {
        display: block;
      }
    }
    .num {
      position: absolute;
      right: -6px;
      top: -15px;
      display: inline-block;
      width: 48px;
      height: 48px;
      line-height: 42px;
      background: #F06B51;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      font-size: 28px;
      color: #FFFFFF;
      z-index: 1;
    }
    .dot {
      display: block;
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: -20px;
      left: 55px;
      background: #F06B51;
      border-radius: 50%;
    }
  }
}

.btn-list {
  display: flex;
  padding: 30px 52px;
  >* {
    width: 270px;
    line-height: 66px;
    &:nth-child(1) {
      margin-right: 46px;
    }
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


.layer-prize {
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
      width: 400px;
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
