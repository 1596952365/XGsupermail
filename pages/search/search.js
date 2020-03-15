// pages/search/search.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],//保存搜索出来的商品
    inpValue:'',//文本上显示的值
    isFocus:false   //对于取消按钮的展示和隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  TimeId: -1, //设置定时器
  //点击搜索按钮开始搜索
  handleInput(e){
    console.log(e.detail.value)
    const {value}=e.detail;
    //如果现在搜索框是空的那么就让取消按钮隐藏
    if(!value.trim()){
     this.setData({
      isFocus:false,
      goods:[]
     })
    }else{
      this.setData({
        isFocus:true
       })
    }
        let query = e.detail.value;
        //开启一个定时器进行防抖处理
        clearTimeout(this.TimeId);
        this.TimeId=setTimeout(() => {
            request({
                url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
                data:{query:query}
            }).then(res=>{
                this.setData({
                    goods: res.data.message
                });
                console.log(this.data.goods)
            })
        }, 500);

  },
  //点击取消按钮
  handleCancel(){
    //需要所有的信息都清空
    this.setData({
      isFocus:!this.isFocus,
      goods:[],
      inpValue:''
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