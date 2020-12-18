<template>
  <nav class="sidenav collapse bg-light position-fixed" :class="sidebarVisible ? 'show' : ''">
    <ul class="navbar-nav">
      <li class="nav-item">
        <button type="button" role="button" class="text-left btn btn-light w-100" @click="showNewGameModal()">New Game</button>
      </li>
      <li v-for="element in ['Undo', 'Redo', 'Hint']" class="nav-item">
        <button type="button" role="button" class="text-left btn btn-light w-100" @click="request(element.toLowerCase())">{{element}}</button>
      </li>
      <li class="nav-item">
        <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" @click="toggleShow" data-toggle="collapse" data-target="difficulty">
          Difficulty
        </button>
        <div class="collapse collapsible-panel" :class="isDifVisible ? 'show' : ''" id="difficulty">
          <ul class="navbar-nav">
            <li v-for="element in [{key: 'e', text: 'Easy'}, {key: 'm', text:'Normal'}, {key: 'd' ,text:'Hard'}]" class="nav-item">
              <button
                  @click="changeDifficulty(element.key)"
                  type="button" role="button"
                  class="text-left btn w-100"
              >{{element.text}}</button>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" @click="toggleShow" data-toggle="collapse" data-target="player-mode">
          Mode
        </button>
        <div class="collapse collapsible-panel" :class="isModeVisible ? 'show' : ''" id="player-mode">
          <ul class="navbar-nav">
            <li v-for="element in [{key: '2', text: 'Player vs Player'}, {key: '1', text:'Player vs Bot'}, {key: '0', text:'Bot vs Bot'}]" @click="changeGameMode(element.key)" class="nav-item">
              <button type="button" role="button" class="text-left btn w-100">{{element.text}}</button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: "Sidebar",
    data() {
        return{
            isDifVisible: false,
            isModeVisible: false,
        }
    },
    methods: {
        ...mapActions([
            'request',
            'changeDifficulty',
            'showNewGameModal',
            'changeGameMode'
        ]),
        toggleShow(e){
            e.currentTarget.dataset.target === "difficulty" ? this.isDifVisible = !this.isDifVisible : this.isModeVisible = !this.isModeVisible;
        }
    },
  computed: {
    ...mapGetters({
      sidebarVisible: "getSidebarVisibility"
    })
  }

}
</script>

<style scoped>

.sidenav {
  z-index: 1;
  opacity: 0.96;
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
  height: 110vh;
  margin-left: -200px;
  transition-timing-function: ease-in-out;
}

.collapsible-panel {
  background: #eeeeee;
  box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
}
</style>