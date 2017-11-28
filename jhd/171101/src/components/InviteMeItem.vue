<template>
  <div>
    <div class="invite-me">
      <div class="left">
        <img :src="data.fromUserAvatar+'?x-oss-process=image/resize,w_100,h_100'" @click="appSDK.gotoUserDetail(data.fromUser, data.fromUserName)">
        <div>
          <span class="name">
            {{data.fromUserName}}&nbsp;
            <img src="../img/vip1_s.png" v-if="data.vip===1">
            <img src="../img/vip2_s.png" v-if="data.vip===2">
            <img src="../img/vip3_s.png" v-if="data.vip===3">
            <img src="../img/svip_s.png" v-if="data.vip===4">
          </span>
          <span class="time">{{getTime}}</span>
        </div>
      </div>
      <div class="right">
        <div class="untreated" v-if="data.status===1">
          <div @click="accept">接受</div>&emsp;
          <div @click="refuse">拒绝</div>
        </div>
        <div class="refuse" v-if="data.status===2">已拒绝</div>
        <div class="accept" v-if="data.status===3">已接受</div>
      </div>
    </div>
  </div>
</template>

<script>
import { confirm, tips } from '@/store/actions'
import store from '@/store'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    reload: {
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
    }
  },
  methods: {
    accept() {
      if (store.myCp) {
        this.alreadyCP()
        return
      }
      axios.post('jhd.activity.coupleInvite.accept', { inviteId: this.data.id })
      .then(({ data }) => {
        if (data.success) {
          this.reload()
          confirm({
            text: '恭喜你们组成CP，快去提高恩爱值吧',
            cacelText: '等会去',
            okText: '去聊天',
          }).then(() => {
            appSDK.gotoChatDetail(this.data.fromUser, this.data.fromUserName)
          })
        } else if(data.code == '400000122002000') {
          confirm({
            text: '啊哦，时间不等人，对方已与其他用户组成CP，怒怼值高于他们的恩爱值可拆散他们哦',
            okText: '拆散他们',
            cacelText: '放弃了',
          }).then(() => {
            axios.get('jhd.activity.couple.my', {
              params: { accountId: this.data.fromUser },
            }).then(({ data }) => {
              const coupleId = data.data.id
              axios.get('jhd.activity.couple.checkDelete', {
                params: { accountId: appSDK.param.accountId, coupleId },
              }).then(({data}) => {
                if (data.success) {
                  confirm({
                    text: '准备好和女神坠入爱河吗？',
                    cacelText: '稍等一下',
                    okText: '准备好了',
                  }).then(() => {
                    axios.delete('jhd.activity.couple.delete', {
                      params: { accountId: appSDK.param.accountId, coupleId },
                    }).then(({data}) => {
                      if (data.success) {
                        this.openPop()
                        this.reload()
                      } else {
                        tips(data.msg)
                      }
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
            })
          })
        } else {
          confirm({
            text: data.msg,
            okText: false,
            cacelText: '我知道了',
          })
        }
      })
    },
    refuse() {
      if (store.myCp) {
        this.alreadyCP()
        return
      }
      confirm({
        text: '忍心拒绝真诚的他/她吗',
        okText: '直接拒绝',
        cacelText: '再想想',
      }).then(() => {
        axios.post('jhd.activity.coupleInvite.refuse', { inviteId: this.data.id })
          .then(({ data }) => {
            if (data.success) {
              tips('拒绝成功')
              this.reload()
            } else {
              tips(data.msg)
            }
          })
      })
    },
    alreadyCP() {
      confirm({
        text: '你已组成CP，不可进行操作哦~',
        okText: false,
        cacelText: '我知道了',
      })
    },
  },
  computed: {
    getTime() {
      const d = new Date(this.data.createdAt)
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.invite-me {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .53rem 0 .37rem;
  height: 136px;
}
.left {
  display: flex;
  >img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  >div {
    height: 100px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .name {
    font-size: 34px;
    color: #E8C28E;
    >img {
      width: 48px;
      height: 32px;
    }
  }
  .time {
    font-size: 28px;
    color: #C4C4C4;
  }
}
.accept,
.refuse {
  width: 140px;
  height: 48px;
  border-radius: 100px;
  text-align: center;
  line-height: 48px;
  font-size: 24px;
  color: #FFFFFF;
}
.accept {
  background: #E8C28E;
}
.refuse {
  background: #C4C4C4;
}
.untreated >* {
  width: 92px;
  height: 48px;
  border: 1px solid #E8C28E;
  border-radius: 100px;
  font-size: 24px;
  color: #E8C28E;
  text-align: center;
  display: inline-block;
  line-height: 48px;
}
</style>
