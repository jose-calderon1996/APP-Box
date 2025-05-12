// transbank.js
const { WebpayPlus } = require('transbank-sdk');

// Configurar en modo integración (sandbox)
WebpayPlus.configureForIntegration(
  '597055555532', // Código de comercio público de prueba
  '597055555532', // API Key pública de prueba
  'https://webpay3gint.transbank.cl' // URL sandbox oficial
);

module.exports = WebpayPlus;
