# CivicMind - Quick Reference Card

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt

# Frontend (new terminal)
cd frontend
npm install
```

### 2. Setup MongoDB
```bash
# Option A: Local (start MongoDB service)
net start MongoDB

# Option B: Cloud (update backend/.env with your URL)
```

### 3. Generate Demo Data
```bash
cd backend
python demo_data_generator.py
```

### 4. Start Services
```bash
# Terminal 1: Backend
cd backend
python main.py
# → http://localhost:8000

# Terminal 2: Frontend
cd frontend
npm run dev
# → http://localhost:3000
```

---

## 📊 What You Get

| Component | URL | Purpose |
|-----------|-----|---------|
| Dashboard | `http://localhost:3000` | Authority interface |
| API Docs | `http://localhost:8000/docs` | Interactive API explorer |
| API Server | `http://localhost:8000` | Complaint processing |
| MongoDB | `localhost:27017` | Data storage |

---

## 🎯 Key Endpoints

### Submit Complaint
```bash
POST /api/complaints/submit
?text=Pothole on MG Road
&latitude=28.4595
&longitude=77.0968
&ward=Ward 12
```

### View Heat Map
```bash
GET /api/dashboard/heatmap
```

### Top 3 Issues
```bash
GET /api/dashboard/top-issues
```

---

## 🧠 How It Works

1. **Citizen Reports** (Story A)
   - Text/voice input with location
   - Submitted to `/api/complaints/submit`

2. **AI Processing** (Story B)
   - Auto-classified into 5 categories
   - Urgency score calculated
   - Checked for duplicates using geolocation
   - Grouped into clusters

3. **Authority Dashboard** (Story C)
   - Heat map shows problem density
   - Red = Critical (score ≥ 8)
   - Yellow = High (score ≥ 5)
   - Green = Low
   - Top 3 issues highlighted

---

## 🎨 Dashboard Layout

```
┌─────────────────────────────────────────────┐
│             CivicMind Dashboard             │
├────────────────┬──────────────┬─────────────┤
│                │              │             │
│   STATS        │              │  ACTION     │
│   PANEL        │   HEAT MAP   │  ITEMS      │
│                │              │             │
│   ├─ 150       │              │  #1 Roads   │
│   │  Total     │   (click     │  13 reports │
│   │            │    hotspot)  │             │
│   ├─ 45        │              │  #2 Water   │
│   │  Sanitation│              │  9 reports  │
│   │            │              │             │
│   ├─ FILTERS   │              │  #3 Lights  │
│   │            │              │  6 reports  │
│                │              │             │
└────────────────┴──────────────┴─────────────┘
```

---

## 🔍 Testing

### Generate Test Data
```bash
python demo_data_generator.py  # Creates 60 complaints
```

### Add Manual Complaint
```bash
curl -X POST "http://localhost:8000/api/complaints/submit?text=Test&latitude=28.4595&longitude=77.0968"
```

### Check Data in MongoDB
```bash
# Using MongoDB Compass:
# Connection: mongodb://localhost:27017
# Database: civicmind
# Collection: complaints
```

---

## 🛠️ Common Issues

### MongoDB Connection Error
```
SOLUTION: Start MongoDB service or update .env with Atlas URL
```

### Port Already in Use
```
SOLUTION: Change in .env:
- Backend: API_PORT=8001
- Frontend: PORT=3001
```

### Module Not Found
```
SOLUTION: Ensure venv is activated and pip install complete
```

### No Heat Map
```
SOLUTION: Run demo_data_generator.py to populate data
```

---

## 📁 Project Structure

```
Samadhan Setu/
├── backend/
│   ├── app/models.py          ← Data schemas
│   ├── app/services/          ← NLP, clustering
│   ├── app/routes/            ← API endpoints
│   ├── main.py                ← FastAPI server
│   ├── demo_data_generator.py ← Test data
│   └── requirements.txt
│
├── frontend/
│   ├── src/components/        ← UI components
│   ├── src/hooks/             ← Data fetching
│   ├── src/pages/index.tsx    ← Dashboard
│   ├── package.json
│   └── .env.example
│
├── README.md
├── SETUP_GUIDE.md
└── IMPLEMENTATION_SUMMARY.md
```

---

## 💡 Key Features

✓ **AI Classification** - Auto-categorize complaints
✓ **Geospatial Clustering** - Find problem hotspots
✓ **Priority Scoring** - Urgency-weighted ranking
✓ **Real-time Heat Map** - Visual problem density
✓ **Authority Dashboard** - Action-focused interface
✓ **Scalable Backend** - FastAPI + MongoDB
✓ **Responsive Frontend** - Dark-mode UI with Tailwind

---

## 🎬 Demo Sequence

1. Open dashboard: `http://localhost:3000`
2. Point out 3-panel layout
3. Show red hotspots (demo data clusters)
4. Submit test complaint via curl
5. Watch dashboard update (auto-refresh every 30s)
6. Explain AI workflow (classification → clustering → prioritization)
7. Show that citizen issues → authority action!

---

## ✉️ Need Help?

- **API Docs**: http://localhost:8000/docs
- **Code**: Check comments in source files
- **Logs**: Backend terminal shows detailed output
- **Database**: Use MongoDB Compass to inspect collections

---

## 🎯 Success Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 16+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend venv created
- [ ] Dependencies installed
- [ ] Demo data generated
- [ ] Backend starts on port 8000
- [ ] Frontend starts on port 3000
- [ ] Dashboard loads with heat map
- [ ] Heat map has red/yellow/green points
- [ ] Top Issues widget populated
- [ ] API accepts new complaints

🎉 All checked? You're ready for the hackathon!
