import { resetTiles } from './puzzle.js';

export default class PuzzleAnimator {
    constructor(paths) {
        this.paths = paths;

        this.stateIdx = 0;
        this.animationID = 0;
        this.animationSpeed = 300;
        this.isPlaying = false;
    }

    fillPuzzle() {
        resetTiles(this.paths[this.stateIdx]);
    }

    play() {
        if (this.isPlaying) {
            return;
        }

        this.isPlaying = true;
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
        this.isPlaying = false;
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
        this.isPlaying = false;
        this.fillPuzzle();
    }

    newPuzzle(newPaths) {
        this.paths = newPaths;
        this.resetPuzzle()
    }
}
