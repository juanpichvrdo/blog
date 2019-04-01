<template>
    <div>
        <NavigationBar v-if="$route.meta.showNavbar === undefined"/>
        <router-view class="app"/>
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
            prevHeight: 0,
            showNavbar: true
        };
    },
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

<style lang="scss">
.app {
    margin-top: 72px;
}
</style>
