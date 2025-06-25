import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})


export class ResetPasswordPage {
  form: FormGroup;
  mensaje = '';
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async solicitarReset() {
    if (this.form.invalid) return;

    this.mensaje = '';
    this.error = '';
    this.loading = true;

    try {
      await this.authService.resetPassword(this.form.value.email);
      this.mensaje = 'Te enviamos un correo para restablecer tu contraseña.';
    } catch (err: any) {
      this.error = err.message || 'Ocurrió un error al enviar el correo.';
    }

    this.loading = false;
  }
}
