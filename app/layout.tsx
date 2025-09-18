import type { Metadata } from "next";
import "./globals.css";

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
            <a href="/">Home</a>
            <a href="/Labs">Labs</a>
            <a href="/Kambaz">Kambaz</a>
          </nav>
        </header>

        {/* Main Page Content */}
        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
