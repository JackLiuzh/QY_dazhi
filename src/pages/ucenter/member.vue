<template>
    <div class="">
        <navBar :title="'企业人员管理'"
            :lefttitle="'企业成员'"
            :righttitle="'新成员申请'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="box1" v-if="isshow">
        <div class="top" @tap="goswitchme">
            <div class="top_le">
                 <image class="le_img" style="width:100rpx;height:100rpx;border-radius:50rpx;" :src="userinfo.avatarUrl" />
                 <span class="le_tx">{{userinfo.nickName}}</span>
            </div>
            <div class="top_ri">
                <span class="ri_tx">管理转让</span> 
                <span class="ri_jian"></span>  
            </div>
        </div>
        <div class="con">
            <div @longpress="dele(item.uid)" v-for="(item,index) in userlist" :key="index" class="con_item">
                <div class="item_le">
                      <image class="le_img" style="width:100rpx;height:100rpx;border-radius:50rpx;" :src="item.avatar"/>
                      <span class="le_tx">{{item.realname}}</span>
                </div>
                <div v-if="item.position" class="item_ri">{{item.position}}</div>
            </div>
            <!-- <div class="con_add" @click="modelshow">
                <div class="add_box">
                    <span class="box_jia">+</span>
                    <span class="box_tx">添加新同事</span>
                </div>
            </div> -->
        </div>
            <div class="tip" >
                删除成员：长按需要删除成员的区域，点击删除按钮
            </div>
        </div>
        <div v-else class="box2">
            <div class="con">
                <div v-if="newlist.length" v-for="(item,index) in newlist" :key="index"  class="con_item">
                    <div class="item_le">
                        <image class="le_img" style="width:100rpx;height:100rpx;border-radius:50rpx;" :src="item.avatar"/>
                        <span class="le_tx">{{item.realname}}</span>
                    </div>
                    <div v-if="item.status==0" @tap=checkid(item.id) class="item_ri_but">同意</div>
                    <div  v-else class="item_ri">已同意</div>
                </div>                
            </div>
        </div>

        <!-- <inputModel :isshow="isshow" @cancelshow="cancelshow" @confirmSend="confirmSend"></inputModel> -->
        <confirmModel :isshow="isshowModel" title="西安政法大学：李林" content="工资已结算？" uid="1" @cancelshow="cancelshow" @confirmSend="confirmSend"></confirmModel>
    </div>
</template>
<script>
// import navBar from '@/components/navigationBar'
import navBar from '@/components/naviImage'
import confirmModel from '@/components/confirmModel'
import api from '@/utils/api'
export default {
    components: {
       navBar,
       confirmModel
    },
    data(){
        return{
           isshow:true ,
           isshowModel: false,
           userlist:[],
           userinfo:'',
           newlist:[]
        }
    },
    mounted(){
        this.init()
        this.getuserinfo()
        // console.log(this.globalData.admin_uid)
        this.getnewlist()
    },
    methods:{
        async init(){
            var that = this
            var uid = that.globalData.uid
            const res = await api.ucenter_corp_userlist({uid:uid})
            if(res.code == 1){
                 that.userlist = res.data.userlist
            }
        },
        //获取本地存储的用户信息
        getuserinfo(){
            this.userinfo = wx.getStorageSync('userInfo')
        },
        //获取新申请人员列表
        async getnewlist(){
            var corpid = wx.getStorageSync("corpid")
            var that = this
            const res = await api.ucenter_apply_list({corpid:corpid})
            if(res.code == 1){
                that.newlist = res.data.datalist 
            }
        },
        //同意人员申请
        checkid(id){
            // console.log(id)
            this.allow(id)
        },
        async allow(id){
             var that = this
             const res = await api.ucenter_apply_check({id:id})
             if(res.code == 1){
                console.log("同意成功")
                that.getnewlist()
             }
        },
        //长按删除事件
        dele(uid){
             console.log(uid)
             var that = this
             wx.showModal({
                    title: '提示',
                    content: '是否删除该成员？',
                    success (res) {
                        if (res.confirm) {
                        console.log('用户点击确定')
                         that.deleaction(uid)
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
            })
        },
        async deleaction(uid){
            var corpid = wx.getStorageSync('corpid')
            var that = this
            const res = await api.ucenter_del_user({corpid:corpid,uid:uid})
            if(res.code == 1){
                console.log("删除成员成功")
                that.init()
            }
        },
        goswitchme(){
            this.$router.push({path:'/pages/ucenter/switchme',query:{}})
        },
        tabswitch(e){
            console.log(e)
            if(e==0){
                this.isshow = true
            }else{
                this.isshow = false
            }
        },
        modelshow(){
            this.isshow = true
        },
        cancelshow(){
            this.isshow = false
        },
        confirmSend(e){
            this.isshow = false
            console.log(e)
        },
        dd(){
            wx.makePhoneCall({
                phoneNumber:'13484528096'
            })
        }

    }
}
</script>
<style lang="less">
page{
    background: #F5F8F9;
}
.tip{
    color: #999999;
    font-size: 26rpx;
    margin-top: 29rpx;
    text-align: center;
}
.top{
    display: flex;
    padding: 0 30rpx;
    background-color: white;
    height: 160rpx;
    justify-content: space-between;
    align-items: center;
    .top_le{
        .le_img{
            vertical-align: middle;
        }
        .le_tx{
            vertical-align: middle;
            margin-left: 51rpx;
            font-size: 30rpx;
            color: #000000FF;
        }
    }
    .top_ri{
        .ri_tx{
          vertical-align:middle;
          font-size: 28rpx;
          color: #999999FF;
        }
        .ri_jian{
            display: inline-block;
            vertical-align:middle;
            width: 10rpx;
            height: 10rpx;
            border-top: 2rpx solid #999999FF;
            border-right: 2rpx solid #999999FF;
            transform: rotate(45deg);
            margin-left: 21rpx;
        }
    }
}
.con{
    padding: 0 30rpx;
    margin-top: 20rpx;
    background-color: white;
    .con_item{
        height: 146rpx;
        border-bottom: 2rpx solid #F5F8F9FF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item_le{
            .le_img{
                vertical-align: middle;
            }
            .le_tx{
                 display: inline-block;
                 margin-left: 51rpx;
                 vertical-align: middle;
                 color:#000000FF;
                 font-size: 30rpx;
            }
        }
        .item_ri{
            font-size: 28rpx;
            color: #999999FF;
        }
        .item_ri_but{
            width:150rpx;
            height:60rpx;
            background:linear-gradient(45deg,rgba(40,185,235,1),rgba(27,243,196,1));
            border-radius:10rpx;
            font-size:28rpx;
            font-weight:400;
            line-height: 60rpx;
            text-align: center;
            color:rgba(255,255,255,1);
        }
    }
    .con_add{
        height: 146rpx;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        .add_box{
            .box_jia{
                font-size: 80rpx;
                color: #999999FF;
                font-weight: 100;
                vertical-align: middle;
            }
            .box_tx{
                display: inline-block;
                vertical-align: middle;
                font-size: 28rpx;
                line-height: 104rpx;
                color: #999999FF;
                height: 104rpx;
                padding-top: 20rpx;
                padding-left: 31rpx;
            }
        }
    }
}
</style>
