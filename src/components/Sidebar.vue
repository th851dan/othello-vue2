<template>
    <nav class="sidenav collapse side-collapse bg-light position-fixed" id="sidebar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100" data-toggle="modal" data-target="#new-game-modal">New Game</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Undo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Redo</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light w-100">Hint</button>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#difficulty">
                    Difficulty
                </button>
                <div class="collapse collapsible-panel" id="difficulty">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button id="Easy" type="button" role="button" class="text-left btn w-100">Easy</button>
                        </li>
                        <li class="nav-item">
                            <button id="Normal" type="button" role="button" class="text-left btn w-100">Normal</button>
                        </li>
                        <li class="nav-item">
                            <button id="Hard" type="button" role="button" class="text-left btn w-100">Hard</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item">
                <button type="button" role="button" class="text-left btn btn-light dropdown-toggle w-100" data-toggle="collapse" data-target="#player-mode">
                    Mode
                </button>
                <div class="collapse collapsible-panel" id="player-mode">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button type="button" role="button" class="text-left btn toggled w-100">Player vs Player</button>
                        </li>
                        <li class="nav-item">
                            <button type="button" role="button" class="text-left btn w-100">Player vs Bot</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Sidebar"
}
</script>

<style scoped>
.sidenav {
            z-index: 1;
            overflow-y: auto;
            margin-top: -7px;
            padding-top: 50px;
            width: 200px;
            min-height: calc(100vh - 45px);
            top: 50px;
            bottom: 0;
        }
        
        .sidenav::-webkit-scrollbar {
            display: none;
        }
        
        .sidenav button {
            font-size: 22px;
            color: #818181;
        }
        
        .sidenav a {
            font-size: 22px;
            color: #818181;
        }

        .sidenav.collapse {
            visibility: hidden;
        }
        
        .sidenav.collapse.show {
            transition-property: margin-left, visibility;
            transition-duration: 0.2s;
            visibility: visible;
            box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.38);
        }
        
        .sidenav.collapsing {
            transition-property: margin-left, visibility;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
        }
        
        .sidenav.collapsing.side-collapse {
            transition-property: margin-left, visibility;
            margin-left: -200px;
        }

        .collapsible-panel {
            background: #eeeeee;
            box-shadow: inset 0 2px 2px 0 rgba(30, 30, 30, 0.1);
        }
</style>