<template>
  <div class="item">
    <div class="left" :class="{num1:data.nuduiRanking===1,num2:data.nuduiRanking===2,num3:data.nuduiRanking===3}">
      TOP.<span>{{data.nuduiRanking}}</span>
    </div>
    <div>
      <div class="avatars">
        <img :src="data.image+'?x-oss-process=image/resize,w_100,h_100'" @click="gotoDetail">
      </div>
      <div class="name-power">
        <div>{{data.name}}</div>
        <div>
          <img src="../img/fire.png">&nbsp;
          <span>{{data.nuduiNumber}}&nbsp;</span>
          <span>[高于<span>{{data.higherThanCp}}</span>对CP的恩爱值]</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    gotoDetail() {
      if (appSDK.param.role == 1) {
        appSDK.gotoUserDetail(this.data.accountId, this.data.name)
      }
    },
  }
}
</script>

<style scoped lang="scss">
.item {
  height: 154px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DEDEDE;
  // box-shadow: inset 0 -1px 0 0 #DEDEDE;
  >*:nth-child(1) {
    padding-left: .19rem;
    font-size: 28px;
    margin-right: 20px;
    height: 70px;
    width: 160px;
    line-height: 70px;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
    span {
      font-size: 40px;
    }
  }
  >*:nth-child(2) {
    display: flex;
  }
  .avatars {
    margin-right: 20px;
    >* {
      width: 84px;
      border-radius: 50%;
      border: 3px solid white;
      &:nth-child(2) {
        position: relative;
        left: -40px;
      }
    }
  }
  .name-power {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    // color: #929292;
    >*:nth-child(1) {
      font-size: 30px;
    }
    >*:nth-child(2) {
      font-size: 24px;
      img {
        width: 32px;
        height: 30px;
      }
      >*:nth-child(2) {
        font-size: 28px;
        color: #F76260;
      }
      >*:nth-child(3) span {
        color: #F76260;
      }
    }
  }
  >*:nth-child(3) {
    margin-right: .27rem;
    background: #E8C28E;
    border-radius: 100px;
    width: 148px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    align-self: flex-end;
    margin-bottom: 20px;
  }
}
.num1 {
  background-image: linear-gradient(-220deg, #FFC584 0%, #FF7676 100%);
  color: white;
  >* {
    color: white;
  }
}
.num2 {
  background-image: linear-gradient(-220deg, #FFE386 0%, #F2C89B 100%);
  color: white;
  >* {
    color: white;
  }
}
.num3 {
  background-image: linear-gradient(-220deg, #FFCDFE 0%, #AAA4DB 100%);
  color: white;
  >* {
    color: white;
  }
}
</style>