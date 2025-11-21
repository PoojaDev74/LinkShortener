import React from 'react';
import "./LinkRow.css";
import { Link as RouterLink } from 'react-router-dom';

export default function LinkRow({ link, apiBase, onDeleted }) {
  const shortUrl = `${window.location.origin}/${link.code}`;
  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert('Copied!');
  };

  const handleDelete = async () => {
    if (!confirm('Delete this link?')) return;
    const res = await fetch(`${apiBase}/api/links/${link.code}`, { method: 'DELETE' });
    if (res.ok) {
      onDeleted && onDeleted(link.code);
    } else {
      alert('Failed to delete');
    }
  };

  return (
    <tr className="border-b">
      <td className="py-2 align-top">
        <div className="break-words">
          <a href={`/${link.code}`} target="_blank" rel="noreferrer" className="text-sky-600 font-medium">{link.code}</a>
        </div>
      </td>
      <td className="py-2">
        <div className="table-truncate w-96" title={link.url}>{link.url}</div>
      </td>
      <td className="py-2">{link.clicks}</td>
      <td className="py-2">{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '—'}</td>
      <td className="py-2">
        <div className="flex gap-2">
          <button onClick={copy} className="px-2 py-1 border rounded text-sm">Copy</button>
          <RouterLink to={`/code/${link.code}`} className="px-2 py-1 border rounded text-sm">Stats</RouterLink>
          <button onClick={handleDelete} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
        </div>
      </td>
    </tr>
  );
}
