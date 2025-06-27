"use client";
import React, { useState } from "react";
import Link from 'next/link';
import AdminMenu from './AdminMenu'; // Import the AdminMenu component
import { Popup } from "./Popup";
import { DarkMode } from "./DarkMode";
import { Direction } from "./Direction";
import { Language } from "./Language";
import NavMode from "./NavMode";


const AdminHeader = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <header className="bg-white block">
      <div className='container'>
      <div className="w-full flex items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/nx-admin">
          <h1 className='text-xl font-bold py-2'>ADMIN Panel</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className='p-2'
            target="_blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/><path d="M14.828 19.071c-.371.929-.812 1.665-1.297 2.168c-.486.502-1.006.761-1.531.761s-1.045-.259-1.53-.761c-.486-.503-.927-1.24-1.298-2.168c-.372-.929-.667-2.03-.868-3.244A23.6 23.6 0 0 1 8 12c0-1.313.103-2.614.304-3.827s.496-2.315.868-3.244c.371-.929.812-1.665 1.297-2.168C10.955 2.26 11.475 2 12 2s1.045.259 1.53.761c.486.503.927 1.24 1.298 2.168c.372.929.667 2.03.867 3.244C15.897 9.386 16 10.687 16 12s-.104 2.614-.305 3.827M2 12h8m12 0h-8"/></g></svg>
          </Link>
          <div>
            <button
              aria-label="Open settings popup"
              onClick={() => setPopupOpen(true)}
              className="transition"
            >
              ⚙️
            </button>

            {/* Popup */}
            {isPopupOpen && (
              <Popup title="Settings" onClose={() => setPopupOpen(false)}>
                <DarkMode
                  title="Dark Mode"
                  sub="Switch theme to dark mode"
                  toggle={false}
                />
                <Direction
                  title="Direction"
                  sub="Select a direction"
                  Redio={true}
                />
                <Language
                  title="Language"
                  sub="Select your language"
                  item={[
                    { images: "/countries/us.png", title: "English" },
                    { images: "/countries/cn.png", title: "Chinese" },
                    { images: "/countries/sp.png", title: "Espanol" },
                    { images: "/countries/ar.png", title: "Arabic" },
                  ]}
                />
                <NavMode
                  title="Nav Mode"
                />
              </Popup>
            )}
          </div>
          <AdminMenu />
        </div>
      </div>
      </div>
    </header>
  );
};

export default AdminHeader;
