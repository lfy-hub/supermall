import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.prototype.$bus=new Vue()

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer) 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
