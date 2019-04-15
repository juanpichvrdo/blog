<template>
    <nav class="d-flex justify-content-center mb-5">
        <ul class="pagination pagination-lg">
            <li v-if="activePage !== 1" class="page-item" @click.prevent="movePrev">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>

            <div v-for="page in numberOfPages" :key="page">
                <li
                    :class="{'active': page === activePage}"
                    class="page-item"
                    @click.prevent="changePage(page)"
                >
                    <a class="page-link" href="#">{{ page }}</a>
                </li>
            </div>

            <li v-if="activePage < numberOfPages" class="page-item" @click.prevent="moveNext">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "PaginationComponent",

    props: {
        perPage: {
            type: Number,
            required: true
        },
        numberOfPages: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            activePage: 1
        };
    },
    methods: {
        changePage(page) {
            this.activePage = page;
            this.$emit("pageChanged", this.activePage);
        },
        movePrev() {
            this.activePage--;
            this.$emit("pageChanged", this.activePage);
        },
        moveNext() {
            this.activePage++;
            this.$emit("pageChanged", this.activePage);
        }
    }
};
</script>

<style lang="scss">
</style>
