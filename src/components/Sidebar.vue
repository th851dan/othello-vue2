<template>
  <b-collapse tag="nav" class="sidenav collapse position-fixed pl-0" id="sidebar" :visible="sidebarVisible">
    <new-game-modal/>
    <v-btn v-for="element in ['Undo', 'Redo', 'Hint']" block text @click="request(element.toLowerCase())" :key="element">
      {{ element }}
    </v-btn>
    <v-btn text block v-b-toggle.difficulty class="dropdown-toggle">
      Difficulty
    </v-btn>
    <b-collapse tag="div" class="collapsible-panel" id="difficulty">
      <v-btn text block
             @click="changeDifficulty(element.key)"
             v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]"
             :key="element.key"
             :class="{
                    'text-body' : difficulty === element.text,
                    'disabled': gameMode !== '1'
                  }"
      >{{ element.text }}</v-btn>
    </b-collapse>
    <v-btn block text v-b-toggle.player-mode class="dropdown-toggle">Mode</v-btn>
    <b-collapse tag="div" class="collapsible-panel" id="player-mode">
      <v-btn text block
             v-for="element in [{key: '2', text: 'Player vs Player'}, {key: '1', text:'Player vs Bot'}, {key: '0', text:'Bot vs Bot'}]"
             :class="{'text-body': gameMode === element.key}"
             :key="element.key"
             @click="changeGameMode(element.key)"
      >{{element.text}}</v-btn>
    </b-collapse>
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
      difficulty: "getDisplayedDifficulty",
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
  background-color:rgba(248, 249, 250, 0.72);
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

.sidenav button {
  min-height: 42px;
  justify-content: start;
  font-size: 17px;
  color: #818181;
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