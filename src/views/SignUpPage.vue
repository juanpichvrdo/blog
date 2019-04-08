<template>
    <div class="signup-form container">
        <div class="row justify-content-center">
            <div class="form card px-0 col-10 col-md-6 mt-5">
                <h2 class="form--heading text-center pb-4 mt-5 mb-4">Sign Up</h2>
                <div class="card-body">
                    <form novalidate class="px-md-5" @submit.prevent="validateForm">
                        <alert-message
                            v-if="errorMessage"
                            @closeMessage="errorMessage = ''"
                        >{{ errorMessage }}</alert-message>
                        <div class="form-group mb-4">
                            <label class="form--label" for="signUpEmail">Email</label>
                            <input
                                v-validate="'required|email'"
                                id="signUpEmail"
                                v-model="email"
                                class="form--input form-control form-control-lg"
                                type="email"
                                placeholder="jd@gmail.com"
                                name="email"
                            >
                            <div class="invalid-feedback">{{ errors.first('email') }}</div>
                        </div>
                        <div class="form-group mb-4">
                            <label class="form--label" for="signup-password">Password</label>
                            <input
                                v-validate="'required|min:6'"
                                id="signup-password"
                                ref="password"
                                v-model="password"
                                class="form--input form-control form-control-lg"
                                type="password"
                                placeholder="6 or more characters"
                                name="password"
                            >
                            <div class="invalid-feedback">{{ errors.first('password') }}</div>
                        </div>
                        <div class="form-group mb-4">
                            <label
                                class="form--label"
                                for="confirmsign-up-password"
                            >Confirm Password</label>
                            <input
                                v-validate="'required|min:6|confirmed:password'"
                                id="confirmSignUpPassword"
                                class="form--input form-control form-control-lg"
                                name="password_confirmation"
                                type="password"
                                placeholder="6 or more characters"
                                data-vv-as="password"
                            >
                            <div
                                class="invalid-feedback"
                            >{{ errors.first('password_confirmation') }}</div>
                        </div>
                        <hr>
                        <div class="form-group mb-4">
                            <label class="form--label" for="signUpUsername">Username</label>
                            <input
                                v-validate="'required'"
                                id="signUpUsername"
                                v-model="username"
                                class="form--input form-control form-control-lg"
                                type="text"
                                placeholder="Username"
                                name="username"
                            >
                            <div class="invalid-feedback">{{ errors.first('username') }}</div>
                        </div>
                        <div class="form-group mb-4">
                            <label class="form--label" for="name">Name</label>
                            <input
                                v-validate="'required'"
                                id="name"
                                v-model="name"
                                class="form--input form-control form-control-lg"
                                type="text"
                                placeholder="Name"
                                name="name"
                            >
                            <div class="invalid-feedback">{{ errors.first('name') }}</div>
                        </div>
                        <div class="form-group mb-4">
                            <label class="form--label" for="last-name">Last Name</label>
                            <input
                                v-validate="'required'"
                                id="last-name"
                                v-model="lastName"
                                class="form--input form-control form-control-lg"
                                name="last-name"
                                type="text"
                                placeholder="Last Name"
                            >
                            <div class="invalid-feedback">{{ errors.first('last-name') }}</div>
                        </div>
                        <div class="form-group mb-4">
                            <label class="form--label" for="description">Description</label>
                            <input
                                v-validate="'required'"
                                id="description"
                                v-model="description"
                                class="form--input form-control form-control-lg"
                                name="description"
                                type="text"
                                placeholder="Description"
                            >
                            <div class="invalid-feedback">{{ errors.first('description') }}</div>
                        </div>
                        <button
                            class="form--button btn btn-info btn-lg d-block mx-auto mb-5"
                        >SIGN UP</button>
                    </form>
                </div>
            </div>
            <p class="col-12 text-center mt-5">
                Already have an account?
                <router-link class="login-link" to="/login">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import toastr from "toastr";
import router from "../router.js";

import AlertMessage from "../components/AlertMessage";

export default {
    name: "SignUpForm",
    components: {
        AlertMessage
    },
    data() {
        return {
            email: "",
            password: "",
            username: "",
            name: "",
            lastName: "",
            description: "",
            dbUsername: "",
            errorMessage: ""
        };
    },
    methods: {
        validateForm() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.checkEmail();
                }
            });
        },
        processForm() {
            axios
                .post("/users", {
                    email: this.email,
                    password: this.password,
                    username: this.username,
                    name: this.name,
                    lastName: this.lastName,
                    description: this.description,
                    publicProfile: true
                })
                .then(response => {
                    const user = response.data;
                    console.log(user);
                    if (user) {
                        Cookies.set("id", user.id);
                        this.$store.dispatch("authenticateUser", user);
                        toastr["success"]("Sign up succesfully!");
                        router.push("/");
                    } else {
                        toastr["error"](
                            "Please try again",
                            "Error creating user"
                        );
                    }
                });
        },
        checkEmail() {
            axios.get(`/users/?email=${this.email}`).then(({ data }) => {
                const user = data[0];
                if (user) {
                    toastr["error"](
                        "Please choose another one",
                        "That email is taken"
                    );
                } else {
                    this.checkUsername();
                }
            });
        },
        checkUsername() {
            axios.get(`/users/?username=${this.username}`).then(({ data }) => {
                const user = data[0];
                if (user) {
                    toastr["error"](
                        "Please choose another one",
                        "That username is taken"
                    );
                } else {
                    this.processForm();
                }
            });
        }
    }
};
</script>

<style lang="scss">
.signup-form {
    margin-top: 0px !important;

    .login-link {
        color: #1c6392;
        font-weight: 700;
    }
}
</style>
