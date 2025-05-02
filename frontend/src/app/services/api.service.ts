import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'https://app-box-gesb.onrender.com/api';


  constructor(private http: HttpClient) {}

  // Enviar datos por POST
  async post(endpoint: string, data: any): Promise<any> {
    return await firstValueFrom(this.http.post(this.URL + endpoint, data));
  }

  // Obtener datos por GET
  async get(endpoint: string): Promise<any> {
    return await firstValueFrom(this.http.get(this.URL + endpoint));
  }
}
