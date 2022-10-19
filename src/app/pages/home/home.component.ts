import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private auth: AutenticacionService,
               private route: Router) { }

  ngOnInit() {
  }

  salir () {
    this.auth.loggOut();
    this.route.navigateByUrl('/login');
    
  }
}
