// Este servicio permite obtener el token FCM del dispositivo y escuchar notificaciones push

import { Injectable } from '@angular/core';
// Inicializamos la app Firebase con la configuracion
import { initializeApp } from 'firebase/app';
// Importamos funciones necesarias para mensajeria push
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// Traemos la configuracion desde environment.ts
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicializamos la aplicacion Firebase con los datos del proyecto
  private app = initializeApp(environment.firebaseConfig);

  // Obtenemos el servicio de mensajeria desde Firebase
  private messaging = getMessaging(this.app);

  // Metodo para obtener el token FCM del navegador o dispositivo
  async obtenerToken(): Promise<string | null> {
    try {
      const token = await getToken(this.messaging, {
        // VAPID es la clave publica generada desde Firebase Console para web push
        vapidKey: 'BOGu-0qWyVQb54BTFJ5CP6OGljgOjZFzKgHmL_vHBKNarAsdBTAlrbA_FTX3BEMRCmJe-QxFan8Rcq1nvVqYmH8' // <-- AQUI debes reemplazar por la tuya real
      });

      console.log('Token FCM:', token);
      return token; // Retornamos el token al componente que lo llama
    } catch (error) {
      console.error('Error al obtener token FCM:', error);
      return null; // Si falla, retornamos null
    }
  }

  // Metodo para escuchar mensajes recibidos mientras la app esta abierta
  escucharMensajes() {
    onMessage(this.messaging, (payload) => {
      console.log('Notificacion recibida:', payload);

      // Mostramos una alerta simple con el titulo y el cuerpo
      alert(payload.notification?.title + '\n' + payload.notification?.body);
    });
  }
}
