import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  link_UbicacionBultoConsulta(){
    this.router.navigate(['pages/almacen/UbicacionBultoConsulta']);
  }

  link_GeneraGrupos(){
    this.router.navigate(['pages/almacen/GeneracionGrupoConsulta']);
  }

  link_UbicaReubicaGrupo() {
    this.router.navigate(['pages/almacen/UbicaReubicaGrupo']);
  }

}
