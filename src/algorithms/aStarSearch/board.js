// import { goalState } from '../../puzzle.js';

// to switch tiles
const moves = { up: -3, down: 3, left: -1, right: 1, };

export default class Board {
    constructor(tiles, g, h, prev = null) {
        this.tiles = tiles;
        this.g = g; // amount of steps taken to reach this state
        this.h = h; // heuristic cost (Manhattan)
        this.f = g + h;
        this.prev = prev;
    }

    getUnmatchedTiles() {
        const unmatched = [];

        for (let i = 0; i < goalState.length - 1; ++i) {
            if (goalState[i] !== this.tiles[i]) {
                unmatched.push(goalState[i]);
            }
        }

        return unmatched;
    }

    getPossibleMoves(spaceIdx) {
        const moves = [];

        if (spaceIdx >= 0 && spaceIdx <= 5) {
            moves.push('down');
        }

        if (spaceIdx >= 3 && spaceIdx <= 8) {
            moves.push('up');
        }

        if (spaceIdx !== 0 || spaceIdx !== 3 || spaceIdx !== 6) {
            moves.push('left');
        }

        if (spaceIdx !== 2 || spaceIdx !== 5 || spaceIdx !== 8) {
            moves.push('right');
        }

        return moves;
    }

    // get neighbors / possible moves or current state
    getSuccessors() {
        const successors = [];

        const spaceIdx = this.tiles.indexOf(0);
        this.getPossibleMoves(spaceIdx).forEach(move => {
            const board = [...this.tiles];
            const idxToSwitch = spaceIdx + moves[move];

            board[spaceIdx] = board[idxToSwitch];
            board[idxToSwitch] = 0;

            const state = new Board(board, this.g + 1, 0, this.tiles);
            successors.push(state);
        })

        return successors;
    }

    manhattan() {
    }
}
