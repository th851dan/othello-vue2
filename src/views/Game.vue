<template>
  <div>
    <div class="d-table m-auto pt-3 animate__animated animate__slideInDown animate__faster">
      <the-header
          :source1="image1"
          :source2="image2"
          :num-black="numBlack"
          :num-white="numWhite"
      ></the-header>
      <table ref="gameTable" class="game-table" :style="{ backgroundImage: 'url(' + background + ')' }">
        <th v-for="i in size + 1" class="column-header text-center" >{{ columnHeader(i) }}</th>
        <tr v-for="(n, i) in size">
          <th class ="row-header text-center">{{ n }}</th>
          <td v-for="(m, j) in size" class="cell text-center border border-dark" :id="i + '' + j" v-on:click="setCell">
            <img v-if='board[i][j] > 0' :key="board[i][j]" class="flip-tile" :src="board[i][j] === 1 ? image1 : image2" alt="">
            <span v-else-if='board[i][j] < 0' class="dot d-inline-block rounded-circle mt-1 jelly-dot"/>
          </td>
        </tr>
      </table>
      <b-collapse tag="div" v-if="size > 0" class="pt-2 pb-2 pl-3 pr-3" id="info-panel">
        <div><span>Difficulty:</span><span class="float-right font-weight-bold">{{ displayedDifficulty }}</span></div>
        <div><span>Current turn:</span><span class="float-right font-weight-bold">{{ currentPlayerName }}</span></div>
        <div><span>Mode:</span><span class="float-right font-weight-bold">{{ gameMode }}</span></div>
      </b-collapse>
      <b-button v-b-toggle.info-panel class="info-btn dropdown-toggle"/>
      <new-game-modal></new-game-modal>
      <game-over-modal :source1="image1" :source2="image2"></game-over-modal>
    </div>
  </div>
</template>

<script>
import NewGameModal from "@/components/NewGameModal";
import TheHeader from "@/components/Header";
import { mapGetters } from "vuex";
import GameOverModal from '../components/GameOverModal.vue';

export default {
  name: "Game",
  components: { TheHeader, NewGameModal, GameOverModal },
  data() {
    return {
      background: require("../assets/back.jpg"),
      image1: require("../assets/1.png"),
      image2: require("../assets/2.png"),
    };
  },
  computed: {
    ...mapGetters({
      difficulty: "getDifficulty",
      numBlack: "getNumBlack",
      numWhite: "getNumWhite",
      board: "getBoard",
      size: "getSize",
      currentPlayerName: "getDisplayedPlayerName",
      gameMode: "getDisplayedGameMode",
      displayedDifficulty: "getDisplayedDifficulty"
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
    }
  },
  mounted() {
    const store = this.$store
    function checkWidth() {
      if (location.pathname === '/othello') {
        const show = window.innerWidth && window.innerWidth > 768;
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
.game-table {
  background: rgb(32,95,25);
  border: 5px solid saddlebrown;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.29);
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
}

.game-table .cell img {
  position: relative
}

/* Overrides bootstrap class */
.game-table .cell.border-dark {
  border-color: rgba(20,20,20,0.8) !important;
}

.game-table .cell:hover {
  background-color: rgba(160, 160, 160, 0.3);
}

.game-table .cell .dot {
  height: 25px;
  width: 25px;
  pointer-events: none;
  background-color: rgba(12, 12, 12, 0.5);
  box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7), 1px -1px 3px 1px rgba(31,31,31,0.51) inset;
}

#info-panel {
  background: lightgray;
  max-width: 230px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19), 0 5px 5px -3px rgba(25,25,25,0.7) inset;
}

.info-btn,.info-btn:hover,.info-btn:focus {
  color: black !important;
  background: none !important;
  border: none !important;
  margin-top: -5px;
}

#info-panel div {
  cursor: default;
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
  0% {
    transform: rotateY(0deg);
  }
  100% {
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

@-webkit-keyframes jump {
  0% {
    transform: translateY(0);
  }
  17% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-75%);
  }
  50% {
    transform: translateY(2px) scaleY(0.95);
  }
  60% {
    transform: translateY(-25%);
  }
  70% {
    transform: translateY(0) scaleY(0.98);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}

.flip-tile {
  animation: flip 0.5s forwards;
  pointer-events: none;
  animation-timing-function: cubic-bezier(0.04, 0.4, 0.8, 1.40);
}

.jelly-dot {
  animation: jelly ease 0.5s;
}
</style>
