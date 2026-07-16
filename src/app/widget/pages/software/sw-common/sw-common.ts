import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sw-common',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sw-common.html',
  styleUrl: './sw-common.css',
})
export class SwCommon {}
