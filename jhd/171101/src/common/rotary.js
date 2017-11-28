export default function (options, elList) {
  const opts = Object.assign({
    className: 'current',
    duration: 80,
    decreasingDuration: 6,
    animateTo: null, // ·
    turnsNumbe: 4, // 转多少圈 开奖
    stepCallBack: false,
    callback: false,
  }, options)

  if (elList.length <= 1) return false

  for (let i = 0; i < elList.length; i++) {
    elList[i].classList.remove(opts.className)
  }

  var duration = opts.duration,
    initIndex = 0,
    initTurns = 1,
    isLastTurn = false,
    isLastIndex = false

  function animateTo(index) {
    if (opts.stepCallBack) {
      opts.stepCallBack(initIndex)
    } else {
      elList[initIndex].classList.add(opts.className)
      let prveEl = elList[initIndex - 1]
      if (initIndex === 0) {
        prveEl = elList[elList.length - 1]
      }
      if (prveEl) {
        prveEl.classList.remove(opts.className)
      }
    }

    isLastTurn = (initTurns === opts.turnsNumbe)

    if ((isLastTurn) && (initIndex === index)) {
      // 结束
      setTimeout(function () {
        opts.callback && opts.callback.call()
      }, 1000)
    } else {
      // 继续
      isLastIndex = initIndex === elList.length - 1
      initTurns = isLastIndex ? (initTurns + 1) : initTurns
      initIndex = isLastIndex ? 0 : initIndex + 1

      // duration = isLastTurn ? (duration + opts.decreasingDuration) : duration;
      duration += opts.decreasingDuration

      setTimeout(function () {
        animateTo(index)
      }, duration)
    }
  }

  animateTo(opts.animateTo)
}
