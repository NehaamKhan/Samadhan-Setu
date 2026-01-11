# 🏛️ Samadhan Setu: AI-Powered Civic Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-13AA52?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776ab?style=flat-square&logo=python)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> **Transform civic chaos into actionable intelligence.** Samadhan Setu empowers municipal authorities with AI-driven complaint analysis, geospatial clustering, and real-time priority dashboards.

---

## 🎯 Project Overview

**Samadhan Setu** (Hindi: "Solutions Bridge") is an **AI-Powered Civic Intelligence Platform** that bridges the gap between citizens and municipal authorities by:

- 📱 **Aggregating complaints** from multiple channels (mobile app, web form)
- 🤖 **Auto-classifying** complaints using NLP (9 civic categories)
- 📍 **Clustering** geographically similar complaints to identify hotspots
- 🗺️ **Visualizing** complaint density with AccuWeather-style heatmaps (gradient: Blue → Green → Yellow → Orange → Red)
- ⚡ **Prioritizing** issues based on frequency, urgency, and duration
- 📊 **Providing** real-time dashboards for authorities to take action

---

## 🚀 Key Features

### For Citizens
✅ **Submit Complaints Easily**
  - Intuitive form with 9 standardized categories
  - Auto-geolocation detection
  - Real-time submission feedback

✅ **Transparent Status Tracking**
  - View submission history
  - See how your complaint is clustered with others
  - Understand priority scoring

### For Authorities
✅ **Real-Time Dashboard**
  - Live AccuWeather-style heatmap showing complaint density
  - Top 5 critical action items with interactive maps
  - Statistics by category and location
  - Responsive design for mobile & desktop

✅ **Smart Prioritization**
  - Issues ranked by: frequency × 0.5 + sentiment urgency × 0.3 + duration × 0.2
  - Critical (8+), High (5-8), Medium (3-5), Low (<3) scoring
  - Urgency badges for quick visual triage

✅ **Interactive Action Items**
  - Click "📍 View on Map" to zoom directly to issue hotspot
  - Map highlights selected issue with popup details
  - Expand to view all issues (not just top 5)
  - Shows complaint count and priority score for each

✅ **Category Filters**
  - Filter by all 9 civic categories + Others
  - Toggle filters to refine heatmap & statistics in real-time
  - Persistent state across sessions

✅ **Silent Auto-Polling**
  - Updates every 30 seconds without UI flicker
  - Loading spinner only on initial page load
  - Background data refresh keeps dashboard fresh

---

## 📊 Technology Stack

### **Frontend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework, SSR | 14.2 |
| **React** | UI library, components | 18 |
| **TypeScript** | Type safety | Latest |
| **Tailwind CSS** | Utility-first styling | 3.4 |
| **Leaflet** | Interactive maps | 1.9 |
| **leaflet.heat** | Gradient heatmap visualization | Latest |
| **Axios** | HTTP client | 1.6 |
| **React Icons** | Icon library | Latest |

### **Backend**
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Python** | Language | 3.10+ |
| **FastAPI** | Web framework, async APIs | 0.104+ |
| **Motor** | Async MongoDB driver | Latest |
| **Pydantic** | Data validation | v2 |
| **scikit-learn** | DBSCAN clustering | Latest |
| **python-multipart** | Form data handling | Latest |

### **Database**
| Technology | Purpose |
|-----------|---------|
| **MongoDB** | NoSQL with GeoJSON support |
| **MongoDB Atlas** | Cloud-hosted, automatic backups |

---

## 📁 Project Structure

