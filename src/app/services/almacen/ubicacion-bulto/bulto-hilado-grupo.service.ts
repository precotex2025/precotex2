import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BultoHiladoGrupoService {

  Url: string = environment.url_UbiAlm;

  Header = new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getProveedores(){
    const headers = this.Header;
    return this.http.get(this.Url + 'TxBultoHilado/getProveedores', { headers })
  }

  getBultoUbicacion(sCodProveedor?:string, sCodOrdProv?:string, sNumSemana?:string, sNomConera?:string) {
    const headers = this.Header;
    let params = new HttpParams();

    if (sCodProveedor) {
      params = params.append('sCodProveedor', sCodProveedor);
    }

    if (sCodOrdProv) {
      params = params.append('sCodOrdProv', sCodOrdProv);
    }

    if (sNumSemana) {
      params = params.append('sNumSemana', sNumSemana);
    }

    if (sNomConera) {
      params = params.append('sNomConera', sNomConera);
    }

      return this.http.get(this.Url + 'TxBultoHilado/getBultoUbicacion', { headers, params })
  }

  getListaGrupos(fechaCreacion? : Date, Grupo?: string){
    const headers = this.Header;
    const fechaActual = new Date();
    let params = new HttpParams();

    if (!moment(fechaCreacion).isValid()) {
      params = params.append('FecCrea', moment(fechaActual).format('YYYY-MM-DD'));
    }else{
      params = params.append('FecCrea', moment(fechaCreacion).format('YYYY-MM-DD'));
    }

    params = params.append('Grupo', Grupo!);
    console.log(Grupo!);
    

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGrupos', { headers, params })
  }

  getListaGruposDet(grupo: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('Grupo', grupo);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGruposDet', { headers, params })
  }

  getListaGruposById(IdBultoHiladoGrupo: number){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('IdBultoHiladoGrupo', IdBultoHiladoGrupo);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGruposById', { headers, params })
  }

  postInsertar(data: any){
    console.log(data);
    const headers = this.Header;
    return this.http.post(this.Url + 'TxBultoHiladoGrupo/postGenerarGrupo', data, { headers })
  }

  getValidarGrupo(Grupo: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('Grupo', Grupo);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getValidarGrupo', { headers, params })
  }

  getListaGruposByCode(Grupo: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('Grupo', Grupo);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGruposByCode', { headers, params })
  }

  getListaGruposDetById(IdBultoHiladoGrupo: number){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('IdBultoHiladoGrupo', IdBultoHiladoGrupo);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGruposDetById', { headers, params })
  }

  getListaGruposByCodUbicacion(CodUbicacion: string){
    const headers = this.Header;
    let params = new HttpParams();
    params = params.append('CodUbicacion', CodUbicacion);

    return this.http.get(this.Url + 'TxBultoHiladoGrupo/getListaGruposByCodUbicacion', { headers, params })    
  }

  postUbicarReubicarGrupo(data: any){
    const headers = this.Header;
    return this.http.post(this.Url + 'TxBultoHiladoGrupo/postUbicarReubicarGrupo', data, { headers })
  }

}
