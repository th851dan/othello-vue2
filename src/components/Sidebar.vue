<template>
  <v-navigation-drawer floating app width="200px" mobile-breakpoint="768" :disable-resize-watcher="$route.path !== '/othello'" hide-overlay v-model="sidebarVisible">
    <new-game-modal/>
    <v-btn text block v-for="element in ['Undo', 'Redo', 'Hint']" @click="request(element.toLowerCase())" :key="element">
      {{ element }}
    </v-btn>
    <v-expansion-panels flat multiple hover>
      <v-expansion-panel>
        <v-expansion-panel-header ripple>Difficulty</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn text block
                 @click="changeDifficulty(element.key)"
                 v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]"
                 :key="element.key"
                 :class="{'active' : getDifficulty === element.text, 'disabled': getMode !== '1'}"
          >{{ element.text }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header ripple>Mode</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn text block
                 v-for="element in [{key: '2', text: 'Player vs Player'}, {key: '1', text:'Player vs Bot'}, {key: '0', text:'Bot vs Bot'}]"
                 :class="{'active': getMode === element.key}"
                 :key="element.key"
                 @click="changeGameMode(element.key)"
          >{{ element.text }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import NewGameModal from "@/components/NewGameModal.vue";

export default {
  name: "Sidebar",
  components: {NewGameModal},
  methods: {
    ...mapActions(['request', 'changeDifficulty', 'changeGameMode']),
  },
  computed: {
    ...mapGetters(["getDifficulty", "getMode"]),
    sidebarVisible: {
      get() {
        return this.$store.getters.getSidebarVisibility
      },
      set(value) {
        this.$store.commit('changeSidebarVisibility', value)
      }
    }
  }

}
</script>

<style scoped>

nav {
  z-index: 1;
  backdrop-filter: blur(5px);
  padding-top: 100px !important;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.38);
}

.theme--light nav  {
  background-color: rgba(248, 249, 250, 0.72) !important;
}

.theme--dark nav  {
  background-color: rgba(30, 30, 30, 0.72) !important;
}

/deep/ button {
  padding-left: 16px;
  text-transform: uppercase;
  font-weight: 500;
  height: 42px  !important;
  justify-content: start;
  font-size: 17px !important;
}

.theme--light button,
/deep/ button.theme--light,
.theme--light .v-expansion-panel-header,
.theme--light .v-expansion-panel-content {
  color: #818181;
}

.theme--light button.active {
  color: #222222 !important;
}

.theme--dark button.active {
  color: #5f9ea0 !important;
}

/deep/ .v-expansion-panel {
  padding: 0;
  background: none !important;
}

/deep/ .v-expansion-panel-content__wrap {
  padding: 0;
}

/deep/ .theme--light .v-expansion-panel-content__wrap {
  background: rgba(208, 208, 208, 0.4);
  box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
}

</style>