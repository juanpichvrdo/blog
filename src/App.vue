<template>
  <div>
    <login-form />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'

export default {
  name: 'app',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
// @import './assets/scss/main.scss';
 body {
   background-color: #E7EEF1;
 }
</style>
