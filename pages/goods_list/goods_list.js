import {request} from "../../request/index"

// pages/goods_list/goods_list.js
Page({
  /**
   * 页面的初始数据
   */
  QueryParams: {
    //请求搜索详情的页面需要的参数
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages:1,  //总页数
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "推荐",
        isActive: false
      }
    ],goodsList: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.cid);
    this.QueryParams.cid = options.cid;
    //根据页面传过来的下标值请求后台的数据
    this.getsearch();
  },
  tabsItemChange(e) {
    //获取组件传过来的下标值
    console.log(e);
    let num = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach(element => {
      if (element.id == num) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }
    });
    this.setData({
      tabs
    });
  },
  getsearch() { //获取商品的详情数据
    
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: this.QueryParams
    }).then(res => {
      console.log(res);
      this.setData({
        goodsList:res.data.message.goods
      })
      //第一次请求的时候获取总数量 然后出于每页的数量得到总页数
       //得到总页数
       this.totalPages = Math.ceil(res.data.message.total/this.QueryParams.pagesize);
       // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
  wx.stopPullDownRefresh();
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
  onPullDownRefresh() {
  //监听到用户下拉刷新，然后清空数据，清空页数，然后重新请求
  this.setData({
    goodsList:[]
  })
  this.QueryParams.pagenum = 1;
  this.getsearch();
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("触底")
    //触底之后 进行请求下一页数据 需要总数/每页显示的数得到总页数
    
    this.QueryParams. pagenum++;
    if(this.totalPages<=this.QueryParams. pagenum){
      wx.showToast({ title: '已经到底了哦。。。。' });
    }else{
      request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
        data: this.QueryParams
      }).then(res => {
        console.log(res);
        this.setData({
          goodsList:
          [...this.data.goodsList,...res.data.message.goods]
        })
       console.log(this.data.goodsList)
      });
    }
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
