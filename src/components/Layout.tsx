
import React from "react";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn("flex-grow container mx-auto px-4 py-8", className)}>
        {children}
      </main>
      <footer className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-primary font-bold text-xl">QuickBite</span>
              <span className="text-accent font-bold text-xl">Rush</span>
              <p className="text-gray-600 mt-2 text-sm">
                Swift deliveries. Happy customers.
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="font-semibold mb-2">For Businesses</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Join Our Network</li>
                  <li>Delivery Management</li>
                  <li>Business Dashboard</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>FAQs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} QuickBiteRush. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
