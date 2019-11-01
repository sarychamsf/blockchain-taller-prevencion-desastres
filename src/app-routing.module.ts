import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarRegistroComponent} from './app/agregar-registro/agregar-registro.component';
import { InicioComponent } from './app/inicio/inicio.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'agregar-registro', component: AgregarRegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }