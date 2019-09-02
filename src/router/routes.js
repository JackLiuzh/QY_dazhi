module.exports = [
  
  {
    path: 'pages/index/login',
    name: 'index_login',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: 'login'
    }
  },
  {
    path: 'pages/index/search',
    name: 'index_search',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '企业搜索',
      usingComponents: {
        "van-search": "../../Vant/search/index",
     }
    }
  },
  {
    path: 'pages/ucenter/index',
    name: 'ucenter',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '我的'
    }
  },
  {
    path: '/pages/index/index',
    name: 'index',
    config: {
      enablePullDownRefresh: false,
      usingComponents: {
         "van-button": "../../Vant/button/index",
      }
    }
  },
  
  
  {
    path: '/pages/index/company_detail',
    name: 'index_company_detail',
    config: {
      enablePullDownRefresh: false,
      navigationBarTitleText: '公司详情'
    }
  },
  {
    path: 'pages/ucenter/switchme',
    name: 'ucenter_swithcme',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '管理转让'
    }
  },
  {
    path: 'pages/ucenter/member',
    name: 'ucenter_member',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '企业人员管理'
    }
  },
  {
    path: 'pages/ucenter/newevaluate',
    name: 'ucenter_newevaluate',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '新增评论'
    }
  },
  {
    path: 'pages/ucenter/allevaluate',
    name: 'ucenter_allevaluate',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '全部评价'
    }
  },
  {
    path: 'pages/ucenter/baseinfo',
    name: 'ucenter_baseinfo',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '基本信息',
      usingComponents: {
        "van-field": "../../Vant/field/index",
     }
    }
  },
  {
    path: 'pages/ucenter/edit_phone',
    name: 'ucenter_edit_phone',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '联系电话',
      usingComponents: {
        "van-field": "../../Vant/field/index",
     }
    }
  },
  {
    path: 'pages/ucenter/renzhen',
    name: 'ucenter_renzhen',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '资质认证',
      usingComponents: {
        "van-field": "../../Vant/field/index",
     }
    }
  },
  {
    path: 'pages/ucenter/feedback',
    name: 'ucenter_feedback',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '反馈',
      usingComponents: {
        "van-field": "../../Vant/field/index",
     }
    }
  },
  {
    path: 'pages/ucenter/setting',
    name: 'ucenter_feedback',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '反馈',
    }
  },
  {
    path: 'pages/index/record',
    name: 'index_record',
    config: {
      enablePullDownRefresh: false,
      // disableScroll:true,
    }
  },
  {
    path: 'pages/index/member',
    name: 'rejection_member',
    config: {
      enablePullDownRefresh: false,
      // disableScroll:true,
    }
  },
  {
    path: 'pages/index/rejection',
    name: 'index_rejection',
    config: {
      enablePullDownRefresh: false,
      // disableScroll:true,
    }
  },
  {
    path: 'pages/index/comdetail',
    name: 'index_comdetail',
    config: {
      enablePullDownRefresh: false,
      // disableScroll:true,
    }
  },
  {
    path: 'pages/index/check_evaluate',
    name: 'index_check_evaluate',
    config: {
      enablePullDownRefresh: false,
      // disableScroll:true,
      usingComponents: {
        "van-field": "../../Vant/field/index",
     }
    }
  },
  {
    path: 'pages/index/evaluate',
    name: 'index_evaluate',
    config: {
      enablePullDownRefresh: false,
      usingComponents: {
        "van-slider": "../../Vant/slider/index",
     }
    }
  },
  {
    path: 'pages/topic/topic',
    name: 'topic',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '发布'
    }
  },
  {
    path: 'pages/catalog/catalog',
    name: 'catalog',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '消息'
    }
  },
  {
    path: 'pages/index/middle',
    name: 'index_middle',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: ''
    }
  },
  
  // 上面5个是tabBar
  
  {
    path: 'pages/index/second',
    name: 'index_second',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '二级页面'
    }
  },
 
]
