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
          const {size, squares} = object;
          let cellArray = new Array(size)
          for (let i = 0; i < object.size; i++) {
            cellArray[i] = []
          }
          for (let o of squares) {
            cellArray[o.col][o.row] = o.value
          }
          this.cells = cellArray;
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
        default:
          console.log(object);
          break;
      }
    } catch (e) {
      console.error(e)
    }
  },
  setCell({dispatch, commit}, cellId){
    commit('setCell', cellId)
  },

  request({commit}, req){
    commit('request', req)
  },

  changeDifficulty({commit}, dif) {
    commit('request', 'difficulty/' + dif)
  },

  changeSidebarVisibility({commit}, isVisible){
    commit('changeSidebarVisibility', isVisible)
  }
}