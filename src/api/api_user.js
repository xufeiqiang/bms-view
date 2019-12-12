

export default {
  //登录
  login: params => {
    return API.POST('/api-admin/oauth/token', params)
  },

}
