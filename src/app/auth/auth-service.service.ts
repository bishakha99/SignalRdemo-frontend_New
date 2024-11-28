import { Injectable } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { Router } from '@angular/router';
import { HubConnectionState } from '@microsoft/signalr';
import { log } from 'console';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    public signalrService: SignalrService,
    public router: Router
  ) 
  {
      // //3Tutorial
      // let tempPersonId = localStorage.getItem("personId");
      // if (tempPersonId) {
      //   if (this.signalrService.hubConnection?.state === HubConnectionState.Connected){
      //       this.reauthMeListener();
      //       this.reauthMe(tempPersonId);
      //     }
      //     else {
      //       this.signalrService.ssObs().subscribe((obj: any) => {
      //           if (obj.type == "HubConnStarted") {
      //             this.reauthMeListener();
      //             this.reauthMe(tempPersonId);
      //           }
      //       });
      //     }
      // }
      if (this.isBrowser()) {
        let tempPersonId = window.localStorage.getItem("personId");
       
       
        
        if (tempPersonId) {
          if (this.signalrService.hubConnection?.state === HubConnectionState.Connected) {
            this.reauthMeListener();
            this.reauthMe(tempPersonId);
            console.log("personId",tempPersonId);
          } else {
            this.signalrService.ssObs().subscribe((obj: any) => {
              if (obj.type == "HubConnStarted") {
                this.reauthMeListener();
                this.reauthMe(tempPersonId);
              }
            });
          }
        }
      }
    }
  
    public isAuthenticated: boolean = false;
  
    // Check if we're in the browser environment
    private isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    }
  

  //2Tutorial  
  async authMe(person: string, pass: string) {
    let personInfo = {userName: person, password: pass};

    await this.signalrService.hubConnection.invoke("authMe", personInfo)
    .then(() => this.signalrService.toastr.info("Loging in attempt..."))
    .catch(err => console.error(err));
}


//3Tutorial
authMeListenerSuccess() {
    this.signalrService.hubConnection.on("authMeResponseSuccess", (personId: string, personName: string) => {
        console.log(personId);
        console.log(personName);

        localStorage.setItem("personId", personId);
        this.signalrService.personName = personName;
        this.isAuthenticated = true;
        this.signalrService.toastr.success("Login successful!");
        this.signalrService.router.navigateByUrl("/home");
    });
}

//2Tutorial
authMeListenerFail() {
    this.signalrService.hubConnection.on("authMeResponseFail", () => {
        this.signalrService.toastr.error("Wrong credentials!");
    });
}    


//3Tutorial
async reauthMe(personId: string) {    
    await this.signalrService.hubConnection.invoke("reauthMe", personId)
    .then(() => this.signalrService.toastr.info("Loging in attempt..."))
    .catch(err => console.error(err));
}




//3Tutorial
reauthMeListener() {
    this.signalrService.hubConnection.on("reauthMeResponse", (personId: string, personName: string) => {
        console.log(personId);
        console.log(personName);

        this.signalrService.personName = personName;
        this.isAuthenticated = true;
        this.signalrService.toastr.success("Re-authenticated!");
        if (this.signalrService.router.url == "/auth") this.signalrService.router.navigateByUrl("/home");
    });
}

}
