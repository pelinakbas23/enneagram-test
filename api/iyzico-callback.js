// /api/iyzico-callback.js
module.exports = async (req, res) => {
  try {
    // 1) Token al
    let token = null;

    if (req.query && req.query.token) token = req.query.token;
    else if (req.body && req.body.token) token = req.body.token;
    else if (req.body && req.body.checkoutFormToken) token = req.body.checkoutFormToken;

    if (!token) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_token");
      return res.end();
    }

    // 2) iyzico ödeme sonucunu çek
    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SECRET_KEY,
      uri: "https://api.iyzipay.com"
    });

    const result = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve({ token }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    // 3) Ödeme başarılı mı?
    const paymentOk =
      result &&
      result.status === "success" &&
      String(result.paymentStatus || "").toUpperCase() === "SUCCESS";

    if (!paymentOk) {
      const st = encodeURIComponent(String(result?.status || ""));
      const ps = encodeURIComponent(String(result?.paymentStatus || ""));
      const ec = encodeURIComponent(String(result?.errorCode || ""));
      const em = encodeURIComponent(String(result?.errorMessage || "").slice(0, 60));
      res.statusCode = 302;
      res.setHeader(
        "Location",
        `/payment.html?success=0&err=payment_failed&st=${st}&ps=${ps}&ec=${ec}&em=${em}`
      );
      return res.end();
    }
    // Debug: tüm result objesini error parametresi olarak yolla
const debug = encodeURIComponent(JSON.stringify(result || {}));
res.statusCode = 302;
res.setHeader(
  "Location",
  "/payment.html?success=0&err=debug&debug=" + debug
);
return res.end();

   // 4) Email al: önce buyer.email, yoksa GAS'tan token ile çek
let email = String(result?.buyer?.email || "").trim();

if (!email) {
  const GAS_URL = process.env.GAS_WEBAPP_URL;
  if (GAS_URL) {
    try {
      const r = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "getEmailByToken", paymentToken: token })
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok && j.email) email = String(j.email).trim();
    } catch (e) {}
  }
}

if (!email) {
  res.statusCode = 302;
  res.setHeader("Location", "/payment.html?success=0&err=no_email");
  return res.end();
}

    // 5) Apps Script'e POST at
    const GAS_URL = process.env.GAS_WEBAPP_URL;
    if (!GAS_URL) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_gas_url");
      return res.end();
    }

    const gasResp = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "issueCode",
        email,
        paymentToken: token
      })
    });

    const gasJson = await gasResp.json().catch(() => ({}));

    if (!gasResp.ok || !gasJson.ok) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=code_email_failed");
      return res.end();
    }

    // 6) Son sayfaya yönlendir
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=1&codeSent=1");
    return res.end();

  } catch (e) {
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=0&err=server");
    return res.end();
  }
};
