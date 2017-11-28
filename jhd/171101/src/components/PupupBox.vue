<template>
  <div>
    <transition name="tipsWrap">
      <div class="layer tipsWrap" v-if="store.tipsInfo">
        <div class="content">
          <p class="text">{{store.tipsInfo.text}}</p>
        </div>
      </div>
    </transition>
    <transition name="confirmWrap">
      <div class="layer confirmWrap" v-if="store.confirmInfo">
        <div class="content">
          <div>
            <div>{{ store.confirmInfo.text }}</div>
          </div>
          <div class="button-group">
            <div class="cancel" @click.stop="store.confirmInfo.cancelFn" v-if="store.confirmInfo.cacelText">
              {{ store.confirmInfo.cacelText }}
            </div>
            <div class="ok" @click.stop="store.confirmInfo.okFn" v-if="store.confirmInfo.okText">
              {{ store.confirmInfo.okText }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      store,
    }
  }
}
</script>

<style scoped lang="scss">
.layer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, .2);
  z-index: 100;
  display: flex;
  align-items: center;
}

.layer.tipsWrap {
  background: none;
  pointer-events: none;
  .content {
    animation: popup-anima .3s;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 240px;
    height: 240px;
    margin: auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background: rgba(26, 26, 26, 0.8);
    border-radius: 10px;
    padding: 80px 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: #efefef;
      font-size: 26px;
      word-break: break-all;
    }
  }
}

.layer.confirmWrap {
  background: rgba(0, 0, 0, .6);
  .content {
    animation: popup-anima .3s;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 600px;
    margin: auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .95);
    border-radius: 30px;
    >*:nth-child(1) {
      font-size: 34px;
      padding: 50px 36px;
      word-wrap: break-word;
      max-height: 400px;
      overflow: auto;
      display: flex;
      justify-content: center;
    }
    .button-group {
      display: flex;
      border-top: 1px solid rgba(0, 0, 0, .2);
      text-align: center;
      font-size: 34px;
      >* {
        flex: 1;
        line-height: 88px;
      }
      .cancel {
        color: #262626;
      }
      .ok {
        font-weight: bold;
        color: #030303;
        border-left: 1px solid rgba(0, 0, 0, .2);
      }
    }
  }
}

.tipsWrap-enter-active,
.confirmWrap-enter-active {
  transition: all .4s ease;
}
.tipsWrap-enter,
.tipsWrap-leave-to,
.confirmWrap-enter,
.confirmWrap-leave-to {
  opacity: 0;
}
</style>
