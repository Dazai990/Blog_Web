import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ scrollToOptions }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "About", to: "/about" },
    { name: "All Blogs", to: "/all-blog" },
    { name: "Create", to: "/create-blog" },
    { name: "My Blogs", to: "/my-blog" },
  ];

  return (
    <nav
      className=" sticky top-0 z-50 bg-[#4e6688]/95 backdrop-blur border-b border-black/10 [&_a]:no-underline [&_a:hover]:no-underline">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-white">
          <img
            src="/a-logo.png"
            alt="Logo"
            className="h-11 w-11 rounded-xl bg-[#EAF6FF] object-cover"
          />
          <span className="text-xl text-white hover:scale-105 transition ease-in-out tracking-wide font-medium">
            Mon@r7
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden no-underline md:flex items-center gap-8 text-white text-xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`relative transition-opacity duration-200 ${
                    isActive ? "opacity-100 " : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute  -bottom-1 left-0 w-full h-0.5 bg-white rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}

          <li>
            <button
              onClick={() => scrollToOptions("contact")}
              className="opacity-80 hover:opacity-100 transition"
            >
              Contact
            </button>
          </li>

          <li>
            <Link
              to="/"
              className="ml-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              Sign out
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#4e6688] px-6 pt-4 pb-6 space-y-4 text-white text-lg border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block opacity-90 hover:opacity-100"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              scrollToOptions("contact");
              setOpen(false);
            }}
            className="block w-full text-center opacity-90 hover:opacity-100"
          >
            Contact
          </button>

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Sign out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
