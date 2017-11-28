const store = {
  ajaxLoading: 0,
  userInfo: {},
  tipsInfo: null,
  confirmInfo: null,
  giveGiftId:null,
  giveGiftName:null,
  myCp:null,
  timeLag: 0, // 本地时间与服务器时间的延迟
  endDate: new Date('2017/11/11 23:59:59').getTime(),
}
export default store
