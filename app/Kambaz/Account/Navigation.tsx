"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import './navigation.css';

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();
  
  // Show different links based on login status
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="account-nav">
      {/* Logo */}
      <div className="nav-logo">
        <div className="logo-box">
          <span className="logo-text">N</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        {links.map((link) => {
          const path = `/Kambaz/Account/${link}`;
          const isActive = pathname.includes(link);
          
          return (
            <Link 
              key={link}
              href={path} 
              className={`nav-link ${link === "Profile" ? "nav-link-red" : ""} ${isActive ? "active" : ""}`}
            >
              <span className="nav-label">{link}</span>
            </Link>
          );
        })}
      </nav>

      {/* Account Icon Section */}
      {currentUser && (
        <div className="nav-section">
          <Link href="/Kambaz/Account/Profile" className="nav-link">
            <span className="nav-icon account-icon">👤</span>
            <span className="nav-label account-label">Account</span>
          </Link>
        </div>
      )}

      {/* Dashboard Link */}
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