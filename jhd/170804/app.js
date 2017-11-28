(function(window){
  var role = window.appSDK.param.role == 1 ? 'female' : 'male'
  var classRole = '.' + role
  var isVip = false
  var completeStep2 = false

  function addClickListener() {
    var recdEle = document.querySelector(classRole + ' .content7 .recd')
    document.querySelector(classRole + ' .content1 .operate')
      .addEventListener('click', function() {
        nextStep(2)
      })
    Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content2 .operate'))
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          if (completeStep2) return
          completeStep2 = true
          nextStep(3)
          Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content7 .close'))
            .forEach(function(ele, subIndex) {
            var recdUser = recommend[role][index][subIndex]
            var child1 = document.createElement('div')
            child1.setAttribute('class', 'user')
            var avatar = document.createElement('div')
            avatar.setAttribute('style', 'background-image: url(' + recdUser.avatar + ');')
            avatar.setAttribute('class', 'img')
            avatar.addEventListener('click', function() {
              window.appSDK.gotoUserDetail(recdUser.accountId, recdUser.name)
            })
            var userInfo = document.createElement('span')
            userInfo.setAttribute('class', 'user-info')
            userInfo.innerHTML = recdUser.name
            child1.appendChild(avatar)
            child1.appendChild(userInfo)
            var child2 = document.createElement('div')
            child2.setAttribute('class', 'chat')
            child2.innerHTML = '和' + (role === 'female' ? '他' : '她') + '聊聊'
            child2.addEventListener('click', function() {
              window.appSDK.gotoChatDetail(recdUser.accountId, recdUser.name)
            })
            ele.appendChild(child1)
            ele.appendChild(child2)
          })
        })
      })
    Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content3 .operate'))
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          nextStep(4)
        })
      })
    Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content4 .operate'))
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          nextStep(5)
        })
      })
    Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content5 .operate'))
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          nextStep(6)
        })
      })
    Array.prototype.slice.call(document.querySelectorAll(classRole + ' .content7 .operate'))
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          if (role === 'male' && !isVip && index >= 3 && appSDK.isInApp()) { //在APP内才提示
            fetchData(function(data){
              if (data && data.vip > 0) {
                isVip = true
              }
              if (isVip) {
                draw(index)
              } else {
                document.querySelector('.mask').style.display = 'block'
              }
            })
          } else {
            draw(index)
          }
        })
      })
    document.querySelector('.popup .cancel').addEventListener('click', function() {
      document.querySelector('.mask').style.display = 'none'
    })
    document.querySelector('.popup .ok').addEventListener('click', function() {
      window.appSDK.gotoBecomeMember()
    })
  }

  function draw(index) {
    var ele = document.querySelectorAll(classRole + ' .content7 .recd > div')[index]
    ele.classList.remove('close')
    ele.classList.remove('shake')
    ele.classList.add('open')
    var shakeEles = Array.prototype.slice.call(document.querySelectorAll('.shake'))
    shakeEles.forEach(function(element) {
      element.style.animationName = 'none'
    })
    setTimeout(function() {
      shakeEles.forEach(function(element) {
        element.style.animationName = 'shake'
      })
    }, 0)
  }

  function nextStep(number) {
    var element1 = document.querySelector(classRole + ' .content' + (number - 1))
    var element2 = document.querySelector(classRole + ' .content' + number)
    element2.style.display = 'block'
    setTimeout(function() {
      element1.classList.add('disppear')
      element1.classList.remove('show')
      element2.classList.add('show')
      setTimeout(function() {
        element1.style.display = 'none'
      }, 500)
    }, 0)
    if (number === 6) {
      content6.classList.add('p10')
      percentEle.innerHTML = '10%'
      setTimeout(step6, 500)
    }
  }

  var content6 = document.querySelector(classRole + ' .content6')
  var percentEle = document.querySelector(classRole + ' .content6 .indicate-number span')
  function step6(percent) {
    if(percent === undefined) {
      percent = 10
      content6.classList.remove('p10')
    }
    setTimeout(function() {
      content6.classList.add('p' + percent)
      content6.classList.remove('p' + (percent - 1))
      percentEle.innerHTML = percent + '%'
      if (percent < 100) {
        step6(percent + 1)
      } else {
        nextStep(7)
      }
    }, 15)
  }

  function fetchData(callback) {
    axios.get('/api/user.jhd.userExtends.get', { params: { accountId: window.appSDK.param.accountId } })
      .then(function(res) {
        if (callback) {
          callback(res.data.data)
        }
      })
  }

  function init() {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
      }, false);  
    }
    var title = document.querySelector('head title')
    if (role === 'female') {
      title.innerHTML = '七夕，寻找他'
    } else {
      title.innerHTML = '七夕，寻找她'
      fetchData(function(data){
        if (data && data.vip > 0) {
          isVip = true
        }
      })
    }
    document.querySelector(classRole).style.display = 'block'
    addClickListener()
    var custom = ''
    for (var i=1; i<=100; i++) {
      custom += '.p' + i + ' .indicate div {width: ' + i + '%;}\n'
      custom += '.p' + i + ' .indicate-number {left: calc(' + i + '% - .65rem);}\n'
    }
    document.getElementById('custom').innerHTML = custom
  }

  var recommend = {
      male: {
      0: [{ // 气质型
        name: '曼子',
        accountId: '1706021220121930368',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/07/21/ba038606fab443ceb7d9103e847c5148.jpg',
      },{
        name: '馨宁',
        accountId: '1708031247119910309',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/08/03/a5412f11b559413881e0eef748e0ae44.jpg',
      },{
        name: '幔益',
        accountId: '1706132342256180415',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/07/14/beb68ae3b9684accbb320d92e1bd98a7.png',
      },{
        name: '车厘子',
        accountId: '1705261311443260285',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/06/19/3b94538687534ee8ad8929095c96c1b8.png',
      },{
        name: 'A',
        accountId: '1706131717210280122',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/08/04/499477459fbb46ef8d2b525d5c968391.jpg',
      },{
        name: 'Lizzie',
        accountId: '1707240849305130736',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/07/31/cb551778bda44763bc3dd4ddd401156f.png',
      }],
      1: [{ // 萝莉型
        name: '李娜baby  ',
        accountId: '1706261736009780709',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/06/28/08ac088e91644cee8a2dcdb6226fb470.jpg',
      },{
        name: '小粉丝',
        accountId: '1706261642130350670',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/06/30/a3a64de44c2a4679bebe8da7afc5aaea.png',
      },{
        name: '伊伊',
        accountId: '1707151545310900172',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/07/15/c3a9f126c86e457ca18959128aea0aef.jpg',
      },{
        name: '逆风撩汉',
        accountId: '1708050917338860904',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/08/05/2b0181da74aa467a80ad3b52395e56ed.jpg',
      },{
        name: '喵爷',
        accountId: '1706271625441100341',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/08/06/6f7dfff68b1b49cbab3df0e6c5926705.png',
      },{
        name: 'Elsie',
        accountId: '1702151516424520722',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/04/06/f168b8b1498640e481174faeb4c049ce.jpg',
      }],
      2: [{ // 性感型
        name: '美惠',
        accountId: '1707310042215410717',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/08/03/fd8aa0dbc70b40d19daad20e2632bf29.png',
      },{
        name: '小慧慧',
        accountId: '1705222058493250477',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/07/17/02ee75f8be924d899098304386e780b0.png',
      },{
        name: '茱茱妞',
        accountId: '1707030103172870214',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/07/04/95309fb0d2f14562a5ef7e89bfaf4a2f.png',
      },{
        name: 'Circus',
        accountId: '1706261601344560633',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/06/26/7dfcf7db0f4c42c6a8cd68da04e61e45.png',
      },{
        name: 'Panne',
        accountId: '1706021211244120351',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/06/25/13828e28c7b04b39ad149219f4833a70.png',
      },{
        name: '丸子',
        accountId: '1702161654444510790',
        avatar: 'https://image.mymaiquan.com/jhd/user/2017/04/19/b7e9d901504b444c9de5bb9bef52174b.jpg',
      }],
      3: [{ // 御姐型
        name: '周北北',
        accountId: '1706261628372220662',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/06/27/2cc0b8da2ffd415eb5b13d022d27a350.png',
      },{
        name: '女朋友',
        accountId: '1706271807040980372',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/07/17/f1b23a4709e94d4fa19687eb2b72f75b.jpg',
      },{
        name: '咖喱咖喱吼',
        accountId: '1706041406145140196',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/07/17/d0d014bfe09442d99f084fac2390ae6c.jpg',
      },{
        name: '颖儿',
        accountId: '1707131428156260778',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/08/07/fd75d31b781d42fd8e7bbf2006f7cd01.png',
      },{
        name: '小可爱安娜',
        accountId: '1706262203155060844',
        avatar: 'https://image.mymaiquan.com/jhd/photo/2017/08/04/0f0d5431bce342f78688f10ec3f544c5.png',
      },{
        name: 'Whitney',
        accountId: '1707030836127060312',
        avatar: 'https://image.mymaiquan.com/jhd/dynamic/2017/08/05/6e1608096d63486bb74fe792bd4bc61f.jpg',
      }],
    },
    female:{
      0: [{ // 阳光运动
        name: '丁然',
        accountId: '1702171449332010829',
        avatar: 'images/recommend/female/0/50.png',
      },{
        name: '凭帅气出名',
        accountId: '1708022230407500119',
        avatar: 'images/recommend/female/0/60.png',
      },{
        name: '没事改改名',
        accountId: '1707011745138710801',
        avatar: 'images/recommend/female/0/70.png',
      },{
        name: 'Ben wong',
        accountId: '1707291148108890194',
        avatar: 'images/recommend/female/0/80.png',
      },{
        name: 'Zeeble',
        accountId: '1707290028051240879',
        avatar: 'images/recommend/female/0/90.png',
      },{
        name: '把握尺寸',
        accountId: '1708022313046320141',
        avatar: 'images/recommend/female/0/100.png',
      }],
      1: [{ // 幽默风趣
        name: '野比太郎',
        accountId: '1708071651116660327',
        avatar: 'images/recommend/female/1/50.jpg',
      },{
        name: '奔驰的骏马',
        accountId: '1702171516206230845',
        avatar: 'images/recommend/female/1/60.jpg',
      },{
        name: '好玩',
        accountId: '1707220147031120639',
        avatar: 'images/recommend/female/1/70.png',
      },{
        name: '毅行苍穹',
        accountId: '1705220930559720384',
        avatar: 'images/recommend/female/1/80.png',
      },{
        name: '涛涛滔滔',
        accountId: '1706020751103210254',
        avatar: 'images/recommend/female/1/90.png',
      },{
        name: 'No.玖月',
        accountId: '1707230121400230358',
        avatar: 'images/recommend/female/1/100.png',
      }],
      2: [{ // 浪漫暖男
        name: 'jiejiewei',
        accountId: '1702171549084270859',
        avatar: 'images/recommend/female/2/50.png',
      },{
        name: 'MR.陈',
        accountId: '1612161800404410369',
        avatar: 'images/recommend/female/2/60.png',
      },{
        name: '天恨无绝',
        accountId: '1707051412176000243',
        avatar: 'images/recommend/female/2/70.png',
      },{
        name: '泽西',
        accountId: '1707240058153860233',
        avatar: 'images/recommend/female/2/80.png',
      },{
        name: 'Konikeng',
        accountId: '1707290014004030807',
        avatar: 'images/recommend/female/2/90.png',
      },{
        name: '怦怦然',
        accountId: '1706301154101560026',
        avatar: 'images/recommend/female/2/100.png',
      }],
      3: [{ // 冷酷沉默
        name: 'luxliu',
        accountId: '1707060954290700109',
        avatar: 'images/recommend/female/3/50.png',
      },{
        name: '午夜狼',
        accountId: '1707061051401470145',
        avatar: 'images/recommend/female/3/60.png',
      },{
        name: '风清扬',
        accountId: '1707231234140390800',
        avatar: 'images/recommend/female/3/70.png',
      },{
        name: '小骚总',
        accountId: '1708041833393970767',
        avatar: 'images/recommend/female/3/80.png',
      },{
        name: '轩辕三爷',
        accountId: '1708011615147020597',
        avatar: 'images/recommend/female/3/90.png',
      },{
        name: '风中追',
        accountId: '1707211516233280058',
        avatar: 'images/recommend/female/3/100.png',
      }],
    },
  }
  init()
})(window)
