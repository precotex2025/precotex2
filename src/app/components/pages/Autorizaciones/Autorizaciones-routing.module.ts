import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//routing nuevos componentes


export const routes: Routes = [
  {
    // path: '',
    // component: ActivosFijosComponent,
    // children: [
    //   {
    //     path: 'ControlActivosFijo',
    //     component: ControlActivosComponent, // <---
    //   },
    // ,
      

      
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivosFijosRoutingModule { }
