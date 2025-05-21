import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async realizarAccion() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
      spinner: 'circles',
      cssClass: 'custom-loader',
      backdropDismiss: false
    });
    await loading.present();

    // Simula una acción
    setTimeout(async () => {
      await loading.dismiss();

      const alert = await this.alertCtrl.create({
        header: '✅ Acción Exitosa',
        message: 'Inicio de sesion correcto...',
        buttons: ['Aceptar'],
        cssClass: 'custom-alert'
      });

      await alert.present();
    }, 2000);
  }
}
