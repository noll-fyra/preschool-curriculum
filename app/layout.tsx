import type { Metadata } from "next";
import { Livvic } from "next/font/google";
import "./globals.css";

const livvic = Livvic({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-livvic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nurture — Learning that grows with every child",
  description:
    "Nurture is a learning platform for preschools that adapts to each child's pace, keeps parents in the loop every day, and gives teachers their time back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-SG" className={livvic.variable}>
      <body className="font-(family-name:--font-livvic) antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
