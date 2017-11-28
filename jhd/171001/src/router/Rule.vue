<template>
  <div class="rule">
    <SlidePage>
      <div class="page1">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P1.png" />
      </div>
      <div class="page2">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P2.png" />
      </div>
      <div class="page3">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P3.png" />
      </div>
      <div class="page4">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P4female.png" v-if="appSDK.param.role == 1">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P4male.png" v-else />
      </div>
      <div class="page5">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p5.png" />
      </div>
      <div class="page6">
        <img src="http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/P6.png" />
      </div>
    </SlidePage>
  </div>
</template>

<script>
import SlidePage from '@/components/SlidePage'

export default {
  data() {
    return {
      appSDK,
    }
  },
  components: { SlidePage },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      console.log('fetchData')
      setTimeout(this.reload, 1000)
    },
    reload() {
      // this.$router.replace({
      //   path: this.$route.fullPath,
      //   query: { r: Math.random() }
      // })
    }
  },
  mounted() {
    this.reload()
    setTimeout(this.reload, 1000)
    // console.log(this.$route)F
  },
}
</script>

<style lang="scss" scoped>
.page1 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p1_bg.png);
  background-size: cover;
  text-align: center;
  padding-top: 16px;
  img {
    width: 646px;
  }
}

.page2 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p2_bg.png);
  background-size: cover;
  text-align: center;
  padding-top: 50px;
  img {
    width: 582px;
  }
}

.page3 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p1_bg.png);
  background-size: cover;
  text-align: center;
  position: relative;
  img {
    width: 750px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.page4 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p4bg.png);
  background-size: cover;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 674px;
  }
}

.page5 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p4bg.png);
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  img {
    width: 684px;
  }
}

.page6 {
  background: url(http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/171001/img-rule/p4bg.png);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 674px;
  }
}
</style>
