import Link from 'next/link';
import './signup.css';

export default function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Signup</h1>
        
        <form className="signup-form">
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
            id="wd-signup-btn" 
            href="/Profile"
            className="signup-button"
          >
            Signup
          </Link>
          
          <Link 
            id="wd-signin-link" 
            href="/Signin"
            className="signin-link"
          >
            Signin
          </Link>
        </form>
      </div>
    </div>
  );
}