```
Samadhan-Setu/
│
├── 📂 frontend/                          # Next.js Frontend Application
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapContent.tsx           # Leaflet map with heat layer
│   │   │   ├── HeatMap.tsx              # Heat layer wrapper
│   │   │   ├── TopIssuesWidget.tsx      # Action items (top 5 issues)
│   │   │   ├── StatsPanel.tsx           # Statistics display
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── index.tsx                # Landing page
│   │   │   ├── home.tsx                 # Features page
│   │   │   ├── submit.tsx               # Complaint submission form
│   │   │   ├── dashboard.tsx            # Authority real-time dashboard
│   │   │   ├── about.tsx                # Team information
│   │   │   ├── contact.tsx              # Contact form
│   │   │   └── _app.tsx                 # Next.js app wrapper
│   │   ├── hooks/
│   │   │   └── useApi.ts                # Custom hooks (heatmap, issues, stats)
│   │   ├── services/
│   │   │   └── api.ts                   # Axios API client
│   │   └── styles/
│   │       └── globals.css              # Tailwind directives
│   ├── .env.production                  # Production environment variables
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── Dockerfile                       # Docker image
│   └── Procfile                         # Railway/Heroku process file
│
├── 📂 backend/                           # FastAPI Backend Application
│   ├── app/
│   │   ├── main.py                      # FastAPI app initialization & CORS
│   │   ├── models.py                    # Pydantic models (CategoryEnum, Complaint, Location)
│   │   ├── routes/
│   │   │   ├── complaints.py            # POST /complaints (submit complaint)
│   │   │   ├── dashboard.py             # GET /dashboard/* (heatmap, top-issues, stats)
│   │   │   └── health.py                # GET /health (liveness check)
│   │   └── services/
│   │       ├── complaint_service.py     # CRUD, database operations, timestamp handling
│   │       ├── nlp_service.py           # Keyword-based classification, urgency scoring
│   │       └── clustering_service.py    # DBSCAN clustering, priority scoring
│   ├── requirements.txt                 # Python dependencies
│   ├── .env                             # Environment variables (local dev)
│   ├── Procfile                         # uvicorn command for Railway/Heroku
│   └── Dockerfile                       # Docker image
│
├── 📄 railway.json                      # Railway deployment configuration
├── 📄 .gitignore                        # Git ignore rules
├── 📄 README.md                         # This file (comprehensive guide)
├── 📄 LICENSE                           # MIT License
└── 📄 .dockerignore                     # Docker build optimization
```

---

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **MongoDB** (local or Atlas cloud)
- **Git**

### Quick Start (Local Development)

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/Samadhan-Setu.git
cd Samadhan-Setu
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=mongodb://localhost:27017/samadhan
ENVIRONMENT=development
LOG_LEVEL=info
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
EOF

# Run backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend runs at:** http://localhost:8000  
**API docs:** http://localhost:8000/docs

#### 3️⃣ Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAP_CENTER_LAT=28.7041
NEXT_PUBLIC_MAP_CENTER_LNG=77.1025
EOF

# Run frontend
npm run dev
```

**Frontend runs at:** http://localhost:3000

#### 4️⃣ MongoDB Setup (if running locally)
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod
```

Or use **MongoDB Atlas** (cloud):
- Go to https://www.mongodb.com/cloud/atlas
- Create cluster (free tier)
- Get connection string
- Update `DATABASE_URL` in backend/.env

---

## 📡 API Endpoints

### Health Check
```http
GET /health
Response: {"status": "ok"}
```

### Submit Complaint (POST)
```http
POST /complaints?text=Water%20supply%20issue&latitude=28.7041&longitude=77.1025&category=Water%20Supply

Response:
{
  "id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "text": "Water supply issue",
  "category": "Water Supply",
  "location": {
    "latitude": 28.7041,
    "longitude": 77.1025,
    "area_name": "Sector 12"
  },
  "urgency_score": 6.5,
  "timestamp": "2026-01-11T10:30:00Z"
}
```

### Get Heatmap Data (GET)
```http
GET /dashboard/heatmap

Response:
{
  "heatmap_points": [
    {
      "id": "cluster-1",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "complaint_count": 15,
      "priority_score": 7.8,
      "intensity": "high",
      "color": "#ef4444",
      "categories": ["Water Supply", "Sanitation"],
      "summary": "Water & sanitation issues in Sector 12"
    }
  ],
  "total_clusters": 5,
  "total_complaints": 42
}
```

