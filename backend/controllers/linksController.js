const Link = require('../models/Link');
const validator = require('validator');

function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}

function isValidUrl(url) {
  return validator.isURL(url, { require_protocol: true });
}

exports.createLink = async (req, res) => {
  const { url, code: requestedCode } = req.body || {};
  if (!url) return res.status(400).json({ error: 'url is required' });

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL. Include protocol e.g. https://...' });
  }

  let code = requestedCode;
  if (code) {
    if (!isValidCode(code)) {
      return res.status(400).json({ error: 'Code must match [A-Za-z0-9]{6,8}' });
    }
    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ error: 'Code already exists' });
  } else {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tries = 0;
    do {
      code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      tries++;
      if (tries > 10) break;
    } while (await Link.findOne({ code }));
  }

  try {
    const link = new Link({ code, url });
    await link.save();
    return res.status(201).json({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.listLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 }).lean();
    return res.json(links.map(l => ({
      code: l.code,
      url: l.url,
      clicks: l.clicks,
      lastClicked: l.lastClicked,
      createdAt: l.createdAt
    })));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getLink = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOne({ code }).lean();
    if (!link) return res.status(404).json({ error: 'Not found' });
    return res.json({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteLink = async (req, res) => {
  const { code } = req.params;
  try {
    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
