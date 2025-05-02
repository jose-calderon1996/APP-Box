import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/'; // Dirección de tu backend

  constructor(private http: HttpClient) {}

  // Enviar datos por POST
  async post(endpoint: string, data: any): Promise<any> {
    return await firstValueFrom(this.http.post(this.apiUrl + endpoint, data));
  }

  // Obtener datos por GET
  async get(endpoint: string): Promise<any> {
    return await firstValueFrom(this.http.get(this.apiUrl + endpoint));
  }
}
