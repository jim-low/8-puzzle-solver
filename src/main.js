import { goalState, puzzleStates } from './puzzle.js';
import BreadthFirst from './algorithms/breadth-first.js';
import AStar from './algorithms/aStarSearch/a-star.js';

let path = [];
let memory = 0;
puzzleStates.forEach(puzz => {
    console.time('Breadth First Search');
    path = new BreadthFirst().time(puzz);
    console.timeEnd('Breadth First Search');
    console.log(`Memory Used: ${window.performance.memory.usedJSHeapSize} byte`);
    memory += window.performance.memory.usedJSHeapSize
    console.log(path);


    console.time('A* Search');
    path = AStar.search(puzz, goalState);
    console.timeEnd('A* Search');
    console.log(`Memory Used: ${window.performance.memory.usedJSHeapSize} byte`);
    memory += window.performance.memory.usedJSHeapSize
    console.log(path);
});

path.length === 0 && alert('Please uncomment code in src/main.js to perform the searches :)');
