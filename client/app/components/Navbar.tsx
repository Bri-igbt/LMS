"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenIcon,
  CompassIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import { DUMMY_USER } from "@/app/assets/assets";

const Navbar = () => {
  const { user } = { user: DUMMY_USER }; 
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isInstructor = user?.role === "instructor" || user?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setOpen(false);
    console.log("sign out");
  };

  const navLink = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        href={href}
        className={`nav-link ${active ? "text-zinc-900 font-medium" : ""}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-medium">
          <Image
            src="/logo.svg"
            alt="GreatSkills logo"
            width={28}
            height={28}
            className="h-7 w-auto"
            priority
          />
          <p>GreatSkills</p>
        </Link>

        {user && (
          <nav className="hidden items-center gap-1 sm:flex">
            {navLink("/courses", "Courses")}
            {navLink("/my-learning", "My Learning")}
            {isInstructor && navLink("/instructor", "Instructor")}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                aria-label="User menu"
                aria-expanded={open}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>

              {open && (
                <div className="dropdown-menu">
                  <div className="border-b border-zinc-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-zinc-900">
                      {user.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-zinc-400">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-1.5">
                    <Link
                      href="/courses"
                      onClick={() => setOpen(false)}
                      className="dropdown-item"
                    >
                      <CompassIcon className="h-3.5 w-3.5 text-zinc-400" />
                      Courses
                    </Link>
                    <Link
                      href="/my-learning"
                      onClick={() => setOpen(false)}
                      className="dropdown-item"
                    >
                      <BookOpenIcon className="h-3.5 w-3.5 text-zinc-400" />
                      My Learning
                    </Link>
                    {isInstructor && (
                      <Link
                        href="/instructor"
                        onClick={() => setOpen(false)}
                        className="dropdown-item"
                      >
                        <LayoutDashboardIcon className="h-3.5 w-3.5 text-zinc-400" />
                        Instructor Panel
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-zinc-100 p-1.5 sm:border-t-0">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="dropdown-item-danger"
                    >
                      <LogOutIcon className="h-3.5 w-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Sign In
              </button>
              <button type="button" className="btn-primary-sm">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
