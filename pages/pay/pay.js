// pages/pay/pay.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组必须是全部选中的数据
    cart = cart.filter(v => v.checked);
    this.setData({ address });
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  //点击支付按钮之后
  handleOrderPay() {
    //首先需要从缓存中判断用户有没有授权，需要获取用户的token
    //如果用户没有授权我们需要用户跳转到授权页面进行授权
    const token = wx.getStorageSync("token");
    //如果没有这个token就进行跳转到授权页面
    console.log(token);
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/auth"
      });
    }
    //如果用户授权成功了就需要进行创建订单了
    // 3 创建订单
    // 3.1 准备 请求头参数
    const header = { Authorization: token };
    // 3.2 准备 请求体参数订单金额，地址，还商品详细信息
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address;
    const cart = this.data.cart;
    //从商品详细数据里面获得我们想要的数据
    let goods = [];
    cart.forEach(v =>
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      })
    );
    //把所有的数据总结成一个字段
    const orderParams = { order_price, consignee_addr, goods, header: header };
    // 4 准备发送请求 创建订单 获取订单编号
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create",
      method: "POST",
      data: orderParams
    }).then(res=>{
      console.log(res);
    })

    //nad
      // // 6 发起微信支付 
      // await requestPayment(pay);
      // // 7 查询后台 订单状态
      // const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
      // await showToast({ title: "支付成功" });
      // // 8 手动删除缓存中 已经支付了的商品
      // let newCart=wx.getStorageSync("cart");
      // newCart=newCart.filter(v=>!v.checked);
      // wx.setStorageSync("cart", newCart);
        
      // // 8 支付成功了 跳转到订单页面
      // wx.navigateTo({
      //   url: '/pages/order/index'
      // });
    
  },

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
