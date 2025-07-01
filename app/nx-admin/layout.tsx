"use client"
import type React from "react"
import AdminFooter from "@/components/admin/AdminFooter";
import AdminHeader from "@/components/admin/AdminHeader";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ALLOWED_ROLES = [
  'Administrator',
  'Editor',
  'Author',
  'Contributor',
  'Subscriber',
];

function hasAccess(user: any) {
  if (!user) return false;
  if (user.env && user.role === 'Administrator') return true;
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles.some((role: string) => ALLOWED_ROLES.includes(role));
  }
  return ALLOWED_ROLES.includes(user.role);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (!data.user || !hasAccess(data.user)) {
          router.replace('/auth');
        }
      })
      .catch(() => router.replace('/auth'));
  }, [router]);
  return (
    <main>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <AdminHeader />
          {children}
        <AdminFooter />
      </DndProvider>
    </main>
  )
}