<template>
    <div class="comment mb-5">
        <div class="d-flex align-items-center">
            <router-link to class="commet--picture">
                <img src="../assets/user-2.png" alt="User profile picture">
            </router-link>
            <p class="mb-0 ml-3">
                <router-link to class="comment--author mr-1">{{ author.username }}</router-link>
                <span class="comment--date">{{ getDate(datePublished) }}</span>
            </p>
        </div>
        <div class="comment--body ml-5 mt-3">
            <div class="comment--body--content">
                <div class v-html="body"/>
            </div>

            <div class="comment--body--info d-flex justify-content-end mt-4">
                <span class="mx-1 d-flex align-items-center mr-3">
                    {{ likes }}
                    <font-awesome-icon
                        :class="{ 'red-heart': alreadyLiked }"
                        class="comment--body--like ml-2"
                        icon="heart"
                        @click="toggleLike()"
                    />
                </span>
                <!-- <span class="mx-1">2 childs</span>
                <span class="mx-1">Reply</span>-->
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
    name: "IndividualComment",
    props: {
        authorID: Number,
        datePublished: Number,
        body: String,
        commentID: Number
    },
    data() {
        return {
            author: {},
            alreadyLiked: false,
            userLike: null,
            likes: null
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        this.getAuthorData();
        this.getLikes();
    },
    methods: {
        getDate(date) {
            return moment(date).format("MMMM DD, YYYY - LT");
        },
        getAuthorData() {
            axios
                .get(`/users/${this.authorID}`)
                .then(({ data: author }) => (this.author = author));
        },
        getLike() {
            axios
                .get(
                    `comments_likes/?commentID=${this.commentID}&userID=${
                        this.getUser.id
                    }`
                )
                .then(({ data }) => {
                    if (data.length) {
                        this.userLike = data[0].id;
                    }
                });
        },
        getLikes() {
            axios
                .get(`/comments_likes/?commentID=${this.commentID}`)
                .then(({ data: likesArray }) => {
                    this.likes = likesArray.length;
                    this.getLike();
                    if (
                        likesArray.find(like => like.userID === this.getUser.id)
                    ) {
                        this.alreadyLiked = true;
                    }
                });
        },
        toggleLike() {
            if (this.alreadyLiked) {
                axios.delete(`/comments_likes/${this.userLike}`).then(() => {
                    this.alreadyLiked = false;
                    this.getLikes();
                });
            } else {
                debugger;
                axios
                    .post(`/comments_likes`, {
                        commentID: this.commentID,
                        userID: this.getUser.id
                    })
                    .then(() => {
                        this.getLikes();
                    });
                debugger;
            }
        }
    }
};
</script>

<style lang="scss">
.comment {
    &--author {
        color: #414141;
    }

    &--date {
        color: $light-blue-color;
    }

    &--body {
        border: solid 1px rgba(0, 0, 0, 0.158);
        border-radius: 5px;
        padding: 1.7rem 1.7rem 1.2rem;

        &--like {
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
        }
    }
}
.red-heart {
    color: $red-color;
}
</style>
