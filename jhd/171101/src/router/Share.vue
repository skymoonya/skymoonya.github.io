<template>
  <div class="root">
    <img src="../img/share.png">
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
  created(){
    // axios.get('jhd.activity.couple.share', {
    //   params: { accountId: appSDK.param.accountId },
    // })
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
  background-size: cover;
  min-height: 100vh;
  padding: 10px 0 90px 0;
}

img {
  width: 100%;
}

.btn-list {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
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
