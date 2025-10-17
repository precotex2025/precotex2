import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasActivosService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  
  getCategoriasActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'CategoriasActivo', { headers });
  }

  saveCategoriasActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'CategoriasActivo', data, { headers });
  }

  updateCategoriasActivo(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'CategoriasActivo/' + id, data, { headers });
  }

  deleteCategoriasActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'CategoriasActivo/' + id, { headers });
  }
}
