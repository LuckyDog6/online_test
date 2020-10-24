import {
  request
} from "../../request/index.js";
// 小程序不支持ES7语法async 需要引入外部文件
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 课程信息
    titles: [],
    index: 0,
    // 控制答题区的显示与影藏
    condition: false,
    // 答题数组
    answer: [],
    isselect: '',
    // checkbox事件的值
    a: [],
    // 判断是否选题
    isnull: true,
    // 标准答案
    yes: [],
    // 得分
    score: 0,
    // 控制得分区域的显示与隐藏
    showScore: true,
    url: "/pages/m_chinese/m_chinese",
    // 消除checkbox默认选中的影响  并记住答题者选项
    checked_a: false,
    checked_b: false,
    checked_c: false,
    checked_d: false,
    // 拿到选项值
    xxx: "",
    // 控制查看错误的显示与隐藏
    error: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDataList()
  },
  // 异步获取接口文件  已用promise封装
  async getDataList() {
    var data = await request({
      url: "/m_chinese/getAll"
    });
    this.data.titles = data
    this.setData({
      titles: data['data']
    })

  },
  // 监听checkboxChange事件
  checkboxChange(e) {
    // 赋给全局变量 以便后续使用
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
  // 点击下一题事件
  next() {
    // 数组存取所答选项
    if (this.data.a != "") {
      this.setData({
        answer: this.data.answer.concat([this.data.a])
      })
    }
    // 循环数组
    if (this.data.index < 9) {
      this.setData({
        index: this.data.index + 1
      })
    } else {
      this.setData({
        condition: true
      })
    }
    // 判断是否选择答案
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
    // 记住上一题选项
    this.setData({
      checked_a: this.data.xxx.includes(this.data.titles[this.data.index].select_a),
      checked_b: this.data.xxx.includes(this.data.titles[this.data.index].select_b),
      checked_c: this.data.xxx.includes(this.data.titles[this.data.index].select_c),
      checked_d: this.data.xxx.includes(this.data.titles[this.data.index].select_d)
    })
    // 修改上一题选项
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
  // 点击上一题事件
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
  // 提交按钮事件
  submit() {
    if (this.data.a != null) {
      this.setData({
        answer: this.data.answer.concat([this.data.a])
      })
    }
    // 获取正确答案
    for (var i = 0; i < this.data.titles.length; i++) {

      // 
      var y = this.data.titles[i].answer
      this.setData({
        yes: this.data.yes.concat([this.data.titles[i].answer])
      })
    }
    // 计算测试分数
    for (var j = 0; j < this.data.answer.length; j++) {
      // 多选题答题顺序的解决
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
  // 查看错误事件
  error() {
    this.setData({
      error: false,
      showScore: true
    })
    this.setData({
      condition: false
    })
  },
  // 退出查看错误事件
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