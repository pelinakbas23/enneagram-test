// /api/iyzico-callback.js
module.exports = async (req, res) => {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const token =
      (req.query && (req.query.token || req.query.checkoutFormToken)) ||
      body.token ||
      body.checkoutFormToken ||
      "";

    const paymentToken = String(token || "").trim();
    if (!paymentToken) return redirectFail(res, "no_token");

    const apiKey = String(process.env.IYZICO_API_KEY || "").trim();
    const secretKey = String(process.env.IYZICO_SECRET_KEY || "").trim();
    const IYZICO_URI = (String(process.env.IYZICO_URI || "").trim() || "https://api.iyzipay.com");

    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: IYZICO_URI });

    const retrieveRequest = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `cb_${Date.now()}`,
      token: paymentToken
    };

    const result = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve(retrieveRequest, (err, r) => {
        if (err) return reject(err);
        resolve(r);
      });
    });

    const ok =
      result && result.status === "success" &&
      String(result.paymentStatus || "").toUpperCase() === "SUCCESS";

    if (!ok) {
      return redirectFail(res, result?.errorMessage || "payment_not_success");
    }

    // (Opsiyonel) ödeme başarılı → GAS ile kod üret / mail at
    const GAS_URL = String(process.env.GAS_WEBAPP_URL || "").trim();
    const GAS_SECRET = String(process.env.GAS_SECRET || "").trim();

    if (GAS_URL && GAS_SECRET) {
      const url =
        `${GAS_URL}?mode=issueCode` +
        `&paymentToken=${encodeURIComponent(paymentToken)}` +
        `&secret=${encodeURIComponent(GAS_SECRET)}`;
      try { await fetch(url); } catch (_) {}
    }

    // ✅ En kritik: otomatik teste yönlendir
    res.statusCode = 302;
    res.setHeader("Location", "/test_v3.html?token=" + encodeURIComponent(paymentToken));
    res.end();

  } catch (e) {
    return redirectFail(res, "cb_error");
  }
};

function redirectFail(res, err) {
  const qs = new URLSearchParams({ success: "0", err: String(err || "failed") });
  res.statusCode = 302;
  res.setHeader("Location", "/payment.html?" + qs.toString());
  res.end();
}
