// may need to remove canMove() and movePuzzle() function

const goalState = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ];
const goalState2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];

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

export {
    goalState,
    goalState2D,
    puzzleStates,
};
