import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background-200 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary-500">
            Quick Links
          </h4>
          <ul className="space-y-2 text-text-900">
            <li>
              <a href="/" className="hover:text-primary-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-primary-500 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary-500 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary-500">
            Customer Support
          </h4>
          <ul className="space-y-2 text-text-900">
            <li>
              <a href="/faq" className="hover:text-primary-500 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-primary-500 transition">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-primary-500 transition">
                Shipping Information
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-primary-500">
            Follow Us
          </h4>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-primary-500 transition">
              📘
            </a>
            <a href="#" className="text-2xl hover:text-primary-500 transition">
              🐦
            </a>
            <a href="#" className="text-2xl hover:text-primary-500 transition">
              📸
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-text-600 mt-8">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
