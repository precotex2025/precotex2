import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './components/login/login.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate :  [LoginGuard],
    loadChildren: () => import('./components/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/login/login.module')
    .then(m => m.LoginModule),
  },
  { path: '', redirectTo: 'pages/principal', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/principal' },

];

const config: ExtraOptions = {
  useHash: true,
};


@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
