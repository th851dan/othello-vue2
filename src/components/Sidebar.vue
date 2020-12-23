<template>
  <b-collapse tag="nav" class="sidenav position-fixed" id="sidebar" :visible="sidebarVisible">
    <new-game-modal/>
    <v-btn text block v-for="element in ['Undo', 'Redo', 'Hint']" @click="request(element.toLowerCase())" :key="element">
      {{ element }}
    </v-btn>
    <v-expansion-panels flat multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>Difficulty</v-expansion-panel-header>
        <v-expansion-panel-content class="collapsible-panel">
          <v-btn text block
                 @click="changeDifficulty(element.key)"
                 v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]"
                 :key="element.key"
                 :class="{'active' : difficulty === element.text, 'disabled': gameMode !== '1'}"
          >{{ element.text }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Mode</v-expansion-panel-header>
        <v-expansion-panel-content class="collapsible-panel">
          <v-btn text block
                 v-for="element in [{key: '2', text: 'Player vs Player'}, {key: '1', text:'Player vs Bot'}, {key: '0', text:'Bot vs Bot'}]"
                 :class="{'active': gameMode === element.key}"
                 :key="element.key"
                 @click="changeGameMode(element.key)"
          >{{ element.text }}
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </b-collapse>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import NewGameModal from "@/components/NewGameModal.vue";

export default {
  name: "Sidebar",
  components: {NewGameModal},
  methods: {
    ...mapActions([
      'request',
      'changeDifficulty',
      'changeGameMode'
    ]),
  },
  computed: {
    ...mapGetters({
      sidebarVisible: "getSidebarVisibility",
      difficulty: "getDifficulty",
      gameMode: "getMode"
    })
  }

}
</script>

<style scoped>

.sidenav {
  transition: all ease-in-out 0.2s;
  z-index: 1;
  backdrop-filter: blur(5px);
  background-color: rgba(248, 249, 250, 0.72);
  overflow-y: auto;
  margin-top: -57px;
  padding-top: 100px;
  width: 200px;
  min-height: calc(100vh - 45px);
  top: 50px;
  bottom: 0;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.38);
}

.sidenav::-webkit-scrollbar {
  display: none;
}

/deep/ button {
  width: 100%;
  transition: all 0.3s;
  padding-left: 16px;
  text-transform: uppercase;
  font-weight: 500;
  min-height: 42px;
  height: 42px  !important;
  justify-content: start;
  font-size: 17px !important;
  color: #818181 !important;
}

/deep/ button.active {
  color: #222222 !important;
}

/deep/ .v-expansion-panel {
  padding: 0;
  background: none !important;
}

/deep/ .v-expansion-panel-content__wrap {
  padding: 0;
}

.sidenav.collapse {
  visibility: hidden;
}

.sidenav.collapse.show {
  visibility: visible;
}

.sidenav.collapsing {
  min-height: 110vh;
  margin-left: -200px;
}

.collapsible-panel {
  background: rgba(208, 208, 208, 0.4);
  box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
}
</style>