import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }
  `
  ]
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {


  }

}
