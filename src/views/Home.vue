<template>
  <v-container fluid style="height: calc(100vh - 38px)">
    <v-container class="landing-page d-flex justify-center align-center">
      <v-row>
        <v-col cols="12">
          <router-link
            id="game-start"
            to="othello"
            @click.native="request('new')"
          >
            <v-row justify="center" align="center">
              <v-icon id="play-button">mdi-play-circle-outline</v-icon>
              <span>NEW GAME</span>
            </v-row>
          </router-link>
        </v-col>
        <v-col cols="12" align="center">
          <v-btn fab dark large color="success" @click.stop="drawer = !drawer">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      bottom
      mobile-breakpoint="20000"
    >
      <v-row justify="space-between">
        <v-col md="4">
          <v-row class="mx-4">
            <v-icon>mdi-cog</v-icon>
            <div><strong>Options</strong></div>
          </v-row>
        </v-col>
        <v-col md="4" offset-md="4">
          <v-row class="float-right mx-4">
            <v-switch class="mx-4" v-model="darkMode" label="Dark Theme"></v-switch>
            <v-btn fab dark color="success" @click="submitOption"> Start </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="ma-0"></v-divider>

      <v-radio-group v-model="mode" row class="my-0 mx-2">
        <template v-slot:label>
          <div><strong>Mode:</strong></div>
        </template>
        <v-radio
          v-for="element in [
            { key: '2', text: 'Player vs Player' },
            { key: '1', text: 'Player vs Bot' },
            { key: '0', text: 'Bot vs Bot' },
          ]"
          :key="element.key"
          :label="element.text"
          :value="element.key"
        >
        </v-radio>
      </v-radio-group>
      <v-radio-group v-model="difficulty" row class="my-0 mx-2">
        <template v-slot:label>
          <div><strong>Difficulty:</strong></div>
        </template>
        <v-radio
          v-for="element in [
            { key: 'e', text: 'Easy' },
            { key: 'm', text: 'Normal' },
            {key: 'd' ,text:'Hard'}
          ]"
          :key="element.key"
          :label="element.text"
          :value="element.key"
        >
        </v-radio>
      </v-radio-group>
      <v-row class="mx-2">
        <v-col>
          <v-text-field
            v-show="mode !== '0'"
            v-model="player1"
            :rules="nameRules"
            :label="mode === '1' ? 'Name player' : 'Name player 1'"
            required
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-show="mode === '2'"
            v-model="player2"
            :rules="nameRules"
            label="Name player 2"
            required
          ></v-text-field>
        </v-col>

      </v-row>
    </v-navigation-drawer>
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

export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      mode: "1",
      player1: "",
      player2: "",
      difficulty: "e"
    };
  },
  computed: {
    ...mapGetters({
      deferredPrompt: "getDeferredPrompt",
    }),
    darkMode: {
      get() {
        return this.$vuetify.theme.dark
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString())
      }
    },
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
    ...mapActions(["request", "setDeferredPrompt", "changeGameMode", "setPlayer1Name", "setPlayer2Name"]),
    async install() {
      this.deferredPrompt.prompt();
    },
    async dismiss() {
      this.setDeferredPrompt(null);
    },
    submitOption(){
      this.changeGameMode(this.mode);
      if (this.mode !== '0')
      {
        this.setPlayer1Name(this.player1)
        if (this.mode === '2')
          this.setPlayer2Name(this.player2)
      }
    }
  },
};
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