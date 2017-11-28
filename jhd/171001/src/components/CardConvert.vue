<template>
  <div class="mask" @click="close()">
    <div class="convert">
      <div class="cards">
        <div class="card" @click.stop="check = 1">
          <img src="../img/人物/tianpng_s.png"> 天蓬卡
          <img src="../img/check.png" class="check" v-show="check === 1">
        </div>
        <div class="card" @click.stop="check = 2">
          <img src="../img/人物/yutu_s.png"> 玉兔卡
          <img src="../img/check.png" class="check" v-show="check === 2">
        </div>
        <div class="card" @click.stop="check = 5">
          <img src="../img/人物/change_s.png"> 嫦娥卡
          <img src="../img/check.png" class="check" v-show="check === 5">
        </div>
        <div class="card" @click.stop="check = 3">
          <img src="../img/人物/houyi_s.png"> 后羿卡
          <img src="../img/check.png" class="check" v-show="check === 3">
        </div>
        <div class="card" @click.stop="check = 4">
          <img src="../img/人物/yudi_s.png"> 玉帝卡
          <img src="../img/check.png" class="check" v-show="check === 4">
        </div>
      </div>
      <span class="desc">选一张你想兑换的卡片</span>
      <div class="btn-group">
        <span class="btn" :style="disabledBtn" @click.stop="wannengkaConvert(check)">确定</span>
        <br />
        <br />
        <span class="btn" @click.stop="close">下次再换</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: 0,
    }
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    wannengkaConvert: {
      type: Function,
      required: true,
    },
  },
  computed: {
    disabledBtn() {
      if (this.check === 0) {
        return {
          color: 'rgba(0,0,0,.25)',
          backgroundColor: '#f7f7f7',
          borderColor: '#d9d9d9',
        }
      }
    }
  },
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
  justify-content: center;
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
}

.convert {
  animation: popup-anima .3s;
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-size: 26px;
    width: 450px;
    .card {
      position: relative;
    }
    img:nth-child(1) {
      width: 114px;
      height: 140px;
      display: block;
    }
    div {
      margin-top: 30px;
    }
    .check {
      position: absolute;
      right: -24px;
      top: -24px;
      height: 48px;
      width: 48px;
    }
  }

  .desc {
    color: white;
    font-size: 40px;
    margin: 30px 0;
    display: block;
  }
}
</style>
