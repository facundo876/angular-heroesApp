import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})

export class BuscarComponent implements OnInit {

  heroes: Heroes[] = [];
  termino:string = '';
  heroeSeleccionado!: Heroes | undefined;
  
  constructor( private heroesServices: HeroesService ) { }

  ngOnInit() {

  }

  buscando(){

    this.heroesServices.getSugerencias( this.termino.trim() )
      .subscribe( heroes => {
        this.heroes = heroes
        //this.heroes = this._filter(this.termino, heroes) 
      } );
  }

  private _filter(value: string, heroes: Heroes[]): Heroes[] {
    const filterValue = value.toLowerCase();

    return heroes.filter( ({ superhero }) => superhero.toLowerCase().includes(filterValue));
  }

  opcionSeleccionada( event: MatAutocompleteActivatedEvent ){ 

    if(!event.option?.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe : Heroes = event.option?.value;
    this.termino = heroe.superhero;

    this.heroesServices.getHeroePorId( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe)
  }

}
