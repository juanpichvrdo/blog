<template>
    <div class="post-list container mt-5">
        <h1 class="post-list--heading">Post List</h1>
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
import { mapGetters } from "vuex";
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
    computed: {
        ...mapGetters({ getUser: "User/getUser" })
    },
    created() {
        this.checkUserProfile();
    },
    methods: {
        checkUserProfile() {
            axios.get(`/users/${this.userID}`).then(({ data: user }) => {
                if (Object.keys(user).length) {
                    if (this.getUser.id !== user.id) {
                        this.$router.replace(`/`);
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss">
.post-list {
    &--heading {
        color: $navy-color;
        font-family: Georgia, "Times New Roman", Times, serif;
    }
}
</style>
