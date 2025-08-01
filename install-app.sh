#!/bin/bash

# Cores para o terminal

GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
RED='\\033[0;31m'
NC='\\033[0m' \# No Color

echo -e "${GREEN}--- Iniciando Instalação do Projeto Go Live Tech ---${NC}"
echo ""

# \--- ETAPA BACKEND ---

echo -e "${YELLOW}ETAPA 1: Configuração do Backend${NC}"
echo "-------------------------------------"
echo "1. Acesse a pasta 'backend'."
echo "2. Renomeie o arquivo '.env.example' para '.env'."
echo "3. Abra o arquivo '.env' e preencha as seguintes chaves:"
echo "   DATABASE\_URL="mysql://USER:PASS@HOST:PORT/DB\_NAME""
echo "   APP\_PORT=3001"
echo "   JWT\_SECRET="sua\_chave\_secreta""
echo ""

while true; do
read -n 1 -s -r -p "Pressione a tecla 'F' (maiúscula) para continuar..." key
if [[ $key == "F" ]]; then
echo -e "\\nContinuando..."
break
fi
done
echo ""

echo "Navegando para o diretório do backend..."
cd backend || { echo -e "${RED}Erro: Diretório 'backend' não encontrado.${NC}"; exit 1; }

echo "Instalando dependências do backend (npm install)..."
npm install
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao instalar dependências do backend.${NC}"; exit 1; fi

echo "Aplicando migrações do banco de dados (isso criará o banco se não existir)..."
npx prisma migrate dev --name init
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao migrar o banco de dados.${NC}"; exit 1; fi

echo "Populando o banco de dados com usuários padrão (seeding)..."
npx prisma db seed
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao popular o banco de dados.${NC}"; exit 1; fi

echo "Compilando o código TypeScript (npm run build)..."
npm run build
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao compilar o backend.${NC}"; exit 1; fi

echo "Iniciando o servidor do backend em segundo plano..."
npm start &
BACKEND\_PID=$\!
sleep 5

echo -e "${GREEN}Backend iniciado com sucesso\! (PID: $BACKEND\_PID)${NC}"
cd ..
echo ""

# \--- ETAPA FRONTEND ---

echo -e "${YELLOW}ETAPA 2: Configuração do Frontend${NC}"
echo "--------------------------------------"
echo "1. Acesse a pasta 'frontend'."
echo "2. Renomeie o arquivo '.env.example' para '.env.local'."
echo "3. Abra o arquivo '.env.local' e preencha a chave:"
echo "   NEXT\_PUBLIC\_API\_URL=http://localhost:3001"
echo ""

while true; do
read -n 1 -s -r -p "Pressione a tecla 'F' (maiúscula) para continuar..." key
if [[ $key == "F" ]]; then
echo -e "\\nContinuando..."
break
fi
done
echo ""

echo "Navegando para o diretório do frontend..."
cd frontend || { echo -e "${RED}Erro: Diretório 'frontend' não encontrado.${NC}"; exit 1; }

echo "Instalando dependências do frontend (npm install)..."
npm install
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao instalar dependências do frontend.${NC}"; exit 1; fi

echo "Compilando o projeto Next.js (npm run build)..."
npm run build
if [ $? -ne 0 ]; then echo -e "${RED}Falha ao compilar o frontend.${NC}"; exit 1; fi

echo "Iniciando o servidor do frontend em segundo plano..."
npm start &
FRONTEND\_PID=$\!
sleep 5 \# Dá um tempo para o servidor iniciar

echo -e "${GREEN}Frontend iniciado com sucesso\! (PID: $FRONTEND\_PID)${NC}"
cd ..
echo ""

# \--- FINALIZAÇÃO ---

echo "--------------------------------------------------------"
echo -e "${GREEN}🎉 Instalação e inicialização concluídas\! 🎉${NC}"
echo ""
echo "Acesse a aplicação no seu navegador:"
echo -e "${YELLOW}http://localhost:3000${NC}"
echo ""
echo "Os servidores do backend e frontend estão rodando em segundo plano."
echo "Para pará-los, use os comandos: kill $BACKEND\_PID e kill $FRONTEND\_PID"
echo "Ou feche este terminal."
echo "--------------------------------------------------------"