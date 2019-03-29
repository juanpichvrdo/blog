<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import Cookies from "js-cookie";

require("bootstrap/dist/css/bootstrap.min.css");

export default {
  name: "app",
  created() {
    const id = Cookies.get("id");
    if (id) {
      axios.get(`/users/?id=${id}`).then(({ data }) => {
        const user = data[0];
        if (user) {
          this.$store.dispatch("authenticateUser", user);
        }
      });
    }
  }
};
</script>
