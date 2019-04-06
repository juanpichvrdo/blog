<template>
    <tr class="post-row">
        <th scope="row">{{ index }}</th>
        <td>
            <router-link
                v-if="post.state === POST_STATE.published"
                :to="`/posts/${post.id}`"
                class="post-row--title"
            >{{ post.title }}</router-link>

            <router-link
                v-if="post.state === POST_STATE.draft || post.state === POST_STATE.deleted"
                :to="`/edit-post/${post.id}`"
                class="post-row--title"
            >{{ post.title }}</router-link>
        </td>
        <td
            v-if="post.state === POST_STATE.published || post.state === POST_STATE.deleted"
        >{{ likes }}</td>
        <td
            v-if="post.state === POST_STATE.published || post.state === POST_STATE.deleted"
        >{{ comments }}</td>
        <td>{{ post.createdDate | formatDate }}</td>
        <td v-if="post.state === POST_STATE.published || post.state === POST_STATE.deleted">
            <span v-if="post.publishDate !== null">{{ post.publishDate | formatDate }}</span>
            <span v-else>Never was published</span>
        </td>
    </tr>
</template>

<script>
import { POST_STATE } from "../utils/helpers.js";
import { singlePostMixins } from "../utils/mixins";

export default {
    name: "PostRow",
    mixins: [singlePostMixins],
    props: {
        post: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            comments: null,
            likes: null,
            POST_STATE
        };
    },
    created() {
        this.getComments();
        this.getLikes();
    },
    methods: {
        getComments() {
            axios
                .get(`/comments/?postId=${this.post.id}`)
                .then(({ data: commentsArray }) => {
                    this.comments = commentsArray.filter(
                        comment => comment.state === POST_STATE.published
                    ).length;
                });
        },
        getLikes() {
            axios
                .get(`/posts_likes/?postId=${this.post.id}`)
                .then(({ data: likesArray }) => {
                    this.likes = likesArray.length;
                });
        }
    }
};
</script>

<style lang="scss">
.post-row {
    &--title {
        color: $light-blue-color;
    }
}
</style>
