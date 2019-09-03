import request from './request'

const ApiRootUrl = 'http://dz.lingjun.net/'

const apii = {
  // 发布兼职接口
  Jobstep1: (paramObj) => request.get('Job/step1', paramObj, {
    baseURL: ApiRootUrl
  }),
  Jobstep2: (paramObj) => request.get('Job/step2', paramObj, {
    baseURL: ApiRootUrl
  }),
  Jobstep3: (paramObj) => request.get('Job/step3', paramObj, {
    baseURL: ApiRootUrl
  }),
  Jobstep5: (paramObj) => request.get('Job/step5', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 消息类型列表
  message: (paramObj) => request.get('Messages/index', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 根据兼职获取消息列表
  getmessagebyjobid: (paramObj) => request.get('Messages/getmessagebyjobid', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 企业资质审核消息列表
  getcorpmessage: (paramObj) => request.get('Messages/getcorpmessage', paramObj, {
    baseURL: ApiRootUrl
  }),
  // 反馈消息列表
  get_feedbackmessage: (paramObj) => request.get('Messages/get_feedbackmessage', paramObj, {
    baseURL: ApiRootUrl
  })
}

export default apii
