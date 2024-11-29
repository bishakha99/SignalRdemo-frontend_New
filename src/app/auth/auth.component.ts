import { SignalrService } from './../signalr.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule
 
],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

//Added in tutorial 2
export class AuthComponent implements OnInit, OnDestroy {
  
  constructor(
    public signalrService: SignalrService,
    public authService: AuthServiceService //3Tutorial
  ) { }

  ngOnInit(): void {
    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("authMeResponseSuccess");
    this.signalrService.hubConnection.off("authMeResponseFail");
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.authService.authMe(form.value.userName, form.value.password);
    form.reset();
  }


  // async authMe(user: string, pass: string) {
  //   let personInfo = {userName: user, password: pass};

  //   await this.signalrService.hubConnection.invoke("authMe", personInfo)
  //   .finally(() => {
  //     this.signalrService.toastr.info("Loging in attempt...")
  //   })
  //   .catch(err => console.error(err));
  // }

//   async authMe(user: string, pass: string) {
//     let personInfo = { userName: user, password: pass };

//     console.log("Sending to server:", personInfo);  // Log the object you're sending to the server

//     await this.signalrService.hubConnection.invoke("authMe", personInfo)
//         .finally(() => {
//             this.signalrService.toastr.info("Logging in attempt...");
//         })
//         .catch(err => {
//             console.error("Error invoking authMe:", err);  // More detailed error logging
//         });
// }


  // private authMeListenerSuccess() {
  //   this.signalrService.hubConnection.on("authMeResponseSuccess", (personInfo: any) => {
      
  //       this.signalrService.personName = personInfo.name;
  //       this.signalrService.toastr.success("Login successful!");
  //       this.signalrService.router.navigateByUrl("/home");
  //   });
  // }


  // private authMeListenerFail() {
  //   this.signalrService.hubConnection.on("authMeResponseFail", () => {
  //   this.signalrService.toastr.error("Wrong credentials!");
  //   });
  // }


}