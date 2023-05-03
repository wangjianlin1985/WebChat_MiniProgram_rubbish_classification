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
  },

  onLoad: function () {

  },
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that = this;
    var prefix = e.detail.value
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      wx.request({
        url: util.TXAPI_BASE_URL + '/txapi/lajifenlei/', //垃圾分类接口
        data: {
          key: util.TXAPI_KEY,
          word: prefix
        },
        success: function (res) {
          if (res.data.code == 200) {
            let temp_data = res.data.newslist;
            var newSource = res.data.newslist.concat(temp_data)
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
    }
  },
  query: function (e) {
    var that = this;
    var s = this.data.bindSource[e.target.id]
      that.setData({
          name: s.name,
        type: s.type,
        explain: s.explain,
        contain: s.contain,
        tip: s.tip,
        inputValue: s.name,
        hideScroll: true,
        bindSource: []
        })
  }
})
