import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service'; // Ajusta el path si es necesario

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // 1. Registrar el service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration);
        }).catch((err) => {
          console.error('❌ Error registrando Service Worker:', err);
        });
    }

    // 2. Obtener el token FCM
    this.firebaseService.obtenerToken().then(token => {
      if (token) {
        console.log('📲 Token FCM obtenido:', token);
        // Aquí podrías guardarlo en tu base de datos o enviarlo al backend
      } else {
        console.warn('⚠️ No se pudo obtener token FCM');
      }
    });

    // 3. Escuchar notificaciones mientras la app está abierta
    this.firebaseService.escucharMensajes();
  }
}
