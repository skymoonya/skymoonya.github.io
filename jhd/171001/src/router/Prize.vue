<template>
  <div class="prize">
    <div class="header">
      <img src="../img/index-header.png">
      <div class="text">
        <i></i>
        <span>瓜分约糖千万现金</span>
        <i></i>
      </div>
    </div>
    <div class="content">
      <div class="con-title">
        <div></div>
        <span>我的卡牌</span>
        <div></div>
      </div>
      <transition name="prize" mode="out-in">
        <div class="my-prize" v-if="cardList.length > 0" key="my-prize">
          <template v-for="prize in cardList">
            <div @click="openPopup('myCard', prize)" :key="prize.name">
              <img :src="prize.giftUrlSmall">
              <span class="num">{{ prize.myGiftNum }}</span>
            </div>
          </template>
        </div>
        <div class="no-gift" v-else key="no-gift">空空如也</div>
      </transition>
      <div class="con-title">
        <div></div>
        <span>我的奖品</span>
        <div></div>
      </div>
      <transition name="prize" mode="out-in">
        <div class="my-prize" v-if="giftList.length > 0" key="my-prize">
          <template v-for="prize in giftList">
            <div @click="openPopup('myCard', prize)" :key="prize.name">
              <img :src="prize.giftUrlSmall">
              <span class="num">{{ prize.myGiftNum }}</span>
            </div>
          </template>
        </div>
        <div class="no-gift" v-else key="no-gift">空空如也</div>
      </transition>
    </div>
    <transition name="popup">
      <MyCard v-if="popup === 'myCard'" :prize="selectedPrize" :close="close" :openPopup="openPopup" />
      <CardConvert v-if="popup === 'cardConvert'" :close="close" :wannengkaConvert="wannengkaConvert" />
    </transition>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard'
import CardConvert from '@/components/CardConvert'
import { tips } from '@/store/actions'

export default {
  data() {
    return {
      popup: null,
      check: 0,
      prizeList: [],
      selectedPrize: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('jhd.activity.userGift.list', { params: { accountId: appSDK.param.accountId } })
        .then(({ data }) => {
          this.prizeList = data.data || []
        })
    },
    openPopup(popup, prize) {
      this.popup = popup
      if (prize) {
        this.selectedPrize = prize
      }
    },
    close() {
      this.popup = null
    },
    wannengkaConvert(check) {
      if (check !== 0) {
        axios.post('jhd.activity.giftPackage.exchangeCar', {
          request: {
            accountId: appSDK.param.accountId,
            giftType: check,
          }
        }).then(({ data }) => {
          if (data.success) {
            this.selectedPrize = {
              ...data.data,
              name: `恭喜你获得了${data.data.name}`
            }
            this.openPopup('myCard')
            this.fetchData()
          } else {
            tips(`兑换失败，原因为：${data.msg}`)
          }
          this.openPopup('myCard')
          this.fetchData()
        })
      }
    }
  },
  computed: {
    cardList() {
      const cardList = []
      this.prizeList.forEach(prize => {
        if (prize.giftIdentify === 'card') {
          cardList.push(prize)
        }
      })
      return cardList
    },
    giftList() {
      const giftList = []
      this.prizeList.forEach(prize => {
        if (prize.giftIdentify !== 'card') {
          giftList.push(prize)
        }
      })
      return giftList
    }
  },
  components: {
    MyCard,
    CardConvert,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../css/mixin';
.prize {
  background: url(../img/fudaibg.png);
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 30px 0;
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

.content {
  margin: 0 30px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(132, 6, 0, 0.65);
  border-radius: 9px;
  padding: 20px;
  font-size: 28px;
  >* {
    margin-top: 38px;
  }
  .con-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 550px;
    margin: auto;
    >div {
      border-bottom: 1px solid #F06B51;
      width: 130px;
    }
    >span {
      // font-size: 28px;
      &:before {
        @include titlePseudo();
        margin-right: 30px;
      }
      &:after {
        @include titlePseudo();
        margin-left: 30px;
      }
    }
  }
  .no-gift {
    text-align: center;
    margin-bottom: 30px;
    color: gray;
    // font-size: 28px;
  }
  .my-prize {
    >* {
      display: inline-block;
      width: 160px;
      height: 160px;
      margin: 16px 28px;
      position: relative;
      >img {
        width: 100%;
        height: 100%;
      }
      &:nth-child(3n) {
        margin-right: 0;
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
      // font-size: 28px;
      text-align: center;
      color: #FFFFFF;
    }
  }
}

.prize-enter-active,
.popup-enter-active {
  transition: all .4s ease;
}
.prize-enter,
.prize-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
