import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

activeMenu: string | null = null;


toggleMenu(menu: string) {

  if (this.activeMenu === menu) {
    this.activeMenu = null;
  } 
  else {
    this.activeMenu = menu;
  }

}


}
