import Link from 'next/link';
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link href="/Kambaz/Account/Signin">Signin</Link><br/>
      <Link href="/Kambaz/Account/Signup">Signup</Link><br/>
      <Link href="/Kambaz/Account/Profile">Profile</Link><br/>
    </div>
  );
}
