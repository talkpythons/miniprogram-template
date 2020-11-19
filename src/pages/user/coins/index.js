const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isLoading: true,
    userInfo: null,
    coinsInfo: null,
    coins: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    // 获取虚拟币信息
    _this.getCoinsInfo();
  },

  /**
   * 获取虚拟币信息
   */
  getCoinsInfo() {
    let _this = this;
    App._get('user.coins/index', null, result => {
      if (result.code === 1) {
        _this.setData({
          userInfo: result.data.userInfo,
          coins: result.data.coins,
          coinsInfo: result.data.setting
        })
        wx.setNavigationBarTitle({
          title: result.data.setting.coins_name
        });
      }
    });
  },

  toDetail() {
    wx.navigateTo({
      url: './detail'
    })
  },

  toWithDraw() {
    wx.navigateTo({
      url: './withdraw'
    })
  }

})