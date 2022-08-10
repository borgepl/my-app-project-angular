import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
  })
  
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string =  null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm : NgForm) {

        // console.log(authForm);
        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            
            // Login Mode

            authObs = this.authService.login(email, password);

        } else {

            // SignUp Mode

            authObs = this.authService.signUp(email,password);

           
            // this.authService.signUp(email, password).subscribe(
            //     respData => {
            //     console.log(respData);
            //     this.isLoading = false;
            // }, errorRes => {
            //     console.log(errorRes)
            //     /* switch (errorRes.error.error.message) {
            //         case 'EMAIL_EXISTS':
            //             this.error = 'This email address already exists!';
            //     } */
            //     this.error = errorRes;
            //     this.isLoading = false;
            // });
        }
       
        authObs.subscribe({
            next: (respData) => {
                console.log(respData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorRes) => {
                console.log(errorRes);
                this.error = errorRes;
                this.isLoading = false;
            }
        });

        authForm.reset();
    }
}