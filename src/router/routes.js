module.exports = [
  {
    path: '/pages/index/index',
    name: 'index',
    config: {
      enablePullDownRefresh: true,
      usingComponents: {
         "i-button" : "../../iView/button/index",
         "van-button": "../../Vant/button/index"
      }
    }
  },
  {
    path: 'pages/topic/topic',
    name: 'topic',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '专题'
    }
  },
  {
    path: 'pages/catalog/catalog',
    name: 'catalog',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '分类'
    }
  },
  {
    path: 'pages/ucenter/index',
    name: 'ucenter',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '个人中心'
    }
  },
  // 上面5个是tabBar
  
]
