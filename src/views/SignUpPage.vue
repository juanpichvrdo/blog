<template>
  <div class="signup-form container">
    <div class="row justify-content-center">
      <div class="form card px-0 col-10 col-md-6 mt-5">
        <h2 class="form--heading text-center pb-4 mt-5 mb-4">Sign Up</h2>
        <div class="card-body">
          <form
            class="px-md-5"
            @submit.prevent="validateForm"
            novalidate
          >
            <div class="form-group mb-4">
              <label
                class="form--label"
                for="signUpEmail"
              >
                Email
              </label>
              <input
                v-validate="'required|email'"
                class="form--input form-control form-control-lg"
                type="email"
                id="signUpEmail"
                placeholder="jd@gmail.com"
                name="email"
                v-model="email"
              >
              <div class="invalid-feedback">
                {{ errors.first('email') }}
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="signup-password">Password</label>
              <input
                v-validate="'required|min:6'"
                class="form--input form-control form-control-lg"
                type="password"
                id="signup-password"
                placeholder="6 or more characters"
                ref="password"
                name="password"
                v-model="password"
              >
              <div class="invalid-feedback">
                {{ errors.first('password') }}
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="confirmsign-up-password">Confirm Password</label>
              <input
                v-validate="'required|min:6|confirmed:password'"
                class="form--input form-control form-control-lg"
                name="password_confirmation"
                type="password"
                id="confirmSignUpPassword"
                placeholder="6 or more characters"
                data-vv-as="password"
              >
              <div class="invalid-feedback">
                {{ errors.first('password_confirmation') }}
              </div>
            </div>
            <button class="form--button btn btn-info btn-lg d-block mx-auto mb-5">SIGN UP</button>
          </form>
        </div>
      </div>
      <p class="col-12 text-center mt-5">Already have an account?
        <router-link class="login-link" to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router.js';

export default {
  name: "SignUpForm",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.checkEmail();
        }
      })
    },
    processForm() {
      axios.post('http://localhost:3000/users', {
        email: this.email,
        password: this.password
      }).then((user) => {
          console.log(user);
          if (user) {
            this.$store.dispatch('authenticateUser', user);
            router.push('/');
          } else {
            // Throw error message
            console.log('Error creating user');
          }
      })
    },
    checkEmail() {
      const emailExist = axios
        .get(`http://localhost:3000/users/?email=${this.email}`)
        .then(({ data }) => {
          const user = data[0];
          if (user) {
            console.log('That email is already taken');
          } else {
            this.processForm();
          }
        })
    }
  }
};
</script>

<style lang="scss">
.signup-form {
  .login-link {
    color: #1c6392;
    font-weight: 700;
  }
}

</style>
