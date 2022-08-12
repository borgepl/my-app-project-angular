import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authenticatedUser = ' - ';
  private userSub : Subscription;

  constructor( private dataStore : DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.authUser.subscribe(user => {
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
