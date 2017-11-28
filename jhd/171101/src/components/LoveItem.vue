<template>
  <div class="item">
    <div>
      <div class="left" :class="{num1:data.ranking===1,num2:data.ranking===2,num3:data.ranking===3}">
        TOP.<span>{{data.ranking}}</span>
      </div>
      <div class="middle">
        <div class="avatars" @click="gotoDetail">
          <img :src="data.maleImage+'?x-oss-process=image/resize,w_100,h_100'">
          <img :src="data.womanImage+'?x-oss-process=image/resize,w_100,h_100'">
        </div>
        <div class="name-love">
          <div>{{data.maleName}}<span class="and">&amp;</span>{{data.womanName}}</div>
          <div><img src="../img/cp.png">&nbsp;<span>{{data.loveNumber}}</span></div>
        </div>
      </div>
    </div>
    <div :class="isMe?'relieve':'break'" @click="breakCP" v-if="(appSDK.param.role==2 && !store.myCp) || isMe">
      {{isMe?'解除关系':'拆散CP'}} &gt;
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { confirm, tips } from '@/store/actions'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    fetchMyCP: {
      type: Function,
      required: true,
    },
    fetchCP: {
      type: Function,
      required: true,
    },
    openPop: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      appSDK,
      store,
    }
  },
  methods: {
    breakCP() {
      if (this.isMe) {
        confirm({
          text: '真的忍心抛弃你的同伴吗？',
          cacelText: '再想想',
          okText: '狠心抛弃',
        }).then(() => {
          stClick('RelieveSuccessClick') // 点击解除关系，解除成功
          axios.delete('jhd.activity.couple.relation.delete', {
            params: { accountId: appSDK.param.accountId, coupleId: this.data.id },
          }).then(() => {
            tips('成功解除关系')
            this.fetchMyCP()
            this.fetchCP()
          })
        })
      } else {
        axios.get('jhd.activity.couple.checkDelete', {
          params: { accountId: appSDK.param.accountId, coupleId: this.data.id },
        }).then(({data}) => {
          if (data.data) {
            confirm({
              text: '准备好和女神坠入爱河吗？',
              cacelText: '稍等一下',
              okText: '准备好了',
            }).then(() => {
              stClick('BreakSuccessClick') // 点击拆散，拆散成功
              axios.delete('jhd.activity.couple.delete', {
                params: { accountId: appSDK.param.accountId, coupleId: this.data.id },
              }).then(() => {
                this.openPop()
                this.fetchMyCP()
                this.fetchCP()
              })
            })
          } else {
            confirm({
              text: data.msg,
              cacelText: data.msg.indexOf('抱得女神')>-1?'再努力一下':'确定',
              okText: false,
            })
          }
        })
      }
    },
    gotoDetail() {
      if (appSDK.param.role == 1) {
        appSDK.gotoUserDetail(this.data.maleAccountId, this.data.maleName)
      } else {
        appSDK.gotoUserDetail(this.data.womanAccountId, this.data.womanName)
      }
    },
  },
  computed: {
    isMe() {
      const accountId = appSDK.param.accountId
      if (this.data.maleAccountId === accountId || this.data.womanAccountId === accountId) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  width: 10rem;
  height: 154px;
  position: relative;
  border-bottom: 1px solid #DEDEDE;
  // box-shadow: inset 0 -1px 0 0 #DEDEDE;
  >*:nth-child(1) {
    display: flex;
    align-items: center;
    height: 100%;
    .left {
      padding-left: 30px;
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
    .middle {
      display: flex;
      max-width: 560px;
    }
  }
  .avatars {
    width: 160px;
    display: flex;
    flex: none;
    >* {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      border: 3px solid white;
      &:nth-child(2) {
        margin-left: -30px;
      }
    }
  }
  .name-love {
    flex: none;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    >*:nth-child(1) {
      font-size: 30px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      max-width: 400px;
    }
    >*:nth-child(2) {
      font-size: 24px;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 30px;
      }
      span {
        color: #F76260;
      }
    }
  }
  >*:nth-child(2) {
    border-radius: 100px;
    width: 148px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: absolute;
    right: .27rem;
    bottom: 20px;
    &.relieve {
      background: #E8C28E;
      color: white;
    }
    &.break {
      background: white;
      color: #E8C28E;
      border: 1px solid #E8C28E;
    }
  }
}
.and {
  color: #E8C28E;
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