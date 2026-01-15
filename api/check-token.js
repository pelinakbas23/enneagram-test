// /api/check-token.js
export default async function handler(req, res) {
  try {
    const token = (req.query.token || "").trim();

    if (!token) {
      return res.status(400).json({ ok: false });
    }

    // Apps Script'e sor
    const r = await fetch(process.env.GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.GAS_SECRET,
        action: "check_token",
        token
      })
    });

    const data = await r.json().catch(() => null);

    if (!data || data.ok !== true) {
      return res.status(200).json({ ok: false });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    return res.status(500).json({ ok: false });
  }
}
