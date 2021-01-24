<template>
  <v-app-bar app clipped-left class="app-bar" dark dense height="38px" v-resize="updateMarker">
    <v-app-bar-nav-icon class="d-md-none" @click="sidebarVisible = !sidebarVisible" aria-label="toggle sidebar"/>
    <router-link to="/othello" class="brand d-md-flex align-center py-1 pl-3">
      <v-icon>mdi-record-circle-outline</v-icon>thello
    </router-link>
    <v-spacer/>
    <v-btn icon small class="d-md-none" @click.stop="navVisible = !navVisible" aria-label="toggle navigation">
      <v-icon :class="{'rotate-chevron': navVisible}">mdi-chevron-left</v-icon>
    </v-btn>
    <transition name="slide">
      <div v-show="navVisible" class="nav position-relative d-md-flex align-center">
        <div id="marker"/>
        <router-link v-for="link in links" class="px-sm-1 px-md-2" :key="link.route" :to="link.route">
          {{link.text}}
        </router-link>
        <a class="px-2" href="https://github.com/th851dan/webtech-othello" target="_blank" rel="noreferrer" aria-label="github">
          <v-icon>mdi-github</v-icon>
        </a>
      </div>
    </transition>
    <v-menu offset-y :close-on-content-click="false" transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-if="currentUser.data" v-bind="attrs" v-on="on" color="#5f9ea0" size="auto">
          <span class="white--text headline">{{getFirstLetters(currentUser.data.displayName)}}</span>
        </v-avatar>
        <v-avatar v-else v-bind="attrs" v-on="on" size="auto">
          <v-icon aria-label="dark mode menu">mdi-account-circle</v-icon>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item-group v-if="currentUser.data" >
          <v-list-item>
            Hello {{ currentUser.data.displayName ? currentUser.data.displayName : currentUser.data.email}}
          </v-list-item>
          <v-list-item>
            <router-link  to="/change">
              Change your password
            </router-link>
          </v-list-item>
          <v-list-item>
            <v-btn color="primary" @click="logout">Sign out</v-btn>
          </v-list-item>
        </v-list-item-group>
        <v-list-item v-else>
          <router-link  to="/login">
            Sign in
          </router-link>
        </v-list-item>
      </v-list>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Dark mode</v-expansion-panel-header>
          <v-expansion-panel-content>
            
            <v-row>
              <v-radio-group hide-details class="my-0 py-0" :value="darkModeEnabled">
                <v-radio :ripple="false" label="Enabled" value="true" @click="darkMode = true"/>
                <v-radio :ripple="false" label="Disabled" value="false" @click="darkMode = false"/>
                <v-radio :ripple="false" label="System default" value="default" @click="clearDarkTheme"/>
              </v-radio-group>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      navVisible: false,
      links: [
        { route: "/", text: "Home" },
        { route: "/othello", text: "Game" },
        { route: "/about", text: "About" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "user",
    }),
    sidebarVisible: {
      get() {
        return this.$store.getters.getSidebarVisibility;
      },
      set(value) {
        this.$store.commit("changeSidebarVisibility", value);
      },
    },
    darkMode: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      },
    },
    darkModeEnabled() {
      const theme = localStorage.getItem("dark_theme");
      return theme ? theme : "default";
    },

  },
  methods: {
    updateMarker() {
      this.$nextTick(() => {
        const activeRoute = document.getElementsByClassName(
          "px-md-2 router-link-exact-active"
        )[0];
        const marker = document.getElementById("marker");
        marker.style.left = activeRoute.offsetLeft + "px";
        marker.style.width = activeRoute.offsetWidth + "px";
      });
    },
    clearDarkTheme() {
      this.darkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.removeItem("dark_theme");
    },
    logout(){
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    },
    getFirstLetters(name){
      let words = name.split(" ");
      let ret = "";
      for(let word of words)
        ret += word[0];
      return ret.toUpperCase();
    }
  },
  mounted() {
    this.updateMarker();
  },
  watch: {
    $route(to, _) {
      this.updateMarker();
    },
    navVisible() {
      this.updateMarker();
    },
  },
};
</script>

<style scoped>
.app-bar {
  background: linear-gradient(
    180deg,
    rgba(70, 70, 70, 0.95) 0%,
    rgba(50, 50, 50, 0.95) 100%
  );
}

.brand {
  background: linear-gradient(
    180deg,
    rgb(117, 198, 200) 0%,
    rgb(86, 148, 150) 100%
  );
  text-decoration: none;
  color: #ffffff;
  font-size: 1.25rem;
  width: 200px;
}

a,
.nav a {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s ease-in;
  padding: 6px;
}

.nav a:hover {
  color: #ddd;
}

.nav a.router-link-exact-active {
  color: white;
}

#marker {
  transition: 0.4s;
  background: cadetblue;
  position: absolute;
  bottom: -0.5px;
  height: 3px;
}

.rotate-chevron {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transform: rotate(-180deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

/deep/ .v-toolbar__content {
  padding-right: 0 !important;
}

/deep/ .v-label {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

@media (min-width: 768px) {
  /deep/ .v-toolbar__content {
    padding: 0 !important;
  }
}

@media (max-width: 767px) {
  .brand {
    display: none;
  }
}
</style>
