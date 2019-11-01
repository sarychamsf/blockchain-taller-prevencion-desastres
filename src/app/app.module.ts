import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarRegistroComponent } from './agregar-registro/agregar-registro.component';
import {APP_BASE_HREF} from '@angular/common';
import {MetaModule} from './meta/meta.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule,MetaModule ],
  declarations: [ AppComponent, HelloComponent, InicioComponent, AgregarRegistroComponent],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class AppModule { }

