const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [], // 充值记录
    isLoading: true, // 是否正在加载中
    page: 1, // 当前页码
    dataType: 'coins',
    coinsData: {},
    incomeData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    // 设置列表容器高度
    _this.setListHeight();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    // 获取虚拟币明细列表
    _this.getCoinsLog();
    _this.getIncomeLog();
  },

  /**
   * 获取虚拟币明细列表
   */
  getCoinsLog(isPage, page) {
    let _this = this;
    App._get('user.coins/detail', {
      page: page || 1
    }, result => {
      let resList = result.data.list,
        dataList = _this.data.coinsData.data;
        if (isPage == true) {
          _this.setData({
            'coinsData.data': dataList.concat(resList.data),
            isLoading: false,
          });
        } else {
          _this.setData({
            coinsData: resList,
            isLoading: false,
          }, () => {
            _this.setData({
              lists: _this.data.coinsData.data
            })
          });
        }
    });
  },

  /**
   * 获取虚拟币收益明细列表
   */
  getIncomeLog(isPage, page) {
    let _this = this;
    App._get('balance.log/incomeLists', {
      page: page || 1,
      scene: 50
    }, result => {
      let resList = result.data.list,
      dataList = _this.data.incomeData.data;
      if (isPage == true) {
        _this.setData({
          'incomeData.data': dataList.concat(resList.data)
        });
      } else {
        _this.setData({
          incomeData: resList
        });
      }
    });
  },

  /**
   * 设置列表容器高度
   */
  setListHeight() {
    let _this = this,
      systemInfo = wx.getSystemInfoSync();
    _this.setData({
      scrollHeight: systemInfo.windowHeight * 0.98
    });
  },

  /**
   * 下拉到底加载数据
   */
  onPageDown() {
    let _this = this;
    // 已经是最后一页
    if (_this.data.page >= _this.data[`${_this.data.dataType}Data`].last_page) {
      return false;
    }
    if (this.data.dataType === 'coins') {
      _this.getCoinsLog(true, ++_this.data.page); 
    } else {
      _this.getIncomeLog(true, ++_this.data.page);
    }
  },


    /** 
   * 点击tab切换 
   */
  swichNav: function(e) {
    let _this = this;
    const type = e.target.dataset.current;
    _this.setData({
      'lists': _this.data[`${type}Data`].data,
      dataType: type
    });
  },

})