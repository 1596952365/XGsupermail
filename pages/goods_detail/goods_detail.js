// pages/goods_detail/goods_detail.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    //获取到具体的商品传过来的id
    console.log(options.goods_id)
    //根据id进行异步请求
    this.getdetails(options.goods_id);
  },
  getdetails(goods_id){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data:{goods_id:goods_id}
    }).then(res=>{
      
      this.setData({
          goodsObj:res.data.message
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