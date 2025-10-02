import Link from 'next/link';
import './signin.css';

export default function Signin() {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Signin</h1>
        
        <form className="signin-form">
          <input 
            type="text"
            placeholder="username" 
            className="wd-username form-input" 
          />
          
          <input 
            placeholder="password" 
            type="password" 
            className="wd-password form-input" 
          />
          
          <Link 
            id="wd-signin-btn" 
            href="/Dashboard"
            className="signin-button"
          >
            Signin
          </Link>
          
          <Link 
            id="wd-signup-link" 
            href="/Signup"
            className="signup-link"
          >
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
}