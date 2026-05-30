import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from '/images/logo/logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [ "Home", "Pages", "Menu", "Order", "Blog", "Contact", "Shop" ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#111111]/50 backdrop-blur-xl border-b shadow-lg" : "bg-transparent" }`}>
      <div className="max-w-360 mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-20" : "h-24"}`}>
          <a href="/">
            <img src={Logo} alt="Nest Text Logo" className="max-h-30 object-contain" />
          </a>

          <ul className="hidden lg:flex items-center gap-10 text-white">
            {links.map((link, index) => (
              <li key={index}>
                <a href={`#${link}`} className="hover:text-orange-400 transition">{link}</a>
              </li>
            ))}
          </ul>

          <a href="#Reservation" className="hidden lg:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded">Reservation</a>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
            {open ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md">
          <ul className="flex flex-col text-white p-6 gap-5">
            {links.map((link, index) => (
              <li key={index}>
                <a href={`#${link}`}>{link}</a>
              </li>
            ))}

            <a href="#Reservation" className="bg-orange-500 p-3 rounded mt-2">Reservation</a>
          </ul>
        </div>
      )}
    </nav>
  );
}