import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  activeMenu: string | null = null;

  isDropdownOpen = false;
  clicked = false;


  closeDropdown() {
    this.isDropdownOpen = false;
  }

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    if (!this.clicked) {
      this.isDropdownOpen = false;
    }
  }

  toggleClickDropdown(event: Event) {
    this.clicked = true;
    this.isDropdownOpen = false;

    // allow hover again after mouse leaves
    setTimeout(() => {
      this.clicked = false;
    }, 300);
  }

  toggleMenu(menu: string) {
    if (this.activeMenu === menu) {
      this.activeMenu = null;
    } else {
      this.activeMenu = menu;
    }
  }
}
