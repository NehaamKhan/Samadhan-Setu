#!/bin/bash
# CivicMind Quick Start Script - macOS/Linux

echo ""
echo "==================================="
echo "   CivicMind - Quick Start"
echo "==================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python3 is not installed"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    exit 1
fi

echo "[OK] Python3 and Node.js found"
echo ""

# Setup Backend
echo "===== Setting up Backend ====="
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit backend/.env with your MongoDB URL"
fi

echo ""
echo "[OK] Backend setup complete"
echo ""

# Setup Frontend
echo "===== Setting up Frontend ====="
cd ../frontend

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
fi

echo "Installing npm dependencies..."
npm install -q

echo ""
echo "[OK] Frontend setup complete"
echo ""

echo "==================================="
echo "   Setup Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "  1. Make sure MongoDB is running"
echo "  2. Run: cd backend && python demo_data_generator.py"
echo "  3. Run: python main.py"
echo "  4. In another terminal: cd frontend && npm run dev"
echo "  5. Open: http://localhost:3000"
echo ""
