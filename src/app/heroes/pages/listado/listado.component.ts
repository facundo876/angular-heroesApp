import { Component, OnInit } from '@angular/core';

import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  
  heroes:Heroes[] = []

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
    .subscribe(res => {
      this.heroes = res
    });
  }

}
