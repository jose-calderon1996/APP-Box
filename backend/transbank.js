const { IntegrationApiKeys, IntegrationCommerceCodes, Environment, WebpayPlus } = require('transbank-sdk');

const webpay = new WebpayPlus.Transaction(
  new WebpayPlus.Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,  // '597055555532'
    IntegrationApiKeys.WEBPAY,             // API key pública
    Environment.Integration                // Ambiente sandbox
  )
);

module.exports = webpay;
