<template>
    <div class="user-settings container mt-5">
        <h2 class="user-settings--heading color-navy display-5">User Settings</h2>

        <ul class="nav nav-tabs mt-4 mb-5">
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'profile'}"
                    class="nav-link user-settings--tabs"
                    @click="activeTab = 'profile'"
                >Profile</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'security'}"
                    class="nav-link user-settings--tabs"
                    @click="activeTab = 'security'"
                >Security</a>
            </li>
        </ul>

        <form v-if="activeTab === 'security'" novalidate @submit.prevent="validateFormSecurity">
            <div class="form-group mb-4">
                <label class="form--label" for="password">Password</label>
                <input
                    v-validate="'required|min:6'"
                    id="password"
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
                <label class="form--label" for="confirmsign-up-password">Confirm Password</label>
                <input
                    v-validate="'required|min:6|confirmed:password'"
                    id="confirmSignUpPassword"
                    v-model="confirmPassword"
                    class="form--input form-control form-control-lg"
                    name="password_confirmation"
                    type="password"
                    placeholder="6 or more characters"
                    data-vv-as="password"
                >
                <div class="invalid-feedback">{{ errors.first('password_confirmation') }}</div>
            </div>

            <button type="submit" class="mb-5 btn user-settings--btn btn-lg d-block mx-auto">Update</button>
        </form>

        <form v-if="activeTab === 'profile'" novalidate @submit.prevent="validateFormProfile">
            <div class="form-group mb-4 mb-4">
                <label class="form--label" for="username">Username</label>
                <input
                    id="username"
                    v-model.trim="username"
                    type="email"
                    class="form-control form-control-lg form--input"
                    placeholder="Username"
                    name="username"
                >
                <div class="invalid-feedback">{{ errors.first('username') }}</div>
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="firstName">First Name</label>
                <input
                    id="firstName"
                    v-model.trim="firstName"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="First Name"
                    name="firstName"
                >
                <div class="invalid-feedback">{{ errors.first('firstName') }}</div>
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="lastName">Last Name</label>
                <input
                    id="lastName"
                    v-model.trim="lastName"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="Last Name"
                    name="lastName"
                >
                <div class="invalid-feedback">{{ errors.first('lastName') }}</div>
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="description">Description</label>
                <input
                    id="description"
                    v-model.trim="description"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="Description"
                    name="description"
                >
                <div class="invalid-feedback">{{ errors.first('description') }}</div>
            </div>
            <div class="form-group mb-4 form-check">
                <input
                    id="isPublic"
                    v-model.trim="publicProfile"
                    type="checkbox"
                    class="form-check-input"
                >
                <label class="form-check-label form--label" for="isPublic">Public Profile</label>
            </div>
            <button type="submit" class="mb-5 btn user-settings--btn btn-lg d-block mx-auto">Update</button>
        </form>
    </div>
</template>

<script>
import toastr from "toastr";
import { mapGetters } from "vuex";

export default {
    name: "UserSettings",
    data() {
        return {
            userID: this.$route.params.id,
            username: "",
            firstName: "",
            lastName: "",
            description: "",
            publicProfile: true,
            activeTab: "profile",
            password: "",
            confirmPassword: ""
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        this.getUserProfile();
    },
    methods: {
        validateFormSecurity() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.updateSecuritySettings();
                }
            });
        },
        validateFormProfile() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.checkUsername();
                }
            });
        },
        getUserProfile() {
            axios.get(`/users/${this.userID}`).then(({ data: user }) => {
                if (Object.keys(user).length) {
                    if (this.getUser.id === user.id) {
                        this.username = user.username;
                        this.firstName = user.name;
                        this.lastName = user.lastName;
                        this.description = user.description;
                        this.publicProfile = user.publicProfile;
                    } else {
                        this.$router.push(`/`);
                    }
                }
            });
        },
        checkUsername() {
            axios
                .get(
                    `/users/?username=${this.username}&id_ne=${this.getUser.id}`
                )
                .then(({ data }) => {
                    const user = data[0];
                    if (user) {
                        toastr.error(
                            "Please choose another one",
                            "That username is taken"
                        );
                    } else {
                        this.updateProfileSettings();
                    }
                });
        },
        updateProfileSettings() {
            axios
                .patch(`/users/${this.userID}`, {
                    username: this.username,
                    firstName: this.name,
                    lastName: this.lastName,
                    description: this.description,
                    publicProfile: this.publicProfile
                })
                .then(({ data }) => {
                    if (data) {
                        this.$store.dispatch("getUser");

                        toastr.success("Profile updated successfully");
                    } else {
                        toastr.error(
                            "Please try again",
                            "Error updating profile"
                        );
                    }
                });
        },
        updateSecuritySettings() {
            axios
                .patch(`/users/${this.userID}`, {
                    password: this.editPassword
                })
                .then(({ data }) => {
                    if (data) {
                        this.$store.dispatch("getUser");
                        toastr.success("Password updated successfully");
                    } else {
                        toastr.error(
                            "Please try again",
                            "Error updating password"
                        );
                    }
                });
        }
    }
};
</script>

<style lang="scss">
.user-settings {
    &--heading {
        font-family: Georgia, "Times New Roman", Times, serif;
        font-weight: 600;
        margin: 0 auto;
    }

    &--btn {
        background-color: $navy-color;
        padding: 10px 100px;
        color: $white-color;
        &:hover {
            color: $white-color;
            background-color: #1d70a8;
        }
    }

    &--tabs {
        cursor: pointer;
    }

    .color-navy {
        color: $navy-color;
    }
}
</style>
