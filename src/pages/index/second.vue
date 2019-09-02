<template>
 <div class="container">
     <navBar :title="title"
    :titleColor="'white'"
    :back-visible="true"
    ></navBar>
    <div style="width: 100%;">
        <div class="tabNav">
            <div :class="{'cur':tab === 1}"  @click="changTab(1)">
                全部
            </div>
            <div :class="{'cur':tab === 2}"  @click="changTab(2)">
                已报名
            </div>
            <div :class="{'cur':tab === 3}"  @click="changTab(3)">
                已录用
            </div>
            <div :class="{'cur':tab === 4}"  @click="changTab(4)">
                待结算
            </div>
            <div :class="{'cur':tab === 5}"  @click="changTab(5)">
                已完结
            </div>
        </div>
        <div class="info"  v-if="tab === 1">
            <div @tap="gotomember(item.uid)" class="info-item" v-for="(item,index) in listall" :key="index">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.name}}</div>
                    <div class="info-item-topright">2次兼职经验</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.age}}岁</span>学生 </div>
                <div class="info-jianzhi"><span class="price-day"><span style="font-size: 26rpx;color:#999999;">{{item.school_name}}</span></span>{{item.subject}}</div>
                <div v-if="item.status===(1 | 2)" class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">不适合</div>
                    <div class="lx-div" @tap="goevaluate()">录取</div>
                </div>
                <div v-else-if="item.status===3" class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">未就职</div>
                    <div class="lx-div" @tap="goevaluate()">已就职</div>
                </div>
                <div v-else-if="item.status===4" class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">结算</div>
                </div>
                <div v-else  class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-bg"></div>
                    <div v-if="(item.ifview===0 || item.ifview ===2)" class="lx-div" @tap="go_evaluate(item.uid)">去评价</div>
                    <div v-else class="lx-div" @tap="go_check_evaluate(item.uid)">查看评价</div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===2">
            <div class="info-item" v-for="(item,index) in baominglist" :key="index">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.name}}</div>
                    <div class="info-item-topright">已报名</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.age}}岁</span>学生 </div>
                <div class="info-jianzhi"><span class="price-day"><span style="font-size: 26rpx;color:#999999;">{{item.school_name}}</span></span>{{item.subject}}</div>
                <div class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">不适合</div>
                    <div class="lx-div" @tap="goevaluate()">录取</div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===3">
            <div class="info-item" v-for="(item,index) in luyonglist" :key="index">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.name}}</div>
                    <div class="info-item-topright">已录用</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.age}}岁</span>学生 </div>
                <div class="info-jianzhi"><span class="price-day"><span style="font-size: 26rpx;color:#999999;">{{item.school_name}}</span></span>{{item.subject}}</div>
                <div class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">未就职</div>
                    <div class="lx-div" @tap="goevaluate()">已就职</div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===4">
            <div class="info-item" v-for="(item,index) in jiesuanlist" :key="index">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.name}}</div>
                    <div class="info-item-topright">待结算</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.age}}岁</span>学生 </div>
                <div class="info-jianzhi"><span class="price-day"><span style="font-size: 26rpx;color:#999999;">{{item.school_name}}</span></span>{{item.subject}}</div>
                <div class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-div" @tap="tapModelShop">已结算</div>
                </div>
            </div>
        </div>
        <div class="info" v-else>            
            <div class="info-item" v-for="(item,index) in wanjielist" :key="index">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.name}}</div>
                    <div class="info-item-topright">已完结</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.age}}岁</span>学生 </div>
                <div class="info-jianzhi"><span class="price-day"><span style="font-size: 26rpx;color:#999999;">{{item.school_name}}</span></span>{{item.subject}}</div>
                <div class="info-lx">
                    <div class="lx-div" @tap="tapModelShop">联系学生</div>
                    <div class="lx-bg"></div>
                    <div v-if="(item.ifview===0 || item.ifview ===2)" class="lx-div" @tap="go_evaluate(item.uid)">去评价</div>
                    <div v-else class="lx-div" @tap="go_check_evaluate(item.uid)">查看评价</div>
                </div>
            </div>
        </div>
    </div>
     <!-- 联系商家弹出层 -->
     <div class="modalMask" v-if="isModel"></div>
     <div class="modalDialog" v-if="changeModel">
         <img src="/static/images/close.png" @tap="tapCancel" class="img-close">
         <img src="/static/images/mybaoming_shop.png"  class="img-set-phone" />
         <div style="font-size:28rpx;color: #666666;text-align: center;margin: 50rpx 0 50rpx;font-weight: 500;">商家HR联系人：王佳怡</div>
         <div class="modalContent">
             <div class="modal-r" style="width: 82%;">拨打电话</div>
         </div>
     </div>
     <!-- qq弹出层 -->
     <div class="modalDialog" v-if="changeQQModel">
         <img src="/static/images/close.png" @tap="tapCancel" class="img-close">
         <img src="/static/images/mybaoming_shop.png"  class="img-set-phone" />
         <div style="font-size:28rpx;color: #666666;text-align: center;margin: 50rpx 0 50rpx;font-weight: 500;">商家HR联系人：王佳怡</div>
         <div class="modalContent">
             <div class="modal-l">复制QQ</div>
             <div class="modal-r">拨打电话</div>
         </div>
     </div>
 </div>
