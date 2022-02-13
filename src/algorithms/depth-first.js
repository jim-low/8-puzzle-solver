export const dfs = (grid, startNode, finishNode) => {
    const unvisited = [];
    const visitedNodesInOrder = [];
    startNode.isVisted = true;
    startNode.previousNode = null;
    unvisited.push(startNode);
    visitedNodesInOrder.push(startNode);
    while (unvisited.length !== 0) {
        let currentNode = unvisited.pop();
        if (currentNode === finishNode) return visitedNodesInOrder;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        let neighbors = getUnvisitedNeighbors(currentNode, grid);

        for (const neighbor of neighbors) {
            neighbor.previousNode = currentNode;
            unvisited.push(neighbor);
        }
    }
    return visitedNodesInOrder;
}

export const getUnvisitedNeighbors = (node, grid) => {
    let neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors = neighbors.filter((neighbor) => !neighbor.isVisited);
    return neighbors.filter(neighbor => !neighbor.isWall);
};
