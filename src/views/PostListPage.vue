<template>
    <div class="post-list container mt-5">
        <h1>Post List</h1>
        <ul class="nav nav-tabs mt-4 mb-5">
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'created'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'created'"
                >Published</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'drafted'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'drafted'"
                >Drafted</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'deleted'}"
                    class="nav-link user-profile--tabs"
                    @click="activeTab = 'deleted'"
                >Deleted</a>
            </li>
        </ul>
        <div v-if="activeTab === 'created'">
            <published-posts-list/>
        </div>
        <div v-else-if="activeTab === 'drafted'">
            <drafted-posts-list/>
        </div>
        <div v-else-if="activeTab === 'deleted'">
            <deleted-posts-list/>
        </div>
    </div>
</template>

<script>
import PublishedPostsList from "../components/PublishedPostsList";
import DraftedPostsList from "../components/DraftedPostsList";
import DeletedPostsList from "../components/DeletedPostsList";

export default {
    name: "PostListPage",
    components: {
        PublishedPostsList,
        DraftedPostsList,
        DeletedPostsList
    },
    data() {
        return {
            userID: this.$route.params.id,
            activeTab: "created"
        };
    },

    created() {
        // this.getUserPosts();
    },
    methods: {
        // getUserPosts() {
        //     axios
        //         .get(`/users/${this.userID}/posts`)
        //         .then(({ data: posts }) => console.log(posts));
        // }
    }
};
</script>

<style lang="scss">
</style>
