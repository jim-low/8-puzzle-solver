import { goalState } from './puzzle.js';
import BreadthFirst from './algorithms/breadth-first.js';
import AStar from './algorithms/aStarSearch/a-star.js';

const puzzleStates = [
    [4, 8, 0, 7, 3, 2, 6, 5, 1],
    [2, 6, 8, 7, 1, 0, 5, 3, 4],
    [4, 8, 6, 7, 1, 2, 5, 3, 0],
    [4, 3, 8, 5, 7, 2, 1, 0, 6],
    [1, 7, 8, 4, 6, 2, 5, 3, 0],
    [0, 7, 1, 2, 4, 5, 8, 3, 6],
    [3, 6, 8, 1, 7, 2, 4, 5, 0],
    [2, 5, 8, 7, 0, 6, 1, 3, 4],
    [4, 6, 1, 8, 3, 2, 5, 7, 0],
    [8, 7, 0, 5, 1, 6, 2, 3, 4],
]

let path = [];
puzzleStates.forEach(puzz => {
    // path = new BreadthFirst().time(puzz);
    // console.log(path);

    // path = AStar.search(puzz, goalState);
    // console.log(path);
});

!path && alert('Please uncomment code in src/main.js to perform the searches :)');
