import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 🌐 Dirección base del backend en Render
  private URL = 'https://app-box-gesb.onrender.com/api';

  constructor(private http: HttpClient) {}

  // 📤 Enviar datos por POST (JSON)
  async post(endpoint: string, data: any): Promise<any> {
    return await firstValueFrom(this.http.post(`${this.URL}/${endpoint}`, data));
  }

  // 📥 Obtener datos por GET
  async get(endpoint: string): Promise<any> {
    return await firstValueFrom(this.http.get(`${this.URL}/${endpoint}`));
  }

  // 🧩 Obtener datos con parámetros dinámicos (ej: /usuarios/5)
  async getWithParams(endpoint: string, params: any): Promise<any> {
    return await firstValueFrom(this.http.get(`${this.URL}/${endpoint}`, { params }));
  }

  // 🧨 Eliminar datos (DELETE)
  async delete(endpoint: string): Promise<any> {
    return await firstValueFrom(this.http.delete(`${this.URL}/${endpoint}`));
  }

  // 🔁 Actualizar datos (PUT)
  async put(endpoint: string, data: any): Promise<any> {
    return await firstValueFrom(this.http.put(`${this.URL}/${endpoint}`, data));
  }

  // 📦 Enviar archivos y otros datos con FormData
  async postFormData(endpoint: string, formData: FormData): Promise<any> {
    const response = await fetch(`${this.URL}/${endpoint}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al enviar formulario');
    }

    return await response.json();
  }
}
