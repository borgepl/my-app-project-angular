import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AlertComponent } from "../components/shared/alert/alert.component";
import { PlaceholderDirective } from "../components/shared/placeholder/placeholder.directive";
import * as AuthActions from "./store/auth.actions";
import * as fromApp from "src/app/store/app.reducer";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
  })
  
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string =  null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private subscription: Subscription;

    constructor( private componentFactoryResolver : ComponentFactoryResolver,
                 private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

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

        //this.isLoading = true;
        if (this.isLoginMode) {
            
            // Login Mode
            this.store.dispatch(AuthActions.LOGIN_START( { payload: {email: email, password: password } }) );

        } else {

            // SignUp Mode
            //this.store.dispatch(new AuthActions.SignupStart({email: email, password: password }))
            this.store.dispatch(AuthActions.SIGNUP_START( {payload: {email: email, password: password } }) );
        }

        this.store.select('auth').subscribe(authState => {

        });
       

        authForm.reset();
    }

    onHandleError() {
        //this.error =  null;
        this.store.dispatch(AuthActions.CLEAR_ERROR());
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