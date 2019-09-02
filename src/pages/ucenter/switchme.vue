<template>
    <div class="">
        <navBar :title="'管理转让'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="title">
             请选择下方企业同事作为管理者
        </div>
        <div class="con">
            <div @click="hh(index)" v-for="(item, index) in userlist" :key="index" class="con_item">
                <div class="item_le">
                      <image class="le_img" style="width:100rpx;height:100rpx;border-radius=50rpx;" :src="item.avatar"/>
                      <span  class="le_tx">{{item.realname}}</span>
                </div>
                <div  class="item_ri">
                    <span v-if="item.active" class="ri_gou"></span>
                    {{item.position ? item.position : 'hr'}}
                </div>
            </div>
        </div>
        <div class="but">
             <login-but :title="'保存'" :width="'690'" @clicked="baocuninfo"></login-but>
        </div>
    </div>
</template>
<script>
import navBar from '@/components/navigationBar'
import api from '@/utils/api'
import LoginBut from '@/components/But'
export default {
    data(){
        return {
            userlist:[],
            curindex:''
        }
    },
    components: {
       navBar,
       LoginBut
    },
    mounted(){
        this.init()
    },
    methods:{
        hh(index){
            console.log(index)
            var that = this
            that.curindex = index
            that.userlist.forEach(function(value,ind){
                if(index == ind){
                    that.$set(value,'active',true)
                }else {
                    that.$set(value,'active',false)
                }
            })
        },
        async init(){
            var that = this
            var uid = that.globalData.uid
            const res = await api.ucenter_corp_userlist({uid:uid})
            if(res.code == 1){
                 that.userlist = res.data.userlist
            }
        },
        //保存选择
        baocuninfo(){
            var uid = this.globalData.uid
            var corpid = wx.getStorageSync('corpid')
            var newadmin = this.userlist[this.curindex].uid
            this.baozun(uid,corpid,newadmin)
        },
        //保存接口
        async baozun(uid,corpid,newadmin){
             var that = this
             const res = await api.ucenter_change_admin({uid:uid,corpid:corpid,newadmin:newadmin}) 
             if(res.code == 1){
                 console.log("保存成功")
                // 更新管理员
                that.globalData.admin_uid = res.data.admin_uid
             } 
        }
    }
}
</script>
<style lang="less">
page{
    background: #F5F8F9;
}
.but{
    display: flex;
    justify-content: center;
}
.title{
    height: 127rpx;
    line-height: 127rpx;
    font-size: 30rpx;
    color: #000000FF;
    padding-left: 29rpx;
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
        .le_gou{
            display: inline-block;
            width:30rpx;
            height: 42rpx;
            border-right: 2rpx solid #2E9BFFFF;
            border-bottom: 2rpx solid #1BF3C4FF;
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
            -webkit-transform:rotate(45deg);
            -moz-transform:rotate(45deg);
            -ms-transform:rotate(45deg);
            -o-transform:rotate(45deg);
            margin-left: 21rpx;
        }
    }
}
.con{
    padding: 0 30rpx;
    // margin-top: 20rpx;
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
            .ri_gou{
                display: inline-block;
                width:25rpx;
                height: 42rpx;
                border-right: 4rpx solid #1BF3C4FF;
                border-bottom: 4rpx solid #2E9BFFFF;
                transform: rotate(45deg);
            //     -webkit-transform:rotate(45deg);
            //    -moz-transform:rotate(45deg);
            //     -ms-transform:rotate(45deg);
            //     -o-transform:rotate(45deg);
                margin-right: 49rpx;
            }
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
