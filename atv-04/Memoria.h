typedef struct {
  int tamanhoMemoria;
  char *programas;
} Memoria;

Memoria *memoria_cria(int tamanho);
void memoria_libera(Memoria *memoria);

void memoria_imprime(Memoria *memoria);

int memoria_aloca(Memoria *memoria, int tamanho, char id);
int memoria_desaloca(Memoria *memoria, char id);
