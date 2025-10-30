"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { users } from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import { User } from "../../Database/types";
import './signin.css';

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = users.find(
      (u: User) => 
        u.username === credentials.username && 
        u.password === credentials.password
    );
    
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    
    dispatch(setCurrentUser(user));
    router.push("/Kambaz/Dashboard");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign in</h1>
        
        <form className="signin-form" onSubmit={(e) => { e.preventDefault(); signin(); }}>
          <FormControl
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="mb-2 form-input"
            placeholder="username"
            id="wd-username"
          />
          
          <FormControl
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="mb-2 form-input"
            placeholder="password"
            type="password"
            id="wd-password"
          />
          
          <Button 
            onClick={signin}
            className="w-100 mb-2 signin-button"
            id="wd-signin-btn"
          >
            Sign in
          </Button>
          
          <Link 
            id="wd-signup-link" 
            href="/Kambaz/Account/Signup"
            className="signup-link text-center d-block"
          >
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}