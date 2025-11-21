import React, { useState } from 'react';
import "./ShortenForm.css";

function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

export default function ShortenForm({ onCreated, apiBase }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    if (!url) { setFeedback({ type: 'error', text: 'URL is required' }); return; }
    if (code && !isValidCode(code)) {
      setFeedback({ type: 'error', text: 'Custom code must match [A-Za-z0-9]{6,8}' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, code: code || undefined })
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback({ type: 'error', text: data.error || 'Failed' });
      } else {
        setFeedback({ type: 'success', text: `Created: ${data.code}` });
        setUrl('');
        setCode('');
        onCreated && onCreated(data);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="shorten-form">
      <input
        placeholder="https://example.com/very/long/url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="shorten-input-url"
        disabled={loading}
      />

      <input
        placeholder="optional code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="shorten-input-code"
        disabled={loading}
      />

      <button type="submit" className="shorten-btn" disabled={loading}>
        {loading ? '...' : 'Shorten'}
      </button>

      {feedback && (
        <div
          className={
            feedback.type === 'error'
              ? 'feedback-error'
              : 'feedback-success'
          }
        >
          {feedback.text}
        </div>
      )}
    </form>

  );
}
