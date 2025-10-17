import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {
  
  Url: string = environment.url;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  
  getCentrosCosto() {
    const headers = this.Header;
    return this.http.get(this.Url + 'CentrosCosto', { headers });
  }

  saveCentroCosto(data: any) {
    const headers = this.Header;
    return this.http.post(this.Url + 'CentrosCosto', data, { headers });
  }

  updateCentroCosto(id: number, data: any) {
    const headers = this.Header;
    return this.http.put(this.Url + 'CentrosCosto/' + id, data, { headers });
  }

  deleteCentrosCosto(id: number) {
    const headers = this.Header;
    return this.http.delete(this.Url + 'CentrosCosto/' + id, { headers });
  }
}
