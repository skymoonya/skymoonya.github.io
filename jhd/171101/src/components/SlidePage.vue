<template>
  <div class="root">
    <div class="slidePage-container" ref="slidePage" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <slot></slot>
    </div>
    <span class="arrow" @click="next" v-if="index<itemList.length-1"></span>
  </div>
</template>

<script>
const transition = '-webkit-transition:all 400ms cubic-bezier(0.550, 0.085, 0.000, 0.990);'

export default {
  props: {
    defaultIndex: {
      tyep: Number,
      default: 0,
    }
  },
  data() {
    return {
      index: 0,
      itemList: [],
      moveInfo: {
        dragStart: null,
        percentage: 0,
      },
    }
  },
  computed: {
    currentItem() {
      return this.itemList[this.index]
    },
    prevItem() {
      if (this.index <= 0) return null
      return this.itemList[this.index - 1]
    },
    nextItem() {
      if (this.index >= this.itemList.length - 1) return null
      return this.itemList[this.index + 1]
    },
  },
  methods: {
    touchstart(event) {
      if (this.moveInfo.dragStart !== null) return
      if (event.touches) {
        event = event.touches[0]
      }
      // 抓取时的所在位置
      this.moveInfo.dragStart = event.clientY
    },
    touchmove(event) {
      // 防止ios拖动事件
      event.preventDefault()

      if (this.moveInfo.dragStart === null) return

      if (event.touches) {
        event = event.touches[0]
      }
      // 得到抓取开始时于进行中的差值的百分比
      const percentage = (this.moveInfo.dragStart - event.clientY) / window.screen.height

      if (percentage > 0) {
        // 向上拖动
        const translateY = 0.6 * percentage // 位置系数，可以微调
        if (this.nextItem) {
          this.nextItem.style.transition = 'none'
          this.nextItem.style.transform = `translateY(${100 - (translateY * 100)}%)`
          this.currentItem.style.transition = 'none'
          this.currentItem.style.transform = `translateY(-${translateY * 100}%)`
        }
      } else {
        // 向下拖动
        const translateY = 0.6 * percentage // 位置系数，可以微调
        if (this.prevItem) {
          this.prevItem.style.transition = 'none'
          this.prevItem.style.transform = `translateY(-${100 - (-translateY * 100)}%)`
          this.currentItem.style.transition = 'none'
          this.currentItem.style.transform = `translateY(${-translateY * 100}%)`
        }
      }
      this.moveInfo.percentage = percentage
    },
    touchend() {
      const dragThreshold = 0.15
      if (this.moveInfo.percentage > dragThreshold) {
        this.next()
      } else if (Math.abs(this.moveInfo.percentage) > dragThreshold) {
        this.prev()
      } else {
        if (this.nextItem) {
          this.nextItem.setAttribute('style', `${transition}-webkit-transform:translateY(100%);`)
        }
        if (this.prevItem) {
          this.prevItem.setAttribute('style', `${transition}-webkit-transform:translateY(-100%);`)
        }
        this.currentItem.setAttribute('style', `${transition}-webkit-transform:none;`)
      }

      this.moveInfo.percentage = null
      this.moveInfo.dragStart = null
    },
    prev() {
      const index = this.index
      const nextIndex = index - 1
      const itemList = this.itemList
      if (index <= 0) return

      this.prevItem.setAttribute('style', `${transition}-webkit-transform:translateY(0);`)
      this.currentItem.setAttribute('style', `${transition}-webkit-transform:translateY(100%);`)

      this.index = nextIndex
    },
    next() {
      const index = this.index
      const nextIndex = index + 1
      const itemList = this.itemList
      if (index >= itemList.length - 1) return

      this.nextItem.setAttribute('style', `${transition}-webkit-transform:translateY(0);`)
      this.currentItem.setAttribute('style', `${transition}-webkit-transform:translateY(-100%);`)

      this.index = nextIndex
    },
  },
  mounted() {
    this.index = this.defaultIndex
    const slidePage = this.$refs.slidePage
    slidePage.style.height = `${window.lib.flexible.px2rem(window.innerHeight)}rem`
    this.itemList = [...slidePage.children]
    this.currentItem.setAttribute('style', `-webkit-transform:none;`)
  },
}
</script>

<style lang="scss" scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(-135deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) rotate(-135deg);
  }
}

.root {
  position: relative;
}

.slidePage-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  >* {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateY(100%);
    overflow-y: auto;
    overflow-x: hidden;
    &.show {
      transform: none;
    }
  }
}

.arrow {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 36px;
  left: 50%;
  margin-left: -25px;
  border-top: 6px solid #5a584e;
  border-left: 6px solid #5a584e;
  z-index: 1;
  transform: rotate(-135deg);
  animation: fadeInUp 1.5s .2s ease infinite;
}
</style>