</template>

<script>
// status 状态（1-已报名 2-已录用 3-待结算 4-已完结）
  import api from '@/utils/api' 
  import navBar from '@/components/navigationBar'
  // Use Vuex
  export default {
    components: {
     navBar
    },   
    computed: {

    },
    data () {
      return {
        tab:1,
        jobid:'',
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        platform: '',
        model: '',
        brand: '',
        system: '',
        isModel:false,
        changeModel:false,
        changeQQModel:false,
        
        listall:[],//全部数据
        baominglist:[],//已报名的数据
        luyonglist:[],
        jiesuanlist:[],
        wanjielist:[],
        title:'',//导航栏标题

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
        const name=this.$route.query.name
        const jobid = this.$route.query.jobid
        this.jobid = jobid
        if(name == '已报名'){
            this.tab = 2
            this.init(jobid,1)
        }else if(name == '已录用'){
            this.tab = 3
            this.init(jobid,2)
        }else if(name == '待结算'){
            this.tab = 4
            this.init(jobid,3)
        }else{
            this.init(jobid,'')
        }
    },
    methods: {
      async init(jobid,status=''){
          const res = await api.getstulistbystatus({jobid:jobid,status:status})
          if(res.code == 1){
              this.title = res.data.job_title
              if(status === 1){
                  this.baominglist = res.data.apply_users
              }else if(status === 2){
                  this.luyonglist = res.data.apply_users
              }else if(status === 3){
                  this.jiesuanlist = res.data.apply_users
              }else if(status === 4){
                  this.wanjielist = res.data.apply_users
              }else {
                  this.listall = res.data.apply_users
              }
          }
      },
      //去信息页
      gotomember(stuid){
        //   this.$router.push({path:'/pages/index/member',query:{jobid:this.jobid,stuid:stuid}})
          this.$router.push({path:'/pages/index/middle',query:{jobid:this.jobid,stuid:stuid}})
      },
      //去评价
      go_evaluate(stuid){
          this.$router.push({path:'/pages/index/evaluate',query:{jobid:this.jobid,stuid:stuid}})
      },
      //查看评价
      go_check_evaluate(stuid){
          this.$router.push({path:'/pages/index/check_evaluate',query:{jobid:this.jobid,stuid:stuid}})
      },
      goevaluate(){
        wx.navigateTo({
           url:'../index/evaluate'
        })
      },
      // 返回跳转
      back(){
        wx.navigateBack({
          delta: 1
        })
      },
      changTab(index) {
        this.tab = index;
        this.init(this.jobid,(index - 1))
      },
      //  弹框取消
      tapCancel(){
        this.changeModel = false;
        this.isModel = false;
        this.changeQQModel = false;
      },
      //联系商家
      tapModelShop () {
        this.changeModel = !this.changeModel;
        this.isModel = !this.isModel;
      },
      //联系商家 复制QQ
      tapModelShopQQ () {
        this.changeQQModel = !this.changeQQModel;
        this.isModel = !this.isModel;
      },
      //报名详情
      mydetailUrl(){
        wx.navigateTo({
          url: "../bmdetail/main"
        });
      },
      //评价详情
      pjdetailUrl(){
        wx.navigateTo({
          url: "../pjdetail/main"
        });
      },
      //去评价
      evaluationUrl(){
        wx.navigateTo({
          url: "../evaluation/main"
        });
      }
    }
  }
</script>

<style>
  page{
    background-color: #f5f8f9;
  }
  .container {
      /* height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0px;
      padding-bottom: 300rpx; */
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

  .con-r-img img{
      width: 177rpx;
      height: 180rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
  }
  .info-item{
      background-color: #fff;
      padding: 30rpx 30rpx 0;
      margin-top: 20rpx;
  }
  .info-item-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .info-item-toptitle{
      color: #333333;
      font-weight:bold;
      font-size: 32rpx;
  }
  .info-item-topright{
      color: #666666;
      font-weight: 400;
      font-size: 24rpx;
  }
  .info-jianzhi{
      color: #999999;
      font-size: 26rpx;
      margin-top: 20rpx;
  }
  .address{
      padding-right: 50rpx;
  }
  .price-day{
      color: #FF7352;
      font-size: 34rpx;
      padding-right: 50rpx;
  }
  .info-lx{
      border-top: 2rpx solid #F5F8F9;
      display: flex;
      justify-content: center;
      height: 90rpx;
      line-height: 90rpx;
      margin-top: 30rpx;
  }
  .lx-bg{
      height: 40rpx;
      width: 2rpx;
      background-color: #F5F8F9;
      margin-top: 25rpx;
  }
   .lx-div{
       text-align: center;
       width: 49%;
       color: #333333;
       font-size: 26rpx;
   }

   .tabNav{
       display: flex;
       justify-content: center;
       align-items: center;
       line-height: 90rpx;
       height: 90rpx;
       background-color: #fff;
   }
  .tabNav div{
       width: 100rpx;
       text-align: center;
       color: #333333;
       font-size: 28rpx;
       margin: 0 25rpx;
      border-bottom: 5rpx solid #fff;
  }
  .tabNav div.cur{
      color:#2E9BFF;
      border-bottom: 5rpx solid #2E9BFF;
  }


   /*弹出层*/
  .modalMask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.5;
      overflow: hidden;
      z-index: 9000;
      color: #fff;
  }
  .modalDialog {
      box-sizing: border-box;
      width: 590rpx;
      height: 576rpx;
      overflow: hidden;
      position: fixed;
      top: 30%;
      left: 0;
      z-index: 9999;
      background: #fff;
      border-radius: 8px;
      text-align: center;
      margin: 0 80rpx;
  }
  .img-close{
      width: 26rpx;
      height: 26rpx;
      position: absolute;
      right: 40rpx;
      top: 40rpx;
  }
  .img-set-phone{
      width: 230rpx;
      height: 230rpx;
      margin: 70rpx 0 0;
      display: inline-block;
  }
  .modalContent{
      display: flex;
      justify-content: center;

  }
  .modal-l{
      height: 90rpx;
      line-height: 90rpx;
      width: 220rpx;
      border:2rpx solid #2E9BFF;
      font-weight:500;
      color:rgba(255,255,255,1);
      font-size:28rpx;
      background:linear-gradient(0deg,rgba(46,155,255,1) 1.025390625%, rgba(27,243,196,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      text-align: center;
      margin-right: 50rpx;
  }
  .modal-r {
      height: 90rpx;
      line-height: 90rpx;
      width: 220rpx;
      font-weight: 500;
      color: #fff;
      font-size: 28rpx;
      background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
      box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
      border-radius:10rpx;
      text-align: center;
  }
</style>
