<template>
  <div class="login-form container">
    <div class="row justify-content-center">
      <div class="form card px-0 col-10 col-md-6 mt-5">
        <h2 class="form--heading text-center pb-4 mt-5 mb-4">Login</h2>
        <div class="card-body">
          <form class="px-md-5" @submit.prevent="processForm">
            <div class="form-group mb-4">
              <label class="form--label" for="loginEmail">Email</label>
              <input
                class="form--input form-control form-control-lg"
                type="email"
                id="loginEmail"
                placeholder="jd@gmail.com"
                name="email"
                v-model="email"
              >
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="loginPassword">Password</label>
              <input
                class="form--input form-control form-control-lg"
                type="password"
                id="loginPassword"
                placeholder="6 or more charachters"
                name="password"
                v-model="password"
              >
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
import { mapActions, mapGetters } from 'vuex'
import router from '../router.js'

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
    processForm() {
      axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
        .then((result) => result.data[0])
        .then(user => {
          if (user) {
            if (this.rememberMe) {
              Cookies.set('authenticated', 'true');
            }
            this.$store.dispatch('authenticateUser', { ...user })
            router.push('/');
          } else {
            console.log('User does not exist')
          }
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
