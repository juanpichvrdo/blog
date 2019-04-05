<template>
    <div class="user-settings container mt-5">
        <h2 class="user-settings--heading color-navy display-5">User Settings</h2>
        <hr class="mb-4">
        <form novalidate @submit.prevent="updateSettings">
            <div class="form-group mb-4 mb-4">
                <label class="form--label" for="username">Username</label>
                <input
                    id="username"
                    v-model="username"
                    type="email"
                    class="form-control form-control-lg form--input"
                    placeholder="Username"
                    name="username"
                >
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="firstName">First Name</label>
                <input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="First Name"
                    name="firstName"
                >
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="lastName">Last Name</label>
                <input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="Last Name"
                    name="lastName"
                >
            </div>
            <div class="form-group mb-4">
                <label class="form--label" for="description">Description</label>
                <input
                    id="description"
                    v-model="description"
                    type="text"
                    class="form-control form-control-lg form--input"
                    placeholder="Description"
                    name="description"
                >
            </div>
            <div class="form-group mb-4 form-check">
                <input
                    id="isPublic"
                    v-model="publicProfile"
                    type="checkbox"
                    class="form-check-input"
                >
                <label class="form-check-label form--label" for="isPublic">Public Profile</label>
            </div>
            <button type="submit" class="btn user-settings--btn btn-lg d-block mx-auto">Update</button>
        </form>
    </div>
</template>

<script>
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
            publicProfile: true
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        this.getUserProfile();
    },

    methods: {
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
        updateSettings() {
            axios
                .patch(`/users/${this.userID}`, {
                    username: this.username,
                    firstName: this.name,
                    lastName: this.lastName,
                    description: this.description,
                    publicProfile: this.publicProfile
                })
                .then(() => console.log("updated"));
        },
        checkUser() {
            console.log(this.getUser);
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
    .color-navy {
        color: $navy-color;
    }
}
</style>
