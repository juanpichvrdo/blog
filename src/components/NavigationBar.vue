<template>
    <nav class="navigation navbar py-0">
        <div class="container-fluid d-flex flex-column flex-sm-row">
            <div class="d-flex align-items-center">
                <router-link
                    class="navigation--brand display-4 navbar-brand py-3 py-sm-3 px-md-5"
                    to="/"
                >Random Logo</router-link>
                <search-posts v-if="isAuthenticated && $route.meta.showNavbarSearch === undefined"/>
            </div>
            <div class="navigation--user d-flex align-items-center pr-2 pr-md-5">
                <a class="navigation--user-active mr-4 py-4 px-3" href="#">BLOG</a>
                <div v-if="isAuthenticated" class="d-flex align-items-center">
                    <img class="mx-3 py-sm-3" src="../assets/user-1.png" alt="User profile image">
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
                <div v-else class="ml-5">
                    <router-link class="navigation--user-login" to="/login">Login</router-link>
                </div>
            </div>
        </div>
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
            this.$store.dispatch("logoutUser");
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

    & > div {
        justify-content: space-between;
        @media only screen and (max-width: 950px) {
            justify-content: center;
        }
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
                border-bottom: 5px solid #e3e4eb;
            }
        }

        &-profile {
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
}
</style>
