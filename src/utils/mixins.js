import { POST_STATE } from "./helpers";

export const postMixins = {
    methods: {
        confirmDeletePost() {
            this.$swal({
                title: "Are you sure you want to delete this post?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1c6392",
                cancelButtonColor: "#dd1e1e",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.deletePost();
                    this.$swal("Deleted!", "Your post has been deleted.", "success");
                }
            });
        }
    }
};

export const commentMixins = {
    data() {
        return {
            customToolbar: [
                ["bold", "italic", "underline", { color: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
                [{ indent: "-1" }, { indent: "+1" }]
            ]
        };
    }
};

export const singlePostMixins = {
    methods: {
        getLikes() {
            axios.get(`/posts_likes/?postId=${this.post.id}`).then(({ data: likesArray }) => {
                this.likes = likesArray.length;
            });
        },
        getComments() {
            axios.get(`/comments/?postId=${this.post.id}`).then(({ data: commentsArray }) => {
                this.comments = commentsArray.filter(
                    comment => comment.state === POST_STATE.published
                ).length;
            });
        }
    }
};
