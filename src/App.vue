<template>
  <v-app style="user-select: none">
    <navbar class="animate__animated animate__slideInDown animate__faster"/>
    <sidebar/>
    <v-main app class="pl-0">
      <v-container fluid class="pa-0">
        <transition :enter-active-class=transitionEnter :leave-active-class=transitionExit mode="out-in">
          <router-view/>
        </transition>
        <v-snackbar color="error" bottom v-model="getIsDisconnected" :timeout="-1">
          <v-row justify="center" align="center"><v-icon>mdi-alert-circle</v-icon>Disconnected from server</v-row>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import {mapGetters} from "vuex";
export default {
  name: 'App',
  data() {
    return {
      transitionEnter: '',
      transitionExit: '',
    }
  },
  computed: {
    ...mapGetters(["getIsDisconnected"])
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