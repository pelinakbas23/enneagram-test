module.exports = (req, res) => {
  // iyzico token bazen query’de olur, bazen body’de
  let token = null;

  if (req.query && req.query.token) token = req.query.token;
  else if (req.body && req.body.token) token = req.body.token;
  else if (req.body && req.body.checkoutFormToken) token = req.body.checkoutFormToken;

  // İstediğin sayfaya yönlendir
  const target = token
    ? "/payment.html?success=1&token=" + encodeURIComponent(token)
    : "/payment.html?success=1";

  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
};
