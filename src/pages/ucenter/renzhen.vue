<template>
    <div class="container">
        <navBar :title="'资质认证'"
            :lefttitle="'资质认证'"
            :righttitle="'企业信息'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="box1" v-show="isshow">
             <div v-if="info.status==1" class="top_title">审核通过</div>
             <div v-else class="top_title">审核通过</div>
             <div class="upimage">
                    <div class="upimagebox">
                        <uploadimg @choosed="getImg" :srcs="info.pics ? [info.pics] : []"></uploadimg>
                    </div>
                    <div class="buchongbox">
                        <div class="bu_title">营业执照正面照片</div>
                        <div class="bu_sub_title">注：接受拍摄复印件，黑白复印件需要加盖公章，大小不超过5M</div>
                    </div>
             </div>
             <div class="comp">
                    <div class="comp_top">
                        <van-cell-group>
                            <van-field
                                :value="info.qy_name"
                                label="企业全称"
                                type="textarea"
                                placeholder="请填写"
                                autosize
                                border="false"
                                @change="qychang"
                            />
                            <van-field
                                :value="info.socialcode"
                                label="统一社会信用代码"
                                type="textarea"
                                placeholder="请填写"
                                autosize
                                border="false"
                                @change="socialcode_chang"
                            />
                            <van-field
                                :value="info.orgcode"
                                label="组织机构代码"
                                type="textarea"
                                placeholder="请填写"
                                autosize
                                border="false"
                                @change="orgcode_chang"
                            />
                         </van-cell-group>
                    </div>
             </div>
        </div>
        <div v-show="!isshow" class="box2">
             <div v-if="info.status==1" class="top_title">审核通过</div>
             <div v-else class="top_title">审核通过</div>
             <div class="top">
                    <div class="top_le">企业品牌头像</div>
                    <div class="top_ri">
                        <upload @choosed="huoquimage" :srcs="[info.logo]"></upload>
                        <!-- <image style="width:100rpx;height:100rpx;vertical-align:middle;" src="/static/images/mine_avatar.png"/>  -->
                        <!-- <span class="ri_jian"></span> -->
                    </div>
              </div>
             <div class="uploadpinpai">
                  <upimg></upimg>
             </div>
             <div class="input_box">
                    <div class="box_group">
                        <van-cell-group>
                            <van-field
                                :value="info.sname"
                                label="企业简称"
                                placeholder="请输入"
                                @change="sname_chang"
                            />
                            <van-field
                                :value="info.type"
                                label="企业类型"
                                placeholder="请输入"
                                @change="type_chang"
                            />
                            <van-field
                                :value="info.regmoney"
                                label="注册资本"
                                placeholder="请输入"
                                @change="regmoney_chang"
                            />
                        </van-cell-group>
                    </div>
                    <div class="box_group">
                        <picker mode="date" @change="pickdate">
                        <div class="group_cell">
                            <div class="cell_le">成立日期</div>
                            <div class="cell_ri">{{info.builddate}}</div>
                        </div>
                        </picker>
                    </div>
                    <div class="box_group">
                        <van-cell-group>
                            <van-field
                                :value="info.address_detail"
                                label="企业地址"
                                placeholder="请输入"
                            />
                        </van-cell-group>
                    </div>
                    <div class="box_group">
                        <picker mode="multiSelector" @change="changhangye" :range="objectArray" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" range-key="title">
                        <div class="group_cell">
                            <div class="cell_le">所属行业</div>
                            <div class="cell_ri">
                                <span class="ri_label">{{info.industry_str ? info.industry_str : '请选择'}}</span>
                                <span class="ri_jian"></span>
                            </div>
                        </div>
                        </picker>
                    </div>
             </div>
             <div class="input_sec">
                 <div class="sec_top">经营范围</div>
                 <div class="sec_area">
                      <textarea @input="scope_chang" style="height:300rpx;" :value="info.scope" auto-height placeholder="介绍经营范围"></textarea>
                 </div>
             </div>
             <div class="input_sec">
                 <div class="sec_top">公司介绍</div>
                 <div class="sec_area">
                      <textarea @input="intro_chang" style="height:300rpx;" :value="info.intro" auto-height placeholder="介绍经营范围"></textarea>
                 </div>
             </div>
             <div class="but">
                  <login-but :title="'提交'" :width="'690'" @clicked="baocuninfo"></login-but>
             </div>
        </div>
    </div>
