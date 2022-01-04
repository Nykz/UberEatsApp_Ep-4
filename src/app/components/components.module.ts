import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { IonicModule } from '@ionic/angular';

export const components = [
  RestaurantComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: components
})
export class ComponentsModule { }
