const axios = require('axios');

const APP_ID = 'd345ceb8-194d-4123-88dd-9680b46191f0'; // App ID de OneSignal
const API_KEY = 'TU_CLAVE_REST_HEREDADA'; // Reemplaza por tu clave válida

async function enviarNotificacion({ titulo, mensaje, playerIds = [] }) {
  try {
    const res = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: APP_ID,
        headings: { en: titulo },
        contents: { en: mensaje },
        include_player_ids: playerIds
      },
      {
        headers: {
          Authorization: `Basic ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Notificación enviada:', res.data);
    return res.data;
  } catch (err) {
    console.error('❌ Error enviando notificación:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  enviarNotificacion
};
