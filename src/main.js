import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';

require('toastr/build/toastr.css');


Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
