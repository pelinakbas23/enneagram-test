// /api/iyzico-callback.js
module.exports = async (req, res) => {
  const redirect = (q) => {
    res.statusCode = 302;
    res.setHeader("Location", "/payment.html?" + q);
    res.end();
  };

  try {
    // 1) Token al
    let token = null;
    if (req.query?.token) token = req.query.token;
    else if (req.body?.token) token = req.body.token;
    else if (req.body?.checkoutFormToken) token = req.body.checkoutFormToken;

    if (!token) return redirect("success=0&err=no_token");

    // 2) iyzico retrieve
    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SECRET_KEY,
      uri: "https://api.iyzipay.com",
    });

    const retrieveResult = await new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const ok =
      retrieveResult?.status === "success" &&
      String(retrieveResult?.paymentStatus || "").toUpperCase() === "SUCCESS";

    if (!ok) return redirect("success=0&err=payment_not_success");

    // 3) GAS url kontrol
    const GAS_URL = process.env.GAS_WEBAPP_URL; // .../exec
    if (!GAS_URL) return redirect("success=1&waiting=1&err=gas_url_missing");

    // 4) Email: iyzico’dan al; boşsa GAS’tan token->email çek
    let email = String(retrieveResult?.buyer?.email || "").trim();

    // ✅ debugPing (GET ile) - callback buraya geldi mi?
    try {
      const pingUrl =
        `${GAS_URL}?mode=debugPing` +
        `&where=callback_enter` +
        `&paymentToken=${encodeURIComponent(token)}` +
        `&note=${encodeURIComponent("callback reached")}`;
      await fetch(pingUrl); // GET
    } catch (_) {}

    // Email boşsa, token'dan email çek (GET ile)
    if (!email) {
      const getUrl =
        `${GAS_URL}?mode=getEmailByToken` +
        `&paymentToken=${encodeURIComponent(token)}` +
        `&where=callback` +
        `&note=${encodeURIComponent("getEmailByToken")}`;

      const r = await fetch(getUrl); // GET
      const j = await r.json().catch(() => ({}));
      if (j?.ok && j?.email) email = String(j.email).trim();
    }

    if (!email) return redirect("success=1&waiting=1&err=no_email");

    // 5) issueCode çağır (GET ile)
    const issueUrl =
      `${GAS_URL}?mode=issueCode` +
      `&email=${encodeURIComponent(email)}` +
      `&paymentToken=${encodeURIComponent(token)}` +
      `&where=callback` +
      `&note=${encodeURIComponent("issueCode")}`;

    const gasResp = await fetch(issueUrl); // GET
    const gasJson = await gasResp.json().catch(() => ({}));

    if (gasJson?.ok) {
      return redirect("success=1&codeSent=1");
    } else {
      return redirect("success=1&waiting=1&err=issue_failed");
    }
  } catch (e) {
    return redirect("success=1&waiting=1&err=callback_server");
  }
};
