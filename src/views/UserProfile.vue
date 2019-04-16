<template>
    <div class="user-profile container mt-5">
        <div class="user-profile--info d-flex justify-content-center align-items-center">
            <img
                src="../assets/profile-placeholder.png"
                alt="User image"
                class="user-profile--image"
            >
            <div class="d-flex flex-column ml-5">
                <h1 class="user-profile--name">{{ `${user.username}` }}</h1>
                <p class="user-profile--description mb-2">{{ user.name }} {{ user.lastName }}</p>
                <p
                    v-if="user.publicProfile || user.id === getUser.id"
                    class="user-profile--description"
                >{{ user.description }}</p>
            </div>
        </div>

        <profile-activity v-if="user.publicProfile || user.id === getUser.id"/>
        <h3 v-else class="user-profile--private text-center">This user profile is private /:</h3>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileActivity from "../components/ProfileActivity";

export default {
    name: "UserProfile",
    components: {
        ProfileActivity
    },

    data() {
        return {
            userID: this.$route.params.id,
            user: {}
        };
    },
    computed: {
        ...mapGetters({ getUser: "User/getUser" })
    },
    created() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            axios
                .get(`/users/${this.userID}`)
                .then(({ data: user }) => {
                    if (Object.keys(user).length) {
                        this.user = user;
                    }
                })
                .catch(() => this.$router.replace("/404"));
        }
    }
};
</script>

<style lang="scss">
.user-profile {
    &--image {
        width: 125px;
        height: 125px;
        border-radius: 50%;
    }

    &--name,
    &--activity {
        color: $navy-color;
        font-family: Georgia, "Times New Roman", Times, serif;
        font-weight: 500;
    }

    &--description {
        color: $navy-color;
    }

    &--tabs {
        color: $navy-color;
        cursor: pointer;
    }

    &--private {
        color: $navy-color;
        margin-top: 70px;
    }
}
</style>
