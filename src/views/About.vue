<template>
  <v-container fluid>
    <v-card elevation="12" rounded="lg" class="col-md-10 col-xl-8 my-md-10 text-justify mx-md-auto pa-0">
      <v-carousel light height="100%" show-arrows-on-hover hide-delimiter-background>
        <v-carousel-item>
          <v-card-title class="mx-md-15">About Othello</v-card-title>
          <img class="othello d-block ma-auto pa-1 mb-5" src="img/othello.jpg" alt="othello"/>
          <v-card-text class="mb-12 px-md-15">
            Othello is the trading name of a much older board game, Reversi. In both its originally named form and
            the newer trademark this game has become very popular on computers as much as in board format. Often
            referred to as a game of abstract strategy, Othello can only be played as a 2 player game. Made up of 8
            rows and 8 columns, the board is populated with pieces from both players in turn. Each player’s pieces
            will be of one colour with the most common occurrence being black and white.
          </v-card-text>
        </v-carousel-item>
        <v-carousel-item>
          <v-card-title class="mx-md-15">The Start</v-card-title>
          <img class="screenshot d-block ma-auto pb-5" src="img/screenshot.png" alt="screenshot"/>
          <v-card-text class="mb-12 px-md-15">Both players begin the game with two pieces on the board in the four
            centre squares. No two matching colours are connected vertically or horizontally so a miniature
            chequered pattern is made. In the typical set ups where it is black versus white the person using black
            chips must make the first move.
          </v-card-text>
        </v-carousel-item>
        <v-carousel-item>
          <v-card-title class="mx-md-15">How to Play Othello</v-card-title>
          <img class="screenshot d-block ma-auto pb-5" src="img/gameover.png" alt="gameover"/>
          <v-card-text class="mb-12 px-md-15">
            Players battle to finish the game with more of their own pieces on the board than their opponent. The
            game is classed as finished when there are no spaces left on the board or there are no more possible
            legal moves for either competitor
          </v-card-text>
        </v-carousel-item>
        <v-carousel-item>
          <v-card-title class="mx-md-15">The Game</v-card-title>
          <img class="example d-block ma-auto pb-5" src="img/example.gif" alt="example"/>
          <v-card-text class="mb-12 px-md-15">
            Both players take it in turns to make their move which consists of placing one piece down in a legally
            acceptable position and then turning any of the opposing player’s pieces where applicable. A legal move
            is one that consists of, for example, a black piece being placed on the board that creates a straight
            line (vertical, horizontal or diagonal) made up of a black piece at either end and only white pieces in
            between. When a player achieves this, they must complete the move by turning any white pieces in between
            the two black so that they line becomes entirely black. This turning action must be completed for every
            legal turning line that is created with the placing of the new piece.
            It goes without say that while the example assumes the use of black as the moving player, it is
            applicable both ways.
            Players will then continue to move alternately until they get to the end of the game and a winner is
            decided. This decision is reached by identifying which of the two opponents has the most pieces on the
            board.
          </v-card-text>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <v-btn fixed bottom right large color="rgba(80,90,100,0.7)" dark elevation="3" fab @click="goBack"
           class="animate__animated animate__fadeInUp animate__faster animate__delay-1s" aria-label="back">
      <v-icon>mdi-reply</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
export default {
  methods: {
    goBack: () => history.back()
  },
  mounted: () => document.title = "About"
}
</script>
<style scoped>

.example, .screenshot {
  width: 500px;
}

.example {
  width: 480px;
}

.othello {
  width: 80%;
  box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767px) {
  .screenshot {
    width: 85%;
  }

  .example {
    width: 80%;
  }
}
</style>
