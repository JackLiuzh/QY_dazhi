<template>
    <div class="container">
        <navBar :title="'基础信息'"
            :titleColor="'white'"
            :back-visible="true"
            @returntab="tabswitch"
        ></navBar>
        <div class="box1" v-if="isshow">
           <member :info="info"></member>
        </div>
        <div v-else class="box2">
             <div>
                <!-- <record v-for="(item,index) in joblist" :index="index" :prise="item.prise" :item="item" :cavid="index + 1" :key="index"></record> -->
                ff
             </div> 
        </div>
    </div>
</template>
<script>
import navBar from '@/components/naviImage'
import api from '@/utils/api'
import member from '@/pages/index/membermiddle'
import record from '@/pages/index/record'
export default {
   data(){
       return{
           jobid:'',
           stuid:'',
           info:'',
           isshow:true,
           joblist:[]
       }
   },
   components: {
       navBar,
       member,
       record
    },
    created(){
        
    },
    beforeMount(){
        
    },
    mounted(){
        this.jobid = this.$route.query.jobid
        this.stuid = this.$route.query.stuid
        this.init()
        this.initjoblist()
    },
    
    methods:{
        tabswitch(e){
            console.log(e)
            if(e==0){
                this.isshow = true
            }else{
                this.isshow = false
            }
        },
        async init(){
            const res = await api.get_userinfo({stuid:this.stuid,jobid:this.jobid})
            if(res.code==1){
                // console.log(res.data)
                this.info = res.data.datainfo
            }
        },
        async initjoblist(){
            const res = await api.get_job_list({stuid:this.stuid,jobid:this.jobid})
            if(res.code == 1){
                // this.joblist = res.data.datalist
                this.joblist = res.data.datalist
            }
        }
    }
}
</script>
<style lang="less">
.box1{
    position: relative;
}
</style>



