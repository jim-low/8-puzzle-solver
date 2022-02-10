// may need to remove canMove() and movePuzzle() function

const goalState = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ];
const goalState2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];
// const puzzle = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ].sort(() => Math.random() - 0.5);
const puzzle = [ 0, 1, 3, 4, 2, 5, 7, 8, 6 ]
const boxes = document.querySelectorAll('.box span');

function resetTiles(tiles = null) {
    const display = tiles || puzzle;
    boxes.forEach((box, i) => box.innerText = display[i] || '');
}

function canMove(currIdx, direction) {
    switch(direction) {
        case 'up':
            if (currIdx < 3) {
                return false;
            }
            break;

        case 'right':
            if (
                currIdx === 2 ||
                currIdx === 5 ||
                currIdx === 8
            ) {
                return false;
            }
            break;

        case 'down':
            if (currIdx >= 6 && currIdx < 9) {
                return false;
            }
            break;

        case 'left':
            if (
                currIdx === 0 ||
                currIdx === 3 ||
                currIdx === 6
            ) {
                return false;
            }
            break;
    }

    return true;
}

function movePuzzle(direction) {
    const spaceIdx = puzzle.indexOf(0);
    if (!canMove(spaceIdx, direction)) {
        return;
    }

    const directions = {
        up: -3,
        down: 3,
        left: -1,
        right: 1,
    }
    const swapIdx = spaceIdx + directions[direction];
    const numToSwap = puzzle[swapIdx];
    puzzle[spaceIdx] = numToSwap;
    puzzle[swapIdx] = 0;

    resetTiles();
}

export {
    movePuzzle,
    resetTiles,
    goalState,
    goalState2D,
};
