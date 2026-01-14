// /api/iyzico-callback.js
module.exports = async (req, res) => {
  try {
    // ----------------------------
    // 1) TOKEN'I HER YOLDAN YAKALA
    // ----------------------------
    let token = null;

    // Query
    if (req.query && req.query.token) token = req.query.token;

    // Body (Vercel body bazen string / buffer gelir)
    if (!token && req.body != null) {
      let body = req.body;

      if (Buffer.isBuffer(body)) {
        body = body.toString("utf8");
      }

      // String ise
      if (typeof body === "string") {
        const s = body.trim();

        // JSON dene
        if (s.startsWith("{")) {
          try {
            const obj = JSON.parse(s);
            token = obj.token || obj.checkoutFormToken;
          } catch (e) {}
        }

        // urlencoded dene
        if (!token) {
          try {
            const params = new URLSearchParams(s);
            token = params.get("token") || params.get("checkoutFormToken");
          } catch (e) {}
        }
      }

      // Object ise
      if (!token && typeof body === "object") {
        token =
          body.token ||
          body.checkoutFormToken ||
          (body.data && (body.data.token || body.data.checkoutFormToken));
      }
    }

    if (!token) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_token");
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
      iyzipay.checkoutForm.retrieve(
        { token },
        (err, result) => (err ? reject(err) : resolve(result))
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

    // ✅ Fallback: token ile GAS'tan email'i çek
    if (!email) {
      try {
        const gasUrl = process.env.GAS_WEBAPP_URL;
        if (gasUrl) {
          const r = await fetch(gasUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "getEmailByToken",
              paymentToken: token,
            }),
          });

          const j = await r.json();
          if (j && j.ok && j.email) {
            email = String(j.email).trim().toLowerCase();
          }
        }
      } catch (e) {
        console.error("getEmailByToken failed:", e?.message || e);
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
    try {
      gasJson = await gasResp.json();
    } catch (e) {}

    if (!gasResp.ok || !gasJson.ok) {
      // (İstersen gasJson.error'ı query'e ekleyebiliriz ama şimdilik güvenli kalsın)
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
