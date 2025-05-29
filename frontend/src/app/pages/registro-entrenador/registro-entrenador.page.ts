import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-entrenador',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './registro-entrenador.page.html',
  styleUrls: ['./registro-entrenador.page.scss']  
})
export class RegistroEntrenadorPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async registrarEntrenador() {
    try {
      const cred = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = cred.user?.uid;

      await this.apiService.post('usuarios', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        tipo_usuario: 'entrenador'
      });

      this.router.navigate(['/panel-dueno']);
    } catch (error) {
      console.error(' Error registrando entrenador:', error);
    }
  }
}
