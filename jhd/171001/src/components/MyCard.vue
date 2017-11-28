<template>
  <div class="mask" @click="close()">
    <div class="my-card">
      <img :src="prize.giftUrl">
      <div>{{ this.prize.name }}</div>
      <div>{{ giftDesc }}</div>
      <div class="btn-group">
        <template v-if="prize.giftIdentify === 'card' && prize.giftType === 6">
          <span class="btn" @click.stop="openPopup('cardConvert')">兑换</span>
          <br />
        </template>
        <span class="btn" @click.stop="store.giveCardType = prize.giftType" v-if="prize.giftIdentify === 'card'">
          <router-link to="searchUser">送给好友</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      store,
    }
  },
  props: {
    prize: {
      type: Object,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
    openPopup: {
      type: Function,
      required: true,
    },
  },
  computed: {
    giftDesc() {
      const giftIdentify = this.prize.giftIdentify
      const giftType = this.prize.giftType
      if (giftIdentify === 'card') {
        if (giftType === 6) {
          return '万能卡可兑换任意一张活动卡牌'
        } else {
          return '活动结束后可用来兑换现金大奖'
        }
      } else if (giftIdentify === 'gold') {
        return '抽奖所得物品已到账到我的钱包中'
      } else {
        return '活动结束后可用来兑换奖品'
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, .65);
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  text-align: center;
}

.btn-group .btn {
  display: inline-block;
  background-color: rgb(255, 220, 135);
  color: #563900;
  width: 270px;
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  border-radius: 33px;
  margin-top: 10px;
  a {
    text-decoration: none;
    color: #563900;
  }
}

.my-card {
  width: 10rem;
  animation: popup-anima .3s;
  >*:nth-child(1) {
    width: 408px;
  }
  >*:nth-child(2) {
    font-size: 48px;
    margin-bottom: 20px;
  }
  >*:nth-child(3) {
    font-size: 28px;
    margin-bottom: 20px;
  }
}

</style>
