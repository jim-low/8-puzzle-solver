export default class IterativeDeepening{

    static search(root, goal){
        let limit = 0;
        let result = IterativeDeepening.depthFirstSearch(root, goal, limit + 1);
        while(!result){
            ++limit;
            result = IterativeDeepening.depthFirstSearch(root, goal, limit + 1);
        }
        return result;
    }

    static depthFirstSearch(rootState, goalState, limit, current = null, visited = []){
        //debugger
        if (visited.length === 0) {
            visited.push(rootState);
        }

        if (!current) {
            current = {data: rootState}
            current.step = 0;
            current.prev = null;
            current.isRoot = true;
        }

        if (current.step > limit){
            return IterativeDeepening.depthFirstSearch(rootState, goalState, limit, current.prev, visited);
        }

        // isEqual you implement
        if (IterativeDeepening.isEqual(current.data, goalState)) {
            return IterativeDeepening.constructPath(current);
        }

        // you implement
        const successors = IterativeDeepening.getSuccessors(current)
        const lastSuccessor = successors.at(-1);
            if (IterativeDeepening.isVisited(lastSuccessor.data, visited)){
                return current.isRoot ?null: IterativeDeepening.depthFirstSearch(rootState, goalState, limit, current.prev, visited);
            }
        for (let i = 0; i < successors.length; ++i) {
            const successor = successors[i];
            if (!IterativeDeepening.isVisited(successor.data, visited)){
                visited.push(successor.data);
                return IterativeDeepening.depthFirstSearch(rootState, goalState, limit, successor, visited);
            }
        }

        // go backwards
        return IterativeDeepening.depthFirstSearch(rootState, goalState, limit, current.prev, visited);
    }

    static isVisited(node, visited){
        for(let i = 0; i < visited.length; i++){
            if(IterativeDeepening.isEqual(node, visited[i])){
                return true;
            }
        }
        return false;
    }
    /*
    node = {
        data: number[],
        prev: node
    }
    */
    static constructPath(node){
        const path = [];
        let current = node;
        while (current.prev != null){
            path.push(current.data);
            current =  current.prev;
        }
        path.push(current.data);
        return path.reverse();
    }

    static getSuccessors(node) {
        const successors = [];
        const spaceIndex = node.data.indexOf(0);

        IterativeDeepening.getPossibleMoves(node.data).forEach(move => {
            //first copy node.data
            const state = [...node.data];
            //switch space index
            state[spaceIndex] = state[spaceIndex + move];
            state[spaceIndex + move] = 0;
            //compare new succesors with node.prev.data
            if (node.prev == null || !IterativeDeepening.isEqual(state, node.prev.data)){
                successors.push({data: state, prev: node, step: node.step + 1, isRoot: false});
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
