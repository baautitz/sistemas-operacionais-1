#include "Memoria.h"

// Função apenas para carregar o estado inicial do exercício.
void carrega_incial(Memoria *memoria) {
  char estadoInicial[18] = {'Z', 'Z', 'Z', 'A', 'V', 'V', 'V', 'L', 'X', 'X', 'Y', 'Y', 'Y', 'Y', 'Y', 'L', 'L', 'L'};
  for (int i = 0; i < 18; i++) {
    memoria->programas[i] = estadoInicial[i];
  }
}

int main() {

  Memoria *memoria = memoria_cria(18);
  carrega_incial(memoria);

  memoria_imprime(memoria);

  memoria_desaloca(memoria, 'V');
  memoria_desaloca(memoria, 'Z');
  memoria_aloca(memoria, 4, 'K');
  memoria_aloca(memoria, 2, 'T');
  memoria_aloca(memoria, 3, 'W');
  memoria_desaloca(memoria, 'Y');
  memoria_aloca(memoria, 3, 'R');

  memoria_imprime(memoria);

  memoria_libera(memoria);

  return 0;
}

