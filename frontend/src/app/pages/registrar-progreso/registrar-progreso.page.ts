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
  imagenPreview: string | null = null;
  cargando: boolean = false;
  idCliente: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const id = localStorage.getItem('id_usuario');
    if (id) {
      this.idCliente = parseInt(id);
    } else {
      alert('❌ No se encontró el ID del usuario logueado.');
    }
  }

  cargarImagen(event: any) {
    this.imagen = event.target.files[0];

    if (this.imagen) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagen);
    }
  }

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

    this.http.post('https://app-box-gesb.onrender.com/api/subir-foto-progreso', formData)
      .subscribe({
        next: () => {
          alert('✅ Progreso registrado con éxito');
          this.peso = 0;
          this.imagen = null;
          this.imagenPreview = null;
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
