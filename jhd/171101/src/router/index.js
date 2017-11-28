import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      component: require('./Index.vue').default,
      meta: { title: '一周CP' },
    },
    {
      path: '/prize',
      component: require('./Prize').default,
      meta: { title: '我的礼品' },
    },
    {
      path: '/rule',
      component: require('./Rule').default,
      meta: { title: '活动说明' },
    },
    {
      path: '/searchUser',
      component: require('./SearchUser').default,
      meta: { title: '选择好友' },
    },
    {
      path: '/buy',
      component: require('./Buy').default,
      meta: { title: '购买宝箱' },
    },
    {
      path: '/invitationList',
      component: require('./invitationList').default,
      meta: { title: '邀请列表' },
    },
    {
      path: '/share',
      component: require('./Share').default,
      meta: { title: '我在约糖参加组CP活动' },
    },
    {
      path: '/end',
      component: require('./End').default,
      meta: { title: '活动已结束' },
    },
    { path: '/', redirect: '/share' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  document.title = to.meta.title
  store.confirmInfo = null
  // appSDK.setShare({
  //   title: '爱在约糖|一周7天恋爱体验活动邀约',
  //   desc: '找良人，拿大奖，鱼和熊掌可兼得，来约糖抱得良人归还有大奖拿！',
  //   link: location.origin + '/public/activity/171101/index.html?accountId=' + appSDK.param.accountId,
  //   // imgUrl: 'http://prod-jhd-mq-file.oss-cn-shanghai.aliyuncs.com/jhd/web/activity/share_icon.png',
  //   imgUrl: ['http://prod-jhd-mq-file.oss-cn-shanghai.ali', 'yuncs.com/jhd/web/activity/share_icon.png'].join(''),
  // })
  const isEnd = () => Date.now() > store.endDate
  if (isEnd() && to.path.indexOf('end') === -1) {
    next({ path: '/end' })
  } else {
    next()
  }
})

export default router
