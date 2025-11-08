🚀 Crypto Indicator Dashboard

What it does (short):
Client-side React (Vite) UI that shows a  real-time list of  cryptocurrency indices/indicators and a detail page with a 30-day chart. All data requests are proxied through a small server-side gateway that:

stores API keys in environment variables (never on the client),

caches upstream responses for freshness vs cost,

enforces a short-term rate limiter (20 requests/min),

enforces a monthly budget (500 calls/month),

 broadcasts small live updates over one WebSocket channel.

🌐 Live Demo

🔗 [YOUR_VERCEL_DEPLOYMENT_URL_HERE]

🖥️ Backend Repository

📦 [YOUR_GITHUB_URL_FOR_CRYPTO-BACKEND_HERE]

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
This updates the Bitcoin row on the list page without a page refresh, demonstrating a real-time data pipeline.

📈 30-Day Detail View

Clicking any coin routes to a dedicated detail page that fetches and renders a 30-day historical price chart using react-chartjs-2.

🧩 Polished User Experience

All interactions are designed thoughtfully:

Smooth hover effects

Animated spinners during loading states
to create a seamless, modern user flow.

🚨 Clear Error Handling

The UI is robust and user-friendly.
If the backend is unreachable or the user’s IP is rate-limited, it displays a clear and descriptive error message.

🧠 Tech Stack
Technology	Purpose
⚛️ React (Vite)	Fast, modern frontend framework
🧭 react-router-dom	Client-side routing
🔗 axios	HTTP requests to the backend API
📊 react-chartjs-2	30-day historical charts
🔹 react-sparklines	7-day sparkline mini charts
🎨 Pure CSS	All styling is custom-written (no frameworks)
🧰 How to Run Locally

Repo layout (what to include)
/ (root)
├─ frontend/                 # your React/Vite app (what you provided)
│  ├─ src/
│  ├─ package.json
│  └─ .env.example (VITE_BACKEND_BASE_URL)
├─ server/                   # lightweight Node/Express proxy (examples below)
│  ├─ index.js
│  ├─ package.json
│  └─ .env.example
├─ docker-compose.yml        # (optional) redis + server for local demos
├─ README.md                 # this file
└─ docs/                     # optional: architecture diagrams, metrics notes

1️⃣ Start the Backend Server

This project requires the crypto-backend server to be running first.
(See that repo’s README for instructions.)

2️⃣ Clone this Repository
git clone [YOUR_GITHUB_URL_FOR_CRYPTO-FRONTEND_HERE]

3️⃣ Navigate to the Folder
cd crypto-frontend

4️⃣ Install Dependencies
npm install

5️⃣ Run the App
npm run dev

6️⃣ Open in Browser

Go to 👉 http://localhost:5173
Here is a complete, professional README.md file you can use for your project.

I have written it to be clear, professional, and to very clearly explain your caching strategy, which is the most important part of this test. Just copy and paste the text below into a new file in your project folder named README.md.

Crypto Indices/Indicators Web App
A full-stack web application built for the Token Metrics take-home exercise. This app fetches and displays crypto indices/indicators, prioritizing API security and performance by using a server-side, on-demand caching strategy.

Live Deployed App: [(https://frontend-crypto-sandy.vercel.app/)]

Loom Video Walkthrough: [LINK TO YOUR 10-MINUTE LOOM VIDEO]

Primary Author: Ajith P

Category,Technology,Purpose
Backend,Node.js,JavaScript runtime for the server.
Server,Express.js,Framework for building the API and server logic.
Caching,node-cache,In-memory TTL (Time-to-Live) cache to manage API calls.
Security,dotenv,"Manages secret API keys, keeping them off the server."
API Client,Axios,Making promise-based HTTP requests to the external API.
Frontend,HTML5 / CSS3 / Vanilla JS,"To create a lightweight, fast, and accessible user interface."
Real-Time Communication,Socket.io,For real-time WebSocket communication.

🏛️ Solution Architecture
The system is designed as a decoupled client-server architecture. This is crucial for security and performance.

The Frontend (Client) is responsible only for presentation. It has no knowledge of the external API or its secret keys.

The Backend (Server) acts as a secure middleware. It alone holds the API key, manages all external communication, and enforces the caching logic.

Request Flow Diagram

User) --> [Frontend App] --> /api/indicators --> [Backend Server]
                                                    |
                                                    v
                                          [Is data in cache AND
                                           < 120s old?]
                                               /      \
                                             /          \
                                          (YES)        (NO)
                                           |            |
                                           v            v
                                [Return cached data]  [1. Call External API]
                                                      [2. Store in cache (120s TTL)]
                                                      [3. Return new data]

🚀 How to Run Locally
This project is separated into two parts: the backend server (handles caching and API calls) and the frontend (a simple HTML/CSS/JS app that displays the data). You will need to run both simultaneously.

Backend (Node.js Server)
The backend is responsible for all API key management and caching.

Navigate to the backend directory:

Bash

cd backend
Install dependencies:

Bash

npm install
Set up environment variables:

Create a file named .env in the backend directory.

Add your external API key to this file:

EXTERNAL_CRYPTO_API_KEY="your_api_key_here"
Run the backend server:

Bash

node server.js
The server will now be running at http://localhost:3000.

Frontend (Client App)
The frontend is a simple HTML file that calls your backend server (it never calls the external API directly).

Open a new, separate terminal (leave the backend server terminal running).

Navigate to the frontend directory:

Bash

cd frontend
Install a simple live server (if you don't already have one):

Bash

npm install -g live-server
Run the frontend:

Bash

live-server
This will automatically open the app in your browser (e.g., at http://127.0.0.1:8080).

🧠 Caching Strategy
The core challenge of this project is to balance data freshness (refresh every 60-120 seconds) with strict API rate limits (500 calls/month).

A simple 120-second automatic refresh (e.g., a cron job) would exhaust the monthly limit in less than 24 hours (30 calls/hr * 24 hrs = 720 calls).

My Solution: On-Demand TTL Cache
This application uses an on-demand, server-side cache with a 120-second Time-to-Live (TTL), implemented using the node-cache library.

How it Works:

User Request: The frontend never calls the external API. It only calls the local server's /api/indicators endpoint.

Cache Check: When the server receives a request, it first checks if it has valid (non-expired) data in its in-memory cache.

Cache Hit: If fresh data (<= 120 seconds old) exists, the server returns it instantly without using an API call.

Cache Miss: If the cache is empty or the data is stale (> 120 seconds old), the server makes one call to the external API to fetch new data.

Store & Return: The server stores this new data in the cache (with a 120-second expiration) and then returns it to the frontend.
