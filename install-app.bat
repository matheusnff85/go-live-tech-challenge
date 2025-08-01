echo --- Iniciando Instalacao do Projeto Go Live Tech ---
echo.

REM --- ETAPA BACKEND ---
echo ETAPA 1: Configuracao do Backend
echo -------------------------------------
echo 1. Acesse a pasta 'backend'.
echo 2. Renomeie o arquivo '.env.example' para '.env'.
echo 3. Abra o arquivo '.env' e preencha as seguintes chaves:
echo    DATABASE_URL="mysql://USER:PASS@HOST:PORT/DB_NAME"
echo    APP_PORT=3001
echo    JWT_SECRET="sua_chave_secreta"
echo.

choice /c f /n /m "Pressione 'F' para continuar..."
if errorlevel 1 (
echo.
echo Continuando...
)
echo.

echo Navegando para o diretorio do backend...
cd backend
if %errorlevel% neq 0 (
echo Erro: Diretorio 'backend' nao encontrado.
pause
exit
)

echo Instalando dependencias do backend (npm install)...
call npm install
if %errorlevel% neq 0 (
echo Falha ao instalar dependencias do backend.
pause
exit
)

echo Compilando o codigo TypeScript (npm run build)...
call npm run build
if %errorlevel% neq 0 (
echo Falha ao compilar o backend.
pause
exit
)

echo Iniciando o servidor do backend em uma nova janela...
start "Backend Server" npm start

echo Backend iniciado com sucesso!
cd ..
echo.

REM --- ETAPA FRONTEND ---
echo ETAPA 2: Configuracao do Frontend
echo --------------------------------------
echo 1. Acesse a pasta 'frontend'.
echo 2. Renomeie o arquivo '.env.example' para '.env.local'.
echo 3. Abra o arquivo '.env.local' e preencha a chave:
echo    NEXT_PUBLIC_API_URL=http://localhost:3001
echo.

choice /c f /n /m "Pressione 'F' para continuar..."
if errorlevel 1 (
echo.
echo Continuando...
)
echo.

echo Navegando para o diretorio do frontend...
cd frontend
if %errorlevel% neq 0 (
echo Erro: Diretorio 'frontend' nao encontrado.
pause
exit
)

echo Instalando dependencias do frontend (npm install)...
call npm install
if %errorlevel% neq 0 (
echo Falha ao instalar dependencias do frontend.
pause
exit
)

echo Compilando o projeto Next.js (npm run build)...
call npm run build
if %errorlevel% neq 0 (
echo Falha ao compilar o frontend.
pause
exit
)

echo Iniciando o servidor do frontend em uma nova janela...
start "Frontend Server" npm start

echo Frontend iniciado com sucesso!
cd ..
echo.

REM --- FINALIZACAO ---
echo --------------------------------------------------------
echo Instalacao e inicializacao concluidas!
echo.
echo Acesse a aplicacao no seu navegador:
echo http://localhost:3000
echo.
echo Os servidores do backend e frontend estao rodando em
echo janelas de terminal separadas. Para para-los,
echo simplesmente feche essas novas janelas.
echo --------------------------------------------------------
echo.
pause

