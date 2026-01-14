// /api/iyzico-callback.js
function readRawBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", () => resolve(""));
  });
}

module.exports = async (req, res) => {
  try {
    console.log("IYZICO_INIT HIT", new Date().toISOString(), "host=", req.headers.host);
    // ✅ GET gelirse: token bekleme, kullanıcıyı geri gönder (normal)
    if (req.method === "GET") {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=1&waiting=1");
      return res.end();
    }

    // Buradan sonrası POST varsayımı
    console.log("CALLBACK POST HIT");
    console.log("CT:", req.headers["content-type"]);

    const raw = await readRawBody(req);
    console.log("RAW(first200):", (raw || "").slice(0, 200));

    // Token yakala
    let token = null;

    // 1) urlencoded
    try {
      const params = new URLSearchParams(raw);
      token = params.get("token") || params.get("checkoutFormToken");
    } catch (e) {}

    // 2) json
    if (!token && raw && raw.trim().startsWith("{")) {
      try {
        const obj = JSON.parse(raw);
        token = obj.token || obj.checkoutFormToken;
      } catch (e) {}
    }

    token = String(token || "").trim();
    if (!token) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_token_post");
      return res.end();
    }

    // iyzico retrieve
    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SECRET_KEY,
      uri: "https://api.iyzipay.com",
    });

    const payment = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve({ token }, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });

    if (payment.paymentStatus !== "SUCCESS") {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=payment_failed");
      return res.end();
    }

    // Email yoksa GAS'tan çek
    let email =
      payment?.buyer?.email ||
      payment?.customer?.email ||
      payment?.billingAddress?.email ||
      "";

    email = String(email || "").trim().toLowerCase();

    if (!email) {
      try {
        const r = await fetch(process.env.GAS_WEBAPP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "getEmailByToken", paymentToken: token }),
        });
        const j = await r.json();
        if (j && j.ok && j.email) email = String(j.email).trim().toLowerCase();
      } catch (e) {}
    }

    if (!email) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_email");
      return res.end();
    }

    // Kod gönder
    const gasResp = await fetch(process.env.GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "issueCode", email, paymentToken: token }),
    });
    const gasJson = await gasResp.json().catch(() => ({}));

    if (!gasResp.ok || !gasJson.ok) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=gas_failed");
      return res.end();
    }

    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=1&codeSent=1");
    return res.end();
  } catch (e) {
    console.error("CALLBACK EX:", e?.message || e);
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=0&err=exception");
    return res.end();
  }
};
