// need to refactor time() and getSuccessors() method
// maybe add method to reset initial states
// remove unused parameters
// remove console.log
export default class BreadthFirst {
    constructor() {
        this.endTime = 0
        this.startTime = 0
        this.counted = 0
        this.counter = 1000
        this.allSuc = []
        this.hash = {}
        this.values = new Array(1000000)
        this.size = 0

        this.goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0]
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
        newState = this.move(state, successors, pos, step);
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
//            newState = this.move(state, successors, pos, -3);
            this.generateNode(newState, state, _state, successors, pos, -3);
//            if (!this.compare(newState, state.prev)) {
//                _state = this.hashState(newState);
//                if (typeof this.hash[_state] === 'undefined') {
//                    this.hash[_state] = newState;
//                    newState.prev = state;
//                    successors.push(newState);
//                }
//            }
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

    // remove
    statesPerSecond() {
        let now = new Date();
        if (now.getTime() - this.startTime.getTime() >= this.counter) {
            console.log('this.counted', this.counter, this.allSuc.length - this.counted);
            this.counted = this.allSuc.length;
            this.counter += 1000;
        }
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
        console.log(this.size);
        return result.reverse();
    }

    search(state) {
        this.values = new Array(1000000);
        state.prev = null;
        this.values[0] = state;
        this.size++;
        for (let i = 0; i < this.size; i++) {
            this.statesPerSecond();
            if (this.compare(this.goalState, this.values[i])) {
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
    is unsolvable http://math.stackexchange.com/a/838818
        */
        // keep this
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

    /* Fisher-Yates shuffle http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle*/
        // remove
        shuffle(array) {
            let size = array.length;
            let rand;
            for (let i = 1; i < this.size; i += 1) {
                rand = Math.round(Math.random() * i);
                this.swap(array, rand, i);
            }
            return array;
        }

    // remove
    generatePuzzle(state) {
        let firstElement, secondElement;
        let _state = state.slice();
        this.shuffle(_state);
        // remove this v
        if (!this.checkSolvable(_state)) {
            console.log('cannot solve, so i make it can be solved :)');
            firstElement = _state[0] !== 0 ? 0 : 3;
            secondElement = _state[1] !== 0 ? 1 : 3;
            this.swap(_state, firstElement, secondElement);
        }
        // remove this ^
        console.log('Puzzle to solve: [' + _state + ']');
        return _state;
    }

    time(initialState) {
        const puzzle = this.generatePuzzle(initialState);
        this.startTime = new Date();
        console.log(puzzle);
        let result = this.search(puzzle, this.goalState);
        console.log(result);
        console.log(result.length);
        this.endTime = new Date();
        console.log('Operation took ' + (this.endTime.getTime() - this.startTime.getTime()) + ' msec');
        BreadthFirst.reset();
        return result;
    }

    // implement reset() method
    // reset all instance variables to initial state/value
    reset() {
        this.endTime = 0
        this.startTime = 0
        this.counted = 0
        this.counter = 1000
        this.allSuc = []
        this.hash = {}
        this.values = new Array(1000000)
        this.size = 0

        this.goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    }
}
