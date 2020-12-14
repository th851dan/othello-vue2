<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: 'App',
  components: {Navbar},
  mounted () {
    this.$store.dispatch('connectWebsocket');
  }
}
</script>
<style>
</style>