### Get Top Issues (GET)
```http
GET /dashboard/top-issues?limit=5

Response:
{
  "top_issues": [
    {
      "rank": 1,
      "cluster_id": "cluster-1",
      "category": "Water Supply",
      "location": "Sector 12",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "complaint_count": 15,
      "priority_score": 8.2,
      "urgency": "Critical"
    }
  ]
}
```

### Get Statistics (GET)
```http
GET /dashboard/statistics

Response:
{
  "total_complaints": 42,
  "by_category": {
    "Water Supply": 12,
    "Sanitation": 8,
    "Roads/Potholes": 7,
    "Electricity": 6,
    "Streetlights": 5,
    "Drainage": 2,
    "Garbage Collection": 1,
    "Parks & Gardens": 0,
    "Others": 1
  }
}
```

---

## 🚀 Deployment Guide

### Option 1: Railway (Recommended - Simplest) ⭐

Deploy entire stack on Railway in <10 minutes.

#### Step 1: Set Up MongoDB Atlas
- Sign up: https://www.mongodb.com/cloud/atlas
- Create cluster (free tier M0)
- Create database user with password
- Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/samadhan`

#### Step 2: Deploy on Railway
```bash
# Push to GitHub
git push origin main

# Visit https://railway.app
# Click "New Project" → "Deploy from GitHub"
# Select your repo → Railway auto-detects services
# Add environment variables (below)
```

**Backend Environment Variables:**
```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/samadhan
ENVIRONMENT=production
CORS_ORIGINS=http://frontend:3000,https://samadhan-frontend.railway.app
PORT=8000
```

**Frontend Environment Variables:**
```
NEXT_PUBLIC_API_URL=http://backend:8000
NEXT_PUBLIC_MAP_CENTER_LAT=28.7041
NEXT_PUBLIC_MAP_CENTER_LNG=77.1025
NODE_ENV=production
```

**Result:**
- Frontend: https://samadhan-frontend-production.railway.app
- Backend: https://samadhan-backend-production.railway.app

---

### Option 2: Vercel (Frontend) + Railway (Backend)

Best for production-grade Next.js with global CDN.

**Frontend on Vercel:**
- Sign up: https://vercel.com
- Import GitHub repo → Select `frontend/` directory
- Add environment variables
- Auto-deploys on git push

**Backend on Railway:**
- Same as Option 1

---

## 📊 Dashboard Feature Breakdown

### Real-Time Heatmap
- **Gradient colors:** Blue (low) → Green → Yellow → Orange → Red (critical)
- **Intensity formula:** 70% complaint density + 30% priority score
- **Interactive:** Click action items to zoom/fly to hotspot
- **Smooth animation:** Uses Leaflet flyTo for visual appeal

### Action Items Widget (Top 5 Issues)
- **Ranked by:** Priority score = (Frequency × 0.5) + (Urgency × 0.3) + (Duration × 0.2)
- **Interactive buttons:** "📍 View on Map" zooms to cluster with highlight marker
- **Expandable:** Shows top 3 by default, expand to see all
- **Visual indicators:** Critical/High/Medium/Low urgency badges with pulsing dots

### Statistics Panel
- **Total complaints** in last 72 hours
- **Breakdown by category** with gradient color bars
- **Real-time updates** every 30 seconds

### Category Filters
- **9 civic categories:** Water Supply, Electricity, Sanitation, Roads/Potholes, Streetlights, Drainage, Garbage Collection, Parks & Gardens, Others
- **Toggle in real-time:** Heatmap & stats update instantly
- **Persistent state:** Remember your selection

---

## 🤖 AI/Autonomous Features

1. **Auto-Classification (NLP)**
   - Keyword-based classification into 9 categories
   - Fallback to "Others" for unmatched complaints
   - Case-insensitive, whitespace-tolerant matching

2. **Urgency Scoring**
   - Scale: 1-10 based on complaint severity keywords
   - Examples: "urgent", "broken", "severe" = higher scores
   - Rules-based (no ML models needed)

3. **Geospatial Clustering (DBSCAN)**
   - Groups nearby complaints (eps=500m by default)
   - Identifies hotspots automatically
   - Adjustable parameters for different city scales

4. **Priority Ranking**
   - Formula: (Frequency × 0.5) + (Avg Urgency × 0.3) + (Duration × 0.2)
   - Critical (8+) → High (5-8) → Medium (3-5) → Low (<3)
   - Updates every 30 seconds (silent polling)

5. **Real-Time Dashboard**
   - Silent background polling (no UI flicker)
   - Automatic complaint aggregation from database
   - Live category statistics and heatmap updates

6. **Geolocation Detection**
   - Browser Geolocation API for map centering
   - Fallback to Delhi center (28.7041, 77.1025) if denied
   - Automatic map view update on page load

---

## 👥 Team

| Name | Role |
|------|------|
| Akbar Mujahid | Lead Developer |
| Kashif Tungekar | Backend Engineer |
| Nehaam Khan | Full-Stack Developer |

---

## 🧪 Testing & Validation

```bash
# Frontend
cd frontend
npm run build        # Build for production
npm run type-check   # TypeScript validation
npx tsc --noEmit    # Strict type checking

