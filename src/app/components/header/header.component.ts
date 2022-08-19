import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authenticatedUser = ' - ';
  private userSub : Subscription;

  constructor( private dataStore : DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe( map( authState => authState.user ) )
      .subscribe(user => {
      this.isAuthenticated = !user ? false : true
      if (user) {
        this.authenticatedUser = user.email;
      }
      
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStore.storeRecipes();
  }

  onFetchData() {
    this.dataStore.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
