<template>
 <div class="container">
     <navBar :title="'新增评价'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
     ></navBar>
    <div style="width: 100%;">
        <div v-if="evaluate_list.length" v-for="(item,index) in evaluate_list" :key="index" class="con">
            <img :src="item.avatar"  class="con-img" />
            <div class="con-r">
                <div class="con-top">
                    <span class="con-top-l">
                        {{item.realname}}
                    </span>
                    <span class="con-top-r">
                        {{item.time}}
                    </span>
                </div>
                <div class="con-z">
                    兼职岗位：{{item.job_title}}
                </div>
                <div class="con-m">
                     {{item.content}}
                </div>
                <div v-if="item.pics" class="con-r-img">
                    <img src="/static/images/mybaoming_shop.png" />
                    <img src="/static/images/mybaoming_shop.png" />
                    <img src="/static/images/mybaoming_shop.png" />
                </div>
                <!--回复-->
                <div v-for="(item1,index1) in item.reply_list" class="con-r-huifu">
                <div class="con-time"> {{item1.time}} </div>
                        <div class="con-huifu">
                            <span class="con-huifu-l">{{item1.name}}：</span>
                            {{item1.msg}}
                        </div>
                </div>
                <div>
                    <input type="text" confirm-type="send" :data-eid="item.id" @confirm="huifuitext"  placeholder="  企业回复"  class="huifu"/>
                </div>

            </div>
        </div>
        <!--没有评论-->
        <div v-if="!evaluate_list.length" class="no-collect">
            <img   src="/static/images/wupingjia@2x.png"  class="no-collect-img" />
            <div class="no-collect-title">你目前没有评价回复</div>
            <a href="..//main">
                <div class="go-collect">返回</div>
            </a>
        </div>
    </div>
 </div>
</template>

<script>
  import navBar from '@/components/navigationBar'
  import api from '@/utils/api'
  export default {
     components: {
       navBar
    }, 
    computed: {

    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        platform: '',
        model: '',
        brand: '',
        system: '',
        
        evaluate_list:[]


      }
    },
    beforeMount () {
      const self = this
      wx.getSystemInfo({
        success (system) {
          console.log(`system:`, system)
          self.statusBarHeight = system.statusBarHeight
          self.platform = system.platform
          self.model = system.model
          self.brand = system.brand
          self.system = system.system

          let platformReg = /ios/i
          if (platformReg.test(system.platform)) {
            self.titleBarHeight = 44
          } else {
            self.titleBarHeight = 48
          }

          self.navBarHeight = self.statusBarHeight + self.titleBarHeight
        }
      })
    },
    mounted(){
        this.initlistbyid()
    },
    methods: {
      // 返回跳转
      back(){
        wx.navigateBack({
          delta: 1
        })
      },
      async initlistbyid(){
           const res = await api.ucenter_evaluate_list({corpid:2,new:true})
           if(res.code ==1){
               this.evaluate_list = res.data.evaluate_list
           }
      },
      async save_reply(eid,msg){
           const res = await api.ucenter_save_reply({eid:eid,msg:msg})
           if(res.code ==1){
              console.log("保存回复成功")
              this.initlistbyid()
           }else {
             console.log("保存回复失败")
           }
      },
      huifuitext(e){
          var msg = e.mp.detail.value
          var eid = e.mp.currentTarget.dataset.eid
          this.save_reply(eid,msg)
      },
    }
  }
</script>

<style>
  page{
    background-color: #f5f8f9;
  }
  .no-collect{
      padding: 200rpx 0 100rpx;
      background: #fff;
      height:100%;
      text-align: center;
  }
  .no-collect-img{
      width:514rpx;
      height:407rpx;
  }
  .no-collect-title{
      margin: 100rpx 0 140rpx;
      font-size:36rpx;
      font-weight:500;
      color:#000000;
  }
  .go-collect{
      color: #fff;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
      box-shadow:0px 2px 10px 0px rgba(46,155,255,0.5);
      border-radius:10x;
      margin: 0 30rpx;
      font-size: 29rpx;
  }
  .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0px;
      padding-bottom: 300rpx;
  }
  .search_title{
      width: 750rpx;
      height: 128rpx;
  }
  .back{
      width: 36rpx;
      height: 36rpx;
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      padding-left: 30rpx;
  }
  .search_bar{
      width: 100%;
      background-color:RGBA(0,0,0,0);
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .search_title_text{
      width: 100%;
      text-align: center;
      color: white;
      font-size:34rpx;
      margin-right: 61rpx;
  }
  .search_bar_title{
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
  }

  .search_bar_line{
      width: 100%;
  }
  .con{
      background: #fff;
      padding: 30rpx;
      display: flex;
      justify-content: flex-start;

  }
  .con-img{
      width: 80rpx;
      height: 80rpx;
      margin-right: 30rpx;
      border-radius: 40rpx;

  }
  .con-r{
      height: auto;
      flex-grow:1;
  }
  .con-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      vertical-align: top;
      height:50rpx;
  }
  .con-top-l{
      font-size:28rpx;
      font-weight:500;
      color:rgba(51,51,51,1);
  }
  .con-top-r{
      font-size:22rpx;
      font-weight:400;
      color:rgba(153,153,153,1);
  }
  .con-z{
      font-size:26rpx;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height: 80rpx;
  }
  .con-m{
      font-size:26rpx;
      font-weight:400;
      color:#333333;
      line-height: 50rpx;
  }
  .con-r-img{
     display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 20rpx 0;
  }
  .con-r-img img{
      width: 177rpx;
      height: 180rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
  }
  .con-r-huifu{
      border-top: 2rpx solid #F5F8F9;
      padding-top: 20rpx;
  }
  .con-time{
      color: #999999;
      font-size:22rpx;
      line-height: 50rpx;
  }
  .con-huifu{
      font-size: 26rpx;
      color: #333333;
  }
  .con-huifu-l{
      color: #2E9BFF;
  }
  .huifu{
      height: 70rpx;
      line-height: 70rpx;
      background-color: #F9F9F9;
      color: #999999;
      font-size: 26rpx;
      margin-top: 30rpx;
  }
</style>
