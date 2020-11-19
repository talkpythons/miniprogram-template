let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    info: null,
    disabled: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 表单提交
   */
  saveData: function(e) {
    let _this = this,
      values = e.detail.value
    // 记录formId
    App.saveFormId(e.detail.formId);    
    // 表单验证
    if (values.money < 50000 || values.money >= this.data.info.spare ) {
      App.showError('认购金额最低五万');
      return false;
    }
    // 按钮禁用
    _this.setData({
      disabled: true
    });
    wx.navigateTo({
      url: `./create?money=${values.money}&percent=${values.money * 100 / this.data.info.total}`
    })
  },

  getSubscribeInfo() {
    const _this = this;
    App._get('user.subscribe/lists', {}, function(result) {
      if (result.code === 1) {
        const data = result.data;
        data.subscribe['spare'] = data.subscribe.total;
        const list = data.list.map(item => {
          item['date'] = String(item.create_time.split(' ')[0]).replace(/\-/g, '/');
          const tmp = item['name'].split('');
          tmp[1] = '*'
          item['name'] = tmp.join('');
          item['precent'] = parseInt(item.money) * 100 / data.subscribe.total;
          data.subscribe['spare'] -= parseInt(item.money);
          return item;
        })
        _this.setData({
          list,
          info: data.subscribe
        })
      }
    });
  },

  onShow() {
    this.getSubscribeInfo()
  }

})