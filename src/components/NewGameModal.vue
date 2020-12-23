<template>
  <v-dialog elevation="10" max-width="400" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
    <v-btn class="toggle" text block v-bind="attrs" v-on="on">New Game</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Start new Game?</v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row justify="center">Current score will be lost.</v-row>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="secondary" text @click="close(false)">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="close(true)">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewGameModal",
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    close(startNewGame) {
      if (startNewGame)
        this.$store.dispatch("newGame")
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.toggle {
  min-height: 42px;
  justify-content: start;
  font-size: 17px !important;
  color: #818181 !important;
}
</style>
