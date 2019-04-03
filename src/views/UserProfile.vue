<template>
    <div class="user-profile container mt-5">
        <div class="user-profile--info d-flex justify-content-center align-items-center">
            <img
                src="../assets/profile-placeholder.png"
                alt="User image"
                class="user-profile--image"
            >
            <div class="d-flex flex-column ml-5">
                <h1 class="user-profile--name">{{ `${user.name} ${user.last_name}` }}</h1>
                <p class="user-profile--description">{{ user.description }}</p>
            </div>
        </div>

        <h2 class="user-profile--activity mt-5">Activity</h2>
        <ul class="nav nav-tabs mt-4 mb-5">
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'created'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'created'"
                >Created Posts</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'commented'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'commented'"
                >Commented Posts</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'liked'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'liked'"
                >Liked Posts</a>
            </li>
        </ul>
        <div v-if="activeTab === 'created'">
            <created-posts/>
        </div>
        <div v-else-if="activeTab === 'commented'">
            <commented-posts/>
        </div>
        <div v-else-if="activeTab === 'liked'">
            <liked-posts/>
        </div>
    </div>
</template>

<script>
import CreatedPosts from "../components/CreatedPosts";
import CommentedPosts from "../components/CommentedPosts";
import LikedPosts from "../components/LikedPosts";

export default {
    name: "UserProfile",
    components: {
        CreatedPosts,
        CommentedPosts,
        LikedPosts
    },
    data() {
        return {
            userID: this.$route.params.id,
            user: {},
            activeTab: "created"
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
