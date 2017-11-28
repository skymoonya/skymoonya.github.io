<template>
  <div class="root">
    <div class="header">
      <img src="../img/rottery-header.png">
      <div class="text">
        <i></i>
        <span>剩余抽奖次数：{{lotteryNumber}}次</span>
        <i></i>
      </div>
    </div>
    <div class="layer-btn">
      <router-link to="prize"><img src="../img/card_1.png"></router-link>
    </div>
    <div class="content">
      <div class="prizeWrap" ref="prizeWrap">
        <div class="bg-layer" v-if="lotterying"></div>
        <div class="wrap1">
          <div class="prize-item" v-for="(item,index) in giftList.slice(0,4)" :key="item.id" :data-index="index" :data-id="item.id">
            <img :src="item.giftUrlSmall">
          </div>
        </div>
        <div class="wrap2">
          <div>
            <div class="prize-item" v-for="(item,index) in giftList.slice(10,12).reverse()" :key="item.id" :data-index="11-index" :data-id="item.id">
              <img :src="item.giftUrlSmall">
            </div>
          </div>
          <div @click="lottery" class="lottery-btn">
            <div><img src="../img/start.png"></div>
          </div>
          <div>
            <div class="prize-item" v-for="(item,index) in giftList.slice(4,6)" :key="item.id" :data-index="4+index" :data-id="item.id">
              <img :src="item.giftUrlSmall">
            </div>
          </div>
        </div>
        <div class="wrap1">
          <div class="prize-item" v-for="(item,index) in giftList.slice(6,10).reverse()" :key="item.id" :data-index="9-index" :data-id="item.id">
            <img :src="item.giftUrlSmall">
          </div>
        </div>
      </div>
    </div>
    <div class="btn-list">
      <button class="btn" v-for="item in prizeDrawCountList" :key="item.id" @click="buy(item)">
        购买{{item.count}}次：{{item.price/10}}金币
        <template v-if="item.remark">({{item.remark}})</template>
      </button>
    </div>

    <transition name="layer-prize">
      <div class="layer-prize" @click="showPrizeLayer=false" v-if="showPrizeLayer">
        <div class="prize-content">
          <img :src="prizeInfo.giftUrl">
          <div class="text" v-if="prizeInfo.giftValue>0">
            <div>恭喜你抽中了{{prizeInfo.name}}！</div>
            <div>请到“我的宝箱”里查看</div>
          </div>
          <div class="text" v-else>
            <div>真遗憾这次没抽中...</div>
            <div>奖品丰富！不如再来一次吧</div>
          </div>
          <button class="btn" @click.stop="$router.push('prize')" v-if="prizeInfo.giftValue>0">我的宝箱</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import rotary from '@/common/rotary'
import { tips, confirm } from '@/store/actions'

export default {
  data() {
    return {
      lotterying: false,
      showPrizeLayer: false,
      lotteryNumber: 0,
      prizeDrawCountList: [],
      giftList: [],
      prizeInfo: null,
    }
  },
  methods: {
    async lottery() {
      if (this.lotterying) return
      const elList = [...this.$refs.prizeWrap.querySelectorAll('.prize-item')]

      const sortedList = []
      elList.forEach(item => {
        sortedList[item.getAttribute('data-index')] = item
      })

      const { data } = await axios.post('jhd.activity.prizeDraw', {
        accountId: appSDK.param.accountId,
      })
      if (!data.success) {
        tips(data.msg)
        return
      }
      this.getLotteryNumber()
      this.prizeInfo = data.data
      const el = this.$refs.prizeWrap.querySelector(`[data-id="${this.prizeInfo.id}"]`)
      if (!el) {
        confirm({
          text: `意外的奖项${this.prizeInfo.id}`,
          okText: false,
          cacelText: '确定',
        })
        return
      }
      const index = parseInt(el.getAttribute('data-index'))
      this.lotterying = true
      rotary({
        animateTo: index,
        turnsNumbe: 3,
        duration: 50,
        decreasingDuration: 8,
        callback: () => {
          setTimeout(() => {
            this.lotterying = false
            this.showPrizeLayer = true
          }, 100)
        }
      }, sortedList)
    },
    getLotteryNumber() {
      return axios.get('jhd.activity.prizeDrawCount.get', {
        params: {
          accountId: appSDK.param.accountId,
        },
      }).then(res => {
        this.lotteryNumber = res.data.data
      })
    },
    fetchData() {
      this.getLotteryNumber()
      axios.get('jhd.activity.prizeDrawCount.get.batch', {
        params: {
          role: appSDK.param.role,
        },
      }).then(res => {
        this.prizeDrawCountList = res.data.data
      })
      axios.get('jhd.activity.giftBag.lotteryGifts', {
        params: {
          accountId: appSDK.param.accountId,
          code: this.text,
        }
      }).then(({ data }) => {
        this.giftList = data.data
      })
    },
    async buy(item) {
      await confirm({
        text: `是否支付${item.price / 10}金币购买抽奖次数？`,
        okText: '立即支付',
      })
      const { data } = await axios.post('jhd.activity.prizeDrawCount.buy', {
        accountId: appSDK.param.accountId,
        infoId: item.id,
      })
      if (data.code === '1503') {
        await confirm({
          text: `您的金币余额不足，请充值后再重新支付`,
          okText: '立即充值',
        })
        appSDK.gotoRecharge()
        return
      }
      if (data.data) { // 购买成功
        await this.getLotteryNumber()
        tips('购买成功')
      } else {
        tips(data.msg)
      }
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>

<style scoped lang="scss">
.root {
  background: url(../img/fudaibg.png);
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 30px 0;
}


.header {
  text-align: center;
  >img {
    width: 562px;
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
  top: 850px;
  >* {
    display: block;
    clear: both;
  }
  img {
    width: 164px;
    vertical-align: middle;
  }
}


.content {
  margin: 0 auto;
  width: 618px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(132, 6, 0, 0.65);
  border-radius: 9px;
}

.prizeWrap {
  overflow: auto;
  position: relative;
  padding: 26px 36px 56px 36px;
  .bg-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.43);
    pointer-events: none;
  }

  .wrap1 {
    display: flex;
    .prize-item {
      margin-right: 22px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .wrap2 {
    display: flex;
    margin: 22px 0;
    >*:nth-child(1),
    >*:nth-child(3) {
      display: flex;
      flex-direction: column;
      .prize-item {
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    >*:nth-child(2) {
      flex: 1;
    }
  }

  .prize-item {
    width: 120px;
    height: 120px;
    float: left;
    background: #fff;
    img {
      width: 100%;
    }
    &.current {
      position: relative;
      z-index: 1;
    }
  }

  .lottery-btn {
    position: relative;
    z-index: 1;
    display: flex;
    text-align: center;
    align-items: center;
    >* {
      flex: 1;
    }
    img {
      width: 232px;
      height: 232px;
    }
  }
}

.btn {
  border: 0;
  background: #ffd77c;
  color: #9b6d0b;
  text-align: center;
  font-size: 28px;
  border-radius: 50px;
  outline: none;
  &.gray {
    background: #d2d1d2;
    color: #9e9e9e;
  }
}


.btn-list {
  margin-top: 64px;
  >* {
    display: block;
    width: 408px;
    line-height: 66px;
    margin: 0 auto 32px auto;
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
    animation: popup-anima .3s;
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

.layer-prize-enter-active {
  transition: all .4s ease;
}
.layer-prize-enter,
.layer-prize-leave-to {
  opacity: 0;
}
</style>
