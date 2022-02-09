export default class PriorityQueue {
    // highestPriority keeps track of the current highest priority of the queue
    constructor() {
        this.queue = [];
        this.highestPriority = -1;
    }

    enqueue(data, priority) {
        const node = {
            data,
            priority,
        };

        if (this.size() === 0 || this.highestPriority < node.priority) {
            this.queue.push(node);
            this.highestPriority = node.priority;
        } else {
            const item = this.queue.find(el => el.priority > node.priority);
            const insertIdx = this.queue.indexOf(item);
            this.queue.splice(insertIdx, 0, node);
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
