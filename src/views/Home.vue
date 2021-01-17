<template>
  <v-container fluid style="height: calc(100vh - 38px)">
    <v-container class="landing-page d-flex justify-center align-center">
      <div v-if="currentUser.data">
        <v-row>
          <router-link class="center-button" to="othello" @click.native="request('new')">
            <v-icon color="#5b9628">mdi-play-circle-outline</v-icon>
            <span>NEW GAME</span>
          </router-link>
        </v-row>
        <v-row>
          <div class="center-button" @click.stop="drawer = !drawer">
            <v-icon color="grey darken-2">mdi-cog</v-icon>
            <span>OPTIONS</span>
          </div>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <router-link class="center-button" to="login">
            <v-icon color="#5b9628">mdi-play-circle-outline</v-icon>
            <span>SIGN IN</span>
          </router-link>
        </v-row>
      </div>
    </v-container>
    <options-panel @close="drawer = !drawer"/>
    <v-btn
      fixed
      bottom
      left
      color="primary"
      v-show="deferredPrompt"
      @click="install"
      :timeout="-1"
      class="animate__animated animate__delay-1s animate__fadeInUp animate__faster"
    >
      <v-icon left>mdi-plus</v-icon>Add to home screen
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OptionsPanel from "@/components/OptionsPanel";

export default {
  name: "Home",
  components: {
    OptionsPanel
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters({
      deferredPrompt: "getDeferredPrompt",
      currentUser: "user"
    }),
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.setDeferredPrompt(e);
    });
    window.addEventListener("appinstalled", () => this.dismiss());
  },
  mounted() {
    document.title = "Welcome to Othello";
  },
  methods: {
    async dismiss() {
      this.setDeferredPrompt(null);
    },
    ...mapActions(["request", "setDeferredPrompt"]),
    async install() {
      this.deferredPrompt.prompt();
    },
  },
};
</script>

<style scoped>
.landing-page {
  height: 70vh;
  font-size: 250%;
}

.center-button {
  text-decoration: none;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(10, 10, 10, 0.5);
  color: #818181;
  transition: all 0.3s ease;
}

.center-button:hover {
  transform: scale(1.1);
}

.center-button i {
  font-size: 120%;
}
</style>