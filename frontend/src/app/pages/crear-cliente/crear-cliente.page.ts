import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage {
  nombre = '';
  correo = '';
  password = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  //  Función completa para registrar cliente y asociarlo
  async registrarCliente() {
    try {
      // 1. Crear usuario en Firebase
      const cred = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = cred.user?.uid;

      // 2. Obtener ID del entrenador desde localStorage
      const idEntrenador = localStorage.getItem('id_usuario');

      if (!uid || !idEntrenador) {
        alert(' Faltan datos para registrar al cliente');
        return;
      }

      // 3. Registrar cliente y asociarlo automáticamente en MySQL
      const respuesta = await this.apiService.post('usuarios/registrar-cliente', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        id_entrenador: idEntrenador
      });

      alert(' Cliente registrado y asociado correctamente');
      this.router.navigate(['/panel-entrenador']);
    } catch (error) {
      console.error(' Error registrando cliente:', error);
      alert('Error al registrar cliente');
    }
  }
}
