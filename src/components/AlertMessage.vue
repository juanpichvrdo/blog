<template>
  <div
    class="alert--message alert alert-danger"
    role="alert"
  >
    <strong>
      <slot></slot>
    </strong>
    <button
      @click="$emit('closeMessage')"
      type="button"
      class="close"
    >
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AlertMessage"
};
</script>

<style>
</style>
