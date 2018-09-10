/**
 * Created by wuqingxin on 18/08/06.
 */

const baseURL = "http://api.zhou-nihao.com"      //地址
// const baseURL = "http://192.168.1.156:8080/boloni"

const api = {
  baseURL: baseURL,
  loginByUsername: baseURL+'/login/weblogin',     //登陆
  menuBylist:baseURL+'/menu/webget',              //菜单列表
  homeByUrl:baseURL+'/menu/home',                 //首页
  toResource:baseURL+'/resource/webget',          //德国钛马赫
  toSortMenu:baseURL+'/menu/sortMenu',            //资源排序
  toResourceSort:baseURL+'/resource/sortMenu',    //内容排序
  toRreate:baseURL+'/resource/create',            //批量上传
  toUpdata:baseURL+'/resource/update',            //内容修改单张图片
  toGetAll:baseURL+'/menu/getAll',
  toMenuUpdate:baseURL+'/menu/update'

}

export default api
