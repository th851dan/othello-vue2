<template>
  <v-navigation-drawer v-model="$parent.$data.drawer" fixed temporary bottom mobile-breakpoint="20000">
    <v-row>
      <v-col align-self="center">
        <v-row class="mx-4">
          <v-icon>mdi-cog</v-icon>
          <strong>Options</strong>
        </v-row>
      </v-col>
      <v-col md="4" offset-md="4">
        <v-row class="float-right mx-4">
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="ma-0"/>
    <v-col>
      <v-row class="float-right mx-4">
        <v-switch class="mx-4 dark-mode-switch" hide-details v-model="darkMode" label="Dark Theme"/>
      </v-row>
    </v-col>
    <v-radio-group v-model="mode" row class="mx-2">
      <template v-slot:label>
        <strong>Mode:</strong>
      </template>
      <v-radio value="2" label="Player vs Player" :ripple="false"/>
      <v-radio value="1" label="Player vs Bot" :ripple="false"/>
      <v-radio value="0" label="Bot vs Bot" :ripple="false"/>
    </v-radio-group>
    <v-radio-group v-model="difficulty" row class="mx-2">
      <template v-slot:label>
        <strong>Difficulty:</strong>
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
            append-icon="mdi-send"
            :rules="[rules.minLength]"
            @click:append="setPlayerName({index: 0, name: player1})"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            v-show="mode === '2'"
            v-model="player2"
            label="Name player 2"
            append-icon="mdi-send"
            :rules="[rules.minLength]"
            @click:append="setPlayerName({index: 1, name: player2})"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "OptionsPanel",
  data() {
    return {
      player1: "",
      player2: "",
      rules: {
        minLength: value => value.length > 0 || "Please enter name"
      }
    };
  },
  computed: {
    ...mapGetters(["getMode", "getDifficulty"]),
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
        this.changeGameMode(value);
      }
    }
  },
  methods: {
    ...mapActions(["changeGameMode", "changeDifficulty", "setPlayerName"])
  },
  emits: ["close"]
}
</script>

<style scoped>
/deep/ .dark-mode-switch label {
  margin-bottom: 0;
}
</style>