import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

declare var OneSignal: any; // 👈 Para poder usar OneSignal sin error de tipo

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
    private router: Router
  ) {}

  async login() {
    this.correo = this.correo.trim().toLowerCase();

    if (!this.correo || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      console.log('📨 Iniciando sesión con:', this.correo);

      // 🔐 Paso 1: Login con Firebase
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

      // 📲 Paso 4: Obtener el player_id de OneSignal
      let playerId = null;
      await OneSignal.getDeviceState((state: any) => {
        playerId = state.userId;
        console.log('📲 Player ID obtenido:', playerId);
      });

      // 🔔 Paso 5: Enviar notificación desde el backend
      if (playerId) {
        await this.apiService.post('notificaciones', {
          titulo: 'Inicio de sesión exitoso',
          mensaje: `Hola ${userData.nombre}, ¡bienvenido de nuevo!`,
          playerIds: [playerId]
        });
        console.log('✅ Notificación enviada desde login');
      } else {
        console.warn('⚠️ No se obtuvo playerId, no se envió notificación');
      }

      // 📝 Paso 6: Registrar log de acceso
      this.apiService.post('log-acceso/registrar', {
        id_usuario: userData.id_usuario
      }).then(() => {
        console.log('📝 Log de acceso registrado');
      }).catch((err) => {
        console.error('❌ Error registrando log de acceso:', err);
      });

      // 🚀 Paso 7: Redirección por tipo de usuario
      switch (userData.tipo_usuario) {
        case 'cliente':
          await this.router.navigate(['/panel-cliente']);
          break;
        case 'entrenador':
          await this.router.navigate(['/panel-entrenador']);
          break;
        case 'dueño':
          await this.router.navigate(['/panel-dueno']);
          break;
        default:
          await this.router.navigate(['/login']);
          break;
      }

    } catch (error) {
      console.error('❌ Error en el login:', error);
      alert('Correo o contraseña incorrectos o el usuario ha sido eliminado.');
    }
  }
}
