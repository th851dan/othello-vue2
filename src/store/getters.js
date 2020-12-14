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
    }
}