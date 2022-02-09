import { goalState } from '../../puzzle.js';

export default class Board {
    constructor(tiles) {
        // one dimension array for current state
        this.board = this.get2DTiles(tiles);
        this.goal = this.get2DTiles(goalState);
    }

    get2DTiles(arr) {
        const tiles = [];
        for (let i = 0; i < 3; ++i) {
            const divisor = i * 3;
            arr.slice(divisor, divisor + 3);
        }
        return tiles;
    }

    getUnmatchedTiles() {
        const outOfPlace = [];
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (this.goal[i][j] === 0) {
                    continue;
                }

                if (this.goal[i][j] !== this.board[i][j]) {
                    outOfPlace.push(this.goal[i][j]);
                }
            }
        }
        return outOfPlace;
    }

    // heuristic cost calculation function
    manhattan() {
        const outOfPlace = this.getUnmatchedTiles();

        const currentState = [];
        const goal = [];

        for (let i = 0; i < 3; ++i) {
            const divisor = i * 3;
            currentState.push(this.board.slice(divisor, divisor + 3));
            goal.push(goalState.slice(divisor, divisor + 3));
        }
    }
}
