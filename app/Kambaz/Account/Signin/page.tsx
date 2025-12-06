"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import Link from "next/link";
import axios from "axios";

interface Credentials {
  username?: string;
  password?: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({});
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const signin = async () => {
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }
    try {
      setError("");
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid credentials. Please try again.");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Kambaz/Dashboard");
    } catch (err) {
      console.error("Signin error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.code === "ERR_NETWORK" || err.message.includes("Network Error")) {
          setError("Cannot connect to server. Please check if the backend is running and environment variables are configured.");
        } else {
          setError(`Login failed: ${err.message}`);
        }
      } else {
        setError("Login failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="wd-signin-screen">
      <h1>Sign in</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <input
        id="wd-username"
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
      />
      
      <input
        id="wd-password"
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
      />
      
      <button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      
      <Link href="/Kambaz/Account/Signup" className="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}