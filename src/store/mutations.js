export default {
  connectToSocket (state, socket) {
    state.socket = socket
  },
  setCells(state, board){
    state.board = board
  },
  updateBlack(state, numBlack){
    state.numBlack = numBlack
  },
  updateWhite(state, numWhite){
    state.numWhite = numWhite
  },
  updateDifficulty(state, difficulty){
    state.difficulty = difficulty
  },
  setCell(state, cellId){
    const row = parseInt(cellId.charAt(0));
    const col = parseInt(cellId.charAt(1));
    const x = String.fromCharCode(col + 65);
    const y = 1 + row;
    state.socket.send("set/" + x + y)
  },
  setSize(state, size){
    state.size = size;
  },
  request(state, command){
    state.socket.send(command);
  },
  changeSidebarVisibility(state, isVisible){
    state.sidebarShow = isVisible;
  },
  changeNewGameModalVisibility(state, isVisible){
    state.newGameModalVisible = isVisible;
  },
  changeGameOverModalVisibility(state, isVisible){
    state.gameOverModalVisible = isVisible;
  },
  changeStatus(state, status){
    state.status = status;
  }

}
