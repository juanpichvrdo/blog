<template>
  <div class="search-posts p-2 p-md-4 p-md-5">
    <h4 class="search-posts--heading mb-3">Search for posts</h4>
    <form class="search-posts--form">
      <div class="input-group mb-3">
        <!-- <div class="input-group-prepend pl-2 bg-white"> -->
          <span class="search-posts--icon">
            <font-awesome-icon class="input-group-addon" icon="search"/>
          </span>
        <!-- </div> -->
        <input type="text" class="search-posts--input form-control py-4" placeholder="Search">

        <div class="input-group-append">
          <button class="search-posts--button btn text-white" type="button">GO!</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchPosts',
};
</script>

<style lang="scss">
.search-posts {
  &--heading {
    font-weight: 600;
  }

  &--form {
  }

  &--input {
    border: none;
    padding-left: 50px;
    position: relative;
  }

  &--button {
    background-color: $orange-color;
    padding: 10px 50px;
  }

  &--icon {
    position: absolute;
    top: 25%;
    left: 20px;
    z-index: 5;
    // padding: 13px 0 0 0;
  }
}
</style>
