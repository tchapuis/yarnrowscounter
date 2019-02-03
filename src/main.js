import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import wysiwyg from "vue-wysiwyg";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(wysiwyg, {
  hideModules: { 
    "table": true, 
    "code": true,
    "link": true,
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
