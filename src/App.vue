<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

require('bootstrap/dist/css/bootstrap.min.css');

export default {
  name: 'app',
  created() {
    const id = Cookies.get('id');
    if (id) {
      axios
        .get(`http://localhost:3000/users/?id=${id}`)
        .then(({ data }) => {
          const user = data[0];
          if (user) {
            this.$store.dispatch('authenticateUser', user);
          }
        });
    }
  },
};
</script>
