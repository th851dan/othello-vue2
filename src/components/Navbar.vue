<template>
  <nav class="navbar navbar-expand-md p-0 navbar-dark">
    <v-btn dark text class="navbar-toggler" @click="toggleSidebar(!sidebarVisible)">
      <v-icon dark>mdi-menu</v-icon>
    </v-btn>
    <router-link class="navbar-brand d-md-inline-flex align-items-center pl-3" to="/othello">
      <v-icon dark aria-hidden="true">mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-btn dark text v-b-toggle.navigation class="navbar-toggler ml-auto">
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
    <b-collapse tag="ul" id="navigation" class="navbar-nav collapse d-md-flex flex-row ml-md-auto">
      <router-link
          v-for="element in [{route: '/', text: 'Home'}, {route: '/othello', text: 'Game'}, {route: '/about', text: 'About'}]"
          class="nav-link pl-2 pr-2"
          :key="element.route"
          :to="element.route"
      >{{element.text}}</router-link>
      <a class="nav-link" href="https://github.com/th851dan/webtech-othello" target="_blank">
        <v-icon dark>mdi-github</v-icon>
      </a>
    </b-collapse>
  </nav>
</template>

<style scoped>
.navbar {
  z-index: 2;
  background: rgb(69,69,69);
  background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(50,50,50,0.95) 100%);
  box-shadow: 2px 3px 6px -1px rgba(0, 0, 0, 0.29);
}

.navbar > .navbar-brand {
  background: rgb(117,198,200);
  background: linear-gradient(180deg, rgba(117,198,200,1) 0%, rgba(86,148,150,1) 100%);
  width: 200px;
}

.navbar > .navbar-nav.collapse {
  visibility: visible;
}

.navbar > .navbar-nav a, .navbar .btn {
  transition: all 0.2s ease-in;
  border: none;
  padding: 6px;
}

.navbar > .navbar-nav a:active {
  background-color: #444444;
}

.navbar > .navbar-nav a.router-link-exact-active {
  color: white;
  background-color: rgba(200, 92, 92, 0.2);
}

@media (max-width: 767px) {

  .navbar .navbar-brand {
    display: none;
  }

  .navbar-toggler, .navbar-toggler:hover {
    min-width: 38px !important;
    width: 38px;
    border: none;
    background: none !important;
  }

  .navbar>.navbar-nav.collapse {
    padding: 0;
    transition: all 0.3s ease-in-out;
    display: none;
  }

  .navbar>.navbar-nav.collapse.show {
    display: inline-flex;
  }

  .navbar>.navbar-nav.collapsing {
    display: inline-flex !important;
    transform: translateX(100%);
  }
}
</style>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      sidebarVisible: "getSidebarVisibility"
    })
  },
  methods: {
    ...mapActions({
      toggleSidebar: "changeSidebarVisibility"
    })
  }
}
</script>