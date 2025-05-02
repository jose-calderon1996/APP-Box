import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-progreso',
  templateUrl: './registrar-progreso.page.html',
  styleUrls: ['./registrar-progreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class RegistrarProgresoPage {

  peso: number = 0;
  imagen: File | null = null;
  cargando: boolean = false;
  idCliente: number = 33; // Reemplazar con el ID real del usuario logueado

  constructor(private http: HttpClient) {}

  cargarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  guardarProgreso() {
    if (!this.imagen || !this.peso) {
      alert('Debes ingresar el peso y seleccionar una foto.');
      return;
    }

    this.cargando = true;

    const formData = new FormData();
    formData.append('id_cliente', this.idCliente.toString());
    formData.append('peso', this.peso.toString());
    formData.append('imagen', this.imagen);

    this.http.post('http://localhost:3000/api/subir-foto-progreso', formData)
      .subscribe({
        next: (res: any) => {
          alert('✅ Progreso registrado con éxito');
          this.peso = 0;
          this.imagen = null;
          this.cargando = false;
        },
        error: (err) => {
          console.error('❌ Error registrando progreso:', err);
          alert('Error al registrar progreso');
          this.cargando = false;
        }
      });
  }
}
