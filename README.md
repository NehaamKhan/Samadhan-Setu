# CivicMind: Smart Civic Intelligence Platform

A hackathon project that transforms civic complaints into actionable intelligence for municipal authorities using AI-powered classification, clustering, and geospatial visualization.

## Project Vision

Transform the chaotic noise of civic complaints into clear, prioritized, and actionable intelligence for municipal authorities using Artificial Intelligence.

## Problem Statement

- Citizens report issues via scattered channels (WhatsApp, Twitter, Helplines)
- Authorities lack prioritized data to identify critical issues
- Critical issues get buried under noise, leading to delayed action

## Solution

CivicMind aggregates multi-modal complaints (text/voice), uses NLP to classify and cluster them, generates geospatial heat maps, and presents a prioritized dashboard to authorities.

## Tech Stack

### Frontend
- **Framework:** React.js / Next.js
- **Mapping:** Leaflet.js / Mapbox GL
- **Styling:** Tailwind CSS
- **State Management:** React Hooks / Context API

### Backend
- **Server:** Python FastAPI
- **NLP Engine:** Lightweight rule-based classifier (no heavy ML deps)
- **Clustering:** Scikit-Learn (DBSCAN)
- **Database:** MongoDB (GeoJSON support)

## Project Structure

```
Samadhan Setu/
├── backend/                # Python FastAPI server
│   ├── app/
│   ├── models/             # Data models
│   ├── routes/             # API endpoints
│   ├── services/           # NLP, clustering logic
│   └── main.py
├── frontend/               # React/Next.js app
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── docs/                   # Documentation
└── README.md
```

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Key Features

- **Multi-Modal Input:** Text and voice complaints
- **AI Classification:** Auto-categorize complaints (Water, Sanitation, Roads, Streetlights, Electricity)
- **Intelligent Clustering:** Group duplicate complaints by geolocation
- **Geospatial Heat Map:** Visualize complaint density (Red/Yellow/Green zones)
- **Priority Scoring:** Weighted formula (Frequency × Wf + Sentiment × Ws + Duration × Wd)
- **Authority Dashboard:** Top 3 issues, trends, action items

## Implementation Phases

1. **Phase 1:** Project Foundation (Directory structure, configs)
2. **Phase 2:** Backend Core & Data Layer (FastAPI, MongoDB)
3. **Phase 3:** NLP Engine & AI Processing (Classification, clustering, prioritization)
4. **Phase 4:** Frontend & Dashboard UI (Heat Map, widgets, filters)
5. **Phase 5:** Integration, Testing & Demo (API connections, demo data, E2E testing)

## Demo Flow

**Story A (Citizen Input):** Citizen records voice note → System auto-detects location → Submits complaint

**Story B (AI Processing):** System transcribes audio → Detects category → Finds similar complaints → Groups into cluster

**Story C (Authority Insight):** Officer opens dashboard → Sees Red hotspot on Heat Map → Dispatches resource immediately

## Team & Contact

Developed for Hackathon - January 2026
