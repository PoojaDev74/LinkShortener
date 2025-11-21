import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">TinyLink</Link>
          <nav>
            <a href="/healthz" className="text-sm text-slate-500 mr-4">Health</a>
            <a href="/" className="text-sm text-slate-500">Dashboard</a>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>

      <footer className="text-center p-4 text-sm text-slate-500">
        TinyLink — small URL shortener demo
      </footer>
    </div>
  );
}
