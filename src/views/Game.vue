<template>
  <div>
    <sidebar :class="sizebarVisible ? 'show' : ''"></sidebar>
    <div v-if="board" class="d-table m-auto pt-3">
      <the-header
        :source1="image1"
        :source2="image2"
        :num-black="numBlack"
        :num-white="numWhite"
      ></the-header>
      <table
        ref="gameTable"
        class="game-table"
        :style="{ backgroundImage: 'url(' + background + ')' }"
      >
        <th
          v-for="i in size + 1"
          class="column-header text-center"
          :key="'columnHeader' + i"
        >
          {{ columnHeader(i) }}
        </th>
        <tr v-for="(n, i) in size" :key="'row' + n">
          <th class="row-header text-center">{{ n }}</th>
          <td
            v-for="(m, j) in size"
            :key="'cells' + j"
            class="cell text-center border border-dark"
            :id="i + '' + j"
            @click="setCell"
          >
            <img
              v-if="board[i][j] > 0"
              class="flip-tile"
              :src="board[i][j] === 1 ? image1 : image2"
              alt=""
            />
            <span
              v-else-if="board[i][j] < 0"
              class="dot d-inline-block rounded-circle mt-1 jelly-dot"
            />
          </td>
        </tr>
      </table>
      <div id="difficulty-div">{{ difficulty }}</div>
    </div>
    <div v-else>
      <h1 class="mt-5">No server available</h1>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import TheHeader from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  name: "Game",
  components: { Sidebar, TheHeader },
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
      sizebarVisible: "getSidebarVisibility"
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
  },
  mounted() {
    const store = this.$store;
    store.dispatch("connectWebsocket");
    function checkWidth() {
      if (window.innerWidth < 768) 
        store.dispatch("changeSidebarVisibility", false)
      else 
        store.dispatch("changeSidebarVisibility", true)
    }
    checkWidth();
    window.onresize = checkWidth;
  },
};
</script>

<style scoped>
.game-table {
  border: 5px solid saddlebrown;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.29);
}

.game-table .column-header {
  height: 28px;
  background: #aaaaaa;
}

.game-table .row-header {
  background: #aaaaaa;
  width: 28px;
}

.game-table .cell {
  width: 48px;
  height: 48px;
}

.game-table .cell:hover {
  background-color: rgba(160, 160, 160, 0.3);
  transition: all 0.2s ease-in;
}

.game-table .cell .dot {
  height: 25px;
  width: 25px;
  background-color: rgba(12, 12, 12, 0.5);
  box-shadow: 0 1px 2px rgba(97, 120, 97, 0.7),
    1px -1px 3px 1px rgba(31, 31, 31, 0.51) inset;
}

@media (max-width: 800px) {
  .game-table .column-header {
    font-size: 12px;
    height: 22px;
  }

  .game-table .row-header {
    font-size: 12px;
    width: 22px;
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

  .rules > .content img {
    width: 75%;
  }
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
    -webkit-transform: translate3D(0px, 0px, -20px) rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
    -webkit-transform: translate3D(0px, 0px, -20px) rotateY(180deg);
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
}

.jelly-dot {
  animation: jelly ease 0.5s;
}

.float {
  width: 4rem;
  height: 4rem;
  bottom: 2rem;
  right: 2rem;
  background-color: rgba(80, 90, 100, 0.7);
  color: #fff;
  box-shadow: 2px 2px 5px #3c3c3c;
}
</style>
