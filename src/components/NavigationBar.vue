<template>
  <nav class="navigation navbar py-0">
    <div class="container-fluid d-flex flex-column flex-sm-row">
      <a href="#" class="navigation--brand display-4 navbar-brand py-3 py-sm-3 px-md-5">Random Logo</a>
      <div class="navigation--user d-flex align-items-center pr-2 pr-md-5">
        <a class="navigation--user-active mr-4 py-4 px-3" href="#">BLOG</a>
        <img class="mx-3 py-sm-3" src="../assets/user-1.png" alt="User profile image">
        <div class="navigation--user-profile">
          <p class="navigation--user-message">Welcome, {{ getUser.username }}</p>
          <a class="navigation--user-logout" href="#" @click="$emit('logOut')">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavigationBar",
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style lang="scss">
.navigation {
  color: $white-color;
  background-color: $navy-color;
  padding-left: 100px;
  padding-right: 100px;

  @media only screen and (max-width: 1024px) {
    padding-left: 50px;
    padding-right: 50px;
  }
  @media only screen and (max-width: 800px) {
    padding-left: 25px;
    padding-right: 25px;
  }

  &--brand {
    color: $white-color;

    &:hover {
      color: #e3e4eb;
    }
  }

  &--user {
    font-size: 0.8rem;

    &-active {
      color: $white-color;
      border-bottom: 5px solid $white-color;

      &:hover {
        text-decoration: none;
        color: #e3e4eb;
        border-bottom: 4px solid #e3e4eb;
      }
    }

    &-profile {
      .navigation--user-logout {
        color: $light-blue-color;
      }
    }

    &-message {
      margin-bottom: 0;
      font-weight: 300;
    }
  }
}
</style>
