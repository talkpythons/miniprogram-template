let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false, // 快捷导航

    money: 0,
    percent: 0,

    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      money: options.money,
      percent: options.percent
    })
  },

  /**
   * 表单提交
   */
  saveData: function(e) {
    let _this = this,
      values = e.detail.value
    values.money = this.data.money;

    // 记录formId
    App.saveFormId(e.detail.formId);

    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });

    // 提交到后端
    App._post_form('user.subscribe/submit', values, function(result) {
      if (result.code === 1) {
        App.wxPayment({
          payment: result.data.payment,
          success: res => {
            wx.showModal({
              title: '友情提示',
              content: '认购成功',
              showCancel: false,
              success(res) {
                wx.redirectTo({
                  url: '/pages/user/subscribe/info'
                });
              }
            });
  
          },
          fail: res => {
            App.showError(result.msg.error, () => {
              wx.navigateBack();
            });
          },
        });
      }
    }, false, function() {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });
  },

  /**
   * 表单验证
   */
  validation: function(values) {
    console.log(values)
    if (values.name === '') {
      this.data.error = '姓名不能为空';
      return false;
    }
    if (!values.idcard) {
      this.data.error = '身份证不得为空';
      return false;
    }
    if (values.idcard.length != 18) {
      this.data.error = '身份证不正确';
      return false;
    }
    if (!values.phone) {
      this.data.error = '手机号不能为空';
      return false;
    }
    if (values.phone.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }

    if (!values.email) {
      this.data.error = '邮箱不能为空';
      return false;
    }
    return true;
  },


})