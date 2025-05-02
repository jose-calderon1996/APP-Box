import { Component, ViewEncapsulation } from '@angular/core';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-dueno',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './registro-dueno.page.html',
  styleUrls: ['./registro-dueno.page.scss'], // ✅ aseguramos que el SCSS se aplique
  encapsulation: ViewEncapsulation.None      // ✅ ¡esto hace que tu CSS funcione!
})
export class RegistroDuenoPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  nombreBox: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController // ✅ Agregado para redirigir correctamente
  ) {}

  async registrarDueno() {
    try {
      // 🔹 1. Crear usuario en Firebase
      const userCredential = await this.authService.registrarConCorreo(this.correo, this.password);
      const uid = userCredential.user?.uid;

      // 🔹 2. Guardar en tabla usuarios
      const resUsuario = await this.apiService.post('usuarios', {
        uid_firebase: uid,
        nombre: this.nombre,
        correo: this.correo,
        tipo_usuario: 'dueño'
      });
       // 🚀 Redirigir con NavController
       this.navCtrl.navigateRoot('/bienvenida'); 
       // ✅ Mostrar Toast de éxito
      const toast = await this.toastController.create({
        message: 'Usuario dueño creado, ahora puedes administrar tu propio box',
        duration: 2500,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
      await toast.onDidDismiss(); // Esperar que desaparezca

      const id_usuario = resUsuario.id_usuario;
      console.log('✅ ID recibido del usuario:', id_usuario);

      // 🔹 3. Guardar en tabla duenos_box
      try {
        console.log('➡️ Enviando a duenos-box...');
        const resDueno = await this.apiService.post('duenos-box', {
          id_usuario: id_usuario,
          nombre_box: this.nombreBox
        });
        console.log('📦 Dueño guardado:', resDueno);
      } catch (error: any) {
        console.error('❌ Error guardando en duenos-box:', error);
        await this.presentToast('Error al guardar en duenos-box.', 'danger');
        return;
      }
     

      

      // 🔄 Limpiar formulario
      this.nombre = '';
      this.correo = '';
      this.password = '';
      this.nombreBox = '';

      

    } catch (error: any) {
      console.error('❌ Error en el registro del dueño:', error);
      console.log('📛 Detalle completo del error:', JSON.stringify(error));

      if (error.code === 'auth/email-already-in-use') {
        await this.presentToast('Este correo ya está registrado. Intenta con otro.', 'danger');
      } else {
        await this.presentToast('Ocurrió un error en el registro.', 'danger');
      }
    }
  }

  // ✅ Método auxiliar para errores u otros mensajes
  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
