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

  // 🧠 Reemplaza este ID con el real del usuario logueado si lo tienes
  idCliente: number = 33;

  constructor(private http: HttpClient) {}

  // 📸 Carga la imagen seleccionada
  cargarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  // 💾 Envía peso + imagen al backend
  guardarProgreso() {
    if (!this.imagen || !this.peso) {
      alert('⚠️ Debes ingresar el peso y seleccionar una foto.');
      return;
    }

    this.cargando = true;

    const formData = new FormData();
    formData.append('id_cliente', this.idCliente.toString());
    formData.append('peso', this.peso.toString());
    formData.append('imagen', this.imagen);

    // 🌐 Cambia la URL si ya estás usando el backend en Render
    this.http.post('https://app-box-gesb.onrender.com/api/subir-foto-progreso', formData)
      .subscribe({
        next: (res: any) => {
          alert('✅ Progreso registrado con éxito');
          this.peso = 0;
          this.imagen = null;
          this.cargando = false;
        },
        error: (err) => {
          console.error('❌ Error registrando progreso:', err);
          alert('❌ Error al registrar progreso');
          this.cargando = false;
        }
      });
  }
}
