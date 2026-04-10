// api/subscribe.js
// Vercel Serverless Function
// Kullanıcıyı MailerLite'a ekler, enneagram tipine göre gruba atar.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, tip, firstName, lastName } = req.body;

  if (!email || !tip) {
    return res.status(400).json({ error: "email ve tip zorunlu" });
  }

  const API_KEY = process.env.MAILERLITE_API_KEY;
  const groupId = process.env[`MAILERLITE_GROUP_TIP_${tip}`];

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        fields: {
          name: firstName || "",
          last_name: lastName || "",
        },
        groups: [groupId],
        status: "active",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("MailerLite error:", data);
      return res.status(500).json({ error: data.message || "MailerLite hatası" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
