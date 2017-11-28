(function (g) {

  /**
   * 生成随机方法名
   */
  var generateRdFnName = (function () {
    var index = 0
    return function () {
      return 'appCBFun' + (index++) + '_' + Date.now()
    }
  })()

  function getParamter(name, url) {
    if (url === undefined) {
      url = location.href
    }
    var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)")
    var m = url.match(r)
    return (!m ? null : m[2])
  }

  function getCookie(name) {
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    var arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    }
    else {
      return null
    }
  }

  function getAppParam(name) {
    var value = getParamter(name)
    var cookieName = 'appParam.' + name
    if (value) {
      document.cookie = cookieName + '=' + escape(value) + '; path=/'
    } else {
      value = getCookie(cookieName)
    }
    return value
  }

  function isInApp() {
    return g.appSDK.param.version
  }

  /**
   * 关闭网页
   */
  function closeWindow() {
    if (isInApp()) {
      location.href = '?appType=closeWindow'
    }
  }

  /**
   * 去认证
   */
  function gotoAuthentication() {
    location.href = '?appType=authentication'
  }

  /**
   * 用户详情
   * @param {*} accountId 
   * @param {*} accountName 
   */
  function gotoUserDetail(accountId, accountName) {
    if (!isInApp()) {
      alert('抱歉，该功能目前仅支持安卓客户端')
      return
    }
    location.href = '?appType=gotoUserDetail' +
      '&accountId=' + accountId +
      '&accountName=' + accountName
  }

  /**
   * 打开聊天
   * @param {*} accountId 
   * @param {*} accountName 
   */
  function gotoChatDetail(accountId, accountName) {
    if (!isInApp()) {
      alert('抱歉，该功能目前仅支持安卓客户端')
      return
    }
    location.href = '?appType=gotoChatDetail' +
      '&accountId=' + accountId +
      '&accountName=' + accountName
  }

  /**
   * 开通会员
   */
  function gotoBecomeMember() {
    if (!isInApp()) {
      alert('请到我-会员界面开通会员')
      return
    }
    return new Promise(function (resolve, reject) {
      var cbFunName = generateRdFnName() // 回调函数
      window[cbFunName] = function (data) {
        delete window[cbFunName]
        if (data === 'success') {
          resolve(data)
        } else {
          reject(data)
        }
      }
      location.href = '?appType=gotoBecomeMember' +
        '&cbFunName=' + cbFunName
    })
  }

  /**
   * 金币充值页面
   */
  function gotoRecharge() {
    if (!isInApp()) return Promise.reject('请在APP运行')
    return new Promise(function (resolve, reject) {
      var cbFunName = generateRdFnName() // 回调函数
      window[cbFunName] = function (data) {
        delete window[cbFunName]
        if (data === 'success') {
          resolve(data)
        } else {
          reject(data)
        }
      }
      location.href = '?appType=gotoRecharge' +
        '&cbFunName=' + cbFunName
    })
  }

  /**
   * 分享
   * @param {*} title 分享标题
   * @param {*} desc 分享描述
   * @param {*} link 分享链接
   * @param {*} imgUrl 分享图标
   * @param {*} success 分享成功回调
   */
  function setShare(option) {
    if (!isInApp()) return
    var cbFunName = generateRdFnName() // 回调函数
    window[cbFunName] = function (data) {
      option.success && option.success(data)
      return '收到收到'
    }
    location.href = '?appType=setShare' +
      '&cbFunName=' + cbFunName +
      '&title=' + encodeURIComponent(option.title) +
      '&desc=' + encodeURIComponent(option.desc) +
      '&link=' + encodeURIComponent(option.link) +
      '&imgUrl=' + encodeURIComponent(option.imgUrl)
  }

  /**
   * 打开分享
   */
  function openShare() {
    location.href = '?appType=openShare'
  }

  /**
   * 支付订单
   * @param {*} orderNo 订单号
   * @param {*} amount 支付金额（单位 分）
   */
  function goPay(orderNo, amount) {
    return new Promise(function (resolve, reject) {
      var cbFunName = generateRdFnName() // 回调函数
      window[cbFunName] = function (data) {
        delete window[cbFunName]
        if (data === 'success') {
          resolve(data)
        } else {
          reject(data)
        }
      }
      location.href = '?appType=goPay' +
        '&cbFunName=' + cbFunName +
        '&amount=' + amount +
        '&orderNo=' + encodeURIComponent(orderNo)
    })
  }

  /**
   * 关闭网页跳转到 首页
   */
  function gotoHome() {
    location.href = '?appType=gotoHome'
  }
  /**
   * 关闭网页跳转到 广场
   */
  function gotoSquare() {
    location.href = '?appType=gotoSquare'
  }

  /**
   * 关闭网页跳转到 消息
   */
  function gotoMessage() {
    location.href = '?appType=gotoMessage'
  }

  /**
   * 关闭网页跳转到 个人中心
   */
  function gotoUser() {
    location.href = '?appType=gotoUser'
  }

  /**
   * 注册问答完成
   */
  function QACompleted() {
    location.href = '?appType=QACompleted'
  }

  /**
   * 设置APP网页标题
   * @param {*} title 标题
   */
  function setTitle(title) {
    if (isInApp()) {
      location.href = '?appType=setTitle' +
        '&title=' + encodeURIComponent(title)
    }
  }

  /**
   * 全屏播放视频
   * @param {*} src 
   */
  function playVideo(src) {
    if (isInApp()) {
      location.href = '?appType=playVideo' +
        '&src=' + encodeURIComponent(src)
    }
  }

  /**
   * 认证视频 上传
   */
  function recordVideo() {
    location.href = '?appType=recordVideo'
  }

  /**
   * 展示视频 录制
   */
  function uploadVideo() {
    location.href = '?appType=uploadVideo'
  }

  g.appSDK = {
    getParamter: getParamter,
    closeWindow: closeWindow,
    gotoUserDetail: gotoUserDetail,
    gotoChatDetail: gotoChatDetail,
    gotoBecomeMember: gotoBecomeMember,
    gotoAuthentication: gotoAuthentication,
    gotoRecharge: gotoRecharge,
    goPay: goPay,
    setShare: setShare,
    openShare: openShare,
    isInApp: isInApp,
    gotoHome: gotoHome,
    gotoSquare: gotoSquare,
    gotoMessage: gotoMessage,
    gotoUser: gotoUser,
    QACompleted: QACompleted,
    setTitle: setTitle,
    playVideo: playVideo,
    recordVideo: recordVideo,
    uploadVideo: uploadVideo,
    param: {
      accountId: getAppParam('accountId'),
      accessToken: getAppParam('accessToken'),
      role: getAppParam('role'),
      channel: getAppParam('channel'),
      version: getAppParam('version')
    }
  }

})(window)