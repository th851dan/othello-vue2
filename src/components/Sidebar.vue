<template>
  <b-collapse tag="nav" class="sidenav collapse position-fixed" id="sidebar" :visible="sidebarVisible">
    <ul class="navbar-nav">
      <li class="nav-item">
        <b-button  v-b-modal.new-game-modal type="button" role="button" class="text-left btn-light w-100">New Game</b-button>
      </li>
      <li v-for="element in ['Undo', 'Redo', 'Hint']" class="nav-item">
        <b-button type="button" role="button" class="text-left btn-light w-100" @click="request(element.toLowerCase())">{{element}}</b-button>
      </li>
      <li class="nav-item">
        <b-button v-b-toggle.difficulty type="button" role="button" class="text-left btn-light dropdown-toggle w-100">
          Difficulty
        </b-button>
        <b-collapse tag="div" class="collapsible-panel" id="difficulty">
          <ul class="navbar-nav">
            <li v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]" class="nav-item">
              <button
                  @click="changeDifficulty(element.key)"
                  type="button" role="button"
                  class="text-left btn w-100"
                  :class="{
                    'text-body' : difficulty === element.text,
                    'disabled': gameMode !== '1'
                  }"
              >{{element.text}}</button>
            </li>
          </ul>
        </b-collapse>
      </li>
      <li class="nav-item">
        <b-button v-b-toggle.player-mode type="button" role="button" class="text-left btn-light dropdown-toggle w-100">
          Mode
        </b-button>
        <b-collapse tag="div" class="collapsible-panel" id="player-mode">
          <ul class="navbar-nav">
            <li
                v-for="element in [{key: '2', text: 'Player vs Player'}, {key: '1', text:'Player vs Bot'}, {key: '0', text:'Bot vs Bot'}]"
                @click="changeGameMode(element.key)"
                class="nav-item">
              <button
                  type="button"
                  role="button"
                  class="text-left btn w-100"
                  :class="{'text-body': gameMode === element.key}"
              >{{element.text}}</button>
            </li>
          </ul>
        </b-collapse>
      </li>
    </ul>
  </b-collapse>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: "Sidebar",
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
  font-size: 22px;
  color: #818181;
  background: none;
  border: none;
  transition: all 0.3s;
}

.sidenav button:hover {
  color: #333;
  background: rgba(221,221,221,0.5)
}

.sidenav.collapse {
  visibility: hidden;
}

.sidenav.collapse.show {
  transition-property: margin-left, visibility;
  transition-duration: 0.2s;
  visibility: visible;
}

.sidenav.collapsing {
  transition-property: margin-left, visibility;
  transition-duration: 0.2s;
  min-height: 110vh;
  margin-left: -200px;
  transition-timing-function: ease-in-out;
}

.collapsible-panel {
  background: rgba(218,218,218,0.4);
  box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
}
</style>