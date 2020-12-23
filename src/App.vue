<template>
  <v-app class="user-select-none">
    <navbar class="animate__animated animate__slideInDown animate__faster"/>
    <sidebar/>
    <transition :enter-active-class=transitionEnter :leave-active-class=transitionExit mode="out-in">
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: 'App',
  data() {
    return {
      transitionEnter: '',
      transitionExit: '',
    }
  },
  components: {Navbar, Sidebar},
  mounted() {
    this.$store.dispatch("connectWebsocket");
  },
  watch: {
    '$route'(to, from) {
      let animation = 'animate__faster animate__animated animate__fade';
      if (from.path === "/about" || to.path === "/") {
        this.transitionEnter = animation + 'InLeft';
        this.transitionExit = animation + 'OutRight';
      } else {
        this.transitionEnter = animation + "InRight";
        this.transitionExit = animation + "OutLeft";
      }
    }
  }
}
</script>
<style>
.v-overlay--active .v-overlay__scrim {
  transition: all 0.2s;
  background-color: rgba(0,0,0,0.5) !important;
  opacity: 1 !important;
  backdrop-filter: blur(10px) !important;
}
</style>