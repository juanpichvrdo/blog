<template>
  <div class="signup-form container">
    <div class="row justify-content-center">
      <div class="form card px-0 col-10 col-md-6 mt-5">
        <h2 class="form--heading text-center pb-4 mt-5 mb-4">Sign Up</h2>
        <div class="card-body">
          <form class="px-md-5">
            <div class="form-group mb-4">
              <label
                class="form--label"
                for="signUpEmail"
              >
                Email
              </label>
              <input
                class="form--input form-control form-control-lg"
                v-bind:class="{ 'is-invalid': emailIsInvalid }"
                type="email"
                id="signUpEmail"
                placeholder="jd@gmail.com"
              >
              <div class="invalid-feedback">
                This email is already taken.
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="signUpPassword">Password</label>
              <input
                class="form--input form-control form-control-lg"
                v-bind:class="{ 'is-invalid': passwordIsInvalid }"
                type="password"
                id="signUpPassword"
                placeholder="6 or more charachters"
              >
              <div class="invalid-feedback">
                The password must be 6 or more charachters.
              </div>
            </div>
            <div class="form-group mb-4">
              <label class="form--label" for="confirmSignUpPassword">Confirm Password</label>
              <input
                class="form--input form-control form-control-lg"
                v-bind:class="{ 'is-invalid': passwordDoNotMatch }"
                type="password"
                id="confirmSignUpPassword"
                placeholder="6 or more charachters"
              >
              <div class="invalid-feedback">
                Your confirm password should match.
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
export default {
  name: "SignUpForm",
  data() {
    return {
      emailIsInvalid: true,
      passwordIsInvalid: true,
      passwordDoNotMatch: true
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
