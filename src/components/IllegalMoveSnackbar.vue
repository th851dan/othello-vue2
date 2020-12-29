<template>
    <v-snackbar color="error" text bottom v-model="snackBar" :timeout="3000">
      Move is not legal. Please try again.
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackBar = !snackBar" aria-label="close warning" aria-hidden="true">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>

export default {
  name: "IllegalMoveSnackbar",
  computed: {
    snackBar: {
      get() {
        return this.$store.getters.getIsMoveIllegal
      },
      set(value) {
        this.$store.dispatch('setIsMoveIllegal', value)
      }
    }
  }
}
</script>
