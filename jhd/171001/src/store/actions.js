import store from './index'

let tipsTimer = 0
export function tips(text, s = 2000) {
  clearTimeout(tipsTimer)

  store.tipsInfo = { text }
  tipsTimer = setTimeout(() => {
    store.tipsInfo = null
  }, s)
}

export function confirm(text) {
  return new Promise((resolve, reject) => {
    async function okFn() {
      await resolve()
      store.confirmInfo = null
    }
    async function cancelFn() {
      await reject()
      store.confirmInfo = null
    }
    let info = {
      okFn,
      cancelFn,
      cacelText: '取消',
      okText: '确定',
    }
    if (typeof text === 'string') {
      info.text = text
    } else {
      info = {
        ...info,
        ...text,
      }
    }
    store.confirmInfo = info
  })
}
