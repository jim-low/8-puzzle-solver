export default class PriorityQueue {
    constructor() {
        this.queue = [];
        this.highestPriority = -1;
    }

    enqueue(data) {
        if (this.size() === 0 || this.highestPriority < data.f) {
            this.queue.push(data);
            this.highestPriority = data.f;
        } else {
            const item = this.queue.find(el => el.f > data.f);
            const insertIdx = this.queue.indexOf(item);
            this.queue.splice(insertIdx, 0, data);
        }
    }

    dequeue() {
        if (this.size() === 0) {
            return null;
        }

        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }
}
