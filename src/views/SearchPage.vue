<template>
    <div>
        <h2>Searching posts with {{ searchTerm }}</h2>
    </div>
</template>

<script>
export default {
    name: "SearchPage",
    data() {
        return {
            searchTerm: this.$route.params.search_term
        };
    },
    created() {
        axios
            .get(`/posts?title_like=${this.searchTerm}`)
            .then(result => console.log(result));
    }
};
</script>

<style lang="scss">
</style>
