import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      component: require('./Index.vue').default,
      meta: { title: '我的卡包' },
    },
    {
      path: '/prize',
      component: require('./Prize').default,
      meta: { title: '我的宝箱' },
    },
    {
      path: '/rule',
      component: require('./Rule').default,
      meta: { title: '活动规则' },
    },
    {
      path: '/lottery',
      component: require('./Lottery').default,
      meta: { title: '抽奖' },
    },
    {
      path: '/searchUser',
      component: require('./SearchUser').default,
      meta: { title: '选择赠送好友' },
    },
    {
      path: '/buyFudai',
      component: require('./BuyFudai').default,
      meta: { title: '购买福袋' },
    },
    {
      path: '/conversion',
      component: require('./Conversion').default,
      meta: { title: '获取卡牌' },
    },
    {
      path: '/share',
      component: require('./Share').default,
      meta: { title: '我在约糖收集国庆中秋限量卡牌' },
    },
    {
      path: '/end',
      component: require('./End').default,
      meta: { title: '活动已结束' },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '收集约糖卡片'
  store.confirmInfo = null

  // appSDK.setShare({
  //   title: '我在约糖收集国庆中秋限量卡牌',
  //   desc: '约糖国庆卡牌活动正火举行，集齐卡牌就可以瓜分千万现金大奖！',
  //   link: location.origin + '/public/activity/171001/index.html#/share',
  //   imgUrl: 'http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/share_icon.png',
  // })
  const isEnd = () => {
    return Date.now() > store.endDate
  }
  if (isEnd() && to.path.indexOf('end') === -1) {
    next({ path: '/end' })
  } else {
    next()
  }
})

export default router
