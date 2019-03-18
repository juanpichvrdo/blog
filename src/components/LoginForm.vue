<template>
  <div class="form--container">
    <h2 class="form--heading">BlogLogo</h2>
    <form>
      <div class="form-group">
        <label for="loginPassword">Email</label>
        <input type="email" id="loginEmail" class="form-control" placeholder="jd@gmail.com">
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input type="password" id="loginPassword" class="form-control" placeholder="6 or more charachters">
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
        <label class="form-check-label" for="defaultCheck1">
          Remember Me
        </label>
      </div>
      <a href="#">Forgot password?</a>
      <input type="submit" value="LOG IN" class="btn btn-info btn-lg">
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
}
</script>

<style lang="scss" scoped>
.form {
  &--container {
    background-color: white;
  }
}
</style>
