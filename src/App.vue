<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "app",
  components: {
  },
  data() {
    return {
      isAuthenticated: false
    };
  }
};
</script>

<style lang="scss">

body {
  background: #e7eef1;
  font-family: "Roboto", sans-serif;
  color: #707070;
}
</style>
