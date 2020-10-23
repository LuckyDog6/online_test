import { request } from "../../request/index.js";
// 小程序不支持ES7语法 需要引入外部文件
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    condition: false,
    answer: false,
    s_chinese:[],
    s_math:[],
    s_history:[],
    s_english:[],
    m_chinese:[],
    m_history:[],
    m_biology:[],
    m_geography:[],
    s_chi:true,
    s_mat:true,
    s_eng:true,
    s_his:true,
    m_chi:true,
    m_geo:true,
    m_bio:true,
    m_his:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 获取答案接口
  async getAnswer(){
    var data = await request({ url: "/answer" });
    this.setData({
      s_chinese:data.s_chinese,
      s_english:data.s_english,
      s_math:data.s_math,
      s_history:data.s_history,
      m_chinese:data.m_chinese,
      m_biology:data.m_biology,
      m_history:data.m_history,
      m_geography:data.m_geography
    })
    console.log(this.data.m_chinese)
  },
  getValue(e){
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  answer(e){
    console.log(this.data.password)
    if(this.data.password==='123456'){
      this.setData({
        condition:true
      })
      this.getAnswer()
    }else{
      wx.showModal({
        title: '',
        content: '密码错误',
      })
      this.setData({
        password: ''
      })
    }
  },
// 获取当前数据时将其他数据隐藏
s_chinese(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi:false,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
s_math(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: false,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
s_english(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: false,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
s_history(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: false,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
m_chinese(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: false,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
m_geography(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: false,
    m_bio: true,
    m_his: true
  })
},
m_biology(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: false,
    m_his: true
  })
},
m_history(e){
  console.log(e)
  this.setData({
    answer:true,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: false
  })
},

ret(){
  this.setData({
    answer: false,
    s_chi: true,
    s_mat: true,
    s_eng: true,
    s_his: true,
    m_chi: true,
    m_geo: true,
    m_bio: true,
    m_his: true
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})