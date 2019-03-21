<template>
  <div
    class="alert--message alert alert-danger alert-dismissible fade show container"
    role="alert"
  >
    <strong>Wrong user name or password</strong>
    <button @click="$emit('closeMessage')" type="button" class="close">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',

};
</script>

<style>
</style>
