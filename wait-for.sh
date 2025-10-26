#!/bin/sh

# Host e porta que deseja verificar
HOST="$1"
PORT="$2"

# Mensagem
echo "Aguardando $HOST:$PORT estar disponível..."

# Loop até conseguir conectar
while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done

echo "$HOST:$PORT está disponível. Iniciando aplicação..."

# Executa o comando passado como argumento (ex.: npm start, yarn start, etc.)
exec "${@:3}"
