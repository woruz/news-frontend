import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
