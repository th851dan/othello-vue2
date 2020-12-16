<template>
  <b-modal ref="new-game-modal" @hide="hide" centered>
    <template #modal-header>
      <h5>Start new game?</h5>
    </template>
    <template #default>
      <p class="text-center">Current score will be lost.</p>
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
  name: "NewGameModal",

  computed: {
    ...mapGetters({
      isVisible: "getNewGameModalVisibility",
    }),
  },
  methods: {
    ok() {
      this.$store.dispatch("newGame");
    },
    hide(ev) {
      if (ev.trigger === "ok") this.$store.dispatch("newGame");
      this.$store.dispatch("hideNewGameModal");
    },
  },

  watch: {
    isVisible(newVal, oldVal) {
      if (newVal) this.$refs["new-game-modal"].show();
    },
  },
};
</script>