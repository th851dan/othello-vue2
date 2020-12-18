<template>
  <b-modal id="new-game-modal" @hide="hide" centered>
    <template #modal-header>
      <h5>Start new game?</h5>
    </template>
    <template #default>
      <p class="text-center">Current score will be lost.</p>
    </template>
    <template #modal-footer="{ ok, cancel }">
      <b-button variant="outline-secondary" @click="cancel">Cancel</b-button>
      <b-button variant="primary" @click="ok">Ok</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "NewGameModal",
  methods: {
    hide(ev) {
      if (ev.trigger === "ok") this.$store.dispatch("newGame");
    },
  },
};
</script>
