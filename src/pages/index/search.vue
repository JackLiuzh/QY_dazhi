<template>
 <div class="">
     <navBar :title="'企业搜索'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
      ></navBar>
     <div class="se">
          <van-search :value="value" @change="valuechange" placeholder="请输入搜索关键词" />
     </div>
     <div class="con">
          <div class="con_box">
               <div class="box_top">
                   <van-search
                    :value="value"
                    :placeholder="value"
                    show-action
                    disabled
                    background=""
                    @cancel="onCancel"
                  />
               </div>
               <div class="box_list">
                    <div v-if="list.length" v-for="(item,index) in list" :key="index" @tap="godetail(item.id)" class="list_item">
                         {{item.name}}
                    </div>
               </div>
          </div>
     </div>
 </div>
</template>

<script>
import navBar from '@/components/navigationBar'
import api from '@/utils/api'
  // Use Vuex
  export default {
    data () {
      return {
        value:'',
        list:[]
      }
    },
    computed: {

    },
    components:{
      navBar
    },
    
    beforeMount () {

      
    },
    methods: {
        valuechange(e){
          this.value = e.mp.detail
          //  console.log(e.mp.detail)
          this.search(e.mp.detail)
        },
        onCancel(e){
           this.value =''
        },
        async search(value){
            var that = this
            const res = await api.index_serchcom({name:value})
            if(res.code ==1){
                that.list = res.data.corp_list
                
            }
        },
        godetail(comid){
          console.log(comid)
          this.$router.push({path:'/pages/index/company_detail',query:{corpid:comid}})
        } 
    }
  }
</script>
<style lang="less">
  page{
    background-color: #f5f8f9;
  }
  .van-search__content{
     background-color: white !important;
  }
  .van-search__action--hover{
    background: white !important;
  }
  .van-search__action{
    background: white !important;

  }
  .van-search--withaction{
    padding-right: 30rpx !important;
  }
  .se{
     width:100%;
     margin-top: 30rpx;
  }
  .con{
    margin-top: 440rpx;
    .con_box{
      .box_list{
          margin-top: 2rpx;
          padding: 0 30rpx;
          .list_item{
             padding: 0 30rpx;
             color: #333333;
             font-size: 29rpx;
             height: 90rpx;
             background: white;
             line-height: 90rpx;
             border-bottom: 2rpx solid #F5F8F9;
          }
      }

    }
  }
</style>
