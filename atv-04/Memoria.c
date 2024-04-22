#include <stdio.h>
#include <stdlib.h>
#include "Memoria.h"

Memoria *memoria_cria(int tamanho) {
  Memoria *memoria = (Memoria *) malloc(sizeof(Memoria));
  char *programas = (char *) malloc(tamanho * sizeof(char));

  if (memoria != NULL && programas != NULL) {
    memoria->programas = programas;
    memoria->tamanhoMemoria = tamanho;

    for (int i = 0; i < tamanho; i++) {
      memoria->programas[i] = 'L';
    }
  }

  return memoria;
}

void memoria_libera(Memoria *memoria) {
  free(memoria->programas);
  free(memoria);
}

void memoria_imprime(Memoria *memoria) {
  if (memoria == NULL) {
    return;
  }

  for (int i = 0; i < memoria->tamanhoMemoria; i++) {
    printf("%c ", memoria->programas[i]);
  }

  printf("\n");
}

int memoria_aloca(Memoria *memoria, int tamanho, char id) {
  if (id == 'L') return 0;

  for (int i = 0; i < memoria->tamanhoMemoria; i++) {
    if (memoria->programas[i] == id) return 0;
  }

  int indiceBestFit = -1;
  int tamanhoBestFit = memoria->tamanhoMemoria;

  int tamanhoBlocoMemoria = 0;
  int i = 0;
  while (i < memoria->tamanhoMemoria) {
    while (memoria->programas[i] == 'L' && i < memoria->tamanhoMemoria) {
      tamanhoBlocoMemoria++;
      i++;
    }

    if (tamanhoBlocoMemoria >= tamanho && tamanhoBlocoMemoria < tamanhoBestFit) {
      tamanhoBestFit = tamanhoBlocoMemoria;
      indiceBestFit = i - tamanhoBlocoMemoria;
    }

    tamanhoBlocoMemoria = 0;

    i++;
  }

  if (indiceBestFit == -1) return 0;

  for (i = indiceBestFit; i < indiceBestFit + tamanho; i++) {
    memoria->programas[i] = id;
  }

  return 1;
}

int memoria_desaloca(Memoria *memoria, char id) {
  if (id == 'L') return 0;

  int existe = 0;
  for (int i = 0; i < memoria->tamanhoMemoria; i++) {
    if (memoria->programas[i] != id) continue;

    memoria->programas[i] = 'L';
    existe = 1;
  }

  return existe == 1;
}