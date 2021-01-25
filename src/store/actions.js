let webSocket;

export default {
  connectWebsocket({ dispatch, commit }) {
    webSocket = new WebSocket('wss://othello-backend-2.herokuapp.com/websocket')
    console.info('Connecting to WebSocket...')

    webSocket.onopen = () => {
      console.info('Connected to server: ' + webSocket.url)
      webSocket.send('connect')
      commit('setIsDisconnected', false);
    }

    webSocket.onmessage = message => dispatch('websocketOnMessage', message)

    webSocket.onerror = event => console.error(event)
    webSocket.onclose = () => {
      setTimeout(() => {
        dispatch('connectWebsocket');
        setTimeout( () => {
          if (webSocket.readyState === WebSocket.CLOSED) {
            commit('setIsDisconnected', true);
          }
        }, 500);
      }, 2000);
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
          let bl = squares.filter(e => e.value === 1).length;
          let wh = squares.filter(e => e.value === 2).length;
          commit('setCells', cellArray);
          commit('setSize', size);
          commit('updateBlack', bl)
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
  },
  setDeferredPrompt({ commit }, deferredPrompt) {
    commit('setDeferredPrompt', deferredPrompt);
  },
  setPlayerName({commit}, {index, name}) {
    commit('request', `rename/${index}/${name}`)
  },
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } else {
      commit("SET_USER", null);
    }
  }
}
