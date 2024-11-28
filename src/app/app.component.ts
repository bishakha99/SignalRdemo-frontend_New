
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrService } from './signalr.service';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from './auth/auth-service.service';


@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone :true,
  imports:[RouterModule],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor( 
    public signalrService: SignalrService,
    public authService: AuthServiceService //3Tutorial
    
  ) 
  {}


  ngOnInit() {
    this.signalrService.startConnection();


  }

  
  ngOnDestroy() {
    this.signalrService.hubConnection.off("askServerResponse");
  }

}