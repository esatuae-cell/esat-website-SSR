import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SwCommon } from '../../sw-common/sw-common';
import { AboutRoutingModule } from "../../../about/about-routing-module";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-business-industry',
  imports: [CommonModule, SwCommon, AboutRoutingModule, RouterOutlet,  ],
  templateUrl: './business-industry.html',
  styleUrl: './business-industry.css',
})
export class BusinessIndustry {}
