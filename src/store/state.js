export default {
  socket: null,
  board: [],
  numBlack: 0,
  numWhite: 0,
  difficulty: 'Normal',
  size: 0,
  isSidebarVisible: false,
  gameOverModalVisible: false,
  isMoveIllegal: false,
  isDisconnected: false,
  currentPlayer: {},
  mode: '1',
  deferredPrompt: null,
  player1: 'player1',
  player2: 'player2',
  user: {
    loggedIn: false,
    data: null
  },
}
