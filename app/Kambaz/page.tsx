"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function KambazPage() {
  useEffect(() => {
    redirect("/Kambaz/Dashboard");
  }, []);

  return null;
}