// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './assets/markdown-github.css'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.use(FormMaking)

Axios.defaults.withCredentials = true
Vue.prototype.$http = Axios

Vue.config.productionTip = false

Vue.filter('formatDate',function(value){
  if(!value) return ;
  var lastTime = new Date(value)
  var time = (new Date().getTime() - lastTime.getTime())/1000 // 现在的时间-最后一次回复时间=时间差。单位是毫秒
  if(time<0){
    return ;
  }else if(time < 60){
    return Math.round(time) + ' 秒前'
  }else if(time < 3600 ){
    return Math.round(time/60) + ' 分钟前'
  }else if(time < 86400){
    return Math.round(time/3600) + ' 小时前'
  }else if(time < 2592000){
    return Math.round(time/86400) + ' 天前'
  }else if(time < 31104000){
    return Math.round(time/2592000) + ' 个月前'
  }else{
    return Math.round(time/31104000) + ' 年前'
  }
})
Vue.filter('tabFormatter',function(item){
  if(item.isUp){
    return '置顶'
  }else if(item.good){
    return '精华'
  }else if(item.tab === 'share'){
    return '分享'
  }else if(item.tab === 'ask'){
    return '问答'
  }else if(item.tab === 'job'){
    return '招聘'
  }else{
    return '帖子'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
