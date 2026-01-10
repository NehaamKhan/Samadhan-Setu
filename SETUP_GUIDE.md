# CivicMind - Implementation Setup & Running Guide

## ✅ Phase 1-4 Complete!

Your CivicMind project structure is now set up with:

### Backend (Python FastAPI)
- ✓ FastAPI server skeleton
- ✓ MongoDB connection and models
- ✓ NLP classification service (HuggingFace)
- ✓ DBSCAN clustering service
- ✓ Priority scoring engine
- ✓ API routes for complaints and dashboard

### Frontend (React/Next.js)
- ✓ Dashboard layout with 3-panel design
- ✓ Heat Map component (Leaflet.js)
- ✓ Top Issues widget
- ✓ Stats panel
- ✓ API service layer
- ✓ Custom hooks for data fetching

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- MongoDB (locally or Atlas)
- Git

### Step 1: Install Backend Dependencies

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows

pip install -r requirements.txt
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community from: https://www.mongodb.com/try/download/community
# Then start the service (Windows):
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Copy the connection string
4. Update `backend/.env`

### Step 3: Configure Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URL
```

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
```

### Step 4: Generate Demo Data

```bash
cd backend
python demo_data_generator.py
```

You should see:
```
✓ Inserted 60 demo complaints
✓ Created geospatial index
```

### Step 5: Start Backend Server

```bash
cd backend
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
✓ Connected to MongoDB
```

Test the API:
- Health check: http://localhost:8000/health
- Swagger docs: http://localhost:8000/docs

### Step 6: Install & Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
> civicmind-frontend@1.0.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

**Open in browser:** http://localhost:3000

---

## 📊 Demo Flow (3 Stories)

### Story A: Citizen Input
**Endpoint:** `POST /api/complaints/submit`

```bash
curl -X POST "http://localhost:8000/api/complaints/submit?text=No%20water%20for%203%20days&latitude=28.4595&longitude=77.0968&ward=Ward%2012"
```

Response:
```json
{
  "complaint_id": "507f1f77bcf86cd799439011",
  "status": "submitted",
  "category": "Water Supply",
  "urgency_score": 8,
  "classification_confidence": 0.92
}
```

### Story B: AI Processing
**Automatic on submit:**
- Text is classified into category
- Urgency extracted from keywords
- Checked for duplicates using geospatial queries
- Grouped into cluster

### Story C: Authority Insight
**Dashboard automatically updates:**
- Heat map shows red "hotspots" on MG Road
- Top Issues widget shows "Water Supply: 13 complaints (Critical)"
- Officer can click hotspot to see details and dispatch resource

---

## 🔧 API Endpoints Reference

### Complaints
- `POST /api/complaints/submit` - Submit new complaint
- `GET /api/complaints` - Get recent complaints
- `GET /api/complaints/{id}` - Get complaint by ID
- `GET /api/complaints/location/nearby` - Find complaints near location

### Dashboard
- `GET /api/dashboard/heatmap` - Get heat map data
- `GET /api/dashboard/top-issues` - Get top 3 issues
- `GET /api/dashboard/statistics` - Get dashboard stats

---

## 📁 Project Structure

```
Samadhan Setu/
├── backend/
│   ├── app/
│   │   ├── routes/              # API endpoints
│   │   ├── services/            # NLP, clustering, database ops
│   │   ├── models.py            # Pydantic models
│   │   └── database.py          # MongoDB connection
│   ├── main.py                  # FastAPI app entry point
│   ├── demo_data_generator.py   # Generate test data
│   ├── requirements.txt         # Python dependencies
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Next.js pages
│   │   ├── services/            # API client
│   │   ├── hooks/               # Custom React hooks
│   │   └── globals.css          # Tailwind styles
│   ├── package.json
│   └── next.config.js
│
└── README.md
```

---

## 🧪 Testing the System

### 1. Add a complaint via API
```bash
curl -X POST "http://localhost:8000/api/complaints/submit?text=Pothole%20on%20MG%20Road&latitude=28.4595&longitude=77.0968"
```

### 2. Check heat map updates in browser
Open http://localhost:3000 - dashboard refreshes every 30 seconds

### 3. Verify clustering
Complaints in same area (within ~1km) will be grouped into one hotspot

### 4. Check Top Issues
Widget shows the 3 most critical issues by priority score

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
# Verify .env has correct MONGODB_URL
# Check port 8000 is available
```

### Frontend can't connect to backend
```bash
# Verify backend is running on port 8000
# Check NEXT_PUBLIC_API_URL in frontend/.env.local
# Browser console for CORS errors
```

### No data on heat map
```bash
# Run demo_data_generator.py
# Check MongoDB has complaints collection
# Verify geospatial index exists: db.complaints.getIndexes()
```

---

## 🎯 Next Steps (Phase 5)

### To enhance the hackathon demo:

1. **Voice Input** - Integrate voice-to-text API
2. **Live Data** - Connect to real civic complaint channels
3. **WhatsApp Integration** - Accept complaints via WhatsApp
4. **Automated Dispatch** - Auto-create work tickets for high-priority issues
5. **Mobile App** - React Native version for citizen input

---

## 📞 Support

- Check API docs: http://localhost:8000/docs
- Review MongoDB data: Use MongoDB Compass GUI
- Check logs in backend terminal for errors
- Frontend errors in browser DevTools Console

Happy hacking! 🚀
