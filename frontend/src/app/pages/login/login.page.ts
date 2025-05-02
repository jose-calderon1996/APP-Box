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
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      console.log('📨 Iniciando sesión con:', this.correo);

      const userCredential = await this.authService.iniciarSesion(this.correo, this.password);
      const uid = userCredential.user?.uid;

      const userData = await this.apiService.get(`usuarios/uid/${uid}`);
      console.log('🧠 userData recibido:', userData);

      // Guardar datos en localStorage
      localStorage.setItem('id_usuario', userData.id_usuario);
      localStorage.setItem('tipo_usuario', userData.tipo_usuario);
      localStorage.setItem('nombre', userData.nombre);
      localStorage.setItem('correo', userData.correo);

      await this.router.navigate(['/redirect']);

      


      // Registrar log de acceso
      await this.apiService.post('log-acceso/registrar', {
        id_usuario: userData.id_usuario
      });

      

      // Redirección genérica, el guard se encarga del acceso
      

    } catch (error) {
      console.error('❌ Error en el login:', error);
      alert('Correo o contraseña incorrectos.');
    }
  }
}
