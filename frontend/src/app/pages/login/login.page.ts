import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class LoginPage {
  correo = '';
  password = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  async login() {
    this.correo = this.correo.trim().toLowerCase();

    if (!this.correo || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      console.log('📨 Iniciando sesion con:', this.correo);

      // 🔐 Paso 1: Login con Firebase Authentication
      const userCredential = await this.authService.iniciarSesion(this.correo, this.password);
      const uid = userCredential.user?.uid;

      // 📥 Paso 2: Obtener datos del usuario desde el backend
      const userData = await this.apiService.get(`usuarios/uid/${uid}`);
      console.log('🧠 userData recibido:', userData);

      // 💾 Paso 3: Guardar datos en localStorage
      localStorage.setItem('id_usuario', userData.id_usuario);
      localStorage.setItem('tipo_usuario', userData.tipo_usuario);
      localStorage.setItem('nombre', userData.nombre);
      localStorage.setItem('correo', userData.correo);

      console.log('📌 Hasta aca llego. Intentando registrar log y redirigir...');

      // 📝 Paso 4: Registrar log de acceso (NO bloquea el flujo)
      this.apiService.post('log-acceso/registrar', {
        id_usuario: userData.id_usuario
      }).then(() => {
        console.log('📝 Log de acceso registrado');
      }).catch((err) => {
        console.error('❌ Error registrando log de acceso:', err);
      });

      // 🚀 Paso 5: Redireccionar al panel correspondiente
      console.log('🎯 Tipo de usuario:', userData.tipo_usuario);
      switch (userData.tipo_usuario) {
        case 'cliente':
          console.log('➡️ Redirigiendo a /panel-cliente');
          await this.router.navigate(['/panel-cliente']);
          break;
        case 'entrenador':
          console.log('➡️ Redirigiendo a /panel-entrenador');
          await this.router.navigate(['/panel-entrenador']);
          break;
        case 'dueño':
          console.log('➡️ Redirigiendo a /panel-dueno');
          await this.router.navigate(['/panel-dueno']);
          break;
        default:
          console.warn('❌ Tipo de usuario desconocido. Redirigiendo a login');
          await this.router.navigate(['/login']);
          break;
      }

      console.log('✅ Redireccion completada');

      // 🔔 Paso 6: Obtener token FCM y enviar notificacion
      try {
        const tokenFCM = await this.firebaseService.obtenerToken();
        if (tokenFCM) {
          const notificacion = {
            id_usuario: userData.id_usuario,
            token: tokenFCM,
            titulo: 'Has iniciado sesion',
            cuerpo: 'Buen entrenamiento 💪 No olvides explorar todas las funcionalidades',
            tipo: 'inicio_sesion'
          };

          await this.apiService.post('notificaciones/enviar', notificacion);
          console.log('✅ Notificacion enviada correctamente');
        } else {
          console.warn('⚠️ No se pudo obtener el token FCM');
        }
      } catch (err) {
        console.error('❌ Error al obtener token FCM o enviar notificacion:', err);
      }

    } catch (error) {
      console.error('❌ Error en el login:', error);
      alert('Correo o contrasena incorrectos o el usuario ha sido eliminado.');
    }
  }
}
