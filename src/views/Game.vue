<template>
  <div v-if="size > 0">
    <div class="d-table m-auto animate__animated animate__slideInDown animate__faster">
      <the-header :source1="image1" :source2="image2" :num-black="numBlack" :num-white="numWhite"/>
      <v-sheet elevation="10" rounded="lg">
        <table class="game-table" :style="{ backgroundImage: 'url(' + background + ')' }">
          <th v-for="i in size + 1" class="column-header text-center" >{{ columnHeader(i) }}</th>
          <tr v-for="(n, i) in size">
            <th class ="row-header text-center">{{ n }}</th>
            <td v-for="(m, j) in size" class="cell text-center" :id="i + '' + j" v-on:click="setCell">
              <img v-if='board[i][j] > 0' :key="board[i][j]" class="flip-tile position-relative" :src="board[i][j] === 1 ? image1 : image2" alt="">
              <span v-else-if='board[i][j] < 0' class="dot d-inline-block rounded-circle mt-1 jelly-dot"/>
            </td>
          </tr>
        </table>
      </v-sheet>
      <v-item-group class="float-right mr-2" id="float-right">
        <v-btn text
               v-for="element in [
                   {'key': '-', 'disabled': 4, 'icon': 'mdi-minus'},
                   {'key': '.', 'disabled': 8, 'icon': 'mdi-circle-small'},
                   {'key': '+', 'disabled': 10, 'icon': 'mdi-plus'}]"
               @click="request('resize/' + element.key)"
               :key="element.key"
               :disabled="size === element.disabled">
          <v-icon>{{element.icon}}</v-icon>
        </v-btn>
      </v-item-group>
      <b-collapse tag="div" class="ml-2 pt-2 pb-2 pl-3 pr-3" id="info-panel">
        <div><span>Difficulty:</span><span class="float-right">{{ difficulty }}</span></div>
        <div><span>Current turn:</span><span class="float-right">{{ currentPlayerName }}</span></div>
        <div><span>Mode:</span><span class="float-right">{{ gameMode }}</span></div>
      </b-collapse>
      <v-btn text v-b-toggle.info-panel id="info-btn" class="ml-2">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <game-over-modal :source1="image1" :source2="image2"/>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center text-center align-items-center" style="min-height: 75vh">
    <v-progress-circular indeterminate size="150" width="5" color="grey"/>
  </div>
</template>

<script>
import TheHeader from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import GameOverModal from '../components/GameOverModal.vue';

export default {
  name: "Game",
  components: { TheHeader, GameOverModal },
  data() {
    return {
      background: require("../assets/back.jpg"),
      image1: require("../assets/1.png"),
      image2: require("../assets/2.png"),
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
    setCell(evt) {
      this.$store.dispatch("setCell", evt.currentTarget.id);
    },
    columnHeader: (header) => {
      if (header > 1) {
        return String.fromCharCode(header + 63);
      }
    },
    ...mapActions(['request'])
  },
  mounted() {
    const store = this.$store
    function checkWidth() {
      if (location.pathname === '/othello') {
        const show = window.innerWidth && window.innerWidth > 767;
        store.dispatch("changeSidebarVisibility", show);
      }
    }
    checkWidth();
    document.title = "Othello"
    window.onresize = checkWidth;
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
  background: rgb(32,95,25);
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

.game-table .cell:hover {
  background-color: rgba(160, 160, 160, 0.3);
}

.game-table .cell .dot {
  height: 25px;
  width: 25px;
  background-color: rgba(12, 12, 12, 0.5);
  box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7), 1px -1px 3px 1px rgba(31,31,31,0.51) inset;
}

#info-panel {
  background: lightgray;
  max-width: 200px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 5px 5px -3px rgba(25,25,25,0.7) inset;
}

#info-panel div {
  cursor: default;
}

#float-right .v-btn, #info-btn {
  min-width: 38px;
  width: 38px;
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
  animation: flip 0.5s forwards cubic-bezier(0.04, 0.4, 0.8, 1.40);
}

.jelly-dot {
  animation: jelly ease 0.5s;
}
</style>
