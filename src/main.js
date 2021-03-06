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
    faHeart,
    faComment,
    faThumbsUp,
    faReply,
    faSortAmountUp,
    faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VeeValidate from "vee-validate";
import "toastr/build/toastr.css";
import toastr from "toastr";
import Navbar from "bootstrap-vue/es/components/navbar";

import router from "./router";
import store from "./store";

import App from "./App.vue";
import { formatDate } from "./utils/helpers";
import "./config";

toastr.options = {
    closeButton: true,
    newestOnTop: false,
    preventDuplicates: true
};

console.log(store);

library.add(faSearch);
library.add(faArrowRight);
library.add(faTimes);
library.add(faEdit);
library.add(faHeart);
library.add(faComment);
library.add(faThumbsUp);
library.add(faReply);
library.add(faSortAmountUp);
library.add(faSortAmountDown);

Vue.filter("formatDate", formatDate);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Navbar);

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
