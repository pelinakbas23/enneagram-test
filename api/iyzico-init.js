// /api/iyzico-init.js
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const email = String(body.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ error: "Email gerekli" });

    const apiKey = String(process.env.IYZICO_API_KEY || "").trim();
    const secretKey = String(process.env.IYZICO_SECRET_KEY || "").trim();
    const IYZICO_URI = String(process.env.IYZICO_URI || "").trim() || "https://api.iyzipay.com";
    if (!apiKey || !secretKey) {
      return res.status(500).json({ error: "IYZICO env eksik", hasApiKey: !!apiKey, hasSecretKey: !!secretKey });
    }

    const proto = String(req.headers["x-forwarded-proto"] || "https");
    const host = String(req.headers["x-forwarded-host"] || req.headers.host || "");
    const baseFromReq = host ? `${proto}://${host}` : "";
    const PUBLIC_BASE_URL = String(process.env.PUBLIC_BASE_URL || "").trim() || baseFromReq;
    if (!PUBLIC_BASE_URL) return res.status(500).json({ error: "BASEURL bulunamadı (PUBLIC_BASE_URL ve host boş)" });

    const callbackUrl = `${PUBLIC_BASE_URL}/api/iyzico-callback`;

    const ip =
      String((req.headers["x-forwarded-for"] || "").split(",")[0]).trim() ||
      String(req.socket?.remoteAddress || "127.0.0.1");

    const Iyzipay = require("iyzipay");
    const iyzipay = new Iyzipay({ apiKey, secretKey, uri: IYZICO_URI });

    const price = "1.00";

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: `init_${Date.now()}`,
      price,
      paidPrice: price,
      currency: Iyzipay.CURRENCY.TRY,
      installment: "1",
      basketId: `B${Date.now()}`,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl,
      buyer: {
        id: `BY_${Date.now()}`,
        name: "OANDA",
        surname: "Enneagram",
        gsmNumber: "+905555555555",
        email,
        identityNumber: "11111111111",
        registrationAddress: "Online",
        ip,
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000"
      },
      shippingAddress: { contactName: "OANDA Enneagram", city: "Istanbul", country: "Turkey", address: "Online", zipCode: "34000" },
      billingAddress:  { contactName: "OANDA Enneagram", city: "Istanbul", country: "Turkey", address: "Online", zipCode: "34000" },
      basketItems: [
        { id: "TEST1", name: "OANDA Enneagram Test", category1: "Digital", itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL, price }
      ]
    };

    const result = await new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(request, (err, r) => (err ? reject(err) : resolve(r)));
    });

    if (!result || result.status !== "success") {
      return res.status(400).json({
        error: "Iyzico init başarısız",
        errorMessage: result?.errorMessage || result?.errorCode || "unknown"
      });
    }

    // ✅ TOKEN’ı AL (kritik)
    const paymentToken = String(result.token || result.checkoutFormToken || "").trim();

    // ✅ GAS’a token→email kaydet
    const GAS_URL = String(process.env.GAS_WEBAPP_URL || "").trim(); // .../exec
    const GAS_SECRET = String(process.env.GAS_SECRET || "").trim();

    if (GAS_URL && GAS_SECRET && paymentToken) {
      const url =
        `${GAS_URL}?mode=storeTokenEmail` +
        `&paymentToken=${encodeURIComponent(paymentToken)}` +
        `&email=${encodeURIComponent(email)}` +
        `&secret=${encodeURIComponent(GAS_SECRET)}`;
      try { await fetch(url); } catch (_) {}
    }

    return res.status(200).json({
      paymentPageUrl: result.paymentPageUrl || "",
      checkoutFormContent: result.checkoutFormContent || ""
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e?.message || e) });
  }
};
