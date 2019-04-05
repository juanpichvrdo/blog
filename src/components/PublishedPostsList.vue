<template>
    <h3>Published Posts {{ userID }}</h3>
</template>

<script>
export default {
    name: "PublishedPostList",
    data() {
        return {
            userID: this.$route.params.id,
            activeTab: "created"
        };
    },
    created() {
        this.getUserPosts();
    },
    methods: {
        getUserPosts() {
            axios
                .get(`users/${this.userID}/posts?state=1`)
                .then(({ data: posts }) => console.log(posts));
        }
    }
};
</script>

<style lang="scss">
</style>
