import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
