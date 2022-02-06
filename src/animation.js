import { resetTiles } from './puzzle.js';

export default class PuzzleAnimator {
    constructor(paths) {
        this.paths = paths;

        this.stateIdx = 0;
        this.animationID = 0;
        this.animationSpeed = 300;
    }

    fillPuzzle() {
        resetTiles(this.paths[this.stateIdx]);
    }

    play() {
        this.animationID = setInterval(() => {
            if (this.stateIdx >= this.paths.length) {
                this.pause();
                return;
            }

            this.fillPuzzle();
            ++this.stateIdx;
        }, this.animationSpeed);
    }

    pause() {
        clearInterval(this.animationID);
    }

    nextStep() {
        this.pause();

        if (this.stateIdx >= this.paths.length) {
            return;
        }
        ++this.stateIdx;
        this.fillPuzzle();
    }

    prevStep() {
        this.pause();

        if (this.stateIdx <= 0) {
            return;
        }
        --this.stateIdx;
        this.fillPuzzle();
    }

    resetPuzzle() {
        this.stateIdx = 0;
        this.animationID = 0;
        this.fillPuzzle();
    }

    newPuzzle(newPaths) {
        this.paths = newPaths;
        this.stateIdx = 0;
        this.fillPuzzle();
    }
}
