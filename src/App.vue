<template>
    <div>
        <NavigationBar v-if="$route.meta.showNavbar === undefined"/>
        <router-view class="app"/>
    </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
    name: "App",
    components: {
        NavigationBar
    },
    created() {
        this.$store.dispatch("getUser");
    }
};
</script>
