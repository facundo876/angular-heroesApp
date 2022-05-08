import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Heroes } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroes) { }

  ngOnInit(): void {
  }

  borrar(){

    this,this.dialogRef.close(true);
  }

  cerrar(){
    
    this.dialogRef.close();
  }

}
