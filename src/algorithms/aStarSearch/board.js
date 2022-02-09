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

    // manhattan heuristic cost
    // calculates displacement of tiles compared to goal state
    manhattan() {
        const outOfPlace = this.getUnmatchedTiles();

        let totalCost = 0;
        for (let i = 0; i < outOfPlace.length; ++i) {
            let currentIdx = {row: -1, col: -1};
            let goalIdx = {row: -1, col: -1};

            for (let j = 0; j < 3; ++j) {
                if (currentIdx.col === -1) {
                    currentIdx.row = j;
                    currentIdx.col = current[j].indexOf(outOfPlace[i]);
                }

                if (goalIdx.col === -1) {
                    goalIdx.row = j;
                    goalIdx.col = goal[j].indexOf(outOfPlace[i]);
                }
            }

            totalCost += Math.abs(currentIdx.row - goalIdx.row) + Math.abs(currentIdx.col - goalIdx.col);
        }
        return totalCost;
    }
}
