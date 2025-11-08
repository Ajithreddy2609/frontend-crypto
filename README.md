🚀 Crypto Indicator Dashboard
🧩 What it Does (Short)

Client-side React (Vite) UI that shows a real-time list of cryptocurrency indices/indicators and a detail page with a 30-day chart.
All data requests are proxied through a small server-side gateway that:

🔐 Stores API keys in environment variables (never on the client)

⚡ Caches upstream responses for freshness vs cost

⏱️ Enforces a short-term rate limiter (20 requests/min)

💰 Enforces a monthly budget (500 calls/month)

📡 Broadcasts small live updates over one WebSocket channel

🌐 Live Demo

🔗 [YOUR_VERCEL_DEPLOYMENT_URL_HERE]

🖥️ Backend Repository

📦 https://github.com/Ajithreddy2609/backend-crypto

✨ Features
🧭 Professional, Data-Rich UI

The app is built with a custom "app shell" layout (no CSS frameworks) for a clean, fast, and unique feel.
The list view provides a 5-column, data-dense layout showing:

🪙 Coin Name & Symbol

💰 Live Price

📉 24h High & Low

🏦 Market Cap

📊 7-Day Sparkline

⚡ Real-Time Price Updates

A live WebSocket connection to the backend streams live BTC price changes.
This updates the Bitcoin row on the list page without page refresh, demonstrating a real-time data pipeline.

📈 30-Day Detail View

Clicking any coin routes to a dedicated detail page that fetches and renders a 30-day historical price chart using react-chartjs-2.

🧩 Polished User Experience

All interactions are thoughtfully designed:

Smooth hover effects

Animated spinners for loading states
→ Result: a seamless, modern user flow

🚨 Clear Error Handling

If the backend is unreachable or the user’s IP is rate-limited, the UI shows a clear, user-friendly error message.
No crashes. No confusion.

🧠 Tech Stack
🧩 Technology	💡 Purpose
⚛️ React (Vite)	Fast, modern frontend framework
🧭 react-router-dom	Client-side routing
🔗 axios	HTTP requests to backend API
📊 react-chartjs-2	30-day historical charts
🔹 react-sparklines	7-day sparkline mini charts
🎨 Pure CSS	Fully custom styling (no frameworks)
🧰 How to Run Locally
📂 Repo Layout
/ (root)
├─ frontend/                 # React/Vite app (UI)
│  ├─ src/
│  ├─ package.json
│  └─ .env.example (VITE_BACKEND_BASE_URL)
├─ server/                   # Lightweight Node/Express proxy
│  ├─ index.js
│  ├─ package.json
│  └─ .env.example
├─ docker-compose.yml        # Optional: redis + server for demos
├─ README.md                 # This file
└─ docs/                     # Architecture diagrams, notes

1️⃣ Start the Backend Server

This project requires the crypto-backend to be running first.
(See that repo’s README for details.)

2️⃣ Clone this Repository
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

A decoupled client-server architecture ensures both security and performance.

The Frontend (Client) handles presentation only — it has no knowledge of external APIs or secret keys.

The Backend (Server) acts as a secure middleware — it alone holds the API key, manages external calls, and enforces caching.

🔄 Request Flow Diagram
User → [Frontend App] → /api/indicators → [Backend Server]
                                        |
                                        v
                              [Is data in cache AND < 120s old?]
                                   /             \
                                (YES)           (NO)
                                  |               |
                                  v               v
                         [Return cached]   [Call External API]
                                           [Store in cache (TTL 120s)]
                                           [Return new data]

🧠 Caching Strategy

The key challenge:
Balance data freshness (60–120s) ⏱️ vs strict API rate limits (500 calls/month) 📉.

A naive automatic refresh (e.g., every 120s) would exceed limits quickly.
So this app uses an on-demand, server-side cache powered by node-cache.

🧩 How It Works

User Request: Frontend calls /api/indicators (not the external API).

Cache Check: Backend checks if valid (non-expired) data exists.

Cache Hit: If fresh (≤120s old), returns immediately — no API cost.

Cache Miss: If expired or missing, backend calls external API.

Store & Return: New data is cached (TTL 120s) and returned.

This balances freshness, efficiency, and cost — maintaining fast responses while staying within monthly call limits.

🧩 Tech Summary (Backend Focus)
Category	Technology	Purpose
🧱 Backend	Node.js	JavaScript runtime for the server
🌐 Server	Express.js	Framework for building the API
💾 Caching	node-cache	In-memory TTL cache to manage API calls
🔒 Security	dotenv	Manages API keys (kept off client)
🔗 API Client	Axios	Makes HTTP requests to external API
🧩 Frontend	HTML5 / CSS3 / React	Lightweight, fast UI
🔁 Real-Time	Socket.io	WebSocket updates
💡 Live Demo Example

👉 https://frontend-crypto-sandy.vercel.app/

🎥 Loom Video Walkthrough: [ADD YOUR LINK HERE]

👤 Primary Author: Ajith P
