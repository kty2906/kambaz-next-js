"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { FormControl, Button } from "react-bootstrap";
import { User } from "../../Database/types";
import { KambazState } from "../../store/types";
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState<Partial<User>>({
    username: "alice",
    password: "123",
    firstName: "Alice",
    lastName: "Wonderland",
    dob: "2000-01-01",
    email: "alice@wonderland.com",
    role: "STUDENT"
  });
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Kambaz/Account/Signin");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        
        <form className="profile-form">
          <FormControl
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="username"
            className="mb-2 form-input wd-username"
            id="wd-username"
          />
          
          <FormControl
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="password"
            type="password"
            className="mb-2 form-input wd-password"
            id="wd-password"
          />
          
          <FormControl
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
            className="mb-2 form-input wd-firstname"
            id="wd-firstname"
          />
          
          <FormControl
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
            className="mb-2 form-input wd-lastname"
            id="wd-lastname"
          />
          
          <FormControl
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
            className="mb-2 form-input wd-dob"
            id="wd-dob"
          />
          
          <FormControl
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            type="email"
            placeholder="email"
            className="mb-2 form-input wd-email"
            id="wd-email"
          />
          
          <select 
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2 form-input wd-role"
            id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          
          <Button 
            onClick={signout}
            className="w-100 signout-button"
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}