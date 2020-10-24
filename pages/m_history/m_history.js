import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: [],
    index: 0,
    condition: false,
    answer: [],
    isselect: '',
    a: [],
    isnull: true,
    yes: [],
    score: 0,
    showScore: true,
    url: "/pages/m_history/m_history",
    checked_a: false,
    checked_b: false,
    checked_c: false,
    checked_d: false,
    xxx: "",
    error: true,
    clazz: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDataList()
  },
  async getDataList() {
    var data = await request({
      url: "/m_history/getAll"
    });
    this.data.titles = data
    this.setData({
      titles: data['data']
    })

  },
  checkboxChange(e) {
    this.data.a = e.detail.value

    if (e.detail.value.length !== 0) {
      this.setData({
        isnull: false
      })
    } else {
      this.setData({
        isnull: true
      })
    }

  },
  next() {
    if (this.data.a != "") {
      this.setData({
        answer: this.data.answer.concat([this.data.a])
      })
    }
    if (this.data.index < 9) {
      this.setData({
        index: this.data.index + 1
      })
    } else {
      this.setData({
        condition: true
      })
    }

    if (this.data.answer[this.data.index] == null) {
      this.setData({
        isnull: true
      })
    }
    this.setData({
      xxx: this.data.answer[this.data.index]
    })
    // this.data.xxx == undefined ? "" : this.data.xxx
    if (this.data.xxx == undefined) {
      this.setData({
        xxx: ""
      })
    } else {
      this.setData({
        xxx: this.data.xxx
      })
    }

    this.setData({
      checked_a: this.data.xxx.includes(this.data.titles[this.data.index].select_a),
      checked_b: this.data.xxx.includes(this.data.titles[this.data.index].select_b),
      checked_c: this.data.xxx.includes(this.data.titles[this.data.index].select_c),
      checked_d: this.data.xxx.includes(this.data.titles[this.data.index].select_d)
    })
    if (this.data.answer[this.data.index] != null && this.data.a != "") {
      this.data.answer.splice(this.data.index - 1, 1)
      this.setData({
        answer: this.data.answer
      })
    }
    this.setData({
      isselect: false
    })
    this.data.a = []

  },
  previous() {

    this.setData({
      a: []
    })
    if (this.data.answer[this.data.index] != "") {
      this.setData({
        isnull: false
      })
    }
    if (this.data.index > 0) {
      this.setData({
        index: this.data.index - 1
      })
    } else {
      this.setData({
        condition: true
      })
    }

    this.setData({
      checked_a: this.data.answer[this.data.index].includes(this.data.titles[this.data.index].select_a),
      checked_b: this.data.answer[this.data.index].includes(this.data.titles[this.data.index].select_b),
      checked_c: this.data.answer[this.data.index].includes(this.data.titles[this.data.index].select_c),
      checked_d: this.data.answer[this.data.index].includes(this.data.titles[this.data.index].select_d),
    })

  },
  submit() {
    if (this.data.a != null) {
      this.setData({
        answer: this.data.answer.concat([this.data.a])
      })
    }
    // 
    for (var i = 0; i < this.data.titles.length; i++) {

      // 
      var y = this.data.titles[i].answer
      this.setData({
        yes: this.data.yes.concat([this.data.titles[i].answer])
      })
    }

    for (var j = 0; j < this.data.answer.length; j++) {
      if (this.data.answer[j].sort().toString() == this.data.yes[j].split(",").sort().toString()) {
        this.setData({
          score: this.data.score + 10
        })
      }
    }

    this.setData({
      condition: true
    })
    this.setData({
      showScore: false
    })
  },
  error() {
    this.setData({
      error: false,
      showScore: true
    })
    this.setData({
      condition: false
    })
  },
  exit() {
    this.setData({
      error: true
    })
    this.setData({
      showScore: false
    })
    this.setData({
      condition: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})