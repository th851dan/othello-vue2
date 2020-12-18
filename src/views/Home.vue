<template>
  <div class="landing-page d-flex justify-content-center align-items-center">
    <router-link id="game-start" to="othello" @click.native="request('new')">
        <div style="cursor: pointer" id="new-game-btn" class="d-inline-block text-center text-decoration-none">
          <i id="play-button" class="fas fa-play-circle"></i>
          <span>NEW GAME</span>
        </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import {mapActions} from "vuex";

export default {
  name: 'Home',
  mounted() {
    document.title = "Welcome to Othello"
  },
  methods: {
    ...mapActions([
        'request'
    ])
  }
}
</script>

<style scoped>
.landing-page {
  height: 70vh;
  font-size: 250%;
}

.landing-page > #game-start {
  text-shadow: 1px 1px 2px rgba(10, 10, 10, 0.5);
  color: #818181;
  transition: all 0.3s ease;
}

.landing-page > #game-start:hover {
  transform: scale(1.1);
}

.landing-page > #game-start #play-button {
  font-size: 120%;
  color: #5b9628;
}

</style>