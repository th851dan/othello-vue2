export default {
    getDifficulty(state) {
        return state.difficulty
    },
    getBoard(state) {
        return state.board
    },
    getNumBlack(state) {
        return state.numBlack
    },
    getNumWhite(state) {
        return state.numWhite
    },
    getSize(state){
        return state.size
    },
    getSidebarVisibility(state){
        return state.sidebarShow
    },
    getNavigationVisibility(state){
        return state.navigationVisibility;
    },
    getNewGameModalVisibility(state){
        return state.newGameModalVisible
    },
    getGameOverModalVisibility(state){
        return state.gameOverModalVisible
    },
    getDisplayedPlayerName(state) {
        return state.currentPlayer.name + (state.currentPlayer.isBot ? ' (bot)' : '')
    },
    getDisplayedGameMode(state) {
        const firstPlayer = state.mode === '0' ? 'Bot' : "Player";
        const secondPlayer = state.mode < '2' ? 'Bot' : "Player";
        return firstPlayer + " vs " + secondPlayer;
    },
    getDisplayedDifficulty(state) {
        return state.mode === '2' ? "-" : state.difficulty;
    }
}