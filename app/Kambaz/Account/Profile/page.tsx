import Link from 'next/link';
import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        
        <form className="profile-form">
          <input 
            type="text"
            placeholder="username" 
            className="wd-username form-input"
            defaultValue="alice"
          />
          
          <input 
            type="text"
            placeholder="password" 
            className="wd-password form-input"
            defaultValue="123"
          />
          
          <input 
            type="text"
            placeholder="First Name" 
            className="wd-firstname form-input"
            defaultValue="Alice"
          />
          
          <input 
            type="text"
            placeholder="Last Name" 
            className="wd-lastname form-input"
            defaultValue="Wonderland"
          />
          
          <input 
            type="date"
            placeholder="Date of Birth" 
            className="wd-dob form-input"
          />
          
          <input 
            type="email"
            placeholder="email" 
            className="wd-email form-input"
            defaultValue="alice@wonderland.com"
          />
          
          <select className="wd-role form-input">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          
          <Link 
            id="wd-signout-btn" 
            href="/Signin"
            className="signout-button"
          >
            Signout
          </Link>
        </form>
      </div>
    </div>
  );
}