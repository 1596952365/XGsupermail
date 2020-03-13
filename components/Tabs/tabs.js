// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      //获取到用户点击标签的index然后传到前台页面 修改前台页面的数据展示
     let index = e.currentTarget.dataset.index;
      // 2 触发 父组件中的事件 自定义
      this.triggerEvent("tabsItemChange",index);
     }
  }
})
