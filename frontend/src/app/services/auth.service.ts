import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // Ruta base a tu backend

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
      // Registrar el logout en MySQL antes de cerrar sesión en Firebase
      this.http.post(`${this.baseUrl}/log-acceso/registrar-logout`, { id_usuario })
        .subscribe(
          () => console.log('✅ Logout registrado'),
          (err) => console.error('❌ Error registrando logout:', err)
        );
    }

    // Cerrar sesión en Firebase
    return this.afAuth.signOut();
  }
}
