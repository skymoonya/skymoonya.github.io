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
</style>
