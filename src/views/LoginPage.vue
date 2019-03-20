<template>
  <div class="login-form container">
    <div class="row justify-content-center">
      <div class="form card px-0 col-10 col-md-6 mt-5">
        <h2 class="form--heading text-center pb-4 mt-5 mb-4">Login</h2>
        <div class="card-body">
          <form
            class="px-md-5"
            @submit.prevent="validateForm"
            novalidate
          >
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
              <div class="invalid-feedback">
                {{ errors.first('email') }}
              </div>
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
              <div class="invalid-feedback">
                {{ errors.first('password') }}
              </div>
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
      <p class="col-12 text-center mt-5">Don't have an account?
        <router-link class="sign-up-link" to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie'
import toastr from 'toastr'
import { mapActions } from 'vuex'
import router from '../router.js'
window.Cookies = Cookies;

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.processForm();
          return;
        }
        // toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')
      })
    },
    processForm() {
      axios
        .get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
        .then(({ result: data }) => {
          if (data) {
            return data;
          } else {
            // Throw error message
          }
        })
        .then(user => {
            if (this.rememberMe) {
              Cookies.set('authenticated', true)
            };

            this.$store.dispatch('authenticateUser', user);
            router.push('/');
        })
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
