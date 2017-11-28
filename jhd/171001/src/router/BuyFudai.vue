<template>
  <div class="buy-fudai">
    <div class="fudai">
      <img :src="fudai.url" v-for="fudai in fudais" @click="surePerchase(fudai.id)" :key="fudai.id" />
    </div>
    <transition name="popup">
      <div class="mask" @click="close()" v-if="popup">
        <div class="lottery">
          <div class="gifts">
            <div class="gift" v-for="gift in gifts" :key="gift.giftType">
              <img src="../img/gift1.png" />
              <span>{{ gift.name }}*1</span>
            </div>
          </div>
          <div class="bot">
            <img src="../img/fudai/fudai1_b.png" v-if="selected == 4 || selected == 8" />
            <img src="../img/fudai/fudai2_b.png" v-if="selected == 3 || selected == 7" />
            <img src="../img/fudai/fudai3_b.png" v-if="selected == 2 || selected == 6" />
            <img src="../img/fudai/fudai4_b.png" v-if="selected == 1 || selected == 5" />
            <div>
              <router-link to="prize">查看礼品</router-link>
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
      selected: '0',
      gifts: [], // 开出的奖品
      fudais: [], // 福袋列表
      dialog: {
        message: '',
        handleOk: null,
        cacelText: null,
        okText: null,
      },
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
          this.getFudais(data.role)
        }
      })
    } else {
      this.getFudais(userInfo.role)
    }
  },
  methods: {
    surePerchase(selected) {
      this.selected = selected
      confirm({
        text: `是否支付${this.shouldPay / 10}金币购买${this.fudaiType}？`,
        okText: '立即支付',
      }).then(this.pay)
    },
    close() {
      this.popup = false
    },
    getFudais(role) {
      axios.get('jhd.activity.giftPackage.get.batch', { params: { role, sortType: 0 } })
        .then(res => {
          if (res.data.data) {
            this.fudais = res.data.data || []
          }
        })
    },
    pay() {
      axios.post('jhd.activity.giftPackage.buy', {
        request: {
          accountId: appSDK.param.accountId,
          giftPackageId: this.selected,
        }
      }).then(({ data }) => {
        if (data.success) {
          this.popup = true
          this.gifts = data.data.gifts
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
  computed: {
    shouldPay() {
      const vip = this.store.userInfo.vip
      let gold = 0
      this.fudais.forEach(fudai => {
        if (fudai.id == this.selected) {
          gold = vip > 0 ? fudai.discountPrice : fudai.price
        }
      });
      return gold
    },
    fudaiType() {
      let type = ''
      this.fudais.forEach(fudai => {
        if (fudai.id == this.selected) {
          type = fudai.name
        }
      });
      if (type.indexOf('福袋') < 0) {
        type += '福袋'
      }
      return type
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../css/mixin';
.buy-fudai {
  background-size: cover !important;
  background: url(../img/fudaibg.png);
  min-height: 100vh;
  text-align: center;
}

.fudai>* {
  width: 9rem;
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
    color: #9D4E00;
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
      }
    }
  }
  .bot {
    width: 10rem;
    margin-top: -220px;
    >img {
      width: 100%;
    }
    >div {
      background-color: rgb(255, 220, 135);
      width: 3.6rem;
      height: 66px;
      font-size: 30px;
      line-height: 66px;
      border-radius: 33px;
      display: inline-block;
      margin-top: .2rem;
      >* {
        text-decoration: none;
        color: #563900;
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
