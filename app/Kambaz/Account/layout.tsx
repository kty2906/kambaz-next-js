import { ReactNode } from 'react';
import AccountNavigation from './Navigation';
import './layout.css';

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-account" className="account-layout">
      <div className="account-sidebar">
        <AccountNavigation />
      </div>
      <div className="account-content">
        {children}
      </div>
    </div>
  );
}