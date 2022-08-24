import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from "src/app/store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Angular - My Recipes App';
 
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    //this.authService.autoLogin();
    this.store.dispatch(AuthActions.AUTO_LOGIN());

  }
}
