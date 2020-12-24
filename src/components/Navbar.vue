<template>
  <b-navbar type="dark" class="p-0">
    <v-btn class="toggler d-md-none" dark text @click="sidebarVisible = !sidebarVisible">
      <v-icon dark>mdi-menu</v-icon>
    </v-btn>
    <router-link to="/othello" class="navbar-brand d-md-inline-flex align-center pl-3">
      <v-icon dark aria-hidden="true">mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-btn dark text class="toggler d-md-none ml-auto" @click.stop="navVisible = !navVisible">
      <v-icon dark class="chevron" :class="{'rotate-chevron': navVisible}">mdi-chevron-left</v-icon>
    </v-btn>
    <b-collapse class="navbar-nav d-md-flex flex-row ml-md-auto" v-model="navVisible">
      <router-link
          v-for="element in [{route: '/', text: 'Home'}, {route: '/othello', text: 'Game'}, {route: '/about', text: 'About'}]"
          class="nav-link px-2"
          :key="element.route"
          :to="element.route"
      >{{element.text}}</router-link>
      <a class="nav-link px-2" href="https://github.com/th851dan/webtech-othello" target="_blank">
        <v-icon dark>mdi-github</v-icon>
      </a>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      navVisible: false,
    }
  },
  computed: {
      sidebarVisible: {
        get() {
          return this.$store.getters.getSidebarVisibility
        },
        set(value) {
          this.$store.commit('changeSidebarVisibility', value);
        }
    }
  }
}
</script>

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

.chevron {
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
}

.rotate-chevron {
  transform: rotate(-180deg);
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

  .toggler, .toggler:hover {
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
