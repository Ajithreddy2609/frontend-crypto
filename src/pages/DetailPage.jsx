import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,  // <-- This is for the X-axis (dates)
  LinearScale,    // <-- This is for the Y-axis (price)
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// --- THIS IS THE CRITICAL PART ---
// We must register the components (the axes) before we use them.
// A broken chart almost always means this step was missed.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DetailPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams(); // Get "bitcoin" from the URL

  useEffect(() => {
    // Fetch the 30-day data from our backend
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8000';
    axios.get(`${backendUrl}/api/detail/${id}`)
      .then(response => {
        // Format the data for Chart.js
        const data = {
          labels: response.data.prices.map(price => 
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: `${id} Price (USD) - 30 Days`,
              data: response.data.prices.map(price => price[1]),
              borderColor: '#58c4dc',
              backgroundColor: 'rgba(88, 196, 220, 0.2)',
            },
          ],
        };
        setChartData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch detail", error);
        if (error.response && error.response.status === 429) {
          const message = error.response.data?.message || error.response.data?.error || "you can't hit more than 20 request within a minute";
          alert(message);
        }
        setLoading(false);
      });
  }, [id]); // Re-run this if the 'id' in the URL changes

  if (loading) {
    return <div style={{ fontSize: '2rem' }}>Loading chart...</div>;
  }

  // --- HTML Section ---
  return (
    // This is the outer box
    <div style={{ 
        width: '80%', 
        margin: '2rem auto', 
        backgroundColor: '#242424', 
        padding: '2rem', 
        borderRadius: '8px' 
    }}>
      <Link to="/" style={{ color: '#58c4dc', textDecoration: 'none' }}>
        &larr; Back to List
      </Link>
      <h1 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{id}</h1>
      
      {/* --- THIS IS THE FIX --- */}
      {/* We wrap the chart in a div with a defined height */}
      {chartData && (
        <div style={{ position: 'relative', height: '400px' }}>
          <Line 
            data={chartData} 
            options={{ 
              responsive: true,           // Make it fill the container
              maintainAspectRatio: false  // Tell it to ignore aspect ratio
            }} 
          />
        </div>
      )}
    </div>
  );
}