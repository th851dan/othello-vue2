<template>
    <nav class="navbar navbar-expand-md p-2 p-md-0 navbar-dark bg-dark align-items-stretch">
    <button class="navbar-toggler" type="button" @click="toggleSidebar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand d-none d-md-block pl-3" to="/othello"><i class="fas fa-dot-circle" aria-hidden="true"></i>thello</router-link>
    <ul class="nav navbar-nav flex-row ml-auto">
        <li class="nav-link mr-2 mr-md-0">
            <router-link to="/rules">About</router-link>
        </li>
        <li class="nav-link">
            <a href="https://github.com/th851dan/webtech-othello"><i class="fab fa-github" aria-hidden="true"></i></a>
        </li>
    </ul>
</nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "Navbar",
    computed: {
        ...mapGetters({
            isSidebarVisible: 'getSidebarVisibility'
        })
    },
    methods: {
        toggleSidebar(){
            this.$store.dispatch('changeSidebarVisibility', !this.isSidebarVisible)
        }
    }
}
</script>

<style scoped>
.navbar {
            z-index: 2;
            background: rgb(69,69,69);
            background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(40,40,40,0.95) 100%);
            box-shadow: 2px 3px 6px -1px rgba(0, 0, 0, 0.29);
        }
        
        .navbar > .navbar-brand {
            background: rgb(117,198,200);
            background: linear-gradient(180deg, rgba(117,198,200,1) 0%, rgba(86,148,150,1) 100%);
            width: 200px;
        }
        
        .navbar > .navbar-nav > .nav-link a {
            color: #cccccc;
            text-decoration: none;
            font-size: 18px;
            margin-right: 5px;
        }
</style>