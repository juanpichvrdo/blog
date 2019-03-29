import Vue from 'vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VeeValidate from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './config';

require('toastr/build/toastr.css');

library.add(faSearch);
library.add(faArrowRight);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

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
