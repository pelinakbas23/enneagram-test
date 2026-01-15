// /api/iyzico-init.js
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    const baseUrl = process.env.PUBLIC_BASE_URL; // örn: https://www.oandaenneagram.com

    if (!apiKey || !secretKey) {
      return res.status(500).json({ error: "IYZICO env eksik" });
    }
    if (!baseUrl) {
      return res.status(500).json({ error: "PUBLIC_BASE_URL env eksik" });
    }

    // iyzipay
    let Iyzipay;
    try {
      Iyzipay = require("iyzipay");
    } catch (e) {
      return res.status(500).json({ error: "iyzipay paketi bulunamadı" });
    }

    const iyzipay = new Iyzipay({
      apiKey,
      secretKey,
      uri: "https://sandbox-api.iyzipay.com" // PROD'a geçince: https://api.iyzipay.com
    });

    const conversationId =
      "OID-" + Date.now() + "-" + Math.random().toString(16).slice(2);

    const callbackUrl = `${baseUrl}/api/iyzico-callback`;

    // Minimum request (senin fiyat/ürün bilgilerine göre uyarlayabilirsin)
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: "1",              // ürün fiyatın
      paidPrice: "1",
      currency: Iyzipay.CURRENCY.TRY,
      basketId: conversationId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl,

      buyer: {
        id: "by1",
        name: "OANDA",
        surname: "User",
        gsmNumber: "+905555555555",
        email: "noreply@oandaenneagram.com",  // email zorunlu alanı doldurmak için sabit
        identityNumber: "11111111111",
        registrationAddress: "Istanbul",
        ip: req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "127.0.0.1",
        city: "Istanbul",
        country: "Turkey"
      },

      shippingAddress: {
        contactName: "OANDA User",
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34000"
      },

      billingAddress: {
        contactName: "OANDA User",
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34000"
      },

      basketItems: [
        {
          id: "enneagram-test",
          name: "OANDA Enneagram Test",
          category1: "Digital",
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: "1"
        }
      ]
    };

    // Checkout form oluştur
    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "iyzico error", detail: String(err) });
      }

      // result.checkoutFormContent (embed) veya result.paymentPageUrl gelebilir
      return res.status(200).json({
        paymentPageUrl: result.paymentPageUrl || null,
        checkoutFormContent: result.checkoutFormContent || null,
        conversationId
      });
    });

  } catch (e) {
    return res.status(500).json({ error: e.message || String(e) });
  }
};
