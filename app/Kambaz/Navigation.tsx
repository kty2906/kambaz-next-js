import Link from "next/link";
export default function KambazNavigation() {
  return (
    <div>
      <Link href="https://www.northeastern.edu/"
         target="_blank"      > Northeastern</Link><br/>
      <Link href="/Kambaz/Account"   > Account</Link><br/>
      <Link href="/Kambaz/Dashboard" > Dashboard</Link><br/>
      <Link href="/Kambaz/Courses" > Courses</Link><br/>
      <Link href="/Calendar"  > Calendar</Link><br/>
      <Link href="/Inbox"     > Inbox</Link><br/>
      <Link href="/Labs"      > Labs</Link><br/>
    </div>
);}
