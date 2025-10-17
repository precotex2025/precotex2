import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  Url: string = environment.url_UbiAlm;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getListaUbicacionByCode(Cod_Ubicacion: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('Cod_Ubicacion', Cod_Ubicacion);

    return this.http.get(this.Url + 'TxUbicacion/getListaUbicacionByCode', { headers, params })
  }

}
