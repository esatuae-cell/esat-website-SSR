import { Component } from '@angular/core';
import { HomeCarousel } from "../../shared-component/home-carousel/home-carousel"; 
import { YutHone } from "../../shared-component/yut-hone/yut-hone"; 
import { SoftwareSliderHome } from "../../shared-component/software-slider-home/software-slider-home"; 
import { InfrastructureSliderHome } from "../../shared-component/infrastructure-slider-home/infrastructure-slider-home"; 

@Component({
   selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [HomeCarousel, YutHone, SoftwareSliderHome, InfrastructureSliderHome]
})
export class HomeComponent {}