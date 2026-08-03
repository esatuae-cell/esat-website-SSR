import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  templateUrl: './terms.html',
  styleUrl: './terms.css',
  imports: [RouterLink],
})
export class Terms {}
