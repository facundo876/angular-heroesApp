import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroes } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card{
      margin-top: 20px;
    }
  `]
})
export class HeroeTarjetaComponent implements OnInit {


  @Input() heroe!: Heroes;

  constructor(  ) { }

  ngOnInit(): void {
    
  }

}
