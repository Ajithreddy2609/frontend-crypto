Crypto Indicator Dashboard

This is the frontend client for the Crypto Full-Stack Developer Intern take-home assessment. It's a data-rich React application that provides a real-time list of cryptocurrency indicators and a 30-day detail view, all powered by a custom-built, secure backend API.

This project was built to not only fulfill the assignment's requirements but to demonstrate a professional, production-ready approach to full-stack development.

Live Demo URL: [YOUR_VERCEL_DEPLOYMENT_URL_HERE]

Backend Repository: [YOUR_GITHUB_URL_FOR_CRYPTO-BACKEND_HERE]

Features

Professional, Data-Rich UI: The app is built with a custom "app shell" layout (no CSS frameworks) for a clean, fast, and unique feel. The list view provides a 5-column, data-dense layout showing:

Coin Name & Symbol

Live Price

24h High & Low

Market Cap

7-Day Sparkline

Real-Time Price Updates: A live WebSocket connection to the backend streams live BTC price changes. This updates the Bitcoin row on the list page without a page refresh, demonstrating a real-time data pipeline.

30-Day Detail View: Clicking any coin routes to a dedicated detail page that fetches and renders a full 30-day historical price chart using react-chartjs-2.

Polished User Experience: All interactions are considered. The list includes hover effects, and animated spinners are used to handle loading states gracefully.

Clear Error Handling: The UI is robust. It will display a clear, user-friendly error message if the backend server is unreachable or if the user's IP is rate-limited.

Tech Stack

React (via Vite): For a fast, modern, and efficient user interface.

react-router-dom: To handle client-side routing between the list page and the detail pages.

axios: For all HTTP requests to the backend API.

react-chartjs-2: To render the 30-day historical chart.

react-sparklines: To render the 7-day sparklines on the main list.

Pure CSS: All styling is custom-written.

How to Run Locally

Start the Backend Server: This project requires the crypto-backend server to be running first. (Please see that repo's README for instructions).

Clone this repository:

git clone [YOUR_GITHUB_URL_FOR_CRYPTO-FRONTEND_HERE]


Navigate to the folder:

cd crypto-frontend


Install dependencies:

npm install


Run the app:

npm run dev


Open http://localhost:5173 in your browser.
