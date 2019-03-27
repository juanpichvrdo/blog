<template>
  <div class="login-form container">
    <div class="row justify-content-center">
      <div class="form card px-0 col-10 col-md-6 mt-5">
        <h2 class="form--heading text-center pb-4 mt-5 mb-4">Login</h2>
        <div class="card-body">
          <form class="px-md-5" @submit.prevent="validateForm" novalidate>
            <alert-message
              v-if="showError"
              @closeMessage="showError = false"
            >Wrong user name or password.</alert-message>
            <div class="form-group mb-4">
              <label class="form--label" for="loginEmail">Email</label>
              <input
                v-validate="'required|email'"
                class="form--input form-control form-control-lg"
                type="email"
                id="loginEmail"
                placeholder="jd@gmail.com"
                name="email"
                v-model="email"
              >
              <div class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>

            <div class="form-group mb-4">
              <label class="form--label" for="loginPassword">Password</label>
              <input
                v-validate="'required|min:6'"
                class="form--input form-control form-control-lg"
                type="password"
                id="loginPassword"
                placeholder="6 or more characters"
                name="password"
                v-model="password"
              >
              <div class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="row justify-content-between mb-5 px-3">
              <div class="form-check">
                <input
                  class="form--checkbox form-check-input"
                  type="checkbox"
                  id="rememberMeCheckbox"
                  value="rememberMe"
                  v-model="rememberMe"
                >
                <label class="form-check-label" for="rememberMeCheckbox">Remember Me</label>
              </div>
              <a class="form--forgot-password" href="#">Forgot password?</a>
            </div>
            <button class="form--button btn btn-info btn-lg d-block mx-auto mb-5">LOG IN</button>
          </form>
        </div>
      </div>
      <p class="col-12 text-center mt-5">
        Don't have an account?
        <router-link class="sign-up-link" to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import router from "../router";

import AlertMessage from "../components/AlertMessage";

export default {
  name: "LoginForm",
  data() {
    return {
      email: localStorage.getItem("email") || "",
      password: localStorage.getItem("password") || "",
      rememberMe: false,
      showError: false
    };
  },
  components: {
    AlertMessage
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.processForm();
        }
      });
    },
    processForm() {
      axios
        .get(`/users?email=${this.email}&password=${this.password}`)
        .then(({ data }) => {
          const user = data[0];
          console.log(user);
          if (user) {
            if (this.rememberMe) {
              localStorage.setItem("email", this.email);
              localStorage.setItem("password", this.password);
            } else {
              localStorage.removeItem("email");
              localStorage.removeItem("password");
            }
            Cookies.set("id", user.id);
            this.$store.dispatch("authenticateUser", user);
            router.push("/");
          } else {
            this.showError = true;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.login-form {
  .sign-up-link,
  .form--forgot-password {
    color: #1c6392;
    font-weight: 700;
  }
}
</style>
