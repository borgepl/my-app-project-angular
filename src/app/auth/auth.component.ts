import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../components/shared/alert/alert.component";
import { PlaceholderDirective } from "../components/shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
  })
  
export class AuthComponent implements OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string =  null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private subscription: Subscription;

    constructor(private authService: AuthService, private router: Router,
                private componentFactoryResolver : ComponentFactoryResolver) {}

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }  
    }

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
                this.showErrorAlert(errorRes);
                this.isLoading = false;
            }
        });

        authForm.reset();
    }

    onHandleError() {
        this.error =  null;
    }

    private showErrorAlert(message : string) {
        // **** ComponentFactory not needed anymore with newer Angular versions ***** 
        // const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = message;
        this.subscription = componentRef.instance.close.subscribe(() => {
            this.subscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}