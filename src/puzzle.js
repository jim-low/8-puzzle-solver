const nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ].sort(() => Math.random() - 0.5);

const tiles = [];
for (let i = 0; i < 3; ++i) {
    tiles.push(nums.slice(i * 3, (i * 3) + 3));
}

function fillTiles(boxes) {
    const tileNums = [
        ...tiles[0],
        ...tiles[1],
        ...tiles[2],
    ];
    boxes.forEach((box, i) => box.innerText = tileNums[i] || '');
}

function findSpace() {
    let location = [];
    tiles.forEach((row, i) => {
        const result = row.indexOf(0);
        if (result !== -1) {
            location = [ i, result ];
        }
    })
    return location;
}

function canMove(currIdx, direction) {
    if (direction === 'up' && currIdx[0] === 0) {
        return false
    }

    if (direction === 'down' && currIdx[0] === 2) {
        return false
    }

    if (direction === 'left' && currIdx[1] === 0) {
        return false
    }

    if (direction === 'right' && currIdx[1] === 2) {
        return false
    }

    return true;
}

function movePuzzle(direction) {
    const spaceIdx = findSpace();
    if (!canMove(spaceIdx, direction)) {
        return;
    }

    const [ row, col ] = spaceIdx;
    let tmpNum;
    if (direction === 'up') {
        tmpNum = tiles[row - 1][col];
        tiles[row][col] = tmpNum;
        tiles[row - 1][col] = 0
    }

    if (direction === 'down') {
        tmpNum = tiles[row + 1][col];
        tiles[row][col] = tmpNum;
        tiles[row + 1][col] = 0;
    }

    if (direction === 'left') {
        tmpNum = tiles[row][col - 1];
        tiles[row][col] = tmpNum;
        tiles[row][col - 1] = 0;
    }

    if (direction === 'right') {
        tmpNum = tiles[row][col + 1];
        tiles[row][col] = tmpNum;
        tiles[row][col + 1] = 0;
    }
}

export {
    movePuzzle,
    fillTiles,
};
