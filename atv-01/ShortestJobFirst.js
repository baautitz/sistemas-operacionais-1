import Processos from "./Processos.json" assert { type: "json" };

function esperaProcesso(processo, CPU) {
  CPU.listaEspera.push(processo);

  CPU.listaEspera.sort((p1, p2) => {
    if (p1.burst < p2.burst) return -1;
    else if (p1.burst > p2.burst) return 1;

    return 0;
  });
}

function executaProcesso(processo, CPU) {
  CPU.processoExecutando = processo;
}

function removeProcesso(pid, CPU) {
  CPU.listaEspera = CPU.listaEspera.filter((p) => p.pid != pid);
}

function getTempoMaximoCPU(listaProcessos) {
  let tempoMaximoCPU = 0;
  for (let i = 0; i < listaProcessos.length; i++) {
    tempoMaximoCPU += listaProcessos[i].start + listaProcessos[i].burst;
  }

  return tempoMaximoCPU;
}

async function main() {
  const tempoMaximoCPU = getTempoMaximoCPU(Processos);

  const CPU = {
    tempoCPU: 0,
    processoExecutando: undefined,
    listaEspera: []
  }

  while (CPU.tempoCPU <= tempoMaximoCPU) {
    for (let i = 0; i < Processos.length; i++) {
      if (Processos[i].start != CPU.tempoCPU) continue;
      esperaProcesso(Processos[i], CPU);
    }

    if (CPU.listaEspera.length > 0) {
      if (CPU.processoExecutando == undefined) {
        executaProcesso(CPU.listaEspera[0], CPU);
        removeProcesso(CPU.processoExecutando.pid, CPU);
      }

      if (CPU.processoExecutando.pid == "TROCA CONTEXTO") {
        executaProcesso(CPU.listaEspera[0], CPU);
        removeProcesso(CPU.processoExecutando.pid, CPU);
      }
    }

    if (CPU.processoExecutando != undefined) {
      if (CPU.processoExecutando.burst <= 0) {
        if (CPU.listaEspera.length == 0) {
          CPU.processoExecutando = undefined;
        }

        if (CPU.listaEspera.length > 0 && CPU.processoExecutando.pid != "TROCA CONTEXTO") {
          CPU.processoExecutando.pid = "TROCA CONTEXTO";
        }
      }
      else {
        CPU.processoExecutando.burst--;
      }
    }

    console.log(`Tempo CPU: ${CPU.tempoCPU}`);
    let processoExecutandoLog = ["Executando: "];
    if (CPU.processoExecutando == undefined) processoExecutandoLog += "Nenhum";
    else if (CPU.processoExecutando.pid == "TROCA CONTEXTO") processoExecutandoLog += "Troca de Contexto";
    else processoExecutandoLog += `P${CPU.processoExecutando.pid}`
    console.log(processoExecutandoLog + "\n");

    CPU.tempoCPU++;
  }
}

main();
