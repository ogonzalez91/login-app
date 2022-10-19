import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private token: string;
  private url: 'http://localhost:7080/';

  // crear nuevos usuarios
  //http://localhost:7080/rest/api/1.0/usuario/gestionar


  // LOGIN
  // http://localhost:7080/rest/api/1.0/usuario/login

  loggOut() {

      localStorage.removeItem('token');
  }

  nuevoUsuario( usuario: UsuarioModel ){

    const authData = {
      usuario: usuario.usuario,
      password: usuario.password,
      idTipoUsuario: 1,
      usuarioCreacion: "ogonzalez",
      tipoOperacion: "C"
    };

    console.log(authData);
    return this.http.post(
      `http://localhost:7080/rest/api/1.0/usuario/gestionar`,
      authData
    );

  }

  loginUsuario( usuario: UsuarioModel ){

    const authData = {
      usuario: usuario.usuario,
      password: usuario.password
    };

    console.log(authData);
    return this.http.post(
      `http://localhost:7080/rest/api/1.0/usuario/login`,
      authData
    ).pipe(
      map( resp => {
          
          this.guardarToken( resp['infoAdicional'].token );
          return resp;
      })
    );

  }

  private guardarToken ( token: string ){
    
    this.token = token;
    localStorage.setItem('token', token);

  }

  leerToken() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

    return this.token;
  }

  estaAutenticado(): boolean {
    return this.token.length > 2;
  }


  constructor( private http: HttpClient ) { 
    this.leerToken();
  }
  
}
