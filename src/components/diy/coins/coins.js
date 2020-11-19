const App = getApp();
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    itemIndex: String,
    itemStyle: Object,
    params: Object,
    dataList: Object
  },

  methods: {

    /**
     * 查看收益
     */
    navigationTo: function(e) {
      App.navigationTo(e.currentTarget.dataset.url);
    }

  }

})