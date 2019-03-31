<template>
  <div>
    <NavigationBar v-if="showNavbar"/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import Cookies from "js-cookie";

export default {
  name: "App",
  components: {
    NavigationBar
  },
  data() {
    return {
      showNavbar: true
    };
  },
  watch: {
    $route() {
      if (this.$route.path === "/login" || this.$route.path === "/sign-up") {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    }
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
    if (this.$route.path === "/login" || this.$route.path === "/sign-up") {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
};
</script>
