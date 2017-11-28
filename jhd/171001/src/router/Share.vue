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
    <div class="card">
      <img src="../img/sharecard.png">
      <div class="title">
        <i></i>
        <span>嫦娥卡</span>
        <i></i>
      </div>
    </div>
    <div class="tips">
      我在参与约糖“集卡瓜分千万现金”
      <br> 你也来拼拼人品和运气吧！
    </div>
    <div class="btn-list">
      <button class="btn" @click="openApp">在约糖中打开</button>
      <button class="btn" @click="download">下载约糖APP</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    download() {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jhd.app'
    },
    openApp() {
      location.href = '/public/activity/open-app/index.html'
      // const u = navigator.userAgent
      // const browser = {
      //   ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      //   android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
      // }
      // if (browser.android) {
      //   location.href = 'yuetang://yuetang.com/userDetail?nick=#{data.nick}&role=#{data.role}&id=#{data.accountId}'
      // } else {
      //   location.href = 'com.yuetan.webapp://?nick=#{data.nick}&role=#{data.role}&accountId=#{data.accountId}'
      // }
    },
  },
  mounted() {
  },

}
</script>

<style scoped lang="scss">
.root {
  background: url(../img/share_bg.png);
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 120px 0;
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

.card {
  margin-top: 56px;
  text-align: center;
  img {
    width: 750px;
    height: 578px;
  }
  .title {
    font-size: 96px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 120px;
    >*:nth-child(1),
    >*:nth-child(3) {
      display: block;
      background: #fff;
      width: 50px;
      height: 4px;
    }
    span {
      flex: 1;
    }
  }
}

.tips {
  margin-top: 30px;
  font-size: 28px;
  color: #FFFFFF;
  text-align: center;
}

.btn-list {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  >* {
    flex: 1;
    line-height: 100px;
    &:nth-child(1) {
      background: #292929;
    }
  }
}


.btn {
  border: 0;
  background: #E8C28E;
  color: #fff;
  text-align: center;
  font-size: 30px;
  outline: none;
  margin: 0;
}
</style>
