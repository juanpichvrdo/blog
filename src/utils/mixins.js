const postMixins = {
  methods: {
    confirmDelete() {
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

export default postMixins;
