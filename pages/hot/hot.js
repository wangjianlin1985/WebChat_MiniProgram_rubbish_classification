//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()
var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
var arrayHeight = 0;
Page({
  data: {
    inputValue: '',
    bindSource: [],
    hideScroll: true,
    isSelect:false,//展示类型？
    types:['可回收垃圾','有害垃圾','厨余湿垃圾','其他干垃圾'],//垃圾类型
    type:"",//垃圾类型 
  },
  //点击控制下拉框的展示、隐藏
  select:function(){
    var isSelect = this.data.isSelect
    this.setData({ isSelect:!isSelect})
  },
  
  //点击下拉框选项，选中并隐藏下拉框
  getType:function(e){
    let value = e.currentTarget.dataset.type
    let type = null;
    if(value == '可回收垃圾') type = 0;
    if(value == '有害垃圾') type = 1;
    if(value == '厨余湿垃圾') type = 2;
    if(value == '其他干垃圾') type= 3;

    this.setData({
      type:value ,
      isSelect: false,
    })

    var that = this;
    var curDate = new Date(); 
    wx.request({
      url: util.TXAPI_BASE_URL + '/txapi/hotlajifenlei/index', //垃圾分类热榜接口
      data: {
        key: util.TXAPI_KEY,
        type: type,
        date: new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
      },
      success: function (res) {
        if (res.data.code == 200) {
          var newSource = res.data.newslist
          that.setData({
            hideScroll: false,
            bindSource: newSource,
            arrayHeight: newSource.length * 71
          })
        } else {
          console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n接口详情：https://www.tianapi.com/apiview/97')
          wx.showModal({
            title: '垃圾分类',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          that.setData({
            hideScroll: true,
            bindSource: []
          })
        }
      }
    })

  },


  onLoad: function () {
    var that = this;
   
  },
})
