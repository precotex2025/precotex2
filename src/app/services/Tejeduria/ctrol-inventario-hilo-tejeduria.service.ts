import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CtrolInventarioHiloTejeduriaService {

  Url: string = environment.url_UbiAlm;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });  

  constructor(private http: HttpClient) { }

  getObtenerCtrolInventarioHiloTejeduriaByLote(Lote: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('Lote', Lote);
    return this.http.get(this.Url + 'TxCtrolInventarioHiloTejeduria/getObtenerCtrolInventarioHiloTejeduriaByLote', { headers, params })
  }

  postCrudCtrolInventarioHiloTejeduria(data: any){
    const headers = this.Header;
    return this.http.post(this.Url +  'TxCtrolInventarioHiloTejeduria/postCrudCtrolInventarioHiloTejeduria', data, { headers })
  }  

}
