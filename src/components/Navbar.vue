<template>
  <v-app-bar app clipped-left class="app-bar" dark dense height="38px">
    <v-app-bar-nav-icon class="d-md-none" @click="sidebarVisible = !sidebarVisible" aria-label="toggle sidebar"/>
    <router-link to="/othello" class="brand d-md-flex align-center py-1 pl-3">
      <v-icon dark>mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-spacer/>
    <v-btn dark text class="toggler d-md-none" @click.stop="navVisible = !navVisible" aria-label="toggle navigation">
      <v-icon dark class="chevron" :class="{'rotate-chevron': navVisible}">mdi-chevron-left</v-icon>
    </v-btn>
    <transition name="slide">
      <div v-show="navVisible" class="nav d-md-flex">
        <router-link v-for="link in links" class="pa-2" :key="link.route" :to="link.route">
          {{link.text}}
        </router-link>
        <a class="px-2" href="https://github.com/th851dan/webtech-othello" target="_blank" rel="noreferrer" aria-label="github">
          <v-icon dark>mdi-github</v-icon>
        </a>
      </div>
    </transition>
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
