import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorActivosService {

  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  
  getColorActivo() {
    const headers = this.Header;
    return this.http.get(this.Url + 'ColorActivo', { headers });
  }

  saveColorActivo(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'ColorActivo', data, { headers });
  }

  updateColorActivo(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'ColorActivo/' + id, data, { headers });
  }

  deleteColorActivo(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'ColorActivo/' + id, { headers });
  }

}