import Link from 'next/link';
import './navigation.css';

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="account-nav">
      {/* Logo/Brand */}
      <div className="nav-logo">
        <div className="logo-box">
          <span className="logo-text">N</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link href="/Kambaz/Account/Signin" className="nav-link">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Signin</span>
        </Link>

        <Link href="/Kambaz/Account/Signup" className="nav-link nav-link-red">
          <span className="nav-label">Signup</span>
        </Link>

        <Link href="/Kambaz/Account/Profile" className="nav-link nav-link-red">
          <span className="nav-label">Profile</span>
        </Link>
      </nav>

      {/* Account Section */}
      <div className="nav-section">
        <Link href="/Kambaz/Account/Profile" className="nav-link">
          <span className="nav-icon account-icon">👤</span>
          <span className="nav-label account-label">Account</span>
        </Link>
      </div>

      {/* Dashboard */}
      <div className="nav-dashboard">
        <Link href="/Kambaz/Dashboard" className="dashboard-link">
          <div className="dashboard-box">
            <span className="dashboard-icon">📊</span>
          </div>
          <span className="dashboard-label">Dashboard</span>
        </Link>
      </div>
    </div>
  );
}