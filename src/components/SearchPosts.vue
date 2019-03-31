<template>
  <div class="search-posts">
    <form class="search-posts--form">
      <div class="input-group">
        <span class="search-posts--icon">
          <font-awesome-icon class="input-group-addon" icon="search"/>
        </span>
        <input type="text" class="search-posts--input form-control" placeholder="Search">
        <div class="input-group-append">
          <button class="search-posts--button btn text-white" type="button">GO!</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchPosts"
};
</script>

<style lang="scss">
.search-posts {
  padding-left: 100px;
  padding-right: 100px;

  @media only screen and (max-width: 1600px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media only screen and (max-width: 1250px) {
    padding-left: 25px;
    padding-right: 25px;
  }

  &--heading {
    font-weight: 600;
  }

  &--input {
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
    padding-left: 40px;
    position: relative;
  }

  &--button {
    background-color: $orange-color;
    padding: 0px 50px;

    @media only screen and (max-width: 1600px) {
      padding: 0px 35px;
    }

    @media only screen and (max-width: 1250px) {
      padding: 0px 25px;
    }
  }

  &--icon {
    position: absolute;
    top: 25%;
    left: 15px;
    z-index: 5;
  }
}
</style>
