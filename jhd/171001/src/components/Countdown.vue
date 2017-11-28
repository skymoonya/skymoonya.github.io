<template>
  <time>
    {{text}}
  </time>
</template>
<script>
import store from '@/store'

export default {
  data() {
    return {
      store,
      curTime: Date.now(),
      timer: 0,
    }
  },
  props: {
    showDay: {
      type: Boolean,
      default: false,
    },
    fmt: {
      type: String,
      default: 'hh:mm:ss',
    },
    endTime: {
      type: Number,
      required: true,
    },
  },
  computed: {
    text() {
      const remain = (this.endTime - this.curTime + this.store.timeLag) / 1000

      if (remain <= 0) {
        return '00:00:00'
      }
      var h = parseInt(remain / 3600),
        m = parseInt(remain / 60 % 60),
        s = parseInt(remain % 60),
        day = 0

      function fix(i) {
        return i < 10 ? '0' + i : i;
      }

      if (this.showDay && h >= 24) {
        day = parseInt(h / 24)
        h = h % 24
      }

      const fmtData = {
        dd: fix(day),
        hh: fix(h),
        mm: fix(m),
        ss: fix(s),
      }

      let r = this.fmt
      // 自动格式化，天数大于1显示天数，小时大于1显示小时
      if (r === 'auto') {
        r = 'mm:ss'
        if (h > 0) {
          r = 'hh:' + r
        }
        if (day > 0) {
          r = 'dd天' + r
        }
      }
      for (const k in fmtData) {
        r = r.replace(new RegExp(k, 'g'), fmtData[k])
      }
      return r
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.curTime = Date.now()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
