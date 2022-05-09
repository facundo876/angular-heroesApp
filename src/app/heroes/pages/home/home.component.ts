import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interfaces';

import { AuthService } from '../../../auth/services/auth.service';

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
export class HomeComponent {


  get auth(){
    return this.authService.Auth;
  }

  constructor( private router:Router,
               private authService: AuthService ) { }


  logout(){
    this.authService.logout();
    this.router.navigate(['./auth'])
  }

}
