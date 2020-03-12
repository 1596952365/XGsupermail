import {request} from "../../request/index"
Page({
  data:{
    swiperList:[],//轮播图
    catesList:[],//导航
    floorList:[]  //楼层
  },
  
  onLoad(options){
    // 获取轮播图的信息
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(res=>{
      // console.log(res)
      const swiperList = res.data.message
      this.setData({
        swiperList:swiperList
      })
    })
    //获取导航栏的信息
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(res=>{
      const catesList = res.data.message
      this.setData({
        catesList:catesList
      })
    })
    //获取楼层
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(res=>{
      const floorList = res.data.message
      this.setData({
        floorList:floorList
      })
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
 
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})