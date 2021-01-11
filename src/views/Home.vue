<template>
  <v-container fluid style="height: calc(100vh - 38px)">
    <v-container class="landing-page d-flex justify-center align-center">
      <div>
        <v-row>
          <router-link id="game-start" to="othello" @click.native="request('new')">
            <v-icon id="play-button">mdi-play-circle-outline</v-icon>
            <span>NEW GAME</span>
          </router-link>
        </v-row>
        <v-row>
          <div id="options-button" @click.stop="drawer = !drawer">
            <v-icon class="mx-3" color="grey darken-2">mdi-cogs</v-icon>
            <span>OPTIONS</span>
          </div>
        </v-row>
      </div>
    </v-container>
    <v-navigation-drawer v-model="drawer" fixed temporary bottom mobile-breakpoint="20000">
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
            <v-btn fab dark color="success" @click="submitOption"> OK </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-divider/>
      <v-radio-group v-model="mode" row class="my-0 mx-2">
        <template v-slot:label>
          <div><strong>Mode:</strong></div>
        </template>
        <v-radio value="2" label="Player vs Player" :ripple="false"/>
        <v-radio value="1" label="Player vs Bot" :ripple="false"/>
        <v-radio value="0" label="Bot vs Bot" :ripple="false"/>
      </v-radio-group>
      <v-radio-group v-model="difficulty" row class="my-0 mx-2">
        <template v-slot:label>
          <div><strong>Difficulty:</strong></div>
        </template>
        <v-radio value="e" label="Easy" :ripple="false"/>
        <v-radio value="m" label="Normal" :ripple="false"/>
        <v-radio value="d" label="Hard" :ripple="false"/>
      </v-radio-group>
      <v-row class="mx-2">
        <v-col>
          <v-text-field
            v-show="mode !== '0'"
            v-model="player1"
            :label="mode === '1' ? 'Name player' : 'Name player 1'"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-show="mode === '2'"
            v-model="player2"
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
      player1: "",
      player2: "",
    };
  },
  computed: {
    ...mapGetters({
      deferredPrompt: "getDeferredPrompt",
      getDifficulty: "getDifficulty",
      getMode: "getMode",
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
    difficulty: {
      get() {
        if (this.getDifficulty === "Easy") return "e"
        else if (this.getDifficulty === "Normal") return "m"
        else if (this.getDifficulty === "Hard") return "d"
      },
      set(value) {
        this.changeDifficulty(value);
      }
    },
    mode: {
      get() {
        return this.getMode;
      },
      set(value) {
        this.setMode(value);
      }
    }
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
    ...mapActions(["request", "setDeferredPrompt", "changeGameMode", "setPlayerName", "changeDifficulty", "setMode"]),
    async install() {
      this.deferredPrompt.prompt();
    },
    async dismiss() {
      this.setDeferredPrompt(null);
    },
    submitOption() {
      this.changeGameMode(this.mode);
      if (this.mode !== '0') {
        this.setPlayerName({index: 0, name: this.player1})
        if (this.mode === '2')
          this.setPlayerName({index: 1, name: this.player2})
      }
      this.drawer = false;
    }
  },
};
</script>

<style scoped>
.landing-page {
  height: 70vh;
  font-size: 250%;
}

#game-start, #options-button {
  text-decoration: none;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(10, 10, 10, 0.5);
  color: #818181;
  transition: all 0.3s ease;
}

#game-start:hover, #options-button:hover {
  transform: scale(1.1);
}

#play-button {
  font-size: 120%;
  color: #5b9628;
}
</style>