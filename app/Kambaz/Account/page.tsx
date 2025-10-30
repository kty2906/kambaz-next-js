"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    // Redirect to Profile if logged in, Signin if not
    if (currentUser) {
      router.push("/Kambaz/Account/Profile");
    } else {
      router.push("/Kambaz/Account/Signin");
    }
  }, [currentUser, router]);

  return null;
}