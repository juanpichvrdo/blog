<template>
  <div>
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import Cookies from "js-cookie";

export default {
  name: "app",
  components: {
    NavigationBar
  },
  created() {
    console.log(this.$route.name);
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
