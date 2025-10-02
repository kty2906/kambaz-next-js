"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { BsClockHistory } from "react-icons/bs";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { PiTelevisionBold } from "react-icons/pi";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import './Navigation.css';
export default function Navigation() {
  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU Logo */}
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="./Images/Screenshot 2025-10-02 at 12.47.27 AM.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* Account */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href={'/Kambaz/Account/Signin'} id="wd-account-link" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          <span style={{ fontSize: '12px' }}>Account</span>
        </Link>
      </ListGroupItem>

      {/* Dashboard - Active */}
      <ListGroupItem className="border-0 bg-white text-center">
        <Link href={'/Kambaz/Dashboard'} id="wd-dashboard-link" className="text-danger text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          <span style={{ fontSize: '12px' }}>Dashboard</span>
        </Link>
      </ListGroupItem>

      {/* Courses */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href={'/Kambaz/Dashboard'} id="wd-courses-link" className="text-white text-decoration-none">
          <LiaBookSolid className="fs-1 text-white" />
          <br />
          <span style={{ fontSize: '12px' }}>Courses</span>
        </Link>
      </ListGroupItem>

      {/* Calendar */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href={'/Kambaz/Calendar'} id="wd-calendar-link" className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-white" />
          <br />
          <span style={{ fontSize: '12px' }}>Calendar</span>
        </Link>
      </ListGroupItem>

      {/* Inbox */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href={'./Inbox'} id="wd-inbox-link" className="text-white text-decoration-none">
          <FaInbox className="fs-1 text-white" />
          <br />
          <span style={{ fontSize: '12px' }}>Inbox</span>
        </Link>
      </ListGroupItem>

      {/* Labs */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href={'./Help'} id="wd-help-link" className="text-white text-decoration-none">
          <HiOutlineQuestionMarkCircle className="fs-1 text-white" />
          <br />
          <span style={{ fontSize: '12px' }}>Labs</span>
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}