Crypto Indicator Dashboard (Frontend)
This is the frontend client for the Crypto Full-Stack Developer Intern take-home assessment. It is a data-rich React application that provides a real-time list of cryptocurrency indicators and a 30-day detail view.
This application is built as a separate client that consumes a custom-built, secure backend API.
Live Demo URL: [YOUR_VERCEL_DEPLOYMENT_URL_HERE]
Backend Repository: [YOUR_GITHUB_URL_FOR_CRYPTO-BACKEND_HERE]
Features
•	Professional UI/UX: Built with a modern "app shell" layout, including a persistent header and a clean, data-rich interface using the Inter font.
•	Data-Rich List View: The homepage lists the top 20 indicators with 5 columns of data:
1.	Coin Name & Symbol
2.	Current Price
3.	24h High & Low
4.	Total Market Cap
5.	7-Day Price Sparkline
•	30-Day Detail View: Clicking any coin navigates to a dedicated detail page, which fetches and renders a full 30-day historical price chart using react-chartjs-2.
•	Real-Time Price Updates: A live WebSocket connection to the backend streams real-time Bitcoin price changes, updating the "Bitcoin (BTC)" row on the list page without a page refresh.
•	Polished Interactions: Includes hover-effects on all list items and animated loading spinners for a professional user experience.
•	Error Handling: The UI will gracefully display a clear error message if the backend server is unreachable or if a user gets rate-limited.
Tech Stack
•	React (via Vite): For a fast, modern, and efficient user interface.
•	react-router-dom: To handle client-side routing between the list page and the detail pages.
•	axios: For all HTTP requests to the backend API.
•	react-chartjs-2: To render the 30-day historical chart on the detail page.
•	react-sparklines: To render the 7-day sparklines on the main list.
•	Pure CSS: All styling is done with custom CSS for a lightweight, performant, and "non-bootstrapped" professional look.
How to Run Locally
1.	Start the Backend Server: This project requires the crypto-backend server to be running first. (Please see that repo's README for instructions).
2.	Clone this repository:
3.	git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/crypto-frontend.git
4.	Navigate to the folder:
5.	cd crypto-frontend
6.	Install dependencies:
7.	npm install
8.	Run the app:
9.	npm run dev
10.	Open http://localhost:5173 in your browser.

