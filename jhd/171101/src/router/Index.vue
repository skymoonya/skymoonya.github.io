<template>
  <div class="root">
    <div class="header">
      <img src="../img/mf_top.png">
    </div>
    <div class="content">
      <div class="tabs">
        <div @click="tabPaneChange(1)" :class="{active:tabIndex===1}">恩爱榜</div>
        <div @click="tabPaneChange(2)" :class="{active:tabIndex===2}">怒怼榜</div>
      </div>
      <div class="tabs-pane" v-if="tabIndex===1">
        <LoveItem :data="myCp" :fetchMyCP="fetchMyCP" :fetchCP="$refs.pager.onReload" :openPop="openPop" v-if="myCp!=null" />
        <div class="dis" v-if="myCp!=null"></div>
        <LoveItem :data="cp" :fetchMyCP="fetchMyCP" :fetchCP="$refs.pager.onReload" :openPop="openPop" v-for="cp in cpList" :key="cp.id" />
      </div>
      <div class="tabs-pane" v-else-if="tabIndex===2">
        <PowerItem :data="myNudui" v-if="myNudui!=null" />
        <div class="dis" v-if="myNudui!=null"></div>
        <PowerItem :data="nudui" v-for="nudui in nuduiList" :key="nudui.id" />
      </div>
      <Pager :onLoad="onFetch" ref="pager" />
      <div class="fill"></div>
    </div>
    <img src="../img/buy.png" class="buy" @click="gotoBuy">
    <img src="../img/me.png" class="prize" @click="$router.push('prize')" v-if="appSDK.param.role==2">
    <div class="footer">
      <div @click="$router.push('invitationList')">邀请列表<div class="red-point" v-if="redPoint"></div></div>
      <div @click="invite">邀请对象组CP</div>
      <div @click="$router.push('rule')">规则</div>
    </div>
    <div class="mask guide-layer" v-if="showGuideLayer">
      <img src="../img/tip.png">
      <div @click="$router.push('rule')">规则</div>
    </div>
    <div class="mask pop" v-if="pop">
      <img src="../img/pop.png">
      <div @click="pop=false">X</div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import LoveItem from '@/components/LoveItem'
import PowerItem from '@/components/PowerItem'
import Pager from '@/components/Pager'
import { tips, confirm } from '@/store/actions'

let interval

export default {
  data() {
    return {
      appSDK,
      tabIndex: 1,
      cpList: [],
      nuduiList: [],
      myNudui: null,
      myCp: null,
      showGuideLayer: false,
      pop: false,
      redPoint: false,
    }
  },
  created(){
    const key = 'activity171101'
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, '1')
      this.showGuideLayer = true
    }
    this.fetchMyCP()
    if (appSDK.param.role == 2) {
      axios.get('jhd.activity.nudui.my', {
        params: { accountId: appSDK.param.accountId },
      }).then(res => {
        this.myNudui = res.data.data
      })
    }
    this.fetchRedPoint()
    interval = setInterval(this.fetchRedPoint, 30000)
  },
  beforeDestroy() {
    clearInterval(interval)
  },
  methods: {
    async onFetch({ limit, since }) {
      if (this.tabIndex === 1) {
        return await this.fetchCP({ limit, since })
      }
      return await this.fetchNudui({ limit, since })
    },
    async fetchCP({ limit, since }) {
      const { data } = await axios.get('jhd.activity.couple.page', {
        params: { pageSize: limit, pageStart: since+1 },
      })
      if (since === 0) {
        this.cpList = data.data.data
      } else {
        this.cpList = this.cpList.concat(data.data.data)
      }
      return { list: data.data.data, since: data.data.currentPage }
    },
    async fetchNudui({ limit, since }) {
      const { data } = await axios.get('jhd.activity.nudui.page', {
        params: { pageSize: limit, pageStart: since+1 },
      })
      if (since === 0) {
        this.nuduiList = data.data.data
      } else {
        this.nuduiList = this.nuduiList.concat(data.data.data)
      }
      return { list: data.data.data, since: data.data.currentPage }
    },
    fetchMyCP(){
      axios.get('jhd.activity.couple.my', {
        params: { accountId: appSDK.param.accountId },
      }).then(({ data }) => {
        this.myCp = data.data && data.data.id ? data.data : null
        store.myCp = this.myCp
      })
    },
    fetchRedPoint() {
      axios.all([
        axios.get('jhd.activity.coupleInvite.redPoint', {
          params: { accountId: appSDK.param.accountId, type: 1 },
          noShowLoading: true,
        }),
        axios.get('jhd.activity.coupleInvite.redPoint', {
          params: { accountId: appSDK.param.accountId, type: 2 },
          noShowLoading: true,
        }),
      ]).then(axios.spread((...res) => {
        this.redPoint = res[0].data.data || res[1].data.data
      }))
    },
    tabPaneChange(tabIndex) {
      this.tabIndex = tabIndex
      this.cpList = []
      this.nuduiList = []
      this.$refs.pager.onReload()
    },
    invite() {
      if (this.myCp) {
        confirm({
          text: '你已组成CP，不可邀请好友',
          okText: false,
          cacelText: '我知道了',
        })
      } else {
        this.$router.push({ path: 'searchUser', query: { operate: 'invite' }})
      }
    },
    openPop() {
      this.pop=true
    },
    gotoBuy() {
      stClick('BuyBoxFloatingClick') // 点击购买宝箱浮窗的次数
      this.$router.push('buy')
    },
  },
  components: { LoveItem, PowerItem, Pager },
}
</script>

<style scoped lang="scss">
.header img{
  width: 100%;
  height: 256px;
}
.tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #DEDEDE;
  // box-shadow: inset 0 -1px 0 0 rgba(182,182,182,0.50);
  height: 80px;
  align-items: center;
  font-size: 28px;
  >* {
    height: 100%;
    line-height: 80px;
    width: 112px;
    text-align: center;
  }
  .active {
    color: #FF5E5E;
    border-bottom: 4px solid #FF5E5E;
  }
}
.fill {
  height: 88px;
}
.buy,.prize {
  position: fixed;
  right: 0;
  width: 144px;
  height: 94px;
}
.buy {
  bottom: 380px;
}
.prize {
  bottom: 250px;
}
.footer {
  width: 100%;
  height: 88px;
  position: fixed;
  bottom: 0;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >*:nth-child(1) {
    margin-left: .4rem;
    font-size: 24px;
  }
  >*:nth-child(2) {
    background: #E8C28E;
    border-radius: 100px;
    font-size: 28px;
    width: 340px;
    height: 64px;
    background: #E8C28E;
    border-radius: 100px;
    color: white;
    text-align: center;
    line-height: 64px;
  }
  >*:nth-child(3) {
    margin-right: .4rem;
    font-size: 24px;
  }
}
.dis {
  width: 100%;
  height: 26px;
  background-color: rgba(182,182,182,.2);
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1;
  &.guide-layer img {
    width: 292px;
    height: 236px;
    position: absolute;
    bottom: 90px;
    right: 50px;
  }
  &.guide-layer div {
    width: 88px;
    height: 88px;
    border-radius: 44px;
    background-color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 88px;
    font-size: 24px;
    text-align: center;
  }
  &.pop {
    display: flex;
    flex-flow: nowrap column;
    align-items:center;
    justify-content: center;
    img {
      max-width: 502px;
      margin-bottom: 62px;
    }
    div {
      color: white;
      width: 76px;
      height: 76px;
      border-radius: 50%;
      border: 2px solid white;
      text-align: center;
      line-height: 76px;
      font-size: 38px;
    }
  }
}
</style>
