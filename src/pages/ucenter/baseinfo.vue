<template>
    <div class="">
        <navBar :title="'基本信息'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="top">
            <div class="top_le">头像</div>
            <div class="top_ri">
                 <upload @choosed="huoquimage" :srcs="[info.avatar]"></upload>
                 <!-- <image style="width:100rpx;height:100rpx;vertical-align:middle;" src="/static/images/mine_avatar.png"/>  -->
                 <!-- <span class="ri_jian"></span> -->
            </div>
        </div>
        <div class="mod">
                <div class="mod_item">
                    <!-- <div v-if="info.realname" class="item_cell">
                        <div class="cell_le">
                            <image style="width:18rpx;height:18rpx;" src="/static/images/xing@2x.png" />
                            <span class="le_label">姓名</span>
                        </div>
                        <div class="cell_ri">
                            <span class="ri_name">{{info.realname}}</span>
                        </div>
                    </div> -->
                    <!-- <div  class="item_cell">
                        <van-cell-group class="cell-group-width">
                            <van-field
                                :value="vale"
                                disabled
                                required
                                clearable
                                label="姓名"
                                input-align="right"
                                placeholder="安迅"                                
                            />
                        </van-cell-group>
                    </div> -->
                    <div  class="item_cell">
                        <van-cell-group class="cell-group-width">
                            <van-field
                                :value="info.realname"
                                required
                                clearable
                                label="姓名"
                                input-align="right"
                                placeholder="请输入姓名"
                                @change="xingmingchang"                                
                            />
                        </van-cell-group>
                    </div>
                    <picker  @change="bindPickerChange" :value="index" :range="zhiweilist">
                    <div class="item_cell">
                        <div class="cell_le">
                            <image style="width:10rpx;height:10rpx;" src="/static/images/xing@2x.png" />
                            <span class="le_label">职位</span>
                        </div>
                        <div class="cell_ri">
                            <span  class="ri_name_de">{{info.position ? info.position : '请选择您在企业中的职位'}}</span>
                            <!-- <span  class="ri_name_de">请选择您在企业中的职位</span> -->
                            <span class="ri_jian"></span>
                        </div>
                        
                    </div>
                    </picker>
                </div>
                <div class="mod_item">
                    <div  @tap="lianxidianhua" class="item_cell">
                        <div class="cell_le">
                            <image style="width:10rpx;height:10rpx;" src="/static/images/xing@2x.png" />
                            <span class="le_label">联系电话</span>
                        </div>
                        <div class="cell_ri">
                            <span class="ri_name_de">{{info.phone ? info.phone : ''}}</span>
                            <span class="ri_jian"></span>
                        </div>
                    </div>
                    <!-- <div  class="item_cell">
                        <div class="cell_le">
                            <image style="width:10rpx;height:10rpx;" src="/static/images/xing@2x.png" />
                            <span class="le_label">获取微信电话</span>
                        </div>
                        <div class="cell_ri">
                            <span class="ri_name_de">1348452809</span>
                            <span class="ri_jian"></span>
                        </div>
                    </div> -->
                    <!-- <div class="item_cell">
                        <div style="padding-left:31rpx;" class="cell_le">
                            <span class="le_label">联系QQ</span>
                        </div>
                        <div class="cell_ri">
                            <span  class="ri_name_de">qq</span>
                            <span  class="ri_name_de">13484528096</span>
                        </div>
                    </div> -->
                    <!-- <div class="item_cell">
                        <van-cell-group style="width:100%;">
                            <van-field
                                :value="vale"
                                label="联系QQ"
                                placeholder="1308888"
                                input-align="right"
                                disabled
                            />
                        </van-cell-group>
                    </div> -->
                    <div class="item_cell">
                        <van-cell-group style="width:100%;">
                            <van-field
                                :value="info.qq"
                                label="联系QQ"
                                placeholder="请输入QQ"
                                input-align="right"
                                @change="qqchang"
                            />
                        </van-cell-group>
                    </div>
                    <!-- <div  class="item_cell">
                        <div style="padding-left:31rpx;" class="cell_le">
                            <span class="le_label">联系邮箱</span>
                        </div>
                        <div class="cell_ri">
                            <span class="ri_name_de">{{info.email}}</span>
                            <span class="ri_name_de"></span>
                        </div>
                    </div> -->
                    <!-- <div  class="item_cell">
                        <van-cell-group style="width:100%;">
                            <van-field
                                :value="vale"
                                label="联系邮箱"
                                placeholder="1037288933@qq.com"
                                input-align="right"
                                disabled
                            />
                        </van-cell-group>
                    </div> -->
                    <div  class="item_cell">
                        <van-cell-group style="width:100%;">
                            <van-field
                                :value="info.email"
                                label="联系邮箱"
                                placeholder="请输入邮箱"
                                input-align="right"
                                @change="emailchang"
                            />
                        </van-cell-group>
                    </div>
                </div>
        </div>
        
        <div class="but">
             <login-but :title="'保存'" :width="'690'" @clicked="baocuninfo"></login-but>
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
           vale:'',
           zhiweilist:[],
           info:''
       }
    },
    mounted(){
       this.init()
       this.get_position_list()
    },
    components: {
       navBar,
       LoginBut,
       Upload
    },
    methods:{
        async init(){
            var that =this
            var uid = that.globalData.uid
            const res = await api.coruserinfo({uid:uid})
            if(res.code==1){
                if(res.data.info !=null){
                   that.info = res.data.info
                }
            }
        },
        lianxidianhua(){
             this.$router.push({path:'/pages/ucenter/edit_phone'})
        },
        async baocuninfo(){
            var that =this
            var uid = that.globalData.uid
            const res = await api.cor_save_userinfo({uid:uid,realname:that.info.realname,position:that.info.position,phone:that.info.phone,avatar:that.info.avatar,qq:that.info.qq,email:that.info.email})
            if(res.code == 1){
                console.log("保存成功")
            }
        },
        bindPickerChange(e){
            // console.log(e.mp.detail.value)
            var position = this.zhiweilist[e.mp.detail.value]
            this.info.position = position
        },
        tabswitch(e){
            console.log(e)
        },
        onChangeEmail(){
            
        },
        //姓名改变
        xingmingchang(e){
            this.info.realname = e.mp.detail
        },
        //邮箱改变
        emailchang(e){
        //    console.log(e.mp.detail)
           this.info.email = e.mp.detail
           this.info.phone =13484528096
        },
        //QQ改变
        qqchang(e){
           this.info.qq = e.mp.detail
        },

        //huodeimg
        huoquimage(data){
            // console.log(data.all[0])
            this.info.avatar = data.all[0]
            // this.$set(info,'avatar',data.all[0])
        },
        //获取职位选项
        async get_position_list(){
            var that = this
            const res = await api.ucenter_position_list()
            if(res.code ==1){
                var list =[]
                res.data.data_list.forEach(function(item,index){
                    list.push(item.name)
                })
                that.zhiweilist = list
            }
        }
    }
}
</script>
<style lang="less">

page {
    background: #F2F6F7;
}

.cell-group-width{
    width:100%;
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
            // border-bottom: 2rpx solid #F5F8F9;
            .cell_le{
                color: #000000;
                padding-left: 14rpx;
                .le_label{
                    // padding-left: 21rpx;
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
.van-cell{
    font-size: 30rpx !important;
}

</style>



