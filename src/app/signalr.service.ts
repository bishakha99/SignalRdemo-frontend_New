import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';

//4Tutorial
export class User {
  public id!: string;
  public name!: string;
  public connId!: string;//signalr
  public msgs!: Array<Message>;//5Tutorial (only client-side property)
}
//5Tutorial
export class Message {
  constructor(
    public content: string,
    public mine: boolean
  ) {}
}
@Injectable({ providedIn: 'root' })
export class SignalrService {
    constructor(
           public toastr: ToastrService,
        public router: Router //2Tutorial
        ) { }

    hubConnection!:signalR.HubConnection;
    //Added in tutorial 2
    personName!: string;
    userData!: User;
  //3Tutorial
  
  ssSubj = new Subject<any>();
  ssObs(): Observable<any> {
      return this.ssSubj.asObservable();
  }
    startConnection = () => {
      
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7069/toastr', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    
        this.hubConnection
        .start()
        .then(() => {
          this.ssSubj.next({type: "HubConnStarted"});
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }
}