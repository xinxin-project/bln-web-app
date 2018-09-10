// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { post,fetch} from './utils/request'
import { getToken } from "./utils/auth"
import iView from 'iview';


import 'iview/dist/styles/iview.css';
import "./style/style.min.css";
import "./style/animate.min.css"

import i18n from './language'

Vue.use(iView);
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;



router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if(to.path === "/login"){
    next();
  }else {
    if (to.meta.requiresAuth && (!getToken() || getToken() === null )) {
      next({path: "/login"})
      iView.LoadingBar.finish();
    } else {
      next()


    }
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
