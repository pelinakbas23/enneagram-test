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
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=payment_failed");
      return res.end();
    }

    // 4) Email al
    const email = result.buyer?.email;
    if (!email) {
      res.statusCode = 302;
      res.setHeader("Location", "/payment.html?success=0&err=no_email");
      return res.end();
    }

    // 5) Apps Script'e POST AT (işte eksik olan parça)
    const GAS_URL = process.env.GAS_WEBAPP_URL;

    await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "issueCode",
        email,
        paymentToken: token
      })
    });

    // 6) Son sayfaya yönlendir
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=1");
    res.end();

  } catch (e) {
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?success=0&err=server");
    res.end();
  }
};

