import Board from './board.js';

export default class PriorityQueue {
    constructor() {
        this.queue = [];
        this.highestPriority = -1;
    }

    enqueue(data) {
        if (this.size() === 0 || this.highestPriority < data.f) {
            this.queue.push(data);
            this.highestPriority = data.f;
        } else {
            const item = this.queue.find(el => el.f > data.f);
            const insertIdx = this.queue.indexOf(item);
            this.queue.splice(insertIdx, 0, data);
        }
    }

    dequeue() {
        if (this.size() === 0) {
            return null;
        }

        return this.queue.shift();
    }

    // TODO: optimize method
    checkSuccessorWithLowerPriority(board) {
        for (let i = 0; i < this.queue.length; ++i) {
            const currBoard = this.queue[i]
            if (Board.isEqual(board, currBoard.tiles) && currBoard.f < board.f) {
                console.log('checking f scores');
                console.log(`${currBoard.f} < ${board.f}`);
                console.log();
                return true;
            }
        }
        return false;
    }

    size() {
        return this.queue.length;
    }
}
