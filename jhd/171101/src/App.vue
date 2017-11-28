<template>
  <div id="app">
    <router-view></router-view>
    <Loading></Loading>
    <PupupBox></PupupBox>
  </div>
</template>

<script>
import Loading from './components/Loading'
import PupupBox from './components/PupupBox'

export default {
  components: { Loading, PupupBox },
}
</script>

<style lang="scss">
@keyframes popup-anima {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}
* {
  color: #929292;
}
.red-point {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #FF4B00;
  float: right;
}
</style>
