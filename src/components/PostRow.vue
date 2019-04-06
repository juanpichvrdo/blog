<template>
    <tr>
        <th scope="row">{{ index }}</th>
        <td>
            <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
        </td>
        <td>{{ likes }}</td>
        <td>{{ comments }}</td>
        <td>{{ post.createdDate | formatDate }}</td>
        <td>{{ post.publishDate | formatDate }}</td>
    </tr>
</template>

<script>
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "PostRow",
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
            likes: null
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
</style>
