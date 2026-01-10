# 📖 CivicMind - Documentation Index

## 🎯 Start Here!

### First Time? Read These in Order:

1. **[START_HERE.md](START_HERE.md)** ⭐ **START WITH THIS**
   - 3-step quick start
   - 5-minute setup guide
   - Your action items

2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**
   - Commands cheat sheet
   - Key endpoints
   - Common issues & fixes

3. **[SETUP_GUIDE.md](SETUP_GUIDE.md)**
   - Detailed setup instructions
   - MongoDB configuration
   - Testing procedures
   - Troubleshooting guide

4. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**
   - What's been implemented
   - Technical architecture
   - Database schema
   - Future roadmap

5. **[README.md](README.md)**
   - Project vision
   - Problem statement
   - Tech stack overview
   - Implementation phases

6. **[COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md)**
   - High-level overview
   - Files created
   - Demo walkthrough
   - Pre-demo checklist

---

## 🚀 Quick Start (2 minutes)

### Windows
```bash
quickstart.bat
```

### macOS/Linux
```bash
bash quickstart.sh
```

---

## 📱 Key Endpoints

### API Server
- URL: `http://localhost:8000`
- Docs: `http://localhost:8000/docs` (Swagger)
- Health: `http://localhost:8000/health`

### Dashboard
- URL: `http://localhost:3000`
- Shows: Heat map, top issues, statistics

### Database
- MongoDB local: `mongodb://localhost:27017`
- Database: `civicmind`
- Collections: `complaints`, `clusters`

---

## 🎯 What Each File Does

### Setup & Running
| File | Purpose |
|------|---------|
| `quickstart.bat` | One-click setup for Windows |
| `quickstart.sh` | One-click setup for macOS/Linux |
| `backend/requirements.txt` | Python dependencies |
| `frontend/package.json` | JavaScript dependencies |

### Backend Code
| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI entry point |
| `backend/app/models.py` | Pydantic data models |
| `backend/app/database.py` | MongoDB connection |
| `backend/app/services/nlp_service.py` | AI classification |
| `backend/app/services/clustering_service.py` | Priority scoring |
| `backend/app/services/complaint_service.py` | Database operations |
| `backend/app/routes/complaints.py` | Complaint endpoints |
| `backend/app/routes/dashboard.py` | Analytics endpoints |
| `backend/demo_data_generator.py` | Generate test data |

### Frontend Code
| File | Purpose |
|------|---------|
| `frontend/src/pages/index.tsx` | Main dashboard page |
| `frontend/src/components/HeatMap.tsx` | Map visualization |
| `frontend/src/components/TopIssuesWidget.tsx` | Action items |
| `frontend/src/components/StatsPanel.tsx` | Statistics |
| `frontend/src/services/api.ts` | API client |
| `frontend/src/hooks/useApi.ts` | Data fetching hooks |

### Documentation
| File | Purpose |
|------|---------|
| `START_HERE.md` | Quick start guide |
| `QUICK_REFERENCE.md` | Cheat sheet |
| `SETUP_GUIDE.md` | Detailed setup |
| `IMPLEMENTATION_SUMMARY.md` | Technical details |
| `COMPLETION_SUMMARY.md` | Project overview |
| `README.md` | Project info |

---

## 🧪 Testing the System

### 1. Check Backend Health
```bash
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

### 2. Submit a Test Complaint
```bash
curl -X POST "http://localhost:8000/api/complaints/submit?text=Test%20complaint&latitude=28.4595&longitude=77.0968"
```

### 3. Check Heat Map
```bash
curl http://localhost:8000/api/dashboard/heatmap
```

### 4. Check Top Issues
```bash
curl http://localhost:8000/api/dashboard/top-issues
```

### 5. View Dashboard
Open http://localhost:3000 in browser

---

## 🐛 Troubleshooting

### Issue: Python module not found
**Solution:** Ensure venv is activated and requirements installed
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: MongoDB connection error
**Solution:** Start MongoDB service or update MONGODB_URL in .env
```bash
# Windows
net start MongoDB

# Or update backend/.env with MongoDB Atlas URL
```

### Issue: Port already in use
**Solution:** Change port in .env
```
API_PORT=8001
NEXT_PUBLIC_API_PORT=3001
```

### Issue: No data on heat map
**Solution:** Generate demo data
```bash
cd backend
python demo_data_generator.py
```

### Issue: Frontend can't connect to backend
**Solution:** Verify backend is running and check frontend/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📊 Project Architecture

```
User/Citizen
    ↓
[Voice/Text Input]
    ↓
FastAPI Server (Port 8000)
    ├── NLP Service (Classification)
    ├── Clustering Service (DBSCAN)
    └── Priority Scoring
    ↓
MongoDB (Complaints Collection)
    ↓
React Dashboard (Port 3000)
    ├── Heat Map
    ├── Top Issues
    └── Statistics
    ↓
Authority/Municipal Officer
```

---

## 📈 Data Flow in 3 Stories

### Story A: Citizen Input
```
Citizen → Voice/Text Input → /api/complaints/submit → Backend
```

### Story B: AI Processing
```
Backend → NLP Classification → Category Detection
        → DBSCAN Clustering → Group by Location
        → Priority Scoring → Calculate Urgency
        → Save to MongoDB
```

### Story C: Authority Insight
```
MongoDB → Dashboard API → Heat Map Generation
       → Top Issues Ranking → Authority Views
       → Dispatches Resources
```

---

## 🎬 Demo Script

### Opening (30 seconds)
"Civic complaints flood in via multiple channels—WhatsApp, Twitter, helplines. Authorities receive 1000s daily but can't distinguish critical from minor."

### Solution (1 minute)
"CivicMind uses AI to transform chaos into clarity. It auto-classifies complaints, finds duplicates using location, and prioritizes critical issues."

### Demo (1-2 minutes)
1. Show dashboard at http://localhost:3000
2. Point out red hotspots = critical zones
3. Submit test complaint via curl
4. Watch dashboard auto-update
5. Explain AI workflow

### Closing (30 seconds)
"One system. Real-time insights. Better resource allocation. Critical issues are never buried in noise."

---

## ✅ Pre-Demo Checklist

- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Demo data generated
- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Dashboard loads in browser
- [ ] Heat map shows colored points
- [ ] Top Issues widget shows data
- [ ] API docs available
- [ ] Test curl command ready

---

## 🔗 Useful Links

- **MongoDB Compass** (GUI): https://www.mongodb.com/products/compass
- **HuggingFace Models**: https://huggingface.co/models
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Leaflet.js Docs**: https://leafletjs.com/

---

## 📞 Need Help?

### For Technical Issues
1. Check **SETUP_GUIDE.md** → Troubleshooting section
2. Check API docs: http://localhost:8000/docs
3. Check browser console for frontend errors

### For Questions About Features
- Check **IMPLEMENTATION_SUMMARY.md** for technical details
- Check **README.md** for project overview

### For Deployment
- See **IMPLEMENTATION_SUMMARY.md** → Deployment Readiness section

---

## 🎯 You're All Set!

Your CivicMind project is complete and ready to demo.

**Next Step:** Read [START_HERE.md](START_HERE.md)

Good luck! 🚀
