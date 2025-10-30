"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import './signup.css';

export default function Signup() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    verifyPassword: ""
  });

  const handleSignup = () => {
    if (credentials.password !== credentials.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (!credentials.username || !credentials.password) {
      alert("Please fill in all fields");
      return;
    }
    
    // In a real app, you'd create the user here
    // For now, just navigate to Profile
    router.push("/Kambaz/Account/Profile");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign up</h1>
        
        <form className="signup-form" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
          <FormControl
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="username"
            className="mb-2 form-input wd-username"
          />
          
          <FormControl
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="password"
            type="password"
            className="mb-2 form-input wd-password"
          />
          
          <FormControl
            value={credentials.verifyPassword}
            onChange={(e) => setCredentials({ ...credentials, verifyPassword: e.target.value })}
            placeholder="verify password"
            type="password"
            className="mb-2 form-input wd-password-verify"
          />
          
          <Button 
            onClick={handleSignup}
            className="w-100 mb-2 signup-button"
            id="wd-signup-btn"
          >
            Sign up
          </Button>
          
          <Link 
            id="wd-signin-link" 
            href="/Kambaz/Account/Signin"
            className="signin-link text-center d-block"
          >
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
