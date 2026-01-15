// /api/iyzico-init.js
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

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
    try {
      Iyzipay = require("iyzipay");
    } catch (e) {
      return res.status(500).json({ error: "iyzipay module missing", step: "MODULE" });
    }

    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: "https://api.iyzipay.com" });

    const baseUrl =
      (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "") ||
      `https://${req.headers.host}`;

    const ipRaw = req.headers["x-forwarded-for"] || "127.0.0.1";
    const ip = String(ipRaw).split(",")[0].trim();  
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `oanda_${Date.now()}`,
      callbackUrl: `${baseUrl}/api/iyzico-callback`,
      price: "1",
      paidPrice: "1",
      currency: Iyzipay.CURRENCY.TRY,
      basketId: "ENNEAGRAM_TEST",
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      buyer: {
        id: "USER",
        name: "OANDA",
        surname: "Customer",
        email,
        identityNumber: "10000000146",
        registrationAddress: "Türkiye",
        ip,
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
        price: "1"
      }]
    };

    iyzipay.checkoutFormInitialize.create(request, async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "iyzipay err", step: "INIT", detail: err.message });
      }
      if (result?.status !== "success") {
        return res.status(400).json({
          error: "iyzico error",
          step: "INIT_RESULT",
          detail: result?.errorMessage || "unknown"
        });
      }

      // ✅ token + email’i GAS’a kaydet (GET ile)
     // ✅ token + email’i GAS’a kaydet (GET ile)
try {
  const token = String(result?.checkoutFormToken || result?.token || "").trim(); // <-- öncelik checkoutFormToken
  const GAS_URL = (process.env.GAS_WEBAPP_URL || "").trim(); // mutlaka .../exec olmalı

  if (GAS_URL && token) {
    const url =
      `${GAS_URL}?mode=storeTokenEmail` +
      `&paymentToken=${encodeURIComponent(token)}` +
      `&email=${encodeURIComponent(email)}` +
      `&conversationId=${encodeURIComponent(request.conversationId)}` +
      `&where=${encodeURIComponent("init")}` +
      `&note=${encodeURIComponent("storeTokenEmail")}` +
      `&ts=${Date.now()}`; // cache vs. olmasın diye

    const r = await fetch(url, { method: "GET" });

    // İstersen görünür bir log bırak (Vercel logs)
    if (!r.ok) {
      console.warn("GAS storeTokenEmail failed:", r.status, await r.text());
    }
  } else {
    console.warn("GAS_URL veya token yok:", { hasGasUrl: !!GAS_URL, hasToken: !!token });
  }
} catch (e) {
  console.warn("GAS storeTokenEmail exception:", e);
  // ödeme sayfasını yine de açıyoruz
}

      // ✅ iyzico bazen paymentPageUrl yerine checkoutFormContent döndürür
      const paymentPageUrl = result?.paymentPageUrl;
      const checkoutFormContent = result?.checkoutFormContent || result?.checkoutFormHtmlContent;
      const token = result?.token || result?.checkoutFormToken;

      if (paymentPageUrl) {
        return res.status(200).json({ paymentPageUrl });
      }
      if (checkoutFormContent) {
        return res.status(200).json({
          checkoutFormContent,
          token: token || ""
        });
      }

      // ikisi de yoksa debug için result anahtarlarını döndür
      return res.status(500).json({
        error: "payment data missing",
        step: "NO_URL_NO_CONTENT",
        keys: Object.keys(result || {})
      });
    });

  } catch (e) {
    return res.status(500).json({ error: "server error", step: "CATCH", detail: String(e?.message || e) });
  }
};
