import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroes } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 100%;
    }
  
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroes;

  constructor( private activateRoute: ActivatedRoute,
               private heroeServices: HeroesService,
               private router: Router ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe( 
        switchMap( ({ id }) => this.heroeServices.getHeroePorId( id ) ),
      )
      .subscribe( heroe => {
          setTimeout(()=>{ this.heroe = heroe }, 1000)
        } );

  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
