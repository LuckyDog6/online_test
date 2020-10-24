//Page Object
Page({
  data: {
    index: 0,
    imglist: [{
        "id": 1,
        "url": "/images/test-1.jpg"
      },
      {
        "id": 2,
        "url": "/images/test-2.jpg"
      },
      {
        "id": 3,
        "url": "/images/test-3.jpg"
      },
    ],
    session: '请选择课程',
    array: [
      ["单选", "多选"],
      ["文学", "数学", "英语", "历史"]
    ],
    isnull: [],
    multiIndex: [0, 0],
    url: ''
  },
  // 拿到所选题的文字信息
  sessionChange(e) {
    this.setData({
      session: this.data.array[0][e.detail.value[0]] + '' + this.data.array[1][e.detail.value[1]],
      isnull: e.detail.value
    })

  },
  // 根据列不同替换数组
  colChange(e) {
    var array1 = this.data.array
    if (e.detail.column == 0 && e.detail.value == 1) {
      array1[1] = ["文学", "地理", "生物", "历史"]
    } else if (e.detail.column == 0 && e.detail.value == 0) {
      array1[1] = ["文学", "数学", "英语", "历史"]
    }
    this.setData({
      array: array1
    })
  },
  // 点击跳转页面
  click() {

    if (this.data.isnull.length === 0) {
      wx.showModal({
        title: '',
        content: '请选择课程',
      })
    } else {
      // this.data.isnull 是选的题目的数组
      if (this.data.isnull.toString() === [0, 0].toString()) {
        wx.navigateTo({
          url: '/pages/s_chinese/s_chinese'
        });
      } else if (this.data.isnull.toString() === [0, 1].toString()) {
        wx.navigateTo({
          url: '/pages/s_math/s_math'
        });
      } else if (this.data.isnull.toString() === [0, 2].toString()) {
        wx.navigateTo({
          url: '/pages/s_english/s_english'
        });
      } else if (this.data.isnull.toString() === [0, 3].toString()) {
        wx.navigateTo({
          url: '/pages/s_history/s_history'
        });
      } else if (this.data.isnull.toString() === [1, 0].toString()) {
        wx.navigateTo({
          url: '/pages/m_chinese/m_chinese'
        });
      } else if (this.data.isnull.toString() === [1, 1].toString()) {
        wx.navigateTo({
          url: '/pages/m_geography/m_geography'
        });
      } else if (this.data.isnull.toString() === [1, 2].toString()) {
        wx.navigateTo({
          url: '/pages/m_biology/m_biology'
        });
      } else if (this.data.isnull.toString() === [1, 3].toString()) {
        wx.navigateTo({
          url: '/pages/m_history/m_history'
        });
      }
    }
  },
  //options(Object)
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap: function(item) {

  }
});