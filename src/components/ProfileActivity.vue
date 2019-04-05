<template>
    <div class="profile-activity">
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
    name: "ProfileActivity",
    components: {
        CreatedPosts,
        CommentedPosts,
        LikedPosts
    },
    data() {
        return {
            activeTab: "created"
        };
    }
};
</script>

<style>
</style>
