import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var OneSignal: any; // 👈 Permite usar OneSignal sin error de tipo

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (typeof OneSignal === 'undefined') {
        console.warn('❌ OneSignal no está definido. Solo funciona en APK real.');
        return;
      }

      console.log('✅ OneSignal está definido. Inicializando...');

      // 🆔 Tu App ID de OneSignal
      OneSignal.setAppId('d345ceb8-194d-4123-88dd-9680b46191f0');

      // 🔔 Pedir permiso de notificaciones
      OneSignal.promptForPushNotificationsWithUserResponse((accepted: boolean) => {
        console.log('🔔 Permiso aceptado:', accepted);
      });

      // 📬 Manejar notificaciones abiertas
      OneSignal.setNotificationOpenedHandler((notification: any) => {
        console.log('📬 Notificación abierta:', notification);
      });

      // 📲 Obtener Player ID
      OneSignal.getDeviceState((state: any) => {
        console.log('📲 Player ID:', state.userId);
      });
    });
  }
}
