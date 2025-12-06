"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import axios from "axios";
import { User } from "../../Database/types";

export default function Signup() {
  const [user, setUser] = useState<Partial<User>>({});
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const signup = async () => {
    if (!user.username || !user.password) {
      setError("Please enter both username and password");
      return;
    }
    try {
      setError("");
      const currentUser = await client.signup(user);
      if (!currentUser) {
        setError("Signup failed. Please try again.");
        return;
      }
      dispatch(setCurrentUser(currentUser));
      router.push("/Kambaz/Account/Profile");
    } catch (err) {
      console.error("Signup error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.code === "ERR_NETWORK" || err.message.includes("Network Error")) {
          setError("Cannot connect to server. Please check if the backend is running and environment variables are configured.");
        } else {
          setError(`Signup failed: ${err.message}`);
        }
      } else {
        setError("Signup failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <input
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      
      <input
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      
      <button
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
      >
        Sign up
      </button>
      
      <Link href="/Kambaz/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}