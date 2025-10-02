import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: "Full Stack Next.js Web App",
  description: "Labs and Kambaz Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global Header */}
        <header
          style={{
            padding: "1rem",
            background: "#f5f5f5",
            borderBottom: "1px solid #ddd",
            marginBottom: "1rem",
          }}
        >
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/"> Home</Link>
            <Link href="/Labs">Labs</Link>
            <Link href="/Kambaz/Dashboard"> Kambaz</Link>
          </nav>
        </header>

        {/* Main Page Content */}
        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
