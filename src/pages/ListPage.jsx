import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function ListPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- WEBSOCKET LOGIC (for live prices) ---
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8000';
    const wsUrl = backendUrl.replace(/^http/, 'ws');
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'LIVE_PRICE') {
        setList(currentList => 
          currentList.map(coin => {
            if (coin.id === message.id) {
              // This is the coin! Return a new object with the new price
              return { ...coin, current_price: parseFloat(message.price) };
            }
            return coin;
          })
        );
      }
    };

    // Cleanup
    return () => {
      ws.close();
    };
  }, []);

  // --- HTTP LOGIC (for the initial list) ---
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8000';
    axios.get(`${backendUrl}/api/list`)
      .then(response => {
        // We need to check if sparkline data exists, otherwise the app will crash
        const cleanedData = response.data.map(coin => ({
          ...coin,
          sparkline_in_7d: coin.sparkline_in_7d || { price: [] } // Add a fallback
        }));
        setList(cleanedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch list", error);
        if (error.response && error.response.status === 429) {
          const message = error.response.data?.message || error.response.data?.error || "you can't hit more than 20 request within a minute";
          alert(message);
        } else {
          setError('Failed to load coin list. Is the backend server running?');
        }
        setLoading(false);
      });
  }, []);

  // --- RENDER LOGIC ---
  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div style={{ fontSize: '2rem', color: 'red', textAlign: 'center' }}>
      {error}
    </div>;
  }

  // --- THIS IS THE NEW 5-COLUMN DATA-RICH LIST ---
  return (
    <>
      <div className="list-container">
      {list.map(coin => (
        <Link 
          key={coin.id} 
          to={`/detail/${coin.id}`} 
          className="coin-link-card"
        >
          {/* Column 1: Icon & Name */}
          <div className="coin-info">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
            </div>
          </div>
          
          {/* Column 2: Price & Percent Change */}
          <div className="coin-price">
            <div>${coin.current_price.toLocaleString()}</div>
            <span className={coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          {/* Column 3: 24h High & Low */}
          <div className="coin-stats">
            <div>
              <span className="stat-label">24h High:</span>
              ${coin.high_24h.toLocaleString()}
            </div>
            <div>
              <span className="stat-label">24h Low:</span>
              ${coin.low_24h.toLocaleString()}
            </div>
          </div>
          
          {/* Column 4: Market Cap */}
          <div className="coin-marketcap">
            <span className="stat-label">Mkt Cap</span>
            ${coin.market_cap.toLocaleString()}
          </div>

          {/* Column 5: Sparkline Chart */}
          <div className="coin-sparkline">
            <Sparklines data={coin.sparkline_in_7d.price}>
              <SparklinesLine 
                color={coin.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171'} 
              />
            </Sparklines>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}