import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)

const app = new Vue({
  store,
  ...App
})
app.$mount()
Vue.prototype.globalData = getApp().globalData
export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/index/index'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '职位',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
      'enablePullDownRefresh': true
    },
    tabBar: {
      'backgroundColor': '#fafafa',
      'borderStyle': 'white',
      'selectedColor': '#71BCFC',
      'color': '#D0D0D0',
      'list': [{
        'pagePath': 'pages/index/index',
        'iconPath': 'static/images/zhiwei1@2x.png',
        'selectedIconPath': 'static/images/zhiwei2@2x.png',
        'text': '职位'
      },
      {
        'pagePath': 'pages/topic/onestep',
        'iconPath': 'static/images/fabu1@2x.png',
        'selectedIconPath': 'static/images/fabu2@2x.png',
        'text': '发布'
      },
      {
        'pagePath': 'pages/catalog/catalog',
        'iconPath': 'static/images/xiaoxi1@2x.png',
        'selectedIconPath': 'static/images/xiaoxi2@2x.png',
        'text': '消息'
      },
      {
        'pagePath': 'pages/ucenter/index',
        'iconPath': 'static/images/wode1@2x.png',
        'selectedIconPath': 'static/images/wode2@2x.png',
        'text': '我的'
      }
      ]
    }
  },
  'networkTimeout': {
    'request': 10000,
    'downloadFile': 10000
  },
  'debug': true
}
