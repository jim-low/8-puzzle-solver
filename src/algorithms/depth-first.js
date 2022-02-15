export default class DepthFirst{
    static search(graph, root, goal){
        let limit = 0;
    }

    static depthFirstSearch(rootState, goalState, current = null, visited = []){
        if (visited.length === 0) {
            visited.push(rootState);
        }

        if (!current) {
            current = {}
            current.data = rootState;
            current.prev = null;
        }

        // isEqual you implement
        if (DepthFirst.isEqual(current.data, goalState)) {
            return DepthFirst.constructPath(current);
        }

        // you implement
        const successors = DepthFirst.getSuccessors(current)
        console.log(current.data);
        console.log(successors);
        return
        for (let i = 0; i < successors.length; ++i) {
            const currSuccessor = successor[i];
            if (!DepthFirst.isEqual(current.data, currSuccessor.data)) {
                currSuccessor.prev = current;

                visited.push(currSuccessor);
                return DepthFirst.depthFirstSearch(graph, rootState, goalState, currSuccessor, visited);
            }
        }

        // go backwards
        return DepthFirst.depthFirstSearch(rootState, goalState, current.prev, visited);
    }

    /*
    node = {
        data: number[],
        prev: node
    } 
    */
    static getSuccessors(node) {
        const successors = [];
        const spaceIndex = node.data.indexOf(0);
        
        DepthFirst.getPossibleMoves(node.data).forEach(move => {
            //first copy node.data 
            const state = [...node.data];
            //switch space index
            state[spaceIndex] = state[spaceIndex + move];
            state[spaceIndex + move] = 0;
            //compare new succesors with node.prev.data
            if (node.prev == null || !DepthFirst.isEqual(state, node.prev.data)){
                successors.push(state);
            }
            //if not equal then push to succesors array

        })
        return successors;
    }

    static getPossibleMoves(puzzle){
        const moves = [];
        const index = puzzle.indexOf(0);
  
        if (index != 0 && index != 1 && index != 2){
            moves.push(-3); 
        }

        if (index != 6 && index != 7 && index != 8){
            moves.push(3);
        }

        if (index != 0 && index != 3 && index != 6){
            moves.push(-1); 
        }

        if (index != 2 && index != 5 && index != 8){
            moves.push(1); 
        }

        return moves;
    }

    static isEqual(arr1, arr2) {
        if (arr1 == null || arr2 == null) {
            return false;
        }

        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
}