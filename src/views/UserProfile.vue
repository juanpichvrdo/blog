<template>
    <div class="user-profile container mt-5">
        <div class="user-profile--info d-flex justify-content-center align-items-center">
            <img
                src="../assets/profile-placeholder.png"
                alt="User image"
                class="user-profile--image"
            >
            <div class="d-flex flex-column ml-5">
                <h1 class="user-profile--name">{{ `${user.name} ${user.lastName}` }}</h1>
                <p class="user-profile--description">{{ user.description }}</p>
            </div>
        </div>

        <profile-activity/>
    </div>
</template>

<script>
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
    created() {
        this.getUserData();
    },

    methods: {
        getUserData() {
            axios
                .get(`/users/${this.userID}`)
                .then(({ data: user }) => (this.user = user));
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
}
</style>
