export default {
  connectWebsocket({ dispatch, commit }) {
    const webSocket = new WebSocket('ws://localhost:9000/websocket')
    console.info('Connecting to WebSocket...')

    webSocket.onopen = () => {
      console.info('Connected to server: ' + webSocket.url)
      webSocket.send('connect')
      commit('setIsDisconnected', false);
    }

    webSocket.onmessage = message => dispatch('websocketOnMessage', message)

    webSocket.onerror = event => console.error(event)
    webSocket.onclose = () => {
      commit('setIsDisconnected', true);
      setTimeout(() => dispatch('connectWebsocket'), 2000);
    }
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
          if (new_status === "GAME_OVER") {
            setTimeout(() => dispatch('showGameOverModal'), 500);
          } else if (new_status === "ILLEGAL")
            dispatch('setIsMoveIllegal', true);
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
    commit('setIsMoveIllegal' ,false)
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
  changeSidebarVisibility({ commit }, isVisible) {
    commit('changeSidebarVisibility', isVisible)
  },
  newGame({ commit }) {
    commit('request', 'new')
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
  },
  setIsMoveIllegal({ commit }, mode) {
    commit('setIsMoveIllegal', mode)
  },
  setIsDisconnected({ commit }, mode) {
    commit('setIsDisconnected', mode)
  }
}
