<template>
  <div class="invitation-list">
    <div class="content">
      <div class="tabs">
        <div @click="tabPaneChange(1)" :class="{active:tabIndex===1}">邀请我的</div>
        <div @click="tabPaneChange(2)" :class="{active:tabIndex===2}">我邀请的<div class="red-point" v-if="redPoint"></div></div>
      </div>
      <div class="tabs-pane" v-if="tabIndex===1">
       <InviteMeItem :data="data" :reload="tabPaneChange" :openPop="openPop" v-for="data in inviteMe" :key="data.id" />
      </div>
      <div class="tabs-pane" v-else-if="tabIndex===2">
        <MyInviteItem :data="data" v-for="data in myInvite" :key="data.id" />
      </div>
      <Pager :onLoad="onFetch" ref="pager" />
      <div class="fill"></div>
    </div>
    <div class="mask" v-if="pop">
      <img src="../img/pop.png">
      <div @click="pop=false">X</div>
    </div>
  </div>
</template>

<script>
import Pager from '@/components/Pager'
import InviteMeItem from '@/components/InviteMeItem'
import MyInviteItem from '@/components/MyInviteItem'

let interval

export default {
  data() {
    return {
      tabIndex: 1,
      inviteMe: [],
      myInvite: [],
      pop: false,
      redPoint: false,
    }
  },
  created(){
    this.fetchRedPoint()
    interval = setInterval(this.fetchRedPoint, 30000)
  },
  beforeDestroy() {
    clearInterval(interval)
  },
  methods: {
    async onFetch({ limit, since }) {
      if (this.tabIndex === 1) {
        return await this.fetchInviteMe({ limit, since })
      }
      return await this.fetchMyInvite({ limit, since })
    },
    async fetchInviteMe({ limit, since }) {
      const { data } = await axios.get('jhd.activity.coupleInvite.inviteMe', {
        params: { pageSize: limit, currentPage: since+1, accountId: appSDK.param.accountId },
      })
      this.inviteMe = this.inviteMe.concat(data.data.data)
      return { list: data.data.data, since: data.data.currentPage }
    },
    async fetchMyInvite({ limit, since }) {
      const { data } = await axios.get('jhd.activity.coupleInvite.my', {
        params: { pageSize: limit, currentPage: since+1, accountId: appSDK.param.accountId },
      })
      this.myInvite = this.myInvite.concat(data.data.data)
      return { list: data.data.data, since: data.data.currentPage }
    },
    fetchRedPoint() {
      axios.get('jhd.activity.coupleInvite.redPoint', {
        params: { accountId: appSDK.param.accountId, type: 2 },
        noShowLoading: true,
      }).then(({ data }) => {
        this.redPoint = data.data
      })
    },
    tabPaneChange(tabIndex) {
      if (tabIndex !== undefined) {
        this.tabIndex = tabIndex
      }
      clearInterval(interval)
      this.redPoint = false
      this.inviteMe = []
      this.myInvite = []
      this.$refs.pager.onReload()
    },
    openPop() {
      this.pop=true
    }
  },
  components: { Pager, InviteMeItem, MyInviteItem },
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  box-shadow: inset 0 -1px 0 0 rgba(182,182,182,0.50);
  height: 80px;
  align-items: center;
  font-size: 28px;
  >* {
    height: 100%;
    line-height: 80px;
    width: 112px;
    text-align: center;
    white-space: nowrap;
    width: 130px;
  }
  .active {
    color: #FF5E5E;
    border-bottom: 4px solid #FF5E5E;
  }
}
.red-point {
  margin-top: 15px;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 1;
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
</style>
