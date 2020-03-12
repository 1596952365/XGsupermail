export  const request=(paramis)=>{
    return new Promise((resove,catc)=>{
        wx.request({
            ...paramis,
            success(res){
                resove(res)
            },fail() {
                catc(res)
            }
           
        })

    })
}

//封装网络组件 方便后期直接调用