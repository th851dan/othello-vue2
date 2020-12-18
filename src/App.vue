<template>
  <div id="app">
    <navbar></navbar>
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: 'App',
  components: {Navbar, Sidebar},
  mounted() {
    const store = this.$store;
    store.dispatch("connectWebsocket");
  }
}
</script>
<style>

</style>
