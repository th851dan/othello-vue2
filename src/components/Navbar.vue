<template>
  <v-app-bar app clipped-left class="app-bar" dark dense height="38px">
    <v-app-bar-nav-icon class="d-md-none" @click="sidebarVisible = !sidebarVisible" aria-label="toggle sidebar"/>
    <router-link to="/othello" class="brand d-md-flex align-center py-1 pl-3">
      <v-icon dark>mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-spacer/>
    <v-btn dark icon small class="d-md-none" @click.stop="navVisible = !navVisible" aria-label="toggle navigation">
      <v-icon dark class="chevron" :class="{'rotate-chevron': navVisible}">mdi-chevron-left</v-icon>
    </v-btn>
    <transition name="slide">
      <div v-show="navVisible" class="nav d-md-flex align-center">
        <router-link v-for="link in links" class="px-sm-1 px-md-2" :key="link.route" :to="link.route">
          {{link.text}}
        </router-link>
        <a class="px-2" href="https://github.com/th851dan/webtech-othello" target="_blank" rel="noreferrer" aria-label="github">
          <v-icon dark>mdi-github</v-icon>
        </a>
      </div>
    </transition>
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-icon text dark v-bind="attrs" v-on="on" aria-label="dark mode menu">mdi-dots-vertical</v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-switch class="my-0 py-0" v-model="darkMode" label="Toggle dark mode" hide-details/>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      navVisible: false,
      links: [
        {route: '/', text: 'Home'},
        {route: '/othello', text: 'Game'},
        {route: '/about', text: 'About'}
      ]
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
    },
    darkMode: {
      get() {
        return this.$vuetify.theme.dark
      },
      set() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString())
      }
    }
  },
}
</script>

<style scoped>
.app-bar {
  background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(50,50,50,0.95) 100%);
}

.brand {
  background: linear-gradient(180deg, rgb(117, 198, 200) 0%, rgb(86, 148, 150) 100%);
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
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
  transform: rotate(-180deg);
}

.slide-enter-active, .slide-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
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
}
</style>
