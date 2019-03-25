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
            <alert-message
              v-if="errorMessage"
              @closeMessage="errorMessage = ''"
            >
              {{ errorMessage }}
            </alert-message>
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
            <hr>
            <div class="form-group mb-4">
              <label
                class="form--label"
                for="signUpUsername"
              >
                Username
              </label>
              <input
                v-validate="'required'"
                class="form--input form-control form-control-lg"
                type="text"
                id="signUpUsername"
                placeholder="Username"
                name="username"
                v-model="username"
              >
              <div class="invalid-feedback">
                {{ errors.first('username') }}
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="name">
                Name
              </label>
              <input
                v-validate="'required'"
                class="form--input form-control form-control-lg"
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                v-model="name"
              >
              <div class="invalid-feedback">
                {{ errors.first('name') }}
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="last-name">Last Name</label>
              <input
                v-validate="'required'"
                class="form--input form-control form-control-lg"
                name="last-name"
                type="text"
                id="last-name"
                placeholder="Last Name"
                v-model="lastName"
              >
              <div class="invalid-feedback">
                {{ errors.first('last-name') }}
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="description">Description</label>
              <input
                v-validate="'required'"
                class="form--input form-control form-control-lg"
                name="description"
                type="text"
                id="description"
                placeholder="Description"
                v-model="description"
              >
              <div class="invalid-feedback">
                {{ errors.first('description') }}
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
import router from '../router.js';

import AlertMessage from '../components/AlertMessage'

export default {
  name: "SignUpForm",
  data() {
    return {
      email: '',
      password: '',
      username: '',
      name: '',
      lastName: '',
      description: '',
      dbUsername: '',
      errorMessage: ''
    }
  },
  components: {
    AlertMessage
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.checkEmail();
        }
      })
    },
    processForm() {
      axios.post('/users', {
        email: this.email,
        password: this.password,
        username: this.username,
        name: this.name,
        lastName: this.lastName,
        description: this.description,
      }).then(result => {
        const user = result.config.data
          console.log(user);
          if (user) {
            this.$store.dispatch('authenticateUser', user);
            router.push('/');
          } else {
            this.errorMessage = 'Error creating user';
          }
      })
    },
    checkEmail() {
      axios
        .get(`/users/?email=${this.email}`)
        .then(({ data }) => {
          const user = data[0];
          if (user) {
            this.errorMessage = 'That email is taken';
          } else {
            this.processForm();
          }
        })
    },
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
