import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, HeaderProps } from "@/components/custom/Header";
import { FooterProps, Footer } from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coolest Dashboard Ever",
  description: "Such numbers, many amazings.",
};

const headerProps: HeaderProps = {
  button: {
    text: 'Login',
    url: '/login'
  },
  logo: {
    text: 'Coolest Dashboards',
    url: '/login'
  }
}

const footerProps: FooterProps = {
  logo: {
    text: 'Coolest Dashboards',
    url: '/'
  },
  text: 'iawudh aiwudh awiu dawu',
  socialLinks: [
    {
      text: 'instagram',
      url: 'https://instagram.com/codemadeart'
    },
    {
      text: 'youtube',
      url: 'https://youtube.com/codemadeart'
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header {...headerProps} />
        <div>{children}</div>
        <Footer {...footerProps} />
      </body>
    </html>
  );
}