# Backend
cd backend
pytest               # Run tests (if available)
python -m flake8 .   # Linting
```

---

## 🔐 Security Considerations

- ✅ CORS configured for frontend domains only
- ✅ Environment variables for secrets (DATABASE_URL, API keys)
- ✅ MongoDB connection string stored in .env (not in code)
- ✅ Input validation via Pydantic models
- ✅ HTTPS enforced in production (Railway/Vercel)
- ✅ Automatic database backups (MongoDB Atlas)

**Production Checklist:**
- [ ] Enable database IP whitelist (MongoDB Atlas)
- [ ] Rotate database credentials monthly
- [ ] Set CORS only for production domains
- [ ] Set `NODE_ENV=production` on frontend
- [ ] Enable error tracking (Sentry)
- [ ] Configure monitoring/alerting
- [ ] Regular security audits

---

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/samadhan
ENVIRONMENT=production
LOG_LEVEL=info
CORS_ORIGINS=https://yourdomain.com,http://localhost:3000
PORT=8000
```

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_MAP_CENTER_LAT=28.7041
NEXT_PUBLIC_MAP_CENTER_LNG=77.1025
NODE_ENV=production
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check Python version (3.10+), run `pip install -r requirements.txt` |
| **MongoDB connection error** | Verify DATABASE_URL, check IP whitelist in Atlas, test connection |
| **Frontend API errors** | Check `NEXT_PUBLIC_API_URL`, verify backend is running, check CORS logs |
| **Heatmap not showing** | Check browser console for errors, verify Leaflet in package.json |
| **Deployment fails** | Check deployment logs, verify environment variables, ensure no secrets in code |
| **Port already in use** | Kill process: `lsof -ti:8000 \| xargs kill -9` (backend), `lsof -ti:3000 \| xargs kill -9` (frontend) |
| **Complaints not appearing on dashboard** | Check timestamp field in database, verify clustering is working |
| **Map doesn't center on user location** | Check browser geolocation permissions, verify fallback center coordinates |

---

## 📈 Roadmap (Future Enhancements)

- [ ] **Voice/Audio Input** - Accept voice complaints
- [ ] **SMS Integration** - Support complaints via SMS
- [ ] **WhatsApp Bot** - Automated complaint collection
- [ ] **Predictive Analytics** - Forecast complaint trends
- [ ] **Mobile Apps** - Native iOS/Android
- [ ] **Multi-Language Support** - Hindi, regional languages
- [ ] **Photo Evidence** - Citizens attach photos
- [ ] **Resolution Tracking** - Track complaint status
- [ ] **Notification System** - Push/email alerts
- [ ] **Social Media Integration** - Scrape Twitter/Facebook

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📚 Useful Links

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Leaflet.js Documentation](https://leafletjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Railway Deployment Docs](https://docs.railway.app)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 💬 Support & Feedback

- 🐛 Found a bug? Open an issue
- 💡 Have a feature request? Let us know
- 📧 Questions? Contact the team

---

**Made with ❤️ for smarter, more responsive cities | January 2026**
