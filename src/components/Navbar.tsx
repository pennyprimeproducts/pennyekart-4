import logo from "@/assets/logo.png";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const links = ["Home", "Categories", "Deals", "About", "Contact"];

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <img src={logo} alt="Pennyekart" className="h-10" />

        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button className="relative text-foreground" aria-label="Cart" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-5 w-5" />
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 text-foreground"
                onClick={() => navigate("/customer/profile")}
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">
                  {profile?.full_name || user.email?.split("@")[0] || "Account"}
                </span>
              </button>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={async () => { await signOut(); navigate("/"); }}
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hidden sm:block"
              onClick={() => navigate("/customer/login")}
            >
              Sign In
            </button>
          )}
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-card p-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
                  {l}
                </a>
              </li>
            ))}
            {!user && (
              <li>
                <button
                  className="mt-2 w-full rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                  onClick={() => { navigate("/customer/login"); setOpen(false); }}
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
