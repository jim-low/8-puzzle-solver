import Board from "./board.js";
import PriorityQueue from "./priority-queue.js";

export default class AStar {
    static async search(root, goal) {
        const openList = new PriorityQueue();

        const closedList = new PriorityQueue();

        openList.enqueue(new Board(root, 0));

        while (openList.size() !== 0) {
            const q = openList.dequeue();

            const successors = q.getSuccessors();

            successors.forEach(async (successor) => {
                if (Board.isEqual(successor, goal)) {
                    return Board.constructPath(successor);
                }

                const res = !openList.checkSuccessorWithLowerPriority(successor) && !closedList.checkSuccessorWithLowerPriority(successor);
                if (res) {
                    openList.enqueue(successor);
                }
            });

            closedList.enqueue(q);
        }

        // no solution
        return [];
    }
}
