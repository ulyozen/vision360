import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    HeaderModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class CoreModule {
}
