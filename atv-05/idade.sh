#---------------------- LER DADOS -----------------------
echo "Digite seu nome:"
read NOME

echo
echo "Digite a data de nascimento: (dd/mm/aaaa)"
read NASCIMENTO
#--------------------------------------------------------

#------------------- MANIPULAR DADOS --------------------
ATUAL=`date "+%d/%m/%Y"`

NASCIMENTO_DIA=`echo $NASCIMENTO | cut -d "/" -f1`
NASCIMENTO_MES=`echo $NASCIMENTO | cut -d "/" -f2`
NASCIMENTO_ANO=`echo $NASCIMENTO | cut -d "/" -f3`

ATUAL_DIA=`echo $ATUAL | cut -d "/" -f1`
ATUAL_MES=`echo $ATUAL | cut -d "/" -f2`
ATUAL_ANO=`echo $ATUAL | cut -d "/" -f3`

IDADE=$((ATUAL_ANO-NASCIMENTO_ANO))
if [ $ATUAL_MES -lt $NASCIMENTO_MES ]
then
    IDADE=$((IDADE-1))
else 
    if [ $ATUAL_MES -eq $NASCIMENTO_MES ] && [ $ATUAL_DIA -lt $NASCIMENTO_DIA ]
    then
        IDADE=$((IDADE-1))
    fi
fi
#--------------------------------------------------------

#------------------ MOSTRAR RESULTADOS ------------------
echo
echo "Nome: $NOME"
echo "Data de nascimento: $NASCIMENTO"
echo "Idade: $IDADE anos"
echo
#--------------------------------------------------------





