// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo:{},//这个是公有的保存图片的数组
  GoodsshopInfo:{},//这个是购物车的对象
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取到具体的商品传过来的id
    console.log(options.goods_id);
    //根据id进行异步请求
    this.getdetails(options.goods_id);
  },
  getdetails(goods_id) {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: { goods_id: goods_id }
    }).then(res => {
      //把轮播图单独保存起来
      this.GoodsInfo = res.data.message.pics;
      //保存在专门公用的对象中
      this.GoodsshopInfo = res.data.message;
      this.setData({
        goodsObj: {
          goods_id :res.data.message.goods_id,
          goods_name: res.data.message.goods_name,
          goods_price: res.data.message.goods_price,
          goods_introduce: res.data.message.goods_introduce.replace(
            /\.webp/g,
            ".jpg"
          ),
          pics: res.data.message.pics
        }
      });
    });
  },
  handlePrevewImage(e){  //点击轮播图然后放大预览
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.map(v => v.pics_mid);
    // 2 接收传递过来的图片url这个参数就是你要具体放大的图片
    const current = e.currentTarget.dataset.url;
    //这个就是微信点击图片放大观看的
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd(){//点击加入购物车事件
    //我们先查询缓存 购物车中有没有该数据，如果有该数据那么就让这条数据的数量+1
    //如果购物车中有这条数据 就获取没有的话就是一个空字符串
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id == this.GoodsshopInfo.goods_id);
    if(index==-1){
      //说明是第一次加入购物车
      this.GoodsshopInfo.num = 1;
      //加入购物车的时候要加一个选项框的状态，默认是false
      this.GoodsshopInfo.Checked = true;
      this.GoodsshopInfo.checked = true;
      cart.push(this.GoodsshopInfo);
      // 6 弹窗提示
     wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });

    }else{
      //说明购物车中已经有这条数据了
      // 4 已经存在购物车数据 执行 num++
      wx.showToast({
        title: '您已经加入过购物车了',
        icon: 'success',
        // true 防止用户 手抖 疯狂点击按钮 
        mask: true
      });
      cart[index].num++;
    }
    console.log(cart)
     // 5 把购物车重新添加回缓存中
     wx.setStorageSync("cart", cart);
     
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
