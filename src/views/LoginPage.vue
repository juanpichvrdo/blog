<template>
    <div class="login-form container">
        <div class="row justify-content-center">
            <div class="form card px-0 col-10 col-md-6 mt-5">
                <h2 class="form--heading text-center pb-4 mt-5 mb-4">Login</h2>
                <div class="card-body">
                    <form class="px-md-5" novalidate @submit.prevent="validateForm">
                        <div class="form-group mb-4">
                            <label class="form--label" for="loginEmail">Email</label>
                            <input
                                id="loginEmail"
                                v-model.trim="email"
                                class="form--input form-control form-control-lg"
                                type="email"
                                placeholder="jd@gmail.com"
                                name="email"
                            >
                            <div class="invalid-feedback">{{ errors.first('email') }}</div>
                        </div>

                        <div class="form-group mb-4">
                            <label class="form--label" for="loginPassword">Password</label>
                            <input
                                v-validate="'required|min:6'"
                                id="loginPassword"
                                v-model="password"
                                class="form--input form-control form-control-lg"
                                type="password"
                                placeholder="6 or more characters"
                                name="password"
                            >
                            <div class="invalid-feedback">{{ errors.first('password') }}</div>
                        </div>
                        <div class="row justify-content-between mb-5 px-3">
                            <div class="form-check">
                                <input
                                    id="rememberMeCheckbox"
                                    v-model="rememberMe"
                                    class="form--checkbox form-check-input"
                                    type="checkbox"
                                    value="rememberMe"
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
                <router-link class="sign-up-link" to="/sign-up">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import router from "../router";
import toastr from "toastr";

export default {
    name: "LoginForm",
    data() {
        return {
            email: localStorage.getItem("email") || "",
            password: localStorage.getItem("password") || "",
            rememberMe: true
        };
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
                    if (Object.keys(user).length) {
                        this.rememberUser(this.rememberMe);
                        Cookies.set("id", user.id);
                        this.$store.dispatch("User/authenticateUser", user);

                        router.push("/");
                    } else {
                        toastr.error("Wrong username or password");
                    }
                });
        },
        rememberUser(isRemebered) {
            if (isRemebered) {
                localStorage.setItem("email", this.email);
                localStorage.setItem("password", this.password);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            }
        }
    }
};
</script>

<style lang="scss">
.login-form {
    margin-top: 0px !important;

    .sign-up-link,
    .form--forgot-password {
        color: #1c6392;
        font-weight: 700;
    }
}
</style>
