@echo off
REM CivicMind Quick Start Script - Windows

echo.
echo ===================================
echo    CivicMind - Quick Start
echo ===================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] Python and Node.js found
echo.

REM Setup Backend
echo ===== Setting up Backend =====
cd backend

if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt -q

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit backend\.env with your MongoDB URL
)

echo.
echo [OK] Backend setup complete
echo.

REM Setup Frontend
echo ===== Setting up Frontend =====
cd ..\frontend

if not exist .env.local (
    echo Creating .env.local file...
    copy .env.example .env.local
)

echo Installing npm dependencies...
npm install -q

echo.
echo [OK] Frontend setup complete
echo.

echo ===================================
echo    Setup Complete!
echo ===================================
echo.
echo Next steps:
echo   1. Make sure MongoDB is running
echo   2. Run: cd backend && python demo_data_generator.py
echo   3. Run: python main.py
echo   4. In another terminal: cd frontend && npm run dev
echo   5. Open: http://localhost:3000
echo.
pause
