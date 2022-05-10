import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   if(this.AuthService.Auth.id){
    //     return true;
    //   }

    //   console.log("No puede entrar CanActivate")

    // return false;

    return this.authService.verificarAutentificacion()
            .pipe(
              tap( estaAutentificado =>{
                if( !estaAutentificado ){
                  this.router.navigate(['./auth/login']);
                }
              } )
            );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   if(this.AuthService.Auth.id){
    //     return true;
    //   }

    //   console.log("No puede entrar CanLoad")

    // return false;

    return this.authService.verificarAutentificacion()
            .pipe(
              tap( estaAutentificado =>{
                if( !estaAutentificado ){
                  this.router.navigate(['./auth/login']);
                  
                }
              } )
            );
  }
}
