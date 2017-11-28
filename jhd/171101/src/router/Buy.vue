<template>
  <div class="buy">
    <div class="content">
      <img src="../img/baoxiang1.png" @click="surePerchase" v-if="store.myCp" />
      <img src="../img/baoxiang2.png" @click="surePerchase" v-else />
      <div class="explain">
        <div class="con-title">
          <div></div>
          <span>说明</span>
          <div></div>
        </div>
        <div v-if="store.myCp">
          宝箱所有专属礼物皆为虚拟礼物，用户购买之后，恩爱值直接累加在原来的分值上，获得的专属礼物直接赠送于您的配对对象；<br/><br/>
          瑞士双人游和情侣钻戒为真实礼物，在活动结束后30个工作日内统一发放并联系寄出；<br/><br/>
          有任何疑问，请联系到消息页面联系约糖小蜜，谢谢您的参与！
        </div>
        <div v-else>
          宝箱所有专属礼物皆为虚拟礼物，用户购买之后，获得的专属礼物可用于赠送心怡的对象；<br/><br/>
          瑞士双人游和情侣钻戒为真实礼物，在活动结束后30个工作日内统一发放并联系寄出；<br/><br/>
          有任何疑问，请联系到消息页面联系约糖小蜜，谢谢您的参与！
        </div>
      </div>
    </div>
    <transition name="popup">
      <div class="mask" @click="close()" v-if="popup">
        <div class="lottery">
          <div class="gifts">
            <div class="gift">
              <img src="../img/gift1.png" />
              <span>{{gift.cost/10}}金币[{{ gift.giftName }}]礼物</span>
            </div>
            <div class="gift" v-if="store.myCp">
              <img src="../img/gift1.png" />
              <span>{{ gift.loveNumber }}恩爱值</span>
            </div>
          </div>
          <div class="bot">
            <img src="../img/box.png" />
            <div>
              <div>恭喜你，获得寻爱宝箱</div>
              <div v-if="store.myCp">相关礼物已发放至您的伴侣</div>
              <div class="btn" @click.stop="$router.push('prize')" v-else>查看礼品</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import store from '@/store'
import { confirm, tips } from '@/store/actions'

export default {
  data() {
    return {
      store,
      popup: false,
      gift: {}, // 开出的奖品
      cpBox: {},
    }
  },
  created() {
    const userInfo = this.store.userInfo
    if (!userInfo.id) {
      axios.get('user.jhd.userExtends.get', {
        params: { accountId: appSDK.param.accountId }
      }).then(res => {
        const data = res.data.data
        if (data) {
          this.store.userInfo = data
        }
      })
    }
    axios.get('jhd.activity.cpGift.cpBox').then(res => {
      this.cpBox = res.data.data
    })
  },
  methods: {
    surePerchase() {
      if ( appSDK.param.role==1) {
        confirm({
          text: '该功能只对男生开放',
          cacelText: '我知道了',
          okText: false,
        })
        return
      }
      confirm({
        text: `是否支付${this.store.userInfo.vip>0?this.cpBox.discountPrice/10:this.cpBox.price/10}金币购买寻爱宝箱？`,
        okText: '立即支付',
      }).then(this.pay)
    },
    close() {
      this.popup = false
    },
    pay() {
      axios.post('jhd.activity.cpGift.buy', {
        accountId: appSDK.param.accountId,
      }).then(({ data }) => {
        stClick('BuyBoxClick')
        if (data.success) {
          this.popup = true
          this.gift = data.data
          if (store.myCp) {
            stClick('CoupleBoyBuyBoxSuccessClick') // 已组CP男生购买宝箱成功的总数
          } else {
            stClick('SingleBoyBuyBoxSuccessClick') // 未组CP男生购买宝箱成功的总数
          }
        } else if (data.code == 1503) {
          confirm({
            text: '支付失败，金币不足',
            okText: '去充值',
          }).then(appSDK.gotoRecharge)
        } else {
          confirm({
            text: data.msg,
            okText: false,
            cacelText: '确定',
          })
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../css/mixin';
.buy {
  background-size: cover !important;
  background: url(../img/CP_bg.png);
  min-height: 100vh;
}

.content {
  width: 9rem;
  margin-left: .5rem;
  position: absolute;
  top: 250px;
  >img {
    width: 100%;
  }
  .explain {
    background: rgba(255,255,255,0.3);
    border-radius: 4px;
    font-size: 24px;
    padding: 30px;
    margin-top: 50px;
    * {
      color: #FFFFFF;
    }
  }
  .con-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 550px;
    margin: 0 auto 45px;
    font-size: 28px;
    >div {
      border-bottom: 1px solid white;
      width: 200px;
    }
  }
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, .65);
  display: flex;
  align-items: center;
}

.lottery {
  text-align: center;
  animation: popup-anima .3s;
  .gifts {
    width: 10rem;
    font-size: 30px;
    // color: #9D4E00;
    .gift {
      width: 5.5rem;
      height: 1.2rem;
      position: relative;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        line-height: 1.2rem;
        color: #9D4E00;
      }
    }
  }
  .bot {
    width: 10rem;
    margin-top: -150px;
    >img {
      width: 100%;
    }
    >div {
      margin-top: -150px;
      color: white;
      >*:nth-child(1) {
        font-size: 48px;
        color: white;
      }
      >*:nth-child(2) {
        &:not(.btn) {
          font-size: 28px;
          color: white;
        }
        &.btn {
          width: 270px;
          height: 66px;
          background-color: rgb(255, 220, 135);
          font-size: 30px;
          line-height: 66px;
          border-radius: 33px;
          display: inline-block;
          margin-top: .2rem;
          color: #563900;
        }
      }
    }
  }
}

.popup-enter-active {
  transition: all .4s ease;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
