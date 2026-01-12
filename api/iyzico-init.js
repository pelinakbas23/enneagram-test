import Iyzipay from "iyzipay";

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com" // canlıya geçince değişecek
});

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email gerekli" });
  }

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "oanda-" + Date.now(),
    price: "299.00",
    paidPrice: "299.00",
    currency: Iyzipay.CURRENCY.TRY,
    basketId: "ENNEAGRAM_TEST",
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,

    // ŞİMDİLİK callback koyma; sadece ödeme sayfasına gideceğiz.
    // callbackUrl: "https://senin-domain.com/api/iyzico-callback",

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

    basketItems: [
      {
        id: "ENNEAGRAM",
        name: "OANDA Enneagram Testi",
        category1: "Psikoloji",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: "299.00"
      }
    ]
  };

  iyzipay.checkoutFormInitialize.create(request, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result?.status !== "success") {
      return res.status(400).json({ error: result?.errorMessage || "iyzico hata" });
    }
    return res.json({ paymentPageUrl: result.paymentPageUrl });
  });
}
