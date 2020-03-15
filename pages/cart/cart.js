// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: [], //保存用户的地址
    cart: [], //保存用户购物车中的商品
    allChecked: false, //是否全选，默认不是全选
    totalPrice: 0, //商品总价格
    totalNum: 0 //商品总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //首先在这里面判断有没有拿到用户的地址缓存
    let address = wx.getStorageSync("address");
    this.setData({
      address
    });
    //如果有缓存的话就展示用户的缓存
    // 1 获取缓存中的购物车数据
    //获取用户加入到购物车中的缓存  注意要放到show里面便于刷新
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
  },
  //计算和全选方法
  setCart(cart) {
    //拿到缓存的数据之后我们需要遍历循环这个是不是为true如果为true就是全选，只要有一个不是true就不是全选

    //三目运算符 如果购物车的数组有值就进行判断购物车是不是全都被选中，如果购物车为空就默认为不全选
    let allChecked = false;
    let totalPrice = 0; //商品总价格
    let totalNum = 0; //商品总数量
    //计算商品的总价格
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
        allChecked = true;
      } else {
        allChecked = false;
      }
    });

    this.setData({
      cart,
      allChecked: allChecked,
      totalPrice,
      totalNum
    });
  },
  //点击商品上面的复选款
  handeItemChange(e) {
    //1.需要把缓存和数据中的checked取反
    let cart = this.data.cart;
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //从购物车的对象中找到这个商品的id
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    //把修改之后的数据重新放回到对象和缓存中
    this.setData({
      cart
    });
    wx.setStorageSync("cart", cart);
    //r然后重新计算数值
    this.setCart(cart);
  },
  //点击全选进行选择 让所有的购物车中的状态进行取反
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => {
      v.checked = allChecked;
    });
    //最后使所有的数据增加到data中
    //直接调配用封装的方法进行新的计算
    this.setCart(cart);
  },
  //点加或者减进行计算
  handleItemNumEdit(e) {
    //获取前台传过来的点击的商品id和加数
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    //找到操作的这个商品的下标
    const index = cart.findIndex(v => v.goods_id === id);
    cart[index].num += operation;
    if (cart[index].num == 0) {
      wx.showModal({
        title: "",
        content: "您是否要删除此商品？",
        success: res => {
          if (res.confirm) {
            console.log("我能进得来");
            cart.splice(index, 1);
            this.setCart(cart);
          }
        }
      });
    } else {
      //最后再把计算完的结果放回到对象中进行计算
      this.setCart(cart);
    }
  },
  //点击去结算之后跳转事件
  handlePay(){
    //首先判断用户有没有填入地址和有没有商品没有被选中
    //判断数量是不是为空
    const {address,totalNum,cart} = this.data;
    if(!address){
      wx.showModal({
        content: '您的地址还未选择'
      })
      return;
    }
    if(totalNum==0){
      wx.showModal({
        content: '您没有选择任何商品'
      })
      return;
    }
    //跳走前再把数据加到缓存中
    wx.setStorageSync('cart', cart);
    //如果条件全都满组了那么就跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    });

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
  onShareAppMessage: function() {},
  handleChooseAddress() {
    //用户点击获取获取用户地址
    wx.getSetting({
      success: result => {
        console.log(result);
        //获取用户地址的状态
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress == true || scopeAddress == undefined) {
          wx.chooseAddress({
            success: address => {
              // 5 存入到缓存中
              address.all =
                address.provinceName +
                address.cityName +
                address.countyName +
                address.detailInfo;
              wx.setStorageSync("address", address);
            }
          });
        } else {
          wx.openSetting({
            success: result => {
              wx.chooseAddress({
                success: address => {
                  address.all =
                    address.provinceName +
                    address.cityName +
                    address.countyName +
                    address.detailInfo;
                  wx.setStorageSync("address", address);
                }
              });
            }
          });
        }
      }
    });
  }
});
