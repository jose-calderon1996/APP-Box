import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Inicia la aplicacion Ionic Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// 🔔 REGISTRO DEL SERVICE WORKER PARA NOTIFICACIONES PUSH
// Este bloque permite que Firebase pueda enviar notificaciones push
// al navegador mientras la app esta abierta o en segundo plano

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(reg => console.log('✅ Service Worker registrado correctamente:', reg))
    .catch(err => console.error('❌ Error al registrar el Service Worker:', err));
}
