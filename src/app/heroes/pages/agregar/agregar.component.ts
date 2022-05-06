import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }

  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroes = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor( private heroesServices: HeroesService,
               private activateRoute: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {

    if( !this.router.url.includes( 'editar' ) ){
      return;
    }

    this.activateRoute.params
      .pipe( 
        switchMap( ({ id }) => this.heroesServices.getHeroePorId( id ))
       )
      .subscribe( heroe =>  this.heroe = heroe );
  }

  guardar(){

    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if( this.heroe.id ){
      //Actualizar
      this.heroesServices.actualizarHeroe( this.heroe )
        .subscribe( heroe => console.log( 'Actualizado', heroe ) );
    }
    else{
      //Agregar
          this.heroesServices.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      });
    }
  }

  borrar(){
    this.heroesServices.borrarHeroe( this.heroe.id! )
      .subscribe( resp => {
        this.router.navigate(['heroes'])
      });
  }
}
