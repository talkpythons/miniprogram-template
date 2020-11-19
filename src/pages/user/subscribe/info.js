let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    percent: 0,
    infoText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  getSubscribeInfo() {
    const _this = this;
    App._get('user.subscribe/info', {}, function(result) {
      if (result.code === 1) {
        const data = result.data;
        let text = '';
        if (data.total > 0) {
          text = '感谢呵护，宠爱平台与您共同发展。'
        } else {
          text = '感谢您的关注和支持，\n您尚未购买股份成为股东哦。'
        }
        _this.setData({
          total: data.total,
          info: data.subscribe,
          percent: data.total * 100 / data.subscribe.total,
          infoText: text
        })
      }
    });
  },

  onShow() {
    this.getSubscribeInfo()
  }

})