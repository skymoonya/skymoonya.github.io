<template>
  <div class="mask" @click="close()" v-if="popup">
    <div class="lottery">
      <div class="gifts">
        <div class="gift" v-for="gift of gifts" :key="gift.giftType">
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
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    popup: {
      type: Boolean,
      required: true,
    },
    gifts: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
    close: {
      type: Function,
      required: true,
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
  display: flex;
  align-items:center;
}

.lottery {
  text-align: center;
  .gifts {
    width: 10rem;
    font-size: 30px;
    color: #9D4E00;
    .gift {
      width: 6rem;
      height: 1.5rem;
      position: relative;
      display: inline-block;
      img {
        width: 100%;
      }
      span {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        line-height: 1.5rem;
      }
    }
  }
  .bot {
    width: 10rem;
    margin-top: -180px;
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
</style>
