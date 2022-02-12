import { movePuzzle, resetTiles, goalState } from './puzzle.js';
import BreadthFirst from './algorithms/breadth-first.js';
import AStar from './algorithms/aStarSearch/a-star.js';
import PuzzleAnimator from './animation.js';

const puzzleStates = [
    [4, 8, 0, 7, 3, 2, 6, 5, 1],
    [2, 6, 8, 7, 1, 0, 5, 3, 4],
    [4, 8, 6, 7, 1, 2, 5, 3, 0],
    [4, 3, 8, 5, 7, 2, 1, 0, 6],
    [1, 7, 8, 4, 6, 2, 5, 3, 0],
    [0, 7, 1, 2, 4, 5, 8, 3, 6],
    [5, 4, 7, 0, 6, 3, 2, 1, 8], // got problem
    [2, 5, 8, 4, 1, 3, 6, 0, 7], // got problem
    [4, 6, 1, 8, 3, 2, 5, 7, 0],
    [8, 0, 6, 1, 7, 4, 2, 5, 3], // got problem
]
let currentStateIdx = 0;

// maybe might not need this
document.addEventListener('keydown', (e) => {
    if (!e.key.includes('Arrow')) {
        return;
    }

    movePuzzle(e.key.split('Arrow')[1].toLowerCase());
});

document.querySelectorAll('.animation-control').forEach(btn => {
    btn.addEventListener('click', () => {
        const instruction = btn.classList[1];
        animator[instruction]();
    });
});

document.querySelectorAll('.state-control').forEach(btn => {
    btn.addEventListener('click', () => {
        const stateRequest = btn.classList[1]

        if (stateRequest === 'reset') {
            animator.resetPuzzle();
            return;
        }

        if (stateRequest === 'prev' && currentStateIdx > 0) {
            --currentStateIdx;
        }

        if (stateRequest === 'next' && currentStateIdx < puzzleStates.length) {
            ++currentStateIdx;
        }

        const newState = new BreadthFirst().time(puzzleStates[currentStateIdx]);
        animator.newPuzzle(newState);
    });
});
