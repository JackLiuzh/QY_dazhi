import request from './request'

const ApiRootUrl = 'http://dz.lingjun.net'
// const ApiRootUrlIP = 'http://192.168.1.150'

const api = {
  // 兼职列表
  getjianzhilist: (paramObj) => request.get('Job/index', paramObj, {
    baseURL: ApiRootUrl
  }),
  //开启or关闭兼职信息
  openorclose: (paramObj) => request.get('Job/open_close', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 根据所选状态获取学生列表
  getstulistbystatus:(paramObj) => request.get('Job/getstulistbystatus', paramObj,{
    baseURL: ApiRootUrl
  }),
  //查看企业对学生的评价
  evaluate_detail: (paramObj) => request.get('job/evaluate_detail',paramObj,{
    baseURL: ApiRootUrl
  }),
  //去对学生评价
  gotoprise:(paramObj) => request.get('job/gotoprise',paramObj,{
    baseURL: ApiRootUrl
  }),
  //保存学生评价内容
  savePrise:(paramObj) => request.post('job/save_prise',paramObj,{
    baseURL: ApiRootUrl
  }),

  //获得学生基本信息
  get_userinfo:(paramObj) =>request.get('job/get_userinfo',paramObj,{
     baseURL: ApiRootUrl
  }),
  //获得学生已完结的兼职记录列表
  get_job_list:(paramObj) =>request.get('Job/get_job_list',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //查看企业详情
  index_look_info:(paramObj) =>request.get('Corporations/look_info',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //我的主页
  mine_page:(paramObj) =>request.get('Corporations/index',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //查看企业用户基本信息
  coruserinfo:(paramObj) =>request.get('Corporations/userinfo',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //保存企业用户的基本信息
  cor_save_userinfo:(paramObj) =>request.post('Corporations/save_userinfo',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //评价标签统计
  ucenter_evaluate_total:(paramObj) =>request.get('Corporations/evaluate_total',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //根据id or 文字获取评论列表
  ucenter_evaluate_list:(paramObj) =>request.get('Corporations/evaluate_list',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //保存回复
  ucenter_save_reply:(paramObj) =>request.post('Corporations/save_reply',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //微信登录
  index_login:(paramObj) =>request.post('Login/login',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //搜索企业
  index_serchcom:(paramObj) =>request.get('Corporations/corp_search',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //加入企业
  index_jiarucom:(paramObj) =>request.get('Corporations/apply_corp',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //企业人员列表
  ucenter_corp_userlist:(paramObj) =>request.get('Corporations/corp_userlist',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //管理人员转让
  ucenter_change_admin:(paramObj) =>request.get('Corporations/change_admin',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //申请加入的人员列表
  ucenter_apply_list:(paramObj) =>request.get('Corporations/apply_list',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //管理员同意人员加入
  ucenter_apply_check:(paramObj) =>request.get('Corporations/apply_check',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //企业管理人员删除企业人员
  ucenter_del_user:(paramObj) =>request.get('Corporations/del_user',paramObj,{
    baseURL: ApiRootUrl    
  }),
  //获取职位列表
  ucenter_position_list:(paramObj) =>request.get('Corporations/position_list',null,{
    baseURL: ApiRootUrl    
  }),
  //获得所属行业接口
  ucenter_industry_list:(paramObj) =>request.get('Corporations/industry_list',null,{
    baseURL: ApiRootUrl    
  }),
  //保存企业信息
  ucenter_save_info:(paramObj) =>request.post('Corporations/save_info',paramObj,{
    baseURL: ApiRootUrl    
  }),
  
}

export default api
