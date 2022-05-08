import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroes, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { of } from 'rxjs';

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

  constructor(private heroesServices: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesServices.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //Actualizar
      this.heroesServices.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.openSnackBar('Registro actualizado', 'ok!'));
    }
    else {
      //Agregar
      this.heroesServices.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.openSnackBar('Registro agregado', 'ok!')
          this.router.navigate(['/heroes/editar', heroe.id])
        });
    }
  }

  borrar() {

    const dialogRef = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    dialogRef.afterClosed().subscribe(
      (resul) => { 
        
        if(resul){
          
          this.heroesServices.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['heroes'])
            });
        }
       }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

