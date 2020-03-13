// pages/category/category.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    currentIndex: 0, //这个是左侧选项框的下标值
    scrollTop: 0   //这个就是判断y轴的水平位置
  },
  // 接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //请求分类页面的数据
    //获取用户存储的缓存数据
    const cats = wx.getStorageSync("cats");
    if (!cats) {
      this.getrequest(); //缓存为空的直接获取新的数据
    } else {  //判断数据有没有超时
      if(Date.now()-cats.time<1000*10){
        this.getrequest();
      }else{
        console.log("我使用的是旧的数据")
          this.Cates = cats.data;
          let leftMenuList = this.Cates.map(v => v.cat_name);
          let rightContent = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightContent
          });
      }
    }
  },
  handleItemTap(e) {
    //点击左侧的选项加载不同的数据进行展示
    let index = e.currentTarget.dataset.index;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    });
  },
  getrequest() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res => {
      console.log(res);
      this.Cates = res.data.message;
      //把查询出来对的数据放到缓存里面
      wx.setStorageSync("cats", { time: Date.now(), data: this.Cates });
      let leftMenuList = res.data.message.map(v => v.cat_name);
      let rightContent = res.data.message[0].children;
      this.setData({
        leftMenuList,
        rightContent
      });
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});
