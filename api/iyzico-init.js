module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Vercel bazen body'yi string geçirir — iki ihtimali de karşılıyoruz
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || "").trim();
    if (!email) return res.status(400).json({ error: "Email gerekli" });

    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;

    // Env kontrol (değerleri ASLA göstermiyoruz)
    if (!apiKey || !secretKey) {
      return res.status(500).json({
        error: "IYZICO env eksik",
        hasApiKey: !!apiKey,
        hasSecretKey: !!secretKey
      });
    }

    // iyzipay yüklü mü?
    let Iyzipay;
    try {
      Iyzipay = require("iyzipay");
    } catch (e) {
      return res.status(500).json({
        error: "iyzipay module missing",
        detail: String(e?.message || e)
      });
    }

    const iyzipay = new Iyzipay({
      apiKey,
      secretKey,
      uri: "https://api.iyzipay.com"
    });
    const baseUrl =
  (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "") ||
  `https://${req.headers.host}`;

const request = {
  locale: Iyzipay.LOCALE.TR,
  conversationId: "oanda|" + encodeURIComponent(email) + "|" + Date.now(),

  // ✅ ZORUNLU (iyzico bunu istiyor)
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
    ip: req.headers["x-forwarded-for"] || "127.0.0.1",
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

    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
      if (err) return res.status(500).json({ error: "iyzipay err", detail: err.message });
      if (result?.status !== "success") {
        return res.status(400).json({ error: "iyzico error", detail: result?.errorMessage || "unknown" });
      }
      return res.status(200).json({ paymentPageUrl: result.paymentPageUrl });
    });

  } catch (e) {
    return res.status(500).json({ error: "server error", detail: String(e?.message || e) });
  }
};
