# ✅ Setup Complete! Ready to Run

## 🎉 Good News!
Both backend and frontend dependencies are successfully installed.

## 🚀 Next Steps to Run CivicMind

### Step 1: Make Sure MongoDB is Running

**Option A: Local MongoDB**
```powershell
# Check if MongoDB is running
Get-Service MongoDB

# If not running, start it:
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Recommended for Quick Start)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster (takes 2 minutes)
3. Get connection string
4. Update `backend\.env`:
   ```
   MONGODB_URL=your_connection_string_here
   ```

### Step 2: Generate Demo Data (60 Test Complaints)
```powershell
cd "c:\Users\Nehaam Khan\Downloads\Samadhan Setu\backend"
.\venv\Scripts\python.exe demo_data_generator.py
```

### Step 3: Start Backend Server
```powershell
# In Terminal 1:
cd "c:\Users\Nehaam Khan\Downloads\Samadhan Setu\backend"
.\venv\Scripts\python.exe main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✓ Connected to MongoDB
```

### Step 4: Start Frontend Dashboard
```powershell
# In Terminal 2 (NEW PowerShell window):
cd "c:\Users\Nehaam Khan\Downloads\Samadhan Setu\frontend"
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

### Step 5: Open Dashboard
Open browser: **http://localhost:3000**

You should see:
- Heat map with colored hotspots (red/yellow/green)
- Top 3 critical issues on the right
- Statistics on the left

---

## 🧪 Test It Works

### Submit a Test Complaint
```powershell
curl -X POST "http://localhost:8000/api/complaints/submit?text=Test%20pothole%20on%20MG%20Road&latitude=28.4595&longitude=77.0968&ward=Ward%2012"
```

Dashboard will auto-update within 30 seconds!

---

## 📊 What You Have

✅ Backend API with auto-classification
✅ Geographic clustering (DBSCAN)
✅ Priority scoring engine
✅ Real-time dashboard
✅ Interactive heat map
✅ Demo data ready to generate

---

## 🔧 Quick Commands Reference

| Action | Command |
|--------|---------|
| Start Backend | `cd backend ; .\venv\Scripts\python.exe main.py` |
| Start Frontend | `cd frontend ; npm run dev` |
| Generate Demo Data | `cd backend ; .\venv\Scripts\python.exe demo_data_generator.py` |
| View API Docs | Open http://localhost:8000/docs |
| View Dashboard | Open http://localhost:3000 |

---

## 💡 Pro Tips

1. **Start MongoDB first** - Backend won't work without it
2. **Generate demo data** - Heat map looks better with data
3. **Use 2 terminals** - One for backend, one for frontend
4. **Check localhost:8000/docs** - Interactive API documentation

---

## 🎬 You're Ready to Demo!

Everything is set up. Just:
1. Start MongoDB
2. Generate demo data
3. Start backend + frontend
4. Open http://localhost:3000
5. Wow the judges! 🏆

Good luck with your hackathon! 🚀
