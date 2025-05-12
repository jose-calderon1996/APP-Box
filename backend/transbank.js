const { Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment, WebpayPlus } = require('transbank-sdk');

// ✅ Creamos la instancia de WebpayPlus con las opciones correctas
const webpay = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS, // 597055555532
    IntegrationApiKeys.WEBPAY,            // API Key pública
    Environment.Integration               // Modo sandbox
  )
);

module.exports = webpay;
