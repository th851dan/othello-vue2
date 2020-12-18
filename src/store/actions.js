export default {
  connectWebsocket({ dispatch, commit }) {
    const webSocket = new WebSocket('ws://localhost:9000/websocket')
    console.info('Connecting to WebSocket...')

    webSocket.onopen = () => {
      console.info('Connected to server: ' + webSocket.url)
      webSocket.send('connect')
    }

    webSocket.onmessage = message => dispatch('websocketOnMessage', message)

    webSocket.onerror = event => console.error(event)
    webSocket.onclose = () => setTimeout(() => dispatch('connectWebsocket'), 2000)
    commit('connectToSocket', webSocket)
  },

  websocketOnMessage({ dispatch, commit }, message) {
    try {
      const { event, object } = JSON.parse(message.data);
      switch (event) {
        case "board-changed":
          const { size, squares } = object;
          let cellArray = new Array(size)
          for (let i = 0; i < object.size; i++) {
            cellArray[i] = []
          }
          squares.forEach(o => cellArray[o.col][o.row] = o.value);
          commit('setCells', cellArray);
          commit('setSize', size);
          let bl = [].concat.apply([], cellArray).filter(e => e === 1).length;
          commit('updateBlack', bl)
          let wh = [].concat.apply([], cellArray).filter(e => e === 2).length;
          commit('updateWhite', wh)
          break;
        case "difficulty-changed":
          commit('updateDifficulty', object.difficulty);
          break;
        case 'game-status-changed':
          const { new_status } = object;
          dispatch('setStatus', new_status)
          if (new_status === "GAME_OVER") {
            setTimeout(dispatch('showGameOverModal'), 500);
          }
          break;
        case "player-changed":
          dispatch('setPlayer', object);
          break;
        case "mode-changed":
          const {mode} = object;
          dispatch('setMode', mode);
          break;
        default:
          console.error("Unknown message");
          break;
      }
    } catch (e) {
      console.error(e)
    }
  },
  setCell({ dispatch, commit }, cellId) {
    commit('setCell', cellId)
  },

  request({ commit }, req) {
    commit('request', req)
  },

  changeDifficulty({ commit }, dif) {
    commit('request', 'difficulty/' + dif)
  },
  changeGameMode({ commit }, mode) {
    commit('request', 'setupplayers/' + mode)
  },
  setStatus({ commit }, status) {
    commit('changeStatus', status)
  },
  changeSidebarVisibility({ commit }, isVisible) {
    commit('changeSidebarVisibility', isVisible)
  },
  newGame({ commit }) {
    commit('request', 'new')
  },
  showNewGameModal({ commit }) {
    commit('changeNewGameModalVisibility', true);
  },
  hideNewGameModal({ commit }) {
    commit('changeNewGameModalVisibility', false);
  },
  showGameOverModal({ commit }) {
    commit('changeGameOverModalVisibility', true);
  },
  hideGameOverModal({ commit }) {
    commit('changeGameOverModalVisibility', false);
  },
  setPlayer({ commit }, player) {
    commit('setPlayer', player)
  },
  setMode({ commit }, mode) {
    commit('setMode', mode)
  }
}