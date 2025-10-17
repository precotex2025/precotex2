import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tx_Visor_Permanencia_Tela_Cruda } from 'src/app/models/Tx_Visor_Permanencia_Tela_Cruda';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisorPermanenciaTelaCrudaService {

  Url: string = environment.url_UbiAlm;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getPermanenciaTelaCruda(anio: number): Observable<Tx_Visor_Permanencia_Tela_Cruda[]>{
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('anio', anio);

    return this.http.get<Tx_Visor_Permanencia_Tela_Cruda[]>(this.Url + 'TmpVisorPermanenciaTelaCruda/getPermanenciaTelaCruda', { headers, params })
  }
}
