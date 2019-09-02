<template >
<view class="container">
    <view class="mine_head">
      <image class="mini_head_img" src="/static/images/beijing@2x.png"></image>
    </view>
    <!-- 选项卡 -->
    <div style="width: 100%;">
        <div class="tabNav">
            <div :class="{'cur':tab === 1}"  @click="changTab(1,'')">
                全部职位
            </div>
            <div :class="{'cur':tab === 2}"  @click="changTab(2,2)">
                进行中
            </div>
            <div :class="{'cur':tab === 3}"  @click="changTab(3,3)">
                已结束
            </div>
            <div :class="{'cur':tab === 4}"  @click="changTab(4,0)">
                待审核
            </div>
            <div :class="{'cur':tab === 5}"  @click="changTab(5,1)">
                审核拒绝
            </div>
        </div>
        <div class="info"  v-if="tab === 1">
            <div v-for="(item,index) in listall" :key="index" class="info-item">
                <div class="info-item-top" @tap="gonext(item.status)">
                    <div class="info-item-toptitle">{{item.position_name}}</div>
                    <div v-if="item.status==2" class="info-item-jinxing">进行中</div>
                    <div v-if="item.status==3" class="info-item-jieshu">已结束</div>
                    <div v-if="item.status==0" class="info-item-daishen">待审核</div>
                    <div v-if="item.status==1" class="info-item-jujue">审核拒绝</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.area}}</span>{{item.type_str}} </div>
                <div class="info-lx-bu">
                     <div @tap="checkmember(it.name,item.jobid)" v-for="(it,dex) in (item.apply_total)" :key="dex">
                          <div class="bu-num">{{it.count}}</div>
                          <div class="bu-text">{{it.name}}</div>
                     </div>
                </div>
                <div v-if="item.status===2" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">关闭</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri">优化</div>
                </div>
                <div v-if="item.status===3" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">开启</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri" style="color:#CCCCCC;">优化</div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===2">
            <div v-for="(item,index) in jinxinglist" :key="index" class="info-item">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.position_name}}</div>
                    <div v-if="item.status==2" class="info-item-jinxing">进行中</div>
                    <div v-if="item.status==3" class="info-item-jieshu">已结束</div>
                    <div v-if="item.status==0" class="info-item-daishen">待审核</div>
                    <div v-if="item.status==1" class="info-item-jujue">审核拒绝</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.area}}</span>{{item.type_str}} </div>
                <div class="info-lx-bu">
                     <div v-for="(it,dex) in (item.apply_total)" :key="dex">
                          <div class="bu-num">{{it.count}}</div>
                          <div class="bu-text">{{it.name}}</div>
                     </div>
                </div>
                <div v-if="item.status===2" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">关闭</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri">优化</div>
                </div>
                <div v-if="item.status===3" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">开启</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri" style="color:#CCCCCC;">优化</div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===3">
             <div v-for="(item,index) in jieshulist" :key="index" class="info-item">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.position_name}}</div>
                    <div v-if="item.status==2" class="info-item-jinxing">进行中</div>
                    <div v-if="item.status==3" class="info-item-jieshu">已结束</div>
                    <div v-if="item.status==0" class="info-item-daishen">待审核</div>
                    <div v-if="item.status==1" class="info-item-jujue">审核拒绝</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.area}}</span>{{item.type_str}} </div>
                <div class="info-lx-bu">
                     <div v-for="(it,dex) in (item.apply_total)" :key="dex">
                          <div class="bu-num">{{it.count}}</div>
                          <div class="bu-text">{{it.name}}</div>
                     </div>
                </div>
            </div>
        </div>
        <div class="info" v-else-if="tab===4">
             <div v-for="(item,index) in daishenlist" :key="index" class="info-item">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.position_name}}</div>
                    <div v-if="item.status==2" class="info-item-jinxing">进行中</div>
                    <div v-if="item.status==3" class="info-item-jieshu">已结束</div>
                    <div v-if="item.status==0" class="info-item-daishen">待审核</div>
                    <div v-if="item.status==1" class="info-item-jujue">审核拒绝</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.area}}</span>{{item.type_str}} </div>
                <div class="info-lx-bu">
                     <div v-for="(it,dex) in (item.apply_total)" :key="dex">
                          <div class="bu-num">{{it.count}}</div>
                          <div class="bu-text">{{it.name}}</div>
                     </div>
                </div>
                <div v-if="item.status===2" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">关闭</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri">优化</div>
                </div>
                <div v-if="item.status===3" class="bottom_but">
                     <div @tap="closeoropenjz(item.jobid,item.status)" class="but_le">开启</div>
                     <div class="but_mi">|</div>
                     <div class="but_ri" style="color:#CCCCCC;">优化</div>
                </div>
            </div>
        </div>
        <div class="info" v-else>
             <div v-for="(item,index) in jujuelist" :key="index" class="info-item">
                <div class="info-item-top">
                    <div class="info-item-toptitle">{{item.position_name}}</div>
                    <div v-if="item.status==2" class="info-item-jinxing">进行中</div>
                    <div v-if="item.status==3" class="info-item-jieshu">已结束</div>
                    <div v-if="item.status==0" class="info-item-daishen">待审核</div>
                    <div v-if="item.status==1" class="info-item-jujue">审核拒绝</div>
                </div>
                <div class="info-jianzhi"><span class="address">{{item.area}}</span>{{item.type_str}} </div>
                <div class="info-lx-bu">
                     <div v-for="(it,dex) in (item.apply_total)" :key="dex">
                          <div class="bu-num">{{it.count}}</div>
                          <div class="bu-text">{{it.name}}</div>
                     </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 选项卡结束 -->
    <selectModel :isshow="isshowModel" title="企业认证" content="" uid="1" @cancelshow="cancelshow" @confirmSend="confirmSend"></selectModel>
