import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AutenticacionService } from '../../services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AutenticacionService,
    private router: Router ) { }

  ngOnInit() {

      this.usuario = new UsuarioModel();
      
   }

   onSubmit( form: NgForm) {

    if (form.invalid ) { return ; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


     this.auth.nuevoUsuario(this.usuario)
     .subscribe( resp=> {

      if (resp['respuesta'] == "OK") {
          Swal.close();
          
          Swal.fire({
            icon: 'info',
            title: 'Usuario',
            text: resp['mensaje']
          });

          this.router.navigateByUrl('/login');
      } else {
                    
          Swal.fire({
            icon: 'error',
            title: 'No es posible ingresar',
            text: resp['mensaje']
          });
      }
    });

   }
}
