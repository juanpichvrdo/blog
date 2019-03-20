<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      isAuthenticated: false
    };
  }
};
</script>
