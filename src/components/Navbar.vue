<template>
  <nav class="navbar navbar-expand-md p-0 navbar-dark bg-dark">
    <b-button v-b-toggle.sidebar class="navbar-toggler border-0" type="button">
      <span class="navbar-toggler-icon"/>
    </b-button>
    <router-link class="navbar-brand d-none d-md-block pl-3" to="/othello">
      <span class="fas fa-dot-circle" aria-hidden="true"></span>thello
    </router-link>
    <b-button v-b-toggle.navigation class="navbar-toggler border-0 ml-auto">
      <span class="fa fa-caret-left"></span>
    </b-button>
    <b-collapse tag="ul" id="navigation" class="navbar-nav collapse d-md-inline-flex flex-row ml-md-auto">
      <router-link
          v-for="element in [{route: '/', text: 'Home'}, {route: '/othello', text: 'Game'}, {route: '/about', text: 'About'}]"
          class="nav-link pl-2 pr-2"
          :key="element.route"
          :to="element.route"
      >{{element.text}}</router-link>
      <li class="nav-link">
        <a href="https://github.com/th851dan/webtech-othello" target="_blank">
          <i class="fab fa-github" aria-hidden="true"/>
        </a>
      </li>
    </b-collapse>
  </nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style scoped>
.navbar {
  z-index: 2;
  background: rgb(69,69,69);
  background: linear-gradient(180deg, rgba(70,70,70,0.95) 0%, rgba(50,50,50,0.95) 100%);
  box-shadow: 2px 3px 6px -1px rgba(0, 0, 0, 0.29);
}

.navbar > .navbar-brand {
  background: rgb(117,198,200);
  background: linear-gradient(180deg, rgba(117,198,200,1) 0%, rgba(86,148,150,1) 100%);
  width: 200px;
  border:1px solid rgb(96,158,160);
}

.navbar > .navbar-nav.collapse {
  visibility: visible;
}

.navbar > .navbar-nav a, .navbar .navbar-toggler {
  transition: all 0.2s ease-in;
  color: #cccccc;
  text-decoration: none;
  font-size: 18px;
  padding-left: 8px;
  padding-right: 8px;
}

.navbar .navbar-nav a:hover, .navbar .navbar-toggler:hover {
  color: #eafffa;
}

.navbar > .navbar-nav a:active {
  background-color: #444444;
}

.navbar > .navbar-nav a.router-link-exact-active {
  color: white;
  background-color: rgba(200, 92, 92, 0.2);
}

@media (max-width: 767px) {
  .navbar>.navbar-nav {
    transition-duration: 0.3s;
    transition-property: all;
  }

  .navbar>.navbar-nav.collapse {
    visibility: hidden;
    display: none;
  }

  .navbar>.navbar-nav.collapse.show {
    visibility: visible;
    display: inline-flex;
  }
}
</style>