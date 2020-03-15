// pages/auth/auth.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
     //这个就是获取用户的code
  },
  code:"",
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  handleGetUserInfo(e) {
    console.log(e.detail)
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 2 获取小程序登录成功后的code
    wx.login({
      success: code => {
    //let code =this.data.code;
    //请求后台的数据接口获得token
    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code: code 
    };
    console.log(loginParams)
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin",
      data: loginParams,
      method: "post"
    }).then(res => {
      // 4 把token存入缓存中 同时跳转回上一个页面
      console.log(res+33333333)
      wx.setStorageSync("token", res);
      wx.navigateBack({
        delta: 1
      });
    });
      }
    });
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
