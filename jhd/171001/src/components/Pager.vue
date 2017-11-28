<template>
  <div>
    <div v-if="noMore" class="noMore">没有更多数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      since: 0,
    }
  },
  props: {
    onLoad: Function,
    limit: {
      type: Number,
      default: 20,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onReload() {
      this.since = 0
      this.noMore = false
      this.getData()
    },
    async getData() {
      if (this.loading) return
      this.loading = true
      const { list, since } = await this.onLoad({
        limit: this.limit,
        since: this.since,
      })
      // if (list.length < this.limit) {
      if (list.length < 1) {
        this.noMore = true
      }
      this.since = since
      this.loading = false
    },
    onScroll() {
      if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
        if (!this.loading) { // 加载完了，才请求下一页
          if (this.noMore) {  // 没有下一页
            return
          }
          this.getData()
        }
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>
<style scoped  lang="scss">
.noMore {
  text-align: center;
  padding: 20px 0;
  font-size: 28px;
}
</style>
