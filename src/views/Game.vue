<template>
  <div v-if="size > 0">
    <div class="d-table ma-auto animate__animated animate__slideInDown animate__faster">
      <the-header :source1="image1" :source2="image2" :num-black="numBlack" :num-white="numWhite"/>
      <v-sheet elevation="10" rounded="lg">
        <table class="game-table" :style="{ backgroundImage: 'url(' + background + ')' }">
          <th v-for="i in size + 1" class="column-header text-center align-middle">{{ columnHeader(i) }}</th>
          <tr v-for="(row, i) in board">
            <th class="row-header text-center">{{ i + 1 }}</th>
            <td v-for="(cell, j) in row" class="cell" :id="i + '' + j" @click="setCell($event.currentTarget.id)">
              <img draggable="false" v-if='cell > 0' :key="cell" class="flip-tile d-block ma-auto" :src="getImage(cell)" :alt="cell === 1 ? '●' : '○'">
              <span v-else-if='cell < 0' class="dot d-block rounded-circle jelly-dot ma-auto"/>
            </td>
          </tr>
        </table>
      </v-sheet>
      <v-item-group class="float-right mr-2" id="float-right">
        <v-btn text
               v-for="element in [
                   {key: '-', disabled: 4, icon: 'minus', aria: 'reduce board size'},
                   {key: '.', disabled: 8, icon: 'circle-small', aria: 'reset bord size'},
                   {key: '+', disabled: 10, icon: 'plus', aria: 'increase board size'}]"
               @click="request('resize/' + element.key)"
               :key="element.key"
               :disabled="size === element.disabled"
               :aria-label="element.aria">
          <v-icon>{{ 'mdi-' + element.icon }}</v-icon>
        </v-btn>
      </v-item-group>
      <transition name="roll">
        <div class="ml-2 py-2 px-3 info-panel" v-show="infoVisible">
          <div><span>Difficulty:</span><span class="float-right">{{ difficulty }}</span></div>
          <div><span>Current turn:</span><span class="float-right">{{ currentPlayerName }}</span></div>
          <div><span>Mode:</span><span class="float-right">{{ gameMode }}</span></div>
      </div>
      </transition>
      <v-tooltip bottom open-delay="750">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text @click="infoVisible = !infoVisible" id="info-btn" class="ml-2" v-bind="attrs" v-on="on" aria-label="show info">
            <v-icon :class="{'rotate-chevron': infoVisible}">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <span v-text="(infoVisible ? 'Hide' : 'Show') + ' info'"/>
      </v-tooltip>
      <game-over-modal :source1="image1" :source2="image2"/>
    </div>
    <illegal-move-snackbar/>
  </div>
  <div v-else class="d-flex justify-center text-center align-center" style="min-height: 75vh">
    <v-progress-circular indeterminate size="150" width="5" color="grey"/>
  </div>
</template>

<script>
import TheHeader from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import GameOverModal from '../components/GameOverModal.vue';
import IllegalMoveSnackbar from "@/components/IllegalMoveSnackbar";

export default {
  name: "Game",
  components: {IllegalMoveSnackbar, TheHeader, GameOverModal},
  data() {
    return {
      background: "img/back.jpg",
      image1: "img/1.png",
      image2: "img/2.png",
      infoVisible: false
    };
  },
  computed: {
    ...mapGetters({
      numBlack: "getNumBlack",
      numWhite: "getNumWhite",
      board: "getBoard",
      size: "getSize",
      currentPlayerName: "getDisplayedPlayerName",
      gameMode: "getDisplayedGameMode",
      difficulty: "getDifficulty"
    }),
  },
  methods: {
    columnHeader: (header) => {
      if (header > 1) {
        return String.fromCharCode(header + 63);
      }
    },
    getImage(forValue) {
      return forValue === 1 ? this.image1 : this.image2;
    },
    ...mapActions(['request', 'setCell'])
  },
  mounted() {
    const show = window.innerWidth && window.innerWidth > 767;
    this.$store.dispatch("changeSidebarVisibility", show);
    document.title = "Othello"
  },
  beforeDestroy() {
    this.$store.dispatch("changeSidebarVisibility", false);
  }
};
</script>

<style scoped>
.d-table .v-sheet {
  border: 6px solid saddlebrown;
}

.game-table {
  border-collapse: collapse;
  background: rgb(32, 95, 25);
  background-size: cover;
}

.game-table .column-header {
  height: 28px;
  background: #aaaaaa;
  cursor: default;
}

.game-table .row-header {
  background: #aaaaaa;
  width: 28px;
  cursor: default;
}

.game-table .cell {
  width: 48px;
  height: 48px;
  transition: all 0.2s ease-in;
  border: 1px solid rgba(20, 20, 20, 0.8);
}

.game-table .cell img {
  height: 44px;
  width: 44px;
  transition: all 0.1s ease-in;
}

.game-table .cell:hover {
  background-color: rgba(160, 160, 160, 0.3);
}

.game-table .cell .dot {
  height: 25px;
  width: 25px;
  background-color: rgba(12, 12, 12, 0.5);
  box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7), 1px -1px 3px 1px rgba(31, 31, 31, 0.51) inset;
}

.info-panel {
  background: lightgray;
  max-width: 200px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 5px 5px -3px rgba(25, 25, 25, 0.7) inset;
}

.info-panel div {
  cursor: default;
}

.roll-enter-active, .roll-leave-active {
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
  overflow: hidden;
  /* max-height required for correct animation */
  max-height: 100px;
}

.roll-enter, .roll-leave-to {
  max-height: 0;
}

#float-right .v-btn, #info-btn {
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
  min-width: 38px;
  width: 38px;
}

.rotate-chevron {
  transform: rotate(-180deg);
}

@media (max-width: 800px) {
  .game-table .column-header {
    font-size: 12px;
    height: 22px;
  }

  .game-table .row-header {
    font-size: 12px;
    width: 22px
  }

  .game-table .cell {
    width: 36px;
    height: 36px;
  }

  .game-table .cell img {
    width: 32px;
    height: 32px;
  }

  .game-table .cell .dot {
    height: 20px;
    width: 20px;
  }
}

@keyframes flip {
  to {
    transform: rotateY(180deg);
  }
}

@keyframes jelly {
  0% {
    transform: scale(1);
  }
  53% {
    transform: scale(1.15);
  }
  62% {
    transform: scale(0.87);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.flip-tile {
  position: relative;
  animation: flip 0.5s forwards cubic-bezier(0.04, 0.4, 0.8, 1.40);
}

.jelly-dot {
  animation: jelly ease 0.5s;
}
</style>
