<template>
  <v-dialog elevation="10" max-width="400" v-model="isVisible" @click:outside="close(false)">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-divider/>
      <v-card-text>
        <v-row justify="center">
          <img class="jump-class" v-if="numBlack > numWhite" :src="source1" alt="●" />
          <img class="jump-class" v-else-if="numBlack < numWhite" :src="source2" alt="○" />
        </v-row>
        <v-row justify="center" class="mt-2">Start new game?</v-row>
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
import { mapGetters } from "vuex";

export default {
  name: "GameOverModal",
  props: {
    source1: {
      type: String,
      required: true
    },
    source2: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isVisible: "getGameOverModalVisibility",
      numBlack: "getNumBlack",
      numWhite: "getNumWhite",
      title: 'getGameOverTitle'
    }),
  },
  methods: {
    close(startNewGame) {
      if (startNewGame)
        this.$store.dispatch("newGame")
      this.$store.dispatch('hideGameOverModal')
    }
  }
};
</script>

<style scoped>
@-webkit-keyframes jump {
  0% {
    transform: translateY(0);
  }
  17% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-75%);
  }
  50% {
    transform: translateY(2px) scaleY(0.95);
  }
  60% {
    transform: translateY(-25%);
  }
  70% {
    transform: translateY(0) scaleY(0.98);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}

.jump-class {
  animation: jump 1.2s infinite;
  animation-delay: 0.2s;
  height: 50px;
  width: 50px;
}

</style>