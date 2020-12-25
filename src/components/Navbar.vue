<template>
  <v-app-bar app clipped-left class="app-bar" dark dense height="38px">
    <v-app-bar-nav-icon class="d-md-none" @click="sidebarVisible = !sidebarVisible"/>
    <router-link to="/othello" class="brand d-md-flex align-center py-1 pl-3">
      <v-icon dark>mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-spacer/>
    <v-btn dark text class="toggler d-md-none" @click.stop="navVisible = !navVisible">
      <v-icon dark class="chevron" :class="{'rotate-chevron': navVisible}">mdi-chevron-left</v-icon>
    </v-btn>
    <b-collapse class="nav d-md-flex" v-model="navVisible">
      <router-link
          v-for="element in [{route: '/', text: 'Home'}, {route: '/othello', text: 'Game'}, {route: '/about', text: 'About'}]"
          class="px-2"
          :key="element.route"
          :to="element.route"
      >{{element.text}}</router-link>
      <a class="px-2" href="https://github.com/th851dan/webtech-othello" target="_blank">
        <v-icon dark>mdi-github</v-icon>
      </a>
    </b-collapse>
  </v-app-bar>
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
.app-bar {
  background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(50,50,50,0.95) 100%);
}

.brand {
  background: linear-gradient(180deg, rgba(117,198,200,1) 0%, rgba(86,148,150,1) 100%);
  text-decoration: none;
  color: #ffffff;
  font-size: 1.25rem;
  width: 200px;
}

a, .nav a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease-in;
  padding: 6px;
}

.nav a:hover {
  color: rgba(255, 255, 255, 0.75);
}

.nav a:active {
  background-color: #444444;
}

.nav a.router-link-exact-active {
  color: white;
  background-color: rgba(200, 92, 92, 0.2);
}

.rotate-chevron {
  transform: rotate(-180deg);
}

.toggler, .toggler:hover {
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
  min-width: 38px !important;
  width: 38px;
}

/deep/ .v-toolbar__content {
  padding-right: 0 !important;
}

@media (min-width: 768px) {
  /deep/ .v-toolbar__content {
    padding: 0 !important;
  }
}

@media (max-width: 767px) {
  .brand {
    display: none;
  }

  .nav.collapse {
    transition: all 0.3s ease-in-out;
    display: none;
  }

  .nav.collapse.show {
    display: inline-flex;
  }

  .nav.collapsing {
    transform: translateX(100%);
  }
}
</style>
