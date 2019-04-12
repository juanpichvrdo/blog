<template>
    <thead class="table-head text-white">
        <tr>
            <th scope="col">#</th>
            <th
                :class="{'activeColumnHead': activeColumn === 'title'}"
                scope="col"
                @click="changeActiveColumn('title')"
            >
                <div class="d-flex align-items-center justify-content-between">
                    Title
                    <span v-if="activeColumn === 'title'">
                        <font-awesome-icon
                            v-if="order === 'asc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-up"
                            @click="changeOrder('desc')"
                        />
                        <font-awesome-icon
                            v-if="order === 'desc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-down"
                            @click="changeOrder('asc')"
                        />
                    </span>
                </div>
            </th>
            <th
                v-if="draft"
                :class="{'activeColumnHead': activeColumn === 'likes'}"
                scope="col"
                @click="changeActiveColumn('likes')"
            >
                <div class="d-flex align-items-center justify-content-between">
                    Likes
                    <span v-if="activeColumn === 'likes'">
                        <font-awesome-icon
                            v-if="order === 'asc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-up"
                            @click="changeOrder('desc')"
                        />
                        <font-awesome-icon
                            v-if="order === 'desc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-down"
                            @click="changeOrder('asc')"
                        />
                    </span>
                </div>
            </th>
            <th v-if="draft" scope="col">
                <div class="d-flex align-items-center justify-content-between">Comments</div>
            </th>
            <th
                :class="{'activeColumnHead': activeColumn === 'createdDate'}"
                scope="col"
                @click="changeActiveColumn('createdDate')"
            >
                <div class="d-flex align-items-center justify-content-between">
                    Created Date
                    <span v-if="activeColumn === 'createdDate'">
                        <font-awesome-icon
                            v-if="order === 'asc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-up"
                            @click="changeOrder('desc')"
                        />
                        <font-awesome-icon
                            v-if="order === 'desc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-down"
                            @click="changeOrder('asc')"
                        />
                    </span>
                </div>
            </th>
            <th
                v-if="draft"
                :class="{'activeColumnHead': activeColumn === 'publishDate'}"
                scope="col"
                @click="changeActiveColumn('publishDate')"
            >
                <div class="d-flex align-items-center justify-content-between">
                    Publish Date
                    <span v-if="activeColumn === 'publishDate'">
                        <font-awesome-icon
                            v-if="order === 'asc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-up"
                            @click="changeOrder('desc')"
                        />
                        <font-awesome-icon
                            v-if="order === 'desc'"
                            class="table-head--icon ml-2"
                            icon="sort-amount-down"
                            @click="changeOrder('asc')"
                        />
                    </span>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
export default {
    name: "TableHead",
    props: {
        draft: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            activeColumn: "createdDate",
            order: "desc"
        };
    },
    methods: {
        changeActiveColumn(column) {
            if (column !== this.activeColumn) {
                this.order = "desc";
            }

            this.activeColumn = column;
            this.$emit("changeSort", column);
        },
        changeOrder(order) {
            this.order = order;
            this.$emit("orderChanged", order);
        }
    }
};
</script>

<style lang="scss">
.table-head {
    background-color: $navy-color;

    &--icon {
        font-size: 2rem;
    }

    tr th {
        padding: 10px;
        transition: all 0.1s;

        &:hover {
            background-color: $light-blue-color;
            cursor: pointer;
        }

        &:nth-child(4):hover,
        &:nth-child(1):hover {
            background-color: $navy-color;
            cursor: default;
        }
    }
}
.activeColumnHead {
    background-color: $light-blue-color;
}
</style>
