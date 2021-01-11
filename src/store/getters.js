export default {
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
    getSidebarVisibility(state) {
        return state.isSidebarVisible
    },
    getMode(state) {
        return state.mode;
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
    getDifficulty(state) {
        return state.mode === '2' ? "-" : state.difficulty;
    },
    getGameOverTitle(state) {
        if (state.numBlack === state.numWhite) return "Game Over";
        else return state.numBlack > state.numWhite ? "Black wins!" : "White wins!";
    },
    getIsMoveIllegal(state) {
        return state.isMoveIllegal;
    },
    getIsDisconnected(state) {
        return state.isDisconnected;
    },
    getDeferredPrompt(state) {
        return state.deferredPrompt;
    }
}
