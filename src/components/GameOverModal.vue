<template>
  <b-modal ref="game-over-modal" @hide="hide" centered>
    <template #modal-header>
      <h5 class="modal-title">{{ title }}</h5>
    </template>
    <template #default>
      <div class="modal-body">
        <p class="text-center jump-class">
          <img v-if="numBlack > numWhite" :src="source1" alt="●" />
          <img v-else-if="numBlack < numWhite" :src="source2" alt="○" />
        </p>
        <p class="text-center">Start new game?</p>
      </div>
    </template>
    <template #modal-footer="{ ok, cancel }">
      <b-button variant="outline-secondary" @click="cancel()">Cancel</b-button>
      <b-button variant="primary" @click="ok()">Ok</b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GameOverModal",
  props: ["source1", "source2"],
  data() {
    return {
      title: "Game Over",
    };
  },
  computed: {
    ...mapGetters({
      isVisible: "getGameOverModalVisibility",
      numBlack: "getNumBlack",
      numWhite: "getNumWhite",
    }),
  },
  methods: {
    hide(ev) {
      if (ev.trigger === "ok") this.$store.dispatch("newGame");
      this.$store.dispatch("hideGameOverModal");
    },
  },

  watch: {
    isVisible(newVal, oldVal) {
      if (newVal) {
        this.$refs["game-over-modal"].show();
        if (this.numBlack === this.numWhite) this.title = "Game Over";
        else
          this.title =
            this.numBlack > this.numWhite ? "Black won!" : "White won!";
      }
    },
  },
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
}
</style>