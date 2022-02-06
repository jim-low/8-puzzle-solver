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
    move(state, successors, pos, steps) {
        var newState;
        newState = state.slice();
        this.swap(newState, pos, pos + steps);
        return newState;
    }

    hashState(state) {
        var stateLength = state.length;
        var hash = 0;
        for (var i = 0; i < stateLength; i++) {
            hash += state[i] * Math.pow(stateLength, i);
        }
        return hash;
    }

    getSuccessors(state) {
        var newState, _state;
        var successors = [];
        var pos = state.indexOf(0);
        var row = Math.floor(pos / 3);
        var col = pos % 3;
        if (row > 0) {
            //move up
            newState = this.move(state, successors, pos, -3);
            if (!this.compare(newState, state.prev)) {
                _state = this.hashState(newState);
                if (typeof this.hash[_state] === 'undefined') {
                    this.hash[_state] = newState;
                    newState.prev = state;
                    successors.push(newState);
                }
            }
        }
        if (col > 0) {
            //move left
            newState = this.move(state, successors, pos, -1);
            if (!this.compare(newState, state.prev)) {
                _state = this.hashState(newState);
                if (typeof this.hash[_state] === 'undefined') {
                    this.hash[_state] = newState;
                    newState.prev = state;
                    successors.push(newState);
                }
            }
        }
        if (row < 2) {
            //move down
            newState = this.move(state, successors, pos, 3);
            if (!this.compare(newState, state.prev)) {
                _state = this.hashState(newState);
                if (typeof this.hash[_state] === 'undefined') {
                    this.hash[_state] = newState;
                    newState.prev = state;
                    successors.push(newState);
                }
            }
        }
        if (col < 2) {
            //move right
            newState = this.move(state, successors, pos, 1);
            if (!this.compare(newState, state.prev)) {
                _state = this.hashState(newState);
                if (typeof this.hash[_state] === 'undefined') {
                    this.hash[_state] = newState;
                    newState.prev = state;
                    successors.push(newState);
                }
            }
        }
        return successors;
    }

    swap(state, from, to) {
        var _ = state[from];
        state[from] = state[to];
        state[to] = _;
    }

    statesPerSecond() {
        var now = new Date();
        if (now.getTime() - this.startTime.getTime() >= this.counter) {
            console.log('this.counted', this.counter, this.allSuc.length - this.counted);
            this.counted = this.allSuc.length;
            this.counter += 1000;
        }
    }

    collateStates(i) {
        var _ = this.values[i].prev;
        var result = [this.values[i]];
        while (_) {
            for (var j = 0; j < this.size; j++) {
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

    breadthFirstSearch(state, goalState) {
        this.values = new Array(1000000);
        // this.size = 0;
        state.prev = null;
        this.values[0] = state;
        this.size++;
        for (var i = 0; i < this.size; i++) {
            this.statesPerSecond();
            if (this.compare(this.goalState, this.values[i])) {
                return this.collateStates(i);
            } else {
                var _successors = this.getSuccessors(this.values[i]);
                for (var k = 0; k < _successors.length; k++) {
                    this.values[this.size] = _successors[k];
                    this.size++;
                }
            }
        }
    }

    compare(arr1, arr2) {
        if (!arr1 || !arr2) {
            return false;
        }

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    /* This post on stackexchange explained the condition when a puzzle
       is unsolvable http://math.stackexchange.com/a/838818
    */
    checkSolvable(state) {
        var pos = state.indexOf(0);
        var _state = state.slice();
        _state.splice(pos, 1);
        var count = 0;
        for (var i = 0; i < _state.length; i++) {
            for (var j = i + 1; j < _state.length; j++) {
                if (_state[i] > _state[j]) {
                    count++;
                }
            }
        }
        return count % 2 === 0;
    }

    /* Fisher-Yates shuffle http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle*/
    shuffle(array) {
        var size = array.length;
        var rand;
        for (var i = 1; i < this.size; i += 1) {
            rand = Math.round(Math.random() * i);
            this.swap(array, rand, i);
        }
        return array;
    }

    generatePuzzle(state) {
        var firstElement, secondElement;
        var _state = state.slice();
        this.shuffle(_state);
        if (!this.checkSolvable(_state)) {
            firstElement = _state[0] !== 0 ? 0 : 3;
            secondElement = _state[1] !== 0 ? 1 : 3;
            this.swap(_state, firstElement, secondElement);
        }
        // _state = [1, 0, 2, 3, 4, 5, 6, 7, 8];
        // _state = [0,7,4,8,2,1,5,3,6];
        // _state = [6,3,1,4,7,2,0,5,8];
        // _state = [8,0,1,3,4,7,2,6,5];
        _state = [8, 6, 7, 2, 5, 4, 3, 0, 1]; //32 steps
        // _state = [0,8,7,6,3,5,1,4,2]; //29 steps
        console.log('Puzzle to solve: [' + _state + ']');
        return _state;
    }

    time() {
        var puzzle = this.generatePuzzle(this.goalState);
        this.startTime = new Date();
        var result = this.breadthFirstSearch(puzzle, this.goalState);
        console.log(result.length);
        this.endTime = new Date();
        console.log('Operation took ' + (this.endTime.getTime() - this.startTime.getTime()) + ' msec');
    }
}
new BreadthFirst().time()
