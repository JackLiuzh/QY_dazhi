<template>
   <div class="cc">
        <div class="box1">
            <image style="height:322rpx;width:100%;" src="/static/images/shang@2x.png"/>
            <div class="text">
                兼职发布平台
            </div>
        </div>
        <div class="box2">
            <div class="box2_d">
                <image style="width:534rpx;height:409rpx;" src="/static/images/zhong@2x.png" /> 
            </div>
            <div class="box2_b">
                <button class="b_bu" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">微信登录</button>
            </div>
        </div> 
        <div class="box3">
            <image style="height:328rpx;width:100%" src="/static/images/xia@2x.png"/>
        </div>
   </div>
</template>
<script>
import api from '@/utils/api'
export default {
    data(){
        return {
            code:''
        }
    },
    beforeCreate(){
       
    },
    created(){
        
    },
    beforeMount(){
       this.getSetting()
    },
    mounted(){
        const self = this
        wx.login({
            success (res){
                if(res.code){
                    // console.log(res)
                    self.code = res.code
                    // self.wxGetUserInfo(res.code)
                }
            }
        })
    },
    methods:{
        getSetting(){
            const self = this
            wx.getSetting({
                success (res) {
                    if(res.authSetting['scope.userInfo']){
                        console.log("用户已授权")
                        self.$router.push({path:'/pages/index/index', isTab:true})
                    }else {
                        console.log("用户未授权")
                    }
                }
            })
        },
        wxGetUserInfo (code) {
            const self = this;
            wx.getUserInfo({
                withCredentials: true,
                success (res) {
                    console.log(res)

                    // let { encryptedData,userInfo,iv } = res;
                    // self.$http.post('api',{
                    //     code,
                    //     encryptedData,
                    //     iv,
                    // }).then(res => {
                    //     console.log(`后台交互拿回数据:`,res);
                    //     // 获取到后台重写的session数据，可以通过vuex做本地保存
                    // }).catch(err => {
                    //     console.log(`自动请求api失败 err:`,err);
                    // })  
                },
                fail (err) {
                    console.log('自动wx.getUserInfo失败:',err);
                    // 显示主动授权的button
                    // self.buttonVisible = true;

                }
            })
        },
        async bindGetUserInfo(e){
            const self = this;
            if (e.mp.detail.userInfo){
                console.log(e)
                console.log('用户按了允许授权按钮')
                let { encryptedData,iv } = e.mp.detail;
                let userInfo = JSON.stringify(e.mp.detail.userInfo)
                const res = await api.index_login({code:self.code,encryptedData,userInfo,iv})
                if(res.code ==1){
                    console.log(res)
                    wx.setStorageSync('userInfo', e.mp.detail.userInfo)
                    wx.setStorageSync('uid',res.data.data.uid)
                    self.$router.push({path:'/pages/index/index', isTab:true})                    
                }
                // self.$http.post(api,{
                //     // 这里的code就是通过wx.login()获取的
                //     code:self.code,
                //     encryptedData,
                //     iv,
                // }).then(res => {
                //     console.log(`后台交互拿回数据:`,res);
                //     // 获取到后台重写的session数据，可以通过vuex做本地保存
                // }).catch(err => {
                //     console.log(`api请求出错:`,err);
                // })  
            } else {
                //用户按了拒绝按钮
                console.log('用户按了拒绝按钮');
            } 
        }
    }
}
</script>
<style lang="less">
.cc{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.text{
    font-size:66rpx;
    font-family:PingFang-SC-Heavy;
    text-align: center;
    font-weight:800;
    color:rgba(253,121,52,1);
    background:linear-gradient(0deg,rgba(46,155,255,1) 0%, rgba(27,243,196,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}
.box1{
    
}
.box2{
    height: 555rpx;
    margin-top:44rpx;
    .box2_d{
        width: 534rpx;
        margin: 0 auto;
        padding-left:4%;
    }
    .box2_b{
        margin-top:72rpx;
        .b_bu{
            font-size:30rpx;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:rgba(255,255,255,1);
            width:500rpx;
            height:90rpx;
            line-height: 90rpx;
            background:linear-gradient(90deg,rgba(46,155,255,1),rgba(27,243,196,1));
            box-shadow:-3rpx 3rpx 25rpx 0rpx rgba(46,155,255,0.3);
            border-radius:20rpx
        }
    }
}
.box3{
    
}
</style>


