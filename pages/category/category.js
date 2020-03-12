// pages/category/category.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
  },
 // 接口的返回数据
 Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //请求分类页面的数据
    request({
        url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res=>{
      console.log(res)
      this.Cates = res.data.message;
      let leftMenuList = res.data.message.map(v => v.cat_name);
      let rightContent = res.data.message[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
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