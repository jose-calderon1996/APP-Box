import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

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
      alert('⚠️ Por favor, completa todos los campos.');
      return;
    }
    // 🔁 Redirección a la ruta genérica, el guard decidirá dónde enviarlo
    await this.router.navigate(['/redirect']);

    try {
      console.log('📨 Iniciando sesión con:', this.correo);

      // 🔐 Iniciar sesión con Firebase
      const userCredential = await this.authService.iniciarSesion(this.correo, this.password);
      const uid = userCredential.user?.uid;

      // 🔎 Obtener datos del usuario desde MySQL por UID
      const userData = await this.apiService.get(`usuarios/uid/${uid}`);
      console.log('🧠 userData recibido:', userData);

      // 💾 Guardar todo el usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(userData));

      // 📝 Registrar log de acceso en MySQL
      await this.apiService.post('log-acceso/registrar', {
        id_usuario: userData.id_usuario
      });

      

    } catch (error) {
      console.error('❌ Error en el login:', error);
      alert('❌ Correo o contraseña incorrectos.');
    }
  }
}
