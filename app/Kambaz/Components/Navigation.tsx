"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // FIXED: Using Next.js Image
import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();
  
  const links = [
    { 
      label: "Dashboard", 
      path: "/Kambaz/Dashboard", 
      icon: AiOutlineDashboard,
      id: "wd-dashboard-link"
    },
    { 
      label: "Courses", 
      path: "/Kambaz/Dashboard", 
      icon: LiaBookSolid,
      id: "wd-courses-link"
    },
    { 
      label: "Calendar", 
      path: "/Kambaz/Calendar", 
      icon: IoCalendarOutline,
      id: "wd-calendar-link"
    },
    { 
      label: "Inbox", 
      path: "/Kambaz/Inbox", 
      icon: FaInbox,
      id: "wd-inbox-link"
    },
    { 
      label: "Labs", 
      path: "/Labs", 
      icon: LiaCogSolid,
      id: "wd-help-link"
    },
  ];

  return (
    <ListGroup 
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" 
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      {/* FIXED: Using Next.js Image instead of <img> */}
      <ListGroupItem 
        className="bg-black border-0 text-center" 
        as="a"
        target="_blank" 
        href="https://www.northeastern.edu/" 
        id="wd-neu-link"
      >
        <Image 
          src="/images/NEU.png" 
          width={75}
          height={75}
          alt="Northeastern University" 
        />
      </ListGroupItem>

      <ListGroupItem 
        className={`border-0 text-center ${
          pathname.includes("Account") ? "bg-white" : "bg-black"
        }`}
      >
        <Link 
          href="/Kambaz/Account/Signin" 
          id="wd-account-link" 
          className="text-decoration-none d-flex flex-column align-items-center"
        >
          <FaRegCircleUser 
            className={`fs-1 ${
              pathname.includes("Account") ? "text-danger" : "text-white"
            }`} 
          />
          <span 
            style={{ fontSize: '12px' }}
            className={pathname.includes("Account") ? "text-danger" : "text-white"}
          >
            Account
          </span>
        </Link>
      </ListGroupItem>

      {links.map((link) => {
        const isActive = pathname.includes(link.label) || 
                        (link.label === "Dashboard" && pathname === "/Kambaz/Dashboard") ||
                        (link.label === "Courses" && pathname.includes("/Courses/"));
        
        return (
          <ListGroupItem 
            key={link.path + link.label}
            className={`border-0 text-center ${
              isActive ? "bg-white" : "bg-black"
            }`}
          >
            <Link 
              href={link.path} 
              id={link.id}
              className="text-decoration-none d-flex flex-column align-items-center"
            >
              {link.icon({ 
                className: "fs-1 text-danger"
              })}
              <span 
                style={{ fontSize: '12px', marginTop: '5px' }}
                className={isActive ? "text-danger" : "text-white"}
              >
                {link.label}
              </span>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}