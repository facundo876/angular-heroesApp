import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class HeroeImagenPipe implements PipeTransform {

  transform(value: Heroes): string {

    
    return `assets/heroes/${ value.id }.jpg`;
  }

}
