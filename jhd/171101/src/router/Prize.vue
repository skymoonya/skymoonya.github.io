<template>
  <div class="prize">
    <div class="content">
      <div class="con-title">
        <div></div>
        <span>我的奖品</span>
        <div></div>
      </div>
      <transition name="prize" mode="out-in">
        <div class="my-prize" v-if="prizeList.length > 0">
          <div v-for="prize in prizeList" :key="prize.name" @click="give(prize)">
            <img :src="prize.giftImage">
            <span class="num">{{ prize.giftNum }}</span>
          </div>
        </div>
        <div class="no-gift" v-else key="no-gift">空空如也</div>
      </transition>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      prizeList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('jhd.activity.cpGift.my', { params: { accountId: appSDK.param.accountId } })
        .then(({ data }) => {
          this.prizeList = data.data || []
        })
    },
    give(prize) {
      store.giveGiftId = prize.cpGiftIdList[0]
      store.giveGiftName = prize.giftName
      this.$router.push({ path: 'searchUser', query: { operate: 'give' }})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../css/mixin';
.prize {
  background: url(../img/CP_bg.png);
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 30px 0;
}


.content {
  margin: 220px 30px 0 30px;
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
