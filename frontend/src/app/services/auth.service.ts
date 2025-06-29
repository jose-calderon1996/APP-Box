import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://app-box-v10.onrender.com/api';



  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  registrarConCorreo(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  iniciarSesion(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    const id_usuario = localStorage.getItem('id_usuario');

    if (id_usuario) {
      this.http.post(`${this.baseUrl}/log-acceso/registrar-logout`, { id_usuario })
        .subscribe(
          () => console.log('✅ Logout registrado'),
          (err) => console.error('❌ Error registrando logout:', err)
        );
    }

    return this.afAuth.signOut();
  }

  //  Método para obtener el usuario actual desde localStorage
  getUsuarioActual() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
  getIdUsuarioActual(): number | null {
    const usuario = this.getUsuarioActual();
    return usuario?.id_usuario ?? null;
  }
  resetPassword(email: string) {
  return this.afAuth.sendPasswordResetEmail(email);
}

}
