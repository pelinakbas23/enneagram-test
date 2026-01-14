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

    // 2) iyzico'dan token ile ödeme sonucunu çek (retrieve)
    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SECRET_KEY,
      uri: "https://api.iyzipay.com"
    });

    const retrieveResult = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // iyzico response'ta status/paymentStatus alanları gelir
    const ok =
      retrieveResult &&
      retrieveResult.status === "success" &&
      String(retrieveResult.paymentStatus || "").toUpperCase() === "SUCCESS";

    if (!ok) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=payment_not_success");
      return res.end();
    }

    // 3) Email'i retrieveResult'tan al
    const email = (retrieveResult.buyer && retrieveResult.buyer.email) ? String(retrieveResult.buyer.email) : "";
    if (!email) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_email");
      return res.end();
    }

    // 4) Apps Script WebApp URL'ine POST at: mode=issueCode
    // ⚠️ BURAYA kendi Apps Script "Web app URL" adresini koy
    const GAS_URL = process.env.GAS_WEBAPP_URL; // örn: https://script.google.com/macros/s/XXXX/exec

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

    // 5) Son sayfaya yönlendir
    // (istersen burada “kod gönderildi” bilgisi gösterebilirsin)
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=1&codeSent=1");
    return res.end();

  } catch (e) {
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=0&err=server");
    return res.end();
  }
};
