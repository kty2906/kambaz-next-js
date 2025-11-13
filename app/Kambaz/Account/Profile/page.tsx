"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { User } from "../../Database/types";
import { KambazState } from "../../store/types";

export default function Profile() {
  const [profile, setProfile] = useState<Partial<User>>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: KambazState) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Kambaz/Account/Signin");
  };

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input
            id="wd-username"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="form-control mb-2"
            placeholder="username"
          />
          <input
            id="wd-password"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            className="form-control mb-2"
            placeholder="password"
            type="password"
          />
          <input
            id="wd-firstname"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            className="form-control mb-2"
            placeholder="First Name"
          />
          <input
            id="wd-lastname"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            className="form-control mb-2"
            placeholder="Last Name"
          />
          <input
            id="wd-dob"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            className="form-control mb-2"
            type="date"
          />
          <input
            id="wd-email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="form-control mb-2"
            placeholder="email"
            type="email"
          />
          <select
            id="wd-role"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
            id="wd-update-btn"
          >
            Update
          </button>
          <button
            onClick={signout}
            className="btn btn-danger w-100"
            id="wd-signout-btn"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}