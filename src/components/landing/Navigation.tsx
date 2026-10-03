import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AppLink, Logo } from "./Primitives";
import { track } from "@/lib/analytics";

const links = [
  ["Product", "#product"],
  ["How it works", "#how-it-works"],
  ["Results", "#results"],
  ["Why Yamdy", "#why-yamdy"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a href="#" className="logo-link" aria-label="Yamdy home">
          <Logo />
        </a>
        <div className="desktop-nav">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                track("nav_click", { section: label! });
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <AppLink className="signin-link" event="signin_click">
            Sign in
          </AppLink>
          <AppLink className="button button-primary nav-cta" location="navigation" />
        </div>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div
            id="mobile-navigation"
            className="mobile-navigation"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  setOpen(false);
                  track("nav_click", { section: label! });
                }}
              >
                {label}
              </a>
            ))}
            <AppLink event="signin_click" className="signin-link">
              Sign in
            </AppLink>
            <AppLink location="mobile navigation" />
          </div>
        )}
      </nav>
    </header>
  );
}
