import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header"; // <-- IMPORT HEADER

function App() {
  return (
    <BrowserRouter>
      {/* The Header is now outside the Routes, so it stays on every page */}
      <Header /> 

      {/* This is our main content area */}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;