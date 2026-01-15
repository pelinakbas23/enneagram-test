// /api/iyzico-callback.js
module.exports = async (req, res) => {
  try {
    // Token bazen query’de bazen body’de gelir
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const token =
      (req.query && (req.query.token || req.query.checkoutFormToken)) ||
      body.token ||
      body.checkoutFormToken ||
      "";

    const paymentToken = String(token || "").trim();
    if (!paymentToken) {
      return redirectFail(res, "no_token");
    }

    // Iyzico sonucunu retrieve et
    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: "https://api.iyzipay.com" });

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

    // Ödeme başarılı mı?
    const ok = result && result.status === "success" &&
      (String(result.paymentStatus || "").toUpperCase() === "SUCCESS" || result.paymentStatus == null);

    if (!ok) {
      const msg = result?.errorMessage || "payment_not_success";
      return redirectFail(res, msg);
    }

    // ✅ Başarılı ödeme → GAS issueCode çağır
    const GAS_URL = process.env.GAS_WEBAPP_URL; // .../exec
    const GAS_SECRET = process.env.GAS_SECRET;

    if (!GAS_URL || !GAS_SECRET) {
      // ödeme başarılı ama kod gönderemedik
      return redirectOk(res, { waiting: 1 });
    }

    const url =
      `${GAS_URL}?mode=issueCode` +
      `&paymentToken=${encodeURIComponent(paymentToken)}` +
      `&secret=${encodeURIComponent(GAS_SECRET)}`;

    const r = await fetch(url);
    const text = await r.text();
    let data = null;
    try { data = JSON.parse(text); } catch (_) {}

    if (!r.ok || !data?.ok) {
      return redirectOk(res, { waiting: 1 });
    }

    // Kod mail atıldı
    return redirectOk(res, { codeSent: 1 });

  } catch (e) {
    return redirectFail(res, "cb_error");
  }
};

function redirectOk(res, extra = {}) {
  const qs = new URLSearchParams({ success: "1", ...Object.fromEntries(Object.entries(extra).map(([k,v])=>[k,String(v)]))});
  res.statusCode = 302;
  res.setHeader("Location", "/payment.html?" + qs.toString());
  res.end();
}

function redirectFail(res, err) {
  const qs = new URLSearchParams({ success: "0", err: String(err || "failed") });
  res.statusCode = 302;
  res.setHeader("Location", "/payment.html?" + qs.toString());
  res.end();
}
