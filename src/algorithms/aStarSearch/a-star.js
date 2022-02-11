import Board from "./board.js";
import PriorityQueue from "./priority-queue.js";

export default class AStar {
    static search(root, goal) {
        const openList = new PriorityQueue();

        const closedList = new PriorityQueue();

        openList.enqueue(new Board(root, 0));

        while (openList.size() !== 0) {
            const q = openList.dequeue();

            const successors = q.getSuccessors();

            for (let i = 0; i < successors.length; ++i) {
                const successor = successors[i];
                if (Board.isEqual(successor.tiles, goal)) {
                    return Board.constructPath(successor);
                }

                if (!openList.checkSuccessorWithLowerPriority(successor) && !closedList.checkSuccessorWithLowerPriority(successor)) {
                    openList.enqueue(successor);
                }
            }

            closedList.enqueue(q);
        }

        // no solution
        return [];
    }
}