</view>
</template>

<script>
// status 状态（0-新建待审核 1-审核拒绝 2-进行中 3-已结束）
import api from '@/utils/api'
import selectModel from '@/components/selctModel'
export default {
  data(){
    return {
       tab:1,
       listall:[],
       jinxinglist:[],
       jieshulist:[],
       daishenlist:[],
       jujuelist:[],
       isshowModel:false
    }
  },
  components:{
     selectModel
  },
  computed: {
     
  },
  watch:{
      
  },
  onShow(){
    var uid = wx.getStorageSync('uid')
    this.globalData.uid = uid
    this.isselect(uid)
    
  },
  beforeMount(){
    //   this.globalData.a = 1111
  },
  mounted () {
    // await Promise.all([
    //   this.getIndexData()
    // ])
    console.log(this.globalData.uid)
    var uid = wx.getStorageSync('uid')
    this.isselect(uid)
    // this.isshowModel = true
  },
  methods: {
    confirmSend(){
       console.log("点击加入")
       this.$router.push({path:'/pages/index/search'})
    },
    cancelshow(){
       console.log("点击取消")
    },
    checkmember(name,jobid){
        //  console.log(name,count)
         this.$router.push({path:'/pages/index/second',query:{name:name,jobid:jobid}})
    },
    async closeoropenjz(jobid,status){
        const res = await api.openorclose({jobid:jobid})
        if(res.code == 1){
            console.log("关闭or开启成功")
            this.init(status)
            this.init();
        }
    },
    changTab(index,status) {
        this.tab = index;
        this.init(status);
    },
    gonext(status){
       // status 状态（0-新建待审核 1-审核拒绝 2-进行中 3-已结束）
       console.log(status)
       if(status === 1){
           this.$router.push({path:'/pages/index/rejection'});
       }else if(status ===2){
           this.$router.push({path:'/pages/index/second'})
       }
    },
    async init(status=''){
        const res = await api.getjianzhilist({corpid:1,status:status})
        if(res.code == 1){
            if(status === 0){
                this.daishenlist = res.data.datalist
            }else if(status === 1){
                this.jujuelist = res.data.datalist
            }else if(status === 2){
                this.jinxinglist = res.data.datalist
            }else if(status === 3){
                this.jieshulist = res.data.datalist
            }else{
                this.listall = res.data.datalist
            }
        }
    },
    async isselect(uid){
        var that = this
        const re = await api.coruserinfo({uid:uid})
        if(re.code == 1){
            wx.setStorageSync('corpid',re.data.info.corpid)
            
            if(re.data.info.corpid){
                that.init(uid)
            }else{
                that.isshowModel= true
            }
            //判断此uid是否是管理员
            var admin_uid = re.data.info.admin_uid
            if(admin_uid && uid == admin_uid){
                that.globalData.admin_uid = admin_uid
            }
        }
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: 'xbyjShop',
      desc: '大职网',
      path: '/pages/index/index'
    }
  }
}
</script>

<style lang="less">
page{
    background-color: #f5f8f9;
  }
  .container {
    height: 100%;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: space-between; */
    box-sizing: border-box;
    padding: 0px;
  }
  .mine_head{
    width: 100%;
    height: 280rpx;
    display: flex;
    // justify-content: center;
    justify-content: space-between;
  }
  .mini_head_img{
    width: 100%;
    height: 280rpx;
  }
  
  /* 选项卡切换开始 */
  page{
    background-color: #f5f8f9;
  }
  /* .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0px;
      padding-bottom: 300rpx;
  } */
  .bottom_but{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 24rpx;
      color:#666666;
      .but_le{
          text-align: center;
          width:49%;
          height: 100%;
      }
      .but_mi{
          width:2rpx;
          color: #F5F8F9;
      }
      .but_ri{
          width:49%;
          text-align: center;
          height: 100%;
      }
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
  .info-item-jujue{
     font-size: 24rpx;
     color:rgba(153,153,153,1);
     background:linear-gradient(0deg,rgba(255,8,68,1) 0%, rgba(255,177,153,1) 100%);
     -webkit-background-clip:text;
     -webkit-text-fill-color:transparent;
  }
  .info-item-jinxing{
     font-size: 24rpx;
     color:rgba(153,153,153,1);
     background:linear-gradient(0deg,rgba(46,155,255,1) 0%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .info-item-jieshu{
      font-size: 24rpx;
      color:rgba(153,153,153,1);
      background:linear-gradient(0deg,rgba(255,115,82,1) 0%, rgba(255,175,108,1) 100%);
     -webkit-background-clip:text;
     -webkit-text-fill-color:transparent;
  }
  .info-item-daishen{
      font-size: 24rpx;
      color:rgba(153,153,153,1);
      background:linear-gradient(0deg,rgba(46,155,255,1) 0%, rgba(27,243,196,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
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
  .info-lx-bu{
    display: flex;
    height: 181rpx;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    .bu-num{
      font-size: 50rpx;
      color:#2E9BFF;
    }
    .bu-text{
      font-size: 22rpx;
      color:#666666;
    }
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
       justify-content: space-between;
       align-items: center;
       line-height: 90rpx;
       height: 90rpx;
       background-color: #fff;
       padding: 0 29rpx;
   }
  .tabNav div{
    //    width: 100rpx;
       text-align: center;
       color: #333333;
       font-size: 28rpx;
    //    min-width: 150rpx;
    // margin: 0 25rpx;
    // padding: 0 25rpx;
       box-sizing: border-box;
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
    //   height: 576rpx;
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
  /* 选项卡结束 */
</style>
