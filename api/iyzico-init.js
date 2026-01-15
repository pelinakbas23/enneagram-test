// /api/iyzico-init.js
module.exports = async (req, res) => {
  try {
    // Sadece POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Body parse
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || "").trim();
    if (!email) return res.status(400).json({ error: "Email gerekli", step: "EMAIL" });

    // Env kontrol
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

    // GAS URL kontrol (mutlaka /exec olmalı; /dev olursa dışarıdan çalışmayabilir)
    const GAS_URL = (process.env.GAS_WEBAPP_URL || "").trim();
    if (!GAS_URL) {
      return res.status(500).json({ error: "GAS_WEBAPP_URL env eksik", step: "GAS_URL" });
    }
    if (!/\/exec\b/.test(GAS_URL)) {
      return res.status(500).json({
        error: "GAS_WEBAPP_URL /exec ile bitmeli (Deploy -> Web app URL). /dev değil.",
        step: "GAS_URL_FORMAT",
        got: GAS_URL
      });
    }

    // Base URL (PROD için zorunlu)
    const baseUrl = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");
    if (!baseUrl) {
      return res.status(500).json({ error: "PUBLIC_BASE_URL env eksik", step: "BASEURL" });
    }

    // Iyzipay require
    let Iyzipay;
    try {
      Iyzipay = require("iyzipay");
    } catch (e) {
      return res.status(500).json({ error: "iyzipay module missing", step: "MODULE" });
    }

    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: "https://api.iyzipay.com" });

    // IP (x-forwarded-for bazen "a,b,c" gelir; ilk IP alınır)
    const ipRaw = req.headers["x-forwarded-for"] || "127.0.0.1";
    const ip = String(ipRaw).split(",")[0].trim();

    const conversationId = `oanda_${Date.now()}`;

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
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
        identityNumber: "10000000146", // örnek geçerli TCKN formatı
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

      // Token (checkout form token)
      const token = String(result?.checkoutFormToken || result?.token || "").trim();

      // ✅ token + email’i GAS’a kaydet (GET)
      // Not: Bu çağrı başarısız olsa bile ödeme formunu yine döndürüyoruz.
      try {
        if (token) {
          const url =
            `${GAS_URL}?mode=storeTokenEmail` +
            `&paymentToken=${encodeURIComponent(token)}` +
            `&email=${encodeURIComponent(email)}` +
            `&conversationId=${encodeURIComponent(conversationId)}` +
            `&where=${encodeURIComponent("init")}` +
            `&note=${encodeURIComponent("storeTokenEmail")}` +
            `&ts=${Date.now()}`;

          const r = await fetch(url, { method: "GET" });
          const t = await r.text().catch(() => "");

          if (!r.ok) {
            console.warn("GAS storeTokenEmail failed:", r.status, t);
          } else {
            console.log("GAS storeTokenEmail ok:", t);
          }
        } else {
          console.warn("Token boş döndü (iyzico init success ama token yok)");
        }
      } catch (e) {
        console.warn("GAS storeTokenEmail exception:", e);
      }

      // ✅ iyzico bazen paymentPageUrl yerine checkoutFormContent döndürür
      const paymentPageUrl = result?.paymentPageUrl;
      const checkoutFormContent = result?.checkoutFormContent || result?.checkoutFormHtmlContent;

      if (paymentPageUrl) {
        return res.status(200).json({ paymentPageUrl });
      }

      if (checkoutFormContent) {
        return res.status(200).json({
          checkoutFormContent,
          token
        });
      }

      // ikisi de yoksa debug
      return res.status(500).json({
        error: "payment data missing",
        step: "NO_URL_NO_CONTENT",
        keys: Object.keys(result || {})
      });
    });

  } catch (e) {
    return res.status(500).json({
      error: "server error",
      step: "CATCH",
      detail: String(e?.message || e)
    });
  }
};
