import { movePuzzle, fillTiles } from './puzzle.js';

const boxes = document.querySelectorAll('.box span');

document.addEventListener('keydown', (e) => {
    if (!e.key.includes('Arrow')) {
        return;
    }

    movePuzzle(e.key.split('Arrow')[1].toLowerCase());
    fillTiles(boxes);
});

document.querySelectorAll('.control-buttons button').forEach(button => {
    const direction = button.innerText.split(' ')[1];
    button.addEventListener('click', () => {
        movePuzzle(direction);
        fillTiles(boxes);
    })
});

fillTiles(boxes);
