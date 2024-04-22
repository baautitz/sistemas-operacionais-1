export default class Processo {
    #pid;
    #burst;

    constructor(pid, burst) {
        this.#pid = pid;
        this.#burst = burst;
    }

    getPID() {
        return this.#pid;
    }

    getBurst() {
        return this.#burst
    }

    decrementaBurst() {
        this.#burst--;
    }
}