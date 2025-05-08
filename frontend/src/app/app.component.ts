import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var OneSignal: any; // 👉 Permite usar OneSignal sin errores de tipo

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
      // 🆔 ID de tu app en OneSignal
      OneSignal.setAppId('d345ceb8-194d-4123-88dd-9680b46191f0');

      // 🔔 Solicita permisos de notificación
      OneSignal.promptForPushNotificationsWithUserResponse((accepted: boolean) => {
        console.log('🔔 Permiso aceptado:', accepted);
      });

      // 📬 Maneja notificaciones abiertas
      OneSignal.setNotificationOpenedHandler((notification: any) => {
        console.log('📬 Notificación abierta:', notification);
      });

      // 📲 Obtiene el Player ID del dispositivo
      OneSignal.getDeviceState((state: any) => {
        console.log('📲 Player ID:', state.userId);
      });
    });
  }
}
