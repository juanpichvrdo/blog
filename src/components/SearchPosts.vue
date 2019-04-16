<template>
    <div class="search-posts">
        <form class="search-posts--form" @submit.prevent="searchPost">
            <div class="input-group">
                <span class="search-posts--icon">
                    <font-awesome-icon class="search-posts--icon--svg" icon="search"/>
                </span>
                <input
                    v-model.trim="searchTerm"
                    type="text"
                    class="search-posts--input form-control"
                    placeholder="Search"
                >
                <div class="input-group-append">
                    <button type="submit" class="search-posts--button btn text-white">GO!</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchPosts",
    data() {
        return {
            searchTerm: ""
        };
    },
    methods: {
        searchPost() {
            if (this.searchTerm) {
                this.$store.dispatch("App/setSearch", {
                    searchTerm: this.searchTerm,
                    searchBy: "title"
                });
                this.$router.push(`/search-posts`);
            }
        }
    }
};
</script>

<style lang="scss">
.search-posts {
    &--heading {
        font-weight: 600;
    }

    &--input {
        border-top-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
        padding-left: 37px;
        position: relative;
    }

    &--button {
        background-color: $orange-color;
        padding: 0px 35px;

        @media only screen and (max-width: 1600px) {
            padding: 0px 30px;
        }

        @media only screen and (max-width: 1250px) {
            padding: 0px 20px;
        }
    }

    &--icon {
        position: absolute;
        top: 23%;
        left: 12px;
        z-index: 5;

        &--svg {
            color: #676767;
        }
    }
}
</style>
