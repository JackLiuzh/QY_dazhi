<template>
    <div class="">
        <navBar :title="'基本信息'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="mod">
                <div class="mod_item">
                    <div class="">
                        <van-cell-group>
                            <van-field
                                value="123"
                                label="手机号"
                                placeholder="请输入手机号"
                                border="false"
                            />
                            <van-field
                                value="111"
                                center
                                clearable
                                label="短信验证码"
                                placeholder="请输入短信验证码"
                                border="false"
                                use-button-slot
                            >
                                <van-button slot="button" size="small" type="primary">获取短信验证码</van-button>
                            </van-field>
                        </van-cell-group>
                    </div>
                </div>
        </div>
        
        <div class="but">
             <login-but :title="'确认更换'" :width="'690'" @clicked="baocuninfo"></login-but>
        </div>
        <div class="test" style="height:100rpx;">
             
        </div>
        
    </div>
</template>
<script>
import navBar from '@/components/navigationBar'
import LoginBut from '@/components/But'
import Upload from "@/components/uploadimg"
import api from '@/utils/api'
export default {
    data(){
       return {
           info:'',
           vale:'',
           zhiweilist:['hr','hrr']
       }
    },
    mounted(){
       this.init()
    },
    components: {
       navBar,
       LoginBut,
       Upload
    },
    methods:{
        async init(){
            const res = await api.coruserinfo({uid:2})
            if(res.code==1){
                this.info = res.data.info
            }
        },
        lianxidianhua(){
             this.$router.push({path:''})
        },
        async baocuninfo(){
            const res = await api.cor_save_userinfo({uid:1,realname:this.info.realname,position:this.info.position,phone:this.info.phone,avatar:this.info.avatar,qq:this.info.qq,email:this.info.email})
            if(res.code == 1){
                console.log("保存成功")
            }
        },
        bindPickerChange(e){

        },
        tabswitch(e){
            console.log(e)
        },
        onChangeEmail(){
            
        }
    }
}
</script>
<style lang="less">

page {
    background: #F2F6F7;
}
.top{
    display: flex;
    justify-content: space-between;
    height: 160rpx;
    background-color: white;
    align-items: center;
    padding: 0 32rpx;
    .top_le{
       font-size: 30rpx;
       color: #000000;
    }
    .top_ri{
        .ri_jian{
            display: inline-block;
            width: 10rpx;
            height: 10rpx;
            border-top: 2rpx solid #999999;
            border-right: 2rpx solid #999999;
            transform: rotate(45deg);
            vertical-align: middle;
            margin-left: 30rpx;
        }
    }
}
.mod {
    .mod_item{
        margin-top: 20rpx;
        .item_cell{
            display: flex;
            height: 100rpx;
            padding: 0 30rpx;
            justify-content: space-between;
            align-items: center;
            background: white;
            font-size: 30rpx;
            border-bottom: 2rpx solid #F5F8F9;
            .cell_le{
                color: #000000;
                .le_label{
                    padding-left: 21rpx;
                    vertical-align: middle
                }                
            }
            .cell_ri{
                color: #666666;
                .ri_name_de{
                    color: #CCCCCC;
                    padding-right: 29rpx;
                    vertical-align: middle;
                }
                .ri_jian{
                    display: inline-block;
                    width:10rpx;
                    height: 10rpx;
                    border-right: 2rpx solid #999999;
                    border-bottom: 2rpx solid #999999;
                    transform: rotate(-45deg)
                }
            }
        }
    }
}
.but{
    display: flex;
    justify-content: center;
}

</style>



