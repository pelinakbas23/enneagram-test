// /api/iyzico-callback.js
module.exports = async (req, res) => {
  const redirectFail = (err) => {
    const qs = new URLSearchParams({ success: "0", err: String(err || "failed") });
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?" + qs.toString());
    res.end();
  };

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const token =
      (req.query && (req.query.token || req.query.checkoutFormToken)) ||
      body.token ||
      body.checkoutFormToken ||
      "";

    const paymentToken = String(token || "").trim();
    if (!paymentToken) return redirectFail("no_token");

    const apiKey = String(process.env.IYZICO_API_KEY || "").trim();
    const secretKey = String(process.env.IYZICO_SECRET_KEY || "").trim();
    const IYZICO_URI = String(process.env.IYZICO_URI || "").trim() || "https://api.iyzipay.com";

    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: IYZICO_URI });

    const retrieveRequest = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `cb_${Date.now()}`,
      token: paymentToken
    };

    const result = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve(retrieveRequest, (err, r) => (err ? reject(err) : resolve(r)));
    });

    const ok =
      result &&
      result.status === "success" &&
      String(result.paymentStatus || "").toUpperCase() === "SUCCESS";

    if (!ok) return redirectFail(result?.errorMessage || "payment_not_success");

    // ✅ GAS'tan email çek (asıl kaynak)
    const GAS_URL    = String(process.env.GAS_WEBAPP_URL || "").trim(); // .../exec
    const GAS_SECRET = String(process.env.GAS_SECRET || "").trim();

    let email = "";
    if (GAS_URL && GAS_SECRET) {
      try {
        const r = await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "getEmailByToken",
            secret: GAS_SECRET,
            paymentToken
          })
        });
        const j = await r.json().catch(() => ({}));
        if (j && j.ok && j.email) email = String(j.email).trim().toLowerCase();
      } catch (_) {}
    }

    // fallback (iyzico bazen email döndürebilir)
    if (!email) email = String(result?.buyer?.email || "").trim().toLowerCase();

    // ✅ paid olarak işaretle
    if (GAS_URL && GAS_SECRET) {
      try {
        await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "markPaid",
            secret: GAS_SECRET,
            paymentToken
          })
        });
      } catch (_) {}
    }

    // ✅ teste yönlendir
    res.statusCode = 302;
    res.setHeader("Location", "/test_v3.html?token=" + encodeURIComponent(paymentToken));
    res.end();
  } catch (e) {
    return redirectFail("cb_error");
  }
};

