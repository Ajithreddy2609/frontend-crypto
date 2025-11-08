# 🚀 Crypto Indicator Dashboard

## 🧩 What it Does (Short)
Client-side **React (Vite)** UI that shows a **real-time list of cryptocurrency indices/indicators** and a **detail page with a 30-day chart**.  
All data requests are proxied through a **small server-side gateway** that:

- 🔐 Stores API keys in environment variables (never on the client)
- ⚡ Caches upstream responses for freshness vs cost
- ⏱️ Enforces a short-term rate limiter (20 requests/min)
- 💰 Enforces a monthly budget (500 calls/month)
- 📡 Broadcasts small live updates over one WebSocket channel

---

## 🌐 Live Demo
🔗 [YOUR_VERCEL_DEPLOYMENT_URL_HERE]

## 🖥️ Backend Repository
📦 (https://github.com/Ajithreddy2609/backend-crypto)

---

## ✨ Features

### 🧭 Professional, Data-Rich UI
The app is built with a **custom "app shell" layout** (no CSS frameworks) for a clean, fast, and unique feel.  
The list view provides a **5-column, data-dense layout** showing:

- 🪙 Coin Name & Symbol  
- 💰 Live Price  
- 📉 24h High & Low  
- 🏦 Market Cap  
- 📊 7-Day Sparkline

### ⚡ Real-Time Price Updates
A live **WebSocket connection** to the backend streams **live BTC price changes**.  
This updates the Bitcoin row on the list page *without page refresh*, demonstrating a **real-time data pipeline**.

### 📈 30-Day Detail View
Clicking any coin routes to a **dedicated detail page** that fetches and renders a **30-day historical price chart** using `react-chartjs-2`.

### 🧩 Polished User Experience
All interactions are thoughtfully designed:
- Smooth hover effects
- Animated spinners for loading states  
→ Seamless and modern user flow

### 🚨 Clear Error Handling
If the backend is unreachable or the user’s IP is rate-limited, the UI shows a **clear, user-friendly error message**.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| ⚛️ React (Vite) | Fast, modern frontend framework |
| 🧭 react-router-dom | Client-side routing |
| 🔗 axios | HTTP requests to backend API |
| 📊 react-chartjs-2 | 30-day historical charts |
| 🔹 react-sparklines | 7-day sparkline mini charts |
| 🎨 Pure CSS | Fully custom styling (no frameworks) |

---

## 🧰 How to Run Locally

### 📂 Repo Layout

/ (root)
├─ frontend/ # React/Vite app (UI)
│ ├─ src/
│ ├─ package.json
│ └─ .env.example (VITE_BACKEND_BASE_URL)
├─ server/ # Lightweight Node/Express proxy
│ ├─ index.js
│ ├─ package.json
│ └─ .env.example
├─ docker-compose.yml # Optional: redis + server for demos
├─ README.md # This file
└─ docs/ # Architecture diagrams, notes


### 1️⃣ Start the Backend Server
This project requires the **crypto-backend** to be running first.  
(See that repo’s README for details.)

### 2️⃣ Clone this Repository
```bash
git clone https://github.com/Ajithreddy2609/frontend-crypto

3️⃣ Navigate to the Folder
cd crypto-frontend

4️⃣ Install Dependencies
npm install

5️⃣ Run the App
npm run dev

6️⃣ Open in Browser

👉 http://localhost:5173

🏛️ Solution Architecture

The system is designed as a decoupled client-server architecture for security and performance:

Frontend: Responsible only for presentation (no secret keys)

Backend: Holds the API key, manages caching, and rate-limits all traffic

🔄 Request Flow Diagram
User → [Frontend App] → /api/indicators → [Backend Server]
                                        |
                                        v
                              [Is data in cache AND <120s old?]
                                   /             \
                                (YES)           (NO)
                                  |               |
                                  v               v
                         [Return cached]   [Call External API]
                                           [Store in cache (TTL 120s)]
                                           [Return new data]

🧠 Caching Strategy

Goal: Keep data fresh (60–120s) ⏱️ while staying within API limits (500 calls/month) 💰.
A naive auto-refresh would exceed limits quickly — so this project uses on-demand, server-side caching via node-cache.

🧩 How It Works

User Request: Frontend calls /api/indicators

Cache Check: Backend checks if cached data is still valid

Cache Hit: If data is fresh (≤120s old), return immediately

Cache Miss: If expired, fetch from external API

Store & Return: Cache new data (TTL 120s) and return it

This ensures efficiency, performance, and API cost control.

🧩 Tech Summary (Backend Focus)
| Category      | Technology  | Purpose                           |
| ------------- | ----------- | --------------------------------- |
| 🧱 Backend    | Node.js     | JavaScript runtime for the server |
| 🌐 Server     | Express.js  | Framework for the API             |
| 💾 Caching    | node-cache  | In-memory TTL cache               |
| 🔒 Security   | dotenv      | Manages API keys securely         |
| 🔗 API Client | Axios       | Makes HTTP requests               |
| 🧩 Frontend   | React + CSS | Fast, lightweight UI              |
| 🔁 Real-Time  | Socket.io   | WebSocket updates                 |


🔴 Live Demo: https://frontend-crypto-sandy.vercel.app/

🎥 Loom Walkthrough: [ADD LINK HERE]
👤 Author: Ajith P










