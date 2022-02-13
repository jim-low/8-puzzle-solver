import { goalState } from '../puzzle.js';

export default class BreadthFirst {
    constructor() {
        this.hash = {}
        this.values = new Array(1000000)
        this.size = 0
    }

    move(state, pos, steps) {
        let newState;
        newState = state.slice();
        this.swap(newState, pos, pos + steps);
        return newState;
    }

    hashState(state) {
        let stateLength = state.length;
        let hash = 0;
        for (let i = 0; i < stateLength; i++) {
            hash += state[i] * Math.pow(stateLength, i);
        }
        return hash;
    }

    generateNode(newState, state, _state, successors, pos, step){
        newState = this.move(state, pos, step);
        if (!this.compare(newState, state.prev)) {
            _state = this.hashState(newState);
            if (typeof this.hash[_state] === 'undefined') {
                this.hash[_state] = newState;
                newState.prev = state;
                successors.push(newState);
            }
        }
    }

    getSuccessors(state) {
        let newState, _state;
        let successors = [];
        let pos = state.indexOf(0);
        let row = Math.floor(pos / 3);
        let col = pos % 3;
        if (row > 0) {
            //move up
            this.generateNode(newState, state, _state, successors, pos, -3);
        }
        if (col > 0) {
            //move left
            this.generateNode(newState, state, _state, successors, pos, -1);
        }
        if (row < 2) {
            //move down
            this.generateNode(newState, state, _state, successors, pos, 3);
        }
        if (col < 2) {
            //move right
            this.generateNode(newState, state, _state, successors, pos, 1);
        }
        return successors;
    }

    swap(state, from, to) {
        let _ = state[from];
        state[from] = state[to];
        state[to] = _;
    }

    collateStates(i) {
        let _ = this.values[i].prev;
        let result = [this.values[i]];
        while (_) {
            for (let j = 0; j < this.size; j++) {
                if (this.compare(_, this.values[j])) {
                    _ = this.values[j].prev;
                    result.push(this.values[j]);
                    break;
                }
            }
        }
        return result.reverse();
    }

    search(state) {
        state.prev = null;
        this.values[0] = state;
        this.size++;
        for (let i = 0; i < this.size; i++) {
            if (this.compare(goalState, this.values[i])) {
                return this.collateStates(i);
            } else {
                let _successors = this.getSuccessors(this.values[i]);
                for (let k = 0; k < _successors.length; k++) {
                    this.values[this.size] = _successors[k];
                    this.size++;
                }
            }
        }
        return [];
    }

    //compare the current puzzle state with the goal state
    compare(arr1, arr2) {
        if (!arr1 || !arr2) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    /* This post on stackexchange explained the condition when a puzzle
    is unsolvable http://math.stackexchange.com/a/838818 */
        checkSolvable(state) {
            let pos = state.indexOf(0);
            let _state = state.slice();
            _state.splice(pos, 1);
            let count = 0;
            for (let i = 0; i < _state.length; i++) {
                for (let j = i + 1; j < _state.length; j++) {
                    if (_state[i] > _state[j]) {
                        count++;
                    }
                }
            }
            return count % 2 === 0;
        }

    time(initialState) {
        let result = this.search(initialState, goalState);
        this.reset();
        return result;
    }

    // implement reset() method
    // reset all instance variables to initial state/value
    reset() {
        this.hash = {}
        this.values = new Array(1000000)
        this.size = 0
    }
}
