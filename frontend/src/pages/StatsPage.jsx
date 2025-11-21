import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import "./StatsPage.css";

const API = import.meta.env.VITE_API_BASE || 'https://linkshortener-ss.onrender.com';

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOne() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/links/${code}`);
        if (!res.ok) {
          setLink(null);
        } else {
          const data = await res.json();
          setLink(data);
        }
      } catch (err) {
        setLink(null);
      } finally {
        setLoading(false);
      }
    }
    fetchOne();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (!link) return <div>
    <p>Link not found.</p>
    <RouterLink to="/">Back to Dashboard</RouterLink>
  </div>;


  if (loading) return <p>Loading...</p>;
  if (!link)
    return (
      <div className="stats-notfound">
        <p>Link not found.</p>
        <RouterLink to="/" className="stats-back">Back to Dashboard</RouterLink>
      </div>
    );

  return (
    <div className="stats-container">
      <h2 className="stats-title">Stats for {link.code}</h2>

      <div className="stats-card">
        <div className="stats-row">
          <strong>Short:</strong>{" "}
          <a
            href={`/${link.code}`}
            target="_blank"
            rel="noreferrer"
            className="stats-link"
          >
            {window.location.origin}/{link.code}
          </a>
        </div>

        <div className="stats-row">
          <strong>Target URL:</strong>{" "}
          <a href={link.url} target="_blank" rel="noreferrer" className="stats-link">
            {link.url}
          </a>
        </div>

        <div className="stats-row">
          <strong>Clicks:</strong> {link.clicks}
        </div>

        <div className="stats-row">
          <strong>Last clicked:</strong>{" "}
          {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "—"}
        </div>

        <div className="stats-row">
          <strong>Created:</strong> {new Date(link.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

