import processos from "./ListaProcessos.js"

import Processo from "./models/Processo.js";
import CPU from "./models/CPU.js";

const PID_TROCA_CONTEXTO = -1;

function getNomeProcesso(processo) {
  let nomeProcesso;

  if (processo == undefined) {
    nomeProcesso = "Nenhum";
  } else if (processo.getPID() == PID_TROCA_CONTEXTO) {
    nomeProcesso = "Troca Contexto";
  } else {
    nomeProcesso = `P${processo.getPID()}`
  }

  return nomeProcesso;
}

(function main() {
  let paraExecutar = processos;

  const cpu = new CPU();
  const processoTrocaContexto = new Processo(PID_TROCA_CONTEXTO, 1);
  while (true) {
    if (paraExecutar.length == 0 && cpu.getProcessoExecutando() == undefined) {
      break;
    }

    for (let i = 0; i < paraExecutar.length; i++) {
      if (paraExecutar[i].start != cpu.getTempoCPU())
        continue;

      let processo = new Processo(paraExecutar[i].pid, paraExecutar[i].burst);
      cpu.esperaProcesso(processo);

      paraExecutar = paraExecutar.filter(p => p.pid != processo.getPID());
    }

    if (cpu.getProcessoExecutando() != undefined) {
      if (cpu.getProcessoExecutando().getBurst() > 0) {
        cpu.getProcessoExecutando().decrementaBurst();
      }

      if (cpu.getProcessoExecutando().getBurst() == 0) {
        if (cpu.getProcessoExecutando().getPID() == PID_TROCA_CONTEXTO) {
          cpu.executaProximoProcesso();
        }

        else if (cpu.getListaProcessos().length > 0) {
          cpu.executaProcesso(processoTrocaContexto);
        }

        else if (cpu.getListaProcessos().length == 0) {
          cpu.executaProcesso(undefined);
        }
      }

    }

    if (cpu.getProcessoExecutando() == undefined && cpu.getListaProcessos().length > 0) {
      cpu.executaProximoProcesso();
    }

    console.log(`Tempo CPU: ${cpu.getTempoCPU()}`);
    console.log(`Processo: ${getNomeProcesso(cpu.getProcessoExecutando())}\n`);

    cpu.incrementaTempo();
  }
})()