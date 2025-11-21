import React, { useEffect, useState } from 'react';
import ShortenForm from '../components/ShortenForm';
import LinkRow from '../components/LinkRow';
import "./Dashboard.css";

const API = import.meta.env.VITE_API_BASE || 'https://linkshortener-ss.onrender.com';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      setError('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleCreated = (newLink) => {
    setLinks(prev => [newLink, ...prev]);
  };

  const handleDeleted = (code) => {
    setLinks(prev => prev.filter(l => l.code !== code));
  };

  const filtered = links.filter(l => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return l.code.toLowerCase().includes(s) || l.url.toLowerCase().includes(s);
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div>
          <ShortenForm onCreated={handleCreated} apiBase={API} />
        </div>
      </div>

      <input
        className="dashboard-search"
        placeholder="Search by code or URL..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "#dc2626" }}>{error}</p>
      ) : filtered.length === 0 ? (
        <p>No links yet — create one above.</p>
      ) : (
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Short</th>
                <th>Target URL</th>
                <th>Clicks</th>
                <th>Last clicked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((link) => (
                <LinkRow
                  key={link.code}
                  link={link}
                  apiBase={API}
                  onDeleted={handleDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="dashboard-tip">
        Tip: visit{" "}
        <code className="dashboard-code-snippet">
          {window.location.origin}/&lt;code&gt;
        </code>{" "}
        to follow a short link.
      </div>
    </div>
  );
}
