import { CommonModule } from '@angular/common';
import { Component ,Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-hardware-sub-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './hardware-sub-menu.html',
  styleUrl: './hardware-sub-menu.css',
})
export class HardwareSubMenu {

 @Input() menuColor: string = '';

}
