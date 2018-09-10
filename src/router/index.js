import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../views/login'], resolve),
    },
    {
      path:'/app',
      component: resolve => require(['../views/blnApp'], resolve),
      children:[
        // {path:'/app/ykt/sys/oilinvoice/list', component: resolve => require(['../views/yktSys/oilinvoice'], resolve),},
        {
          path:'/',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/page-app'], resolve),
        },
        {
          path:'/app/page',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/page-app'], resolve),
        },
        {
          path:'/app/menu',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/menuManage/menuList'], resolve),
        },
        {
          path:'/app/resource/tmaher',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/ep',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/design',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/advantage',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/dp',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/case',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/video',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/videoInfor/video'], resolve),
        },
        {
          path:'/app/resource/progress',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
        {
          path:'/app/resource/project',
          meta:{requiresAuth:true},
          component: resolve => require(['../views/resource/resource'], resolve),
        },
      ],
    },
  ]
})

