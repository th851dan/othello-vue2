<template>
  <v-container fluid style="height: calc(100vh - 38px)">
    <div class="landing-page d-flex justify-center align-center">
      <router-link id="game-start" to="othello" @click.native="request('new')">
        <v-row justify="center" align="center">
          <v-icon id="play-button">mdi-play-circle-outline</v-icon>
          <span>NEW GAME</span>
        </v-row>
      </router-link>
    </div>
    <v-btn
        fixed
        bottom left
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

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      deferredPrompt: 'getDeferredPrompt'
    })
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this.setDeferredPrompt(e);
    });
    window.addEventListener("appinstalled", () => this.dismiss());
  },
  mounted() {
    document.title = "Welcome to Othello"
  },
  methods: {
    ...mapActions(['request', "setDeferredPrompt"]),
    async install() {
      this.deferredPrompt.prompt();
    },
    async dismiss() {
      this.setDeferredPrompt(null);
    },
  }
}
</script>

<style scoped>
.landing-page {
  height: 70vh;
  font-size: 250%;
}

#game-start {
  text-decoration: none !important;
  text-shadow: 1px 1px 2px rgba(10, 10, 10, 0.5);
  color: #818181;
  transition: all 0.3s ease;
}

#game-start:hover {
  transform: scale(1.1);
}

#play-button {
  font-size: 120%;
  color: #5b9628;
}

</style>