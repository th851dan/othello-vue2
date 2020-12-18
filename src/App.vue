<template>
  <div id="app" class="user-select-none">
    <navbar class="animate__animated animate__slideInDown animate__faster"/>
    <sidebar/>
    <transition :enter-active-class=transitionEnter :leave-active-class=transitionExit mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: 'App',
  data() {
    return {
      transitionEnter: '',
      transitionExit: '',
    }
  },
  components: {Navbar, Sidebar},
  mounted() {
    this.$store.dispatch("connectWebsocket");
  },
  watch: {
    '$route'(to, from) {
      let animation = 'animate__faster animate__animated animate__fade';
      if (from.path === "/about" || to.path === "/") {
        this.transitionEnter = animation + 'InLeft';
        this.transitionExit = animation + 'OutRight';
      } else {
        this.transitionEnter = animation + "InRight";
        this.transitionExit = animation + "OutLeft";
      }
    }
  }
}
</script>
<style>

</style>
