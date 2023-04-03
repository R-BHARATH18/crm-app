import Sidenav from "./components/sideNav";
import "./globals.css";

export const metadata = {
  title: "Z0-CRM",
  description: "A CRM app built with Next.Js App Router",
};

export const revalidate = 5;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body className="bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-100">
        <main className="flex h-screen w-full">
          <Sidenav />
          {children}
        </main>
      </body>
    </html>
  );
}
