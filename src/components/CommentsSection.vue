<template>
  <div class="comments">
    <div class="card comment-form">
      <div class="comment-form--header card-header">Leave a comment</div>
      <div class="card-body p-0">
        <vue-editor name="content" v-model="newCommentBody"></vue-editor>
        <div class="comment-form--buttons d-flex justify-content-end align-items-center">
          <a @click="newCommentBody = ''" class="mr-4 mr-sm-5 comment-form--cancel">Cancel</a>
          <button
            @click="submitComment"
            class="comment-form--add-comment btn btn-success mr-3"
          >Submit</button>
        </div>
      </div>
    </div>

    <h4 class="comments--heading mt-5">User comments</h4>
    <hr class="mb-4">
    <individual-comment
      v-for="comment in comments"
      :key="comment.id"
      :author="comment.author"
      :datePublished="comment.datePublished"
      :body="comment.body"
      :likes="comment.likes"
    ></individual-comment>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

import IndividualComment from "./IndividualComment";

export default {
  name: "CommentsSection",
  components: {
    VueEditor,
    IndividualComment
  },
  data() {
    return {
      comments: [],
      newCommentBody: "",
      commentCount: 0
    };
  },
  watch: {
    comments(newData, oldData) {
      this.commentCount = newData.length;
      axios.patch(`/posts/${this.postID}`, {
        commentCount: this.commentCount
      });
    }
  },
  created() {
    this.getComments();
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  props: {
    postID: String
  },
  methods: {
    getComments() {
      axios
        .get(`/comments?postID=${this.postID}`)
        .then(({ data: comments }) => {
          this.comments = comments;
        });
    },
    submitComment() {
      if (this.newCommentBody.length > 0) {
        axios
          .post("/comments", {
            body: this.newCommentBody,
            postID: this.postID,
            likes: 0,
            datePublished: Date.now(),
            author: this.getUser
          })
          .then(comment => this.comments.push(comment.data));
      }
    }
  }
};
</script>

<style lang="scss">
.quillWrapper {
  #quill-container {
    padding: 5px 20px 1.3rem;

    .ql-editor {
      border: solid 1px rgba(0, 0, 0, 0.158);
    }
  }
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border: none;
  }
  .ql-toolbar.ql-snow {
    padding: 8px 15px;
  }

  .ql-editor {
    min-height: 140px;
  }
}
.comments {
  background-color: $white-color;

  .comment-form {
    &--header {
      background-color: $light-blue-color;
      color: $white-color;
      font-size: 1.1rem;
    }

    &--add-comment {
      background-color: $navy-color;
      padding: 10px 80px;
    }

    &--cancel {
      color: #707070;
      cursor: pointer;
    }

    &--buttons {
      margin-bottom: 35px;
    }
  }

  &--heading {
    font-family: Georgia, "Times New Roman", Times, serif;
    color: $navy-color;
    font-weight: 600;
  }
}
</style>
