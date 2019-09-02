<template>
 <div class="">
     <navBar :title="'反馈'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        >
     </navBar>
     <div style="width: 100%;background-color: #fff; ">
        <div class="con" style="border-bottom: 1rpx solid #F5F8F9;">
            <div class="con-l">姓名</div>
            <div class="con-r">{{ uname }}</div>
        </div>
        <div class="con">
            <div class="con-l"> <img src="/static/images/xing@2x.png" style="width: 18rpx; height: 18rpx;vertical-align: middle;margin-right: 20rpx;">联系电话</div>
            <div class="con-r">{{ phone }}</div>
        </div>
     </div>

     <div class="lix">
        输入有效的联系方式以便开发者联系你
     </div>
     <div style="width: 100%;background-color: #fff;padding: 30rpx 0;">
         <div style="width: 100%;">
            <textarea placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"  @input="bindTextAreaBlur" class="question" />
         </div>
        <div class="con-img">
            <div class="con-img-r" v-for="(item, index) in pics">
                <img src="/static/images/close_hui.png" @tap="delImg(index)"  class="img-close"/>
                <img :src="item"  class="img-tu"/>
            </div>
            <div style="position:relative;" class="con-img-add" @tap="uploadImg" >
                <!-- <img src="/static/images/myresume_jia.png"  style="width:27rpx;height:27rpx; margin-top:40rpx; "/> -->
                <span class="add_icon">+</span>
                <br/>
                <span class="add-img-span">添加图片</span>
            </div>
        </div>
         <div class="huifu"  @click="submissionUrl" >提交</div>
     </div>
 </div>
</template>

<script>
import navBar from '@/components/navigationBar'
import api from '@/utils/api'
  // Use Vuex
  export default {
    computed: {

    },
    components:{
      navBar
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
        pics:[],
        content:'',
        uid:'',
        uname:'ming',
        phone:'15210657211',
        userInfo:''
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

       //读取缓存
      
      //存用户id
     
 
    },
    mounted(){
        this.userInfo =  wx.getStorageSync('userInfo')
    },
    methods: {
      // 返回跳转
      back(){
        wx.navigateBack({
          delta: 1
        })
      }
      //提交
      ,submissionUrl (){
          let that = this
          if(that.content == ''){
              wx.showToast({
                title:'请输入反馈内容',
                icon:'none',
                duration: 2000
              })
             return;
          }
          if(that.pics.length == 0){
              wx.showToast({
                title:'请上传图片',
                icon:'none',
                duration: 2000
              })
             return;
          }
          this.$httpWX.post({
            url: '/student/addfeedback',
            data: {
              'uid': that.uid,
              'type':2,
              'content': that.content,
              'pics': that.pics.join(), 
            }
          }).then(res => {
            if(res.code == 1){
                 
                 wx.showToast({
                        title:'提交成功',
                         duration: 2000,
                         success:function (){
                            that.back();
                        }
                })
                  
            }else{
              wx.showToast({
                title:'服务器异常',
                icon:'none',
                duration: 2000
              })
            }
          })
       
      }
      //文本域
      ,bindTextAreaBlur(e){
          this.content = e.target.value;
      }
      //上传图片
      ,uploadImg () {
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              var tempFile = res.tempFiles;
              console.log(tempFilePaths);
              // 数据请求前loading
              wx.showLoading({
                title: '加载中' 
              })
            wx.uploadFile({
              url:  that.$httpWX.host+"/student/upload", // 仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                'file': tempFile[0]
              },
              success(res) {
                  wx.hideLoading();
                  let data = JSON.parse(res.data) 
                  if(data.code){
                       that.pics.push(data.data)
                  }else{
                     wx.showToast({
                      title:'服务器异常',
                      icon:'none',
                      duration: 2000
                    })
                    console.log("上传图片"+data);
                  }
              }
            })
            // 
          }
        })
      }
      //删除图片
      ,delImg (index){
            this.pics.splice(index,1);
      } 

    }
  }
</script>

<style>
  page{
    background-color: #fff;
  }
  .add_icon{
    font-size:60rpx;
    display:inline-block;
    /* padding-bottom:0rpx; */
    color:red;
    background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .con-img-r{
      position: relative;
  }
  .question{
      height:260rpx;
      background:rgba(247,247,247,1);
      color: #999999;
      padding: 20rpx;
      font-size: 26rpx;
      width: auto;
      margin: 0 30rpx;
  }
  .img-close{
      width: 34rpx;
      height: 34rpx;
      position: absolute;
      top: -10rpx;
      right: 20rpx;
  }
  .img-tu{
      width: 146rpx;
      height: 146rpx;
      margin-right:30rpx;
      margin-bottom: 30rpx;
  }
  .lix{
      line-height: 60rpx;
      height: 60rpx;
      text-align: right;
      color: #999999;
      font-size: 26rpx;
      width: 100%;
      padding-right: 50rpx;
      background-color: rgba(247,247,247,1);
  }
  .con-img-add{
        width: 146rpx;
       height: 146rpx;
      text-align: center;
      border:1px  dashed #1BF3C4;
      background:#F4FEFC;
  }
  .add-img-span{
      font-size:24rpx;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      background:linear-gradient(0deg,rgba(46,155,255,1) 0.2685546875%, rgba(27,243,196,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
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
      margin:0 30rpx;
      display: flex;
      justify-content: space-between;
      line-height: 100rpx;
      height: 100rpx;
  }
  .con-img{
     display: flex;
 justify-content: flex-start;
      flex-wrap: wrap;
      margin: 40rpx 30rpx 300rpx;
  }
  .con-l{
      color: #000000;
      font-size:30rpx;
      font-weight:400;
  }
  .con-r{
      font-size:30rpx;
      font-weight:400;
      color:#999999;
  }

  .huifu{
      height:90rpx;
      background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
      box-shadow:0rpx 2rpx 10rpx 0rpx rgba(46,155,255,0.5);
      border-radius:10rpx;
      line-height: 90rpx;
      text-align: center;
      font-size:29rpx;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin: 0 30rpx;
  }
</style>
