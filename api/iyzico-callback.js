module.exports = (req, res) => {
  // Token bazen query’de bazen body’de gelir
  var token = null;

  if (req.query && req.query.token) token = req.query.token;
  else if (req.body && req.body.token) token = req.body.token;
  else if (req.body && req.body.checkoutFormToken) token = req.body.checkoutFormToken;

  // Burayı istediğin sayfaya çevir:
  // - payment.html: "ödeme alındı" mesajı göster
  // - test_v3.html: direkt teste geçiş
  // - welcome.html: "OANDA Enneagram Kişilik Testi’ne hoş geldiniz." sayfası
  var target = "/payment.html?success=1";
  if (token) target += "&token=" + encodeURIComponent(token);

  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
};

