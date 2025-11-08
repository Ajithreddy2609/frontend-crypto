import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          CryptoIndicators
        </Link>
        {/* You could add more nav links here */}
      </div>
    </header>
  );
}