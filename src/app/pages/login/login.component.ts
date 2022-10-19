import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AutenticacionService,
              private router: Router  ) { }
  
  usuario: UsuarioModel;
  recordarme: boolean;

  ngOnInit() {
    
    this.usuario = new UsuarioModel();
    
    if ( localStorage.getItem('usuario' )) {
      this.usuario.usuario = localStorage.getItem('usuario');
      this.recordarme = true;
    }

  }

  onSubmit( form: NgForm) {

    if (form.invalid ) { return ; }

    if ( this.recordarme ) {
      localStorage.setItem('usuario', this.usuario.usuario);

    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.loginUsuario(this.usuario)
     .subscribe( resp=> {
        
        if (resp['respuesta'] == "OK") {
            Swal.close();
            this.router.navigateByUrl('/home');
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
