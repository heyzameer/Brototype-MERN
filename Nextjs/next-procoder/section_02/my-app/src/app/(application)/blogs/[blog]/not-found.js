'use client';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const a = usePathname().split('/').pop();
  return (
    <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, #eef2ff, #f0f9ff)'}}>
      <div style={{maxWidth: 760, width: '100%', textAlign: 'center', padding: '3rem', borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))', boxShadow: '0 10px 30px rgba(2,6,23,0.08)'}}>
        <div style={{fontSize: 96, fontWeight: 800, color: '#0f172a', lineHeight: 1}}>404</div>
        <h2 style={{margin: '0.5rem 0 1rem', color: '#0f172a'}}>Blog Page not found</h2>
        <h2 style={{margin: '0.5rem 0 1rem', color: '#0f172a'}}>Blog "{a}" does not exist</h2>
        <p style={{margin: '0 0 1.5rem', color: '#475569'}}>Sorry — we couldn't find the page you're looking for. It may have been moved or removed, or the link you followed is incorrect.</p>
        <Link href="/blogs" style={{display: 'inline-block', padding: '0.75rem 1.25rem', background: '#0ea5e9', color: '#fff', borderRadius: 10, fontWeight: 700, textDecoration: 'none'}}>Take me Blog page</Link>
      </div>
    </main>
  )
}
