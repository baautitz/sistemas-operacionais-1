import Processo from "./Processo.js";

export default class CPU {
    #tempoCPU;
    #processoExecutando;
    #listaProcessos;

    constructor() {
        this.#tempoCPU = 0;
        this.#processoExecutando = undefined;
        this.#listaProcessos = [];
    }

    esperaProcesso(processo) {
        const p = new Processo(processo.getPID(), processo.getBurst());
        this.#listaProcessos.push(p);
    }

    removeEsperaProcesso(pid) {
        this.#listaProcessos = this.#listaProcessos.filter(p => p.getPID() != pid);
    }

    executaProcesso(processo) {
        if (processo == undefined) {
            this.#processoExecutando = undefined;
        } else {
            const p = new Processo(processo.getPID(), processo.getBurst());
            this.#processoExecutando = p;
        }
    }

    executaProximoProcesso() {
        let proximoProcesso = this.getListaProcessos()[0];

        this.executaProcesso(proximoProcesso);
        this.removeEsperaProcesso(proximoProcesso.getPID());
    }

    incrementaTempo() {
        this.#tempoCPU++;
    }

    getTempoCPU() {
        return this.#tempoCPU;
    }

    getProcessoExecutando() {
        return this.#processoExecutando;
    }

    getListaProcessos() {
        return this.#listaProcessos;
    }
}