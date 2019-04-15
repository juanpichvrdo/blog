<template>
    <nav>
        <b-navbar class="navigation navbar py-0" toggleable="lg">
            <div class="container-fluid d-flex">
                <router-link
                    class="navigation--brand display-4 navbar-brand py-3 py-sm-3 px-md-5"
                    to="/"
                >Random Logo</router-link>

                <b-navbar-toggle target="nav-collapse"/>

                <b-collapse id="nav-collapse" is-nav>
                    <div class="navigation--search-container">
                        <search-posts
                            v-if="isAuthenticated && $route.meta.showNavbarSearch === undefined"
                        />
                    </div>

                    <b-navbar-nav class="navigation--user text-center ml-auto">
                        <router-link
                            :class="{ active: $route.name !== 'postList' }"
                            to="/"
                            class="navigation--user-links mr-3 mb-3 mb-lg-0 py-lg-4 px-lg-3"
                        >BLOG</router-link>
                        <router-link
                            v-if="isAuthenticated"
                            :class="{ active: $route.name === 'postList' }"
                            :to="`/post-list/${getUser.id}`"
                            class="navigation--user-links mr-3 mb-3 mb-lg-0 py-lg-4 px-lg-3"
                        >POSTS</router-link>
                    </b-navbar-nav>

                    <div
                        v-if="isAuthenticated"
                        class="d-flex align-items-center justify-content-center my-3 my-lg-0"
                    >
                        <img
                            class="mx-3 py-sm-3"
                            src="../assets/user-1.png"
                            alt="User profile image"
                        >
                        <div class="navigation--user-profile">
                            <div>
                                Welcome,
                                <router-link
                                    :to="`/user-settings/${getUser.id}`"
                                    class="navigation--user-configuration"
                                >{{ getUser.username }}</router-link>
                            </div>
                            <a class="navigation--user-logout" href="#" @click="onLogout">Logout</a>
                        </div>
                    </div>

                    <div v-else class="ml-lg-5 my-4 my-lg-0 text-center">
                        <router-link class="navigation--user-login" to="/login">Login</router-link>
                    </div>
                </b-collapse>
            </div>
        </b-navbar>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../router";

import SearchPosts from "../components/SearchPosts";

export default {
    name: "NavigationBar",
    components: {
        SearchPosts
    },
    computed: {
        ...mapGetters(["getUser", "isAuthenticated"])
    },
    methods: {
        onLogout() {
            this.$store.dispatch("LOGOUT_USER");
            router.push("/login");
        }
    }
};
</script>

<style lang="scss" scoped>
.navigation {
    color: $white-color;
    background-color: $navy-color;
    padding-left: 100px;
    padding-right: 100px;

    @media only screen and (max-width: 1200px) {
        padding-left: 50px;
        padding-right: 50px;
    }
    @media only screen and (max-width: 1060px) {
        padding-left: 25px;
        padding-right: 25px;
    }

    @media only screen and (max-width: 992px) {
        padding-left: 10px;
        padding-right: 10px;
    }

    &--search-container {
        @media only screen and (max-width: 992px) {
            display: block;
            margin-top: 50px;
            width: 30rem;
            margin: 0 auto;
            // height: 45px;
        }

        @media only screen and (max-width: 550px) {
            width: 20rem;
        }
    }

    &--brand {
        color: $white-color;

        &:visited {
            color: $white-color;
        }

        &:hover {
            color: #e3e4eb;
        }
    }

    &--user {
        font-size: 0.8rem;

        @media only screen and (max-width: 991px) {
            // padding-left: 100px;
            // padding-right: 100px;

            margin: 30px auto 0;
            width: 300px;
        }

        &-links {
            color: $white-color;

            &:hover {
                text-decoration: none;
                color: #e3e4eb;
            }
        }

        &-profile {
            font-size: 0.8rem;

            .navigation--user-logout {
                color: $light-blue-color;
            }
        }

        &-configuration {
            margin-bottom: 0;
            font-weight: 400;
            color: $orange-color;
        }

        &-login {
            color: $white-color;
            font-size: 1rem;
            font-weight: 500;

            &:hover {
                color: #e3e4eb;
                text-decoration: none;
            }
        }
    }

    .active {
        border-bottom: 5px solid $white-color;
        transition: background-color 0.2s;

        &:hover {
            border-bottom: 5px solid #e3e4eb;
        }

        @media only screen and (max-width: 991px) {
            border-bottom: 2px solid #e3e4eb;
            padding-bottom: 5px;
            display: block;

            &:hover {
                &:hover {
                    border-bottom: 2px solid #e3e4eb;
                }
            }
        }
    }
}
</style>
