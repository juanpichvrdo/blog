import Vue from "vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueSweetalert2 from "vue-sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faArrowRight,
  faTimes,
  faEdit,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./config";
import moment from "moment";

require("toastr/build/toastr.css");

library.add(faSearch);
library.add(faArrowRight);
library.add(faTimes);
library.add(faEdit);
library.add(faHeart);

Vue.filter("formatDate", value => moment(value, "YYYY-MM-DD HH:mm:ss").fromNow());

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