</template>
<script>
import navBar from '@/components/naviImage'
import api from '@/utils/api'
import uploadimg from '@/components/uploadimg_tou'
import LoginBut from '@/components/But'
import Upload from "@/components/uploadimg"
export default {
   data(){
       return{
           jobid:'',
           stuid:'',
           info:'',
           isshow:true,
           multiIndex: [0, 0],
           hangyestr:'',
           industry_list:[],
           objectArray:[],
       }
   },
   components: {
       navBar,
       uploadimg,
       LoginBut,
       Upload
    },
    created(){
        
    },
    beforeMount(){
        
    },
    mounted(){
        this.jobid = this.$route.query.jobid
        this.stuid = this.$route.query.stuid
        this.init()
        // this.initjoblist()
        this.industryList()
    },
    
    methods:{
        //获取所属行业列表
        async industryList() {
            var that = this
            const res = await api.ucenter_industry_list()
            if(res.code == 1){
                that.industry_list = res.data.data_list 
                var dd =[]
                var dd2 =[]
                that.industry_list.forEach(function(value,index){
                    //   console.log(value)
                      var pars = {
                          id:value.id,
                          title:value.title
                      }
                      dd.push(pars)
                      that.objectArray[0] = dd
                      value.children.forEach(function(item2,index2){
                            // console.log(11)
                            var pp = {
                               id:item2.id,
                               title:item2.title
                            }
                            dd2.push(pp)
                      })
                      that.objectArray[1] = dd2
                })
            }
        },
        tabswitch(e){
            console.log(e)
            if(e==0){
                this.isshow = true
            }else{
                this.isshow = false
            }
        },
        async init(){
            var that = this
            var corpid = wx.getStorageSync('corpid')
            const res = await api.index_look_info({corpid:corpid})
            if(res.code==1){
                // console.log(res.data)
                that.info = res.data.info
            }
        },
        //企业全称
        qychang(e){
             this.info.qy_name = e.mp.detail
        },
        //信用代码
        socialcode_chang(e){
            this.info.socialcode = e.mp.detail
        },
        //组织机构代码
        orgcode_chang(e){
            this.info.orgcode = e.mp.detail
        },
        //企业简称
        sname_chang(e){
            this.info.sname = e.mp.detail
        },
        //企业类型
        type_chang(e){
            this.info.type = e.mp.detail
        },
        //注册资本
        regmoney_chang(e){
            this.info.regmoney = e.mp.detail
        },
        //经营范围
        scope_chang(e){
           console.log(e)
           this.info.scope = e.mp.detail.value
        },
        intro_chang(e){
           this.info.intro = e.mp.detail.value
        },
        //选择日期
        pickdate(e){
            console.log(e.mp.detail.value)
            this.info.builddate = e.mp.detail.value
        },
        //选择行业
        changhangye(e){
            var valueindex = e.mp.detail.value
            console.log("打印选中的",valueindex)
            this.multiIndex = valueindex
            var first_str = this.objectArray[0][valueindex[0]].title
            var sec_str = this.objectArray[1][valueindex[1]].title
            // console.log(first_str)
            // console.log(sec_str)
            this.hangyestr = first_str +'--'+ sec_str
            this.info.industry_str = first_str +'--'+ sec_str
        },
        //行业联动选项
        bindMultiPickerColumnChange(e){
            // console.log(e.mp.detail.column)
            var that = this
            console.log("修改的列为", e.mp.detail.column, ',值为', e.mp.detail.value)
            that.multiIndex[e.mp.detail.column] = e.mp.detail.value
            // switch (e.mp.detail.column) {
            //     case 0:
            // }
            if(e.mp.detail.column == 0){
                console.log(that.industry_list[e.mp.detail.value].children)
                // that.objectArray[1] = that.industry_list[e.mp.detail.value].children
                that.$set(that.objectArray,1,that.industry_list[e.mp.detail.value].children)
            }
            
        },
        //获取企业营业执照
        getImg(data){
            console.log(data)
            this.info.pics = data.all[0]
        },
        //获得企业logo
        huoquimage(data){
            this.info.logo = data.all[0]
        },
        //保存企业信息
        async baocuninfo(){
            var that = this
            var uid = that.globalData.uid
            
            var obj = {
                 uid: uid,
                 pics: that.info.pics,
                 name: that.info.qy_name,
                 socialcode: that.info.socialcode,
                 orgcode: that.info.orgcode,
                 sname: that.info.sname,
                 type: that.info.type,
                 regmoney: that.info.regmoney,
                 builddate: that.info.builddate,
                 address : that.info.address_detail,
                 industry: that.info.industry_str,
                 scope : that.info.scope,
                 intro : that.info.intro
            }
            const res = await api.ucenter_save_info(obj)
            if(res.code == 1){
                console.log("保存企业信息成功")
            }
        }

        
    }
}
</script>
<style lang="less">
.j-upload-add{
    font-size:36rpx!important;
    font-weight:500;
    color:#C9C9C9;
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
.input_sec{
    margin-top: 20rpx;
    padding: 39rpx 30rpx;
    background-color: white;
    .sec_top{
        font-size: 30rpx;
        color: #000000;
    }
    .sec_area{
        margin-top: 29rpx;
        height: 300rpx;
        padding: 30rpx;
        background-color: #F9F9F9;
        font-size: 28rpx;
    }
}
.but{
    display: flex;
    justify-content: center;
}
.box1{
    position: relative;
}
.top_title{
    line-height: 70rpx;
    padding-left: 32rpx;
    background-color: #2E9BFF;
    color:#FFFFFF;
    font-size: 28rpx;
}
.box_group{
    
    .group_cell{
        display:flex;
        justify-content: flex-start;
        height: 88rpx;
        align-items: center;
        background: white;
        padding: 0 30rpx;
        border-bottom: 2rpx solid #F4F4F4;
        .cell_le{
           font-size: 28rpx;
           color: #333; 
        }
        .cell_ri{
            padding-left: 65rpx;
            font-size: 28rpx;
            color: #000000;
        }
        
    }
}
.upimage{
    .upimagebox{
        height: 429rpx;
        background: white;
        display: flex;
        justify-content: center;
    }
    .buchongbox{
        padding: 30rpx 29rpx;
        background:white;
        .bu_title{
            font-size: 30rpx;
            color: #000000;
        }
        .bu_sub_title{
            margin-top: 29rpx;
            color: #999999;
            font-size: 30rpx;
            line-height:46rpx;
        }
    }
}
</style>



