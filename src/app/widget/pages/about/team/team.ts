import { Component } from '@angular/core';
import { About } from "../about/about";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-team',

  templateUrl: './team.html',
  styleUrl: './team.css',
  imports: [RouterModule],
})
export class Team {}
