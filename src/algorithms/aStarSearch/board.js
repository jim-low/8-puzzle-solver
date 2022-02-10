import { goalState, goalState2D } from '../../puzzle.js';

// to switch tiles
const moves = { up: -3, down: 3, left: -1, right: 1, };

export default class Board {
    constructor(tiles, g, prev = null) {
        this.tiles = tiles;
        this.g = g; // amount of steps taken to reach this state
        this.prev = prev;

        this.board2D = [];
        for (let i = 0; i < 3; ++i) {
            this.board2D.push(this.tiles.slice((i * 3), (i * 3) + 3));
        }

        this.h = this.manhattan(); // heuristic cost (Manhattan)
        this.f = this.g + this.h;
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

    isEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
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

            if (!this.isEqual(board, this.prev)) {
                const state = new Board(board, this.g + 1, this.tiles);
                successors.push(state);
            }
        })

        return successors;
    }

    manhattan() {
        let cost = 0;

        this.getUnmatchedTiles().forEach(unmatchedTile => {
            console.log(unmatchedTile);
            const currIdx = {row: -1, col: -1};
            const goalIdx = {row: -1, col: -1};

            for (let i = 0; i < goalState2D.length; ++i) {
                if (currIdx.col === -1) {
                    currIdx.col = this.board2D[i].indexOf(unmatchedTile);
                    currIdx.row = i;
                }

                if (goalIdx.col === -1) {
                    goalIdx.col = goalState2D[i].indexOf(unmatchedTile);
                    goalIdx.row = i;
                }
            }
            cost += Math.abs(currIdx.row - goalIdx.row) + Math.abs(currIdx.col - goalIdx.col);
        });

        return cost;
    }
}
