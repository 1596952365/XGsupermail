import { request } from "../../request/index";
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        goods:[]
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    TimeId : -1,
    inputTyping (e) {
        //点击输入搜索，然后获取用户输入的值
        //然后查询数据库

        
       
        
      
    }
});