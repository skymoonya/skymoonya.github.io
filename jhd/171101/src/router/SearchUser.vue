<template>
  <div class="root">
    <div class="header">
      <form @submit.prevent="submit">
        <input type="search" v-model="text" @input="changeText($event.target.value)" placeholder="搜索用户名称" />
      </form>
    </div>
    <div class="btn-list">
      <div :class="{current:favoriteIndex===3}" @click="changeFavoriteIndex(3)">最近聊天</div>
      <div :class="{current:favoriteIndex===1}" @click="changeFavoriteIndex(1)">关注</div>
      <div :class="{current:favoriteIndex===2}" @click="changeFavoriteIndex(2)">粉丝</div>
    </div>
    <ul class="user-list">
      <li v-for="item in list" :key="item.id" @click="operate(item)">
        <div><img :src="item.avatar"></div>
        <div>{{item.nickname}}</div>
      </li>
    </ul>
    <Pager :onLoad="onFetch" ref="pager"></Pager>
  </div>
</template>

<script>
import Pager from '@/components/Pager'
import store from '@/store'
import { tips, confirm } from '@/store/actions'

export default {
  data() {
    return {
      store,
      text: '',
      list: [],
      favoriteIndex: 3,
      timeout: 0,
    }
  },
  components: { Pager },
  methods: {
    changeFavoriteIndex(index) {
      this.favoriteIndex = index
      this.$refs.pager.onReload()
    },
    changeText() {
      clearTimeout(this.timeout)
      if (this.text.length > 0) {
        this.timeout = setTimeout(this.submit, 600);
      }
    },
    async onFetch({ limit, since }) {
      let res
      let newList
      let newSince = 0
      if (this.favoriteIndex) {
        if (this.favoriteIndex < 3) {
          res = await axios.get('jhd.community.queryFavorite', {
            params: {
              request: {
                since,
                limit,
                accountId: appSDK.param.accountId,
                isFavorite: this.favoriteIndex === 1, // true为收藏 false为被收藏
              },
            },
          })
          newList = res.data.data.map(item => ({
            id: item.user.id,
            avatar: item.user.avatar,
            nickname: item.user.nickname,
          }))
          if (newList.length > 0) {
            newSince = newList[newList.length - 1].id
          }
        } else {
          res = await axios.get('message.yt.userList.withme.simple', {
            params: {
              limit,
              timestamp: since,
              user: appSDK.param.accountId,
            },
          })
          newList = res.data.data.map(item => ({
            id: item.accountId,
            nickname: item.nickname,
            avatar: item.avatar,
            sentAt: item.sentAt,
          }))
          if (newList.length > 0) {
            newSince = newList[newList.length - 1].sentAt
          }
        }
      } else {
        res = await axios.get('user.jhd.userExtends.tel.search.protection', {
          params: {
            request: {
              since,
              limit,
              keyword: this.text,
              role: appSDK.param.role,
            }
          },
        })
        newList = res.data.data
        if (newList.length > 0) {
          newSince = newList[newList.length - 1].id
        }
      }
      if (since == 0) {
        this.list = newList
      } else {
        this.list = [...this.list, ...newList]
      }
      return { list: newList, since: newSince }
    },
    submit() {
      this.favoriteIndex = 0
      this.$refs.pager.onReload()
    },
    operate(user) {
      if (appSDK.getParamter('operate') == 'invite') {
        this.coupleInvite(user)
      } else {
        this.giveGift(user)
      }
    },
    coupleInvite(user) {
      confirm({
        text: `是否邀请${user.nickname}组成CP？`,
      }).then(() => {
        stClick('InviteClick') // 点击邀请对象组CP次数
        axios.post('jhd.activity.coupleInvite.invite', {
          toUser: user.id,
          fromUser: appSDK.param.accountId,
        }).then(({ data }) => {
          if (data.success) {
            tips('邀请成功')
          } else {
            confirm({
              text: data.msg,
              cacelText: '我知道了',
              okText: false,
            })
          }
        })
      })
    },
    giveGift(user) {
      confirm({
        text: `是否将${store.giveGiftName}赠送给${user.nickname}？`,
        okText: '立即赠送',
      }).then(() => {
        axios.post('jhd.activity.cpGift.give', {
          fromUser: appSDK.param.accountId,
          toUser: user.id,
          cpGiftId: store.giveGiftId,
        }).then(({ data }) => {
          if (data.success) {
            tips('赠送成功')
            history.go(-1)
          } else {
            tips(data.msg)
          }
        })
      })
    }
  }
}
</script>

<style scoped  lang="scss">
.root {
  background: #F8F8F8;
  min-height: 100vh;
}

.header {
  background: #262626;
  padding: 16px 0;
  input {
    background: rgba(255, 255, 255, 0.22);
    border: 0;
    width: 700px;
    height: 56px;
    display: block;
    margin: 0 auto;
    outline: none;
    border-radius: 10px;
    padding: 0 20px;
    font-size: 28px;
    color: #ABABAB;
  }
}

.btn-list {
  display: flex;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.10);
  background: #fff;
  >* {
    flex: 1;
    font-size: 34px;
    color: #707070;
    line-height: 88px;
    text-align: center;
    border-right: 1px solid #E6E6E6;
    &.current {
      background: #ffd77c;
      color: #9b6d0b;
    }
  }
}

.user-list {
  padding: 0;
  margin: 0;
  >li {
    height: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #fff;
    height: 136px;
    padding-left: 36px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    >*:nth-child(2) {
      flex: 1;
      font-size: 34px;
      color: #E8C28E;
      margin-left: 17px;
    }
  }
}
</style>
