let num = 0;  //有可能会有多次异步请求所以进行判断是几次
export  const request=(paramis)=>{
    num ++;
    //只要发送网络请求就显示正在加载数据
    wx.showLoading({
        title: "正在加载数据",
        mask: true,
        
    });
    return new Promise((resove,catc)=>{
        wx.request({
            ...paramis,
            success(res){
                resove(res)
            },fail() {
                catc(res)
            },complete() {
                num--;
                if(num==0){  //每次执行都会减一等到没有数据的时候再关闭这个加载
                    wx.hideLoading();
                }  
            }
           
        })

    })
}

//封装网络组件 方便后期直接调用