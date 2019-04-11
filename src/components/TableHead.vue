<template>
    <thead class="table-head text-white">
        <tr>
            <th
                :class="{'activeColumnHead': activeColumn === '#'}"
                scope="col"
                @click="activeColumn = '#'; $emit('changeSort', 'number')"
            >
                #
                <span v-if="activeColumn === '#'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
            </th>
            <th
                :class="{'activeColumnHead': activeColumn === 'title'}"
                scope="col"
                @click="activeColumn = 'title'; $emit('changeSort', 'title')"
            >
                Title
                <span v-if="activeColumn === 'title'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
            </th>
            <th
                v-if="draft"
                :class="{'activeColumnHead': activeColumn === 'likes'}"
                scope="col"
                @click="activeColumn = 'likes'; $emit('changeSort', 'likes')"
            >
                Likes
                <span v-if="activeColumn === 'likes'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
            </th>
            <th
                v-if="draft"
                :class="{'activeColumnHead': activeColumn === 'comments'}"
                scope="col"
                @click="activeColumn = 'comments'; $emit('changeSort', 'comments')"
            >
                Comments
                <span v-if="activeColumn === 'comments'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
            </th>
            <th
                :class="{'activeColumnHead': activeColumn === 'created'}"
                scope="col"
                @click="activeColumn = 'created'; $emit('changeSort', 'createdDate')"
            >
                Created Date
                <span v-if="activeColumn === 'created'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
            </th>
            <th
                v-if="draft"
                :class="{'activeColumnHead': activeColumn === 'publish'}"
                scope="col"
                @click="activeColumn = 'publish'; $emit('changeSort', 'publishDate')"
            >
                Publish Date
                <span v-if="activeColumn === 'publish'">
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-up"/>
                    <font-awesome-icon class="table-head--icon ml-2" icon="sort-amount-down"/>
                </span>
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
            activeColumn: "#"
        };
    }
};
</script>

<style lang="scss">
.table-head {
    background-color: $navy-color;

    &--icon {
        font-size: 2rem;

        &:hover {
            cursor: pointer;
        }
    }

    tr th {
        padding: 10px;
    }
}
.activeColumnHead {
    background-color: $light-blue-color;
}
</style>
