<template>
  <div class="my-invite">
    <img :src="data.toUserAvatar+'?x-oss-process=image/resize,w_100,h_100'" @click="appSDK.gotoUserDetail(data.toUser, data.toUserName)">
    <div>
      <span class="name">{{data.toUserName}}</span>
      <span class="msg">{{data.msg}}</span>
      <span class="time">{{getTime}}</span>
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
  data() {
    return {
      appSDK,
    }
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
.my-invite {
  display: flex;
  align-items: center;
  padding: 0 0 0 .4rem;
  height: 140px;
  >img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 30px;
  }
  >div {
    display: flex;
    flex-direction: column;
  }
}
.name {
  font-size: 34px;
  color: #2A2A2A;
}
.msg {
  font-size: 24px;
  color: #888888;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  max-width: 580px;
}
.time {
  font-size: 28px;
  color: #C4C4C4;
}
</style>
