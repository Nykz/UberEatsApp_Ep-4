import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant;

  constructor() { }

  ngOnInit() {}

  getCuisines(data) {
    return data.join(', ');
  }

}
