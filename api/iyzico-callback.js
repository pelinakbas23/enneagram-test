// /api/iyzico-callback.js

function readRawBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", () => resolve(""));
  });
}

module.exports = async (req, res) => {
  try {
    // ----------------------------
    // 1) TOKEN'I HER YOLDAN YAKALA (query + parsed body + RAW BODY)
    // ----------------------------
    let token = null;

    // 1a) Query (GET gelirse)
    if (req.query && (req.query.token || req.query.checkoutFormToken)) {
      token = req.query.token || req.query.checkoutFormToken;
    }

    // 1b) Parsed body (bazı durumlarda dolu gelir)
    if (!token && req.body && typeof req.body === "object") {
      token = req.body.token || req.body.checkoutFormToken;
    }

    // 1c) RAW body (Vercel'de form-urlencoded genelde buradan okunur)
    if (!token) {
      const raw = await readRawBody(req);
      if (raw) {
        // JSON olabilir
        if (raw.trim().startsWith("{")) {
          try {
            const obj = JSON.parse(raw);
            token = obj.token || obj.checkoutFormToken;
          } catch (e) {}
        }

        // urlencoded olabilir: token=...&...
        if (!token) {
          try {
            const params = new URLSearchParams(raw);
            token = params.get("token") || params.get("checkoutFormToken");
          } catch (e) {}
        }
      }
    }

    token = String(token || "").trim();

    if (!token) {
      // Debug için method'u da ekliyoruz (çok işe yarar)
      res.statusCode = 302;
      res.setHeader("Location", `/payment.html?success=0&err=no_token&method=${encodeURIComponent(req.method)}`);
      return res.end();
    }

    // ----------------------------
    // 2) IYZICO'DAN ÖDEMEYİ SORGULA
    // ----------------------------
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

    // ----------------------------
    // 3) EMAIL'I AL (iyzico bazen buyer/email dönmez → GAS fallback)
    // ----------------------------
    let email =
      payment?.buyer?.email ||
      payment?.customer?.email ||
      payment?.billingAddress?.email ||
      payment?.shippingAddress?.email ||
      payment?.email ||
      "";

    email = String(email || "").trim().toLowerCase();

    // Email yoksa: init aşamasında Payments'a yazdığımız email'i token ile çek
    if (!email) {
      try {
        const gasUrl = process.env.GAS_WEBAPP_URL;
        if (gasUrl) {
          const r = await fetch(gasUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "getEmailByToken", paymentToken: token }),
          });
          const j = await r.json();
          if (j && j.ok && j.email) email = String(j.email).trim().toLowerCase();
        }
      } catch (e) {
        // düşerse no_email göreceksin
      }
    }

    if (!email) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_email");
      return res.end();
    }

    // ----------------------------
    // 4) GAS → KOD VER & MAIL AT
    // ----------------------------
    const gasResp = await fetch(process.env.GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "issueCode",
        email,
        paymentToken: token,
      }),
    });

    let gasJson = {};
    try { gasJson = await gasResp.json(); } catch (e) {}

    if (!gasResp.ok || !gasJson.ok) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=gas_failed");
      return res.end();
    }

    // ----------------------------
    // 5) BAŞARILI
    // ----------------------------
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=1&codeSent=1");
    return res.end();

  } catch (e) {
    console.error(e);
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=0&err=exception");
    return res.end();
  }
};
