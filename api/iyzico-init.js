// /api/iyzico-init.js
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || "").trim();
    if (!email) return res.status(400).json({ error: "Email gerekli", step: "EMAIL" });

    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    if (!apiKey || !secretKey) {
      return res.status(500).json({
        error: "IYZICO env eksik",
        step: "ENV",
        hasApiKey: !!apiKey,
        hasSecretKey: !!secretKey
      });
    }

    let Iyzipay;
    try { Iyzipay = require("iyzipay"); }
    catch (e) {
      return res.status(500).json({ error: "iyzipay module missing", step: "MODULE", detail: String(e?.message || e) });
    }

    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: "https://api.iyzipay.com" });

    const baseUrl =
      (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "") ||
      `https://${req.headers.host}`;

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `oanda_${Date.now()}`,
      callbackUrl: `${baseUrl}/api/iyzico-callback`,
      price: "1.00",
      paidPrice: "1.00",
      currency: Iyzipay.CURRENCY.TRY,
      basketId: "ENNEAGRAM_TEST",
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

      buyer: {
        id: "USER",
        name: "OANDA",
        surname: "Customer",
        email,
        identityNumber: "11111111111",
        registrationAddress: "Türkiye",
        ip: (req.headers["x-forwarded-for"] || "127.0.0.1"),
        city: "Istanbul",
        country: "Turkey"
      },
      billingAddress: {
        contactName: "OANDA Customer",
        city: "Istanbul",
        country: "Turkey",
        address: "Türkiye",
        zipCode: "34000"
      },
      basketItems: [{
        id: "ENNEAGRAM",
        name: "OANDA Enneagram Testi",
        category1: "Psikoloji",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: "1.00"
      }]
    };

    iyzipay.checkoutFormInitialize.create(request, async (err, result) => {
      if (err) return res.status(500).json({ error: "iyzipay err", step: "INIT", detail: err.message });
      if (result?.status !== "success") {
        return res.status(400).json({
          error: "iyzico error",
          step: "INIT_RESULT",
          detail: result?.errorMessage || "unknown"
        });
      }

      // ✅ token + email’i GAS’a kaydet (TOP-LEVEL DEĞİL, BURADA!)
      try {
        const token = String(result?.token || result?.checkoutFormToken || "").trim();
        const GAS_URL = process.env.GAS_WEBAPP_URL;
        if (GAS_URL && token) {
          await fetch(GAS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "storeTokenEmail", paymentToken: token, email })
          });
        }
      } catch (e) {
        console.error("storeTokenEmail failed:", e?.message || e);
      }

      return res.status(200).json({ paymentPageUrl: result.paymentPageUrl });
    });

  } catch (e) {
    return res.status(500).json({ error: "server error", step: "CATCH", detail: String(e?.message || e) });
  }
};
