import { movePuzzle, resetTiles, goalState } from './puzzle.js';
import BreadthFirst from './algorithms/breadth-first.js';

document.addEventListener('keydown', (e) => {
    if (!e.key.includes('Arrow')) {
        return;
    }

    movePuzzle(e.key.split('Arrow')[1].toLowerCase());
});

document.querySelectorAll('.control-buttons button').forEach(button => {
    const direction = button.innerText.split(' ')[1];
    button.addEventListener('click', () => movePuzzle(direction))
});

resetTiles();
new BreadthFirst().time([3, 2, 5, 1, 8, 7, 0, 4, 6]);
