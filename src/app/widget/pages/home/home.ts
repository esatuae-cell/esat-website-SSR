import { Component } from '@angular/core';
import { HomeCarousel } from "../../shared-component/home-carousel/home-carousel"; 
import { YutHone } from "../../shared-component/yut-hone/yut-hone"; 
import { SoftwareSliderHome } from "../../shared-component/software-slider-home/software-slider-home"; 
import { InfrastructureSliderHome } from "../../shared-component/infrastructure-slider-home/infrastructure-slider-home"; 
import { routes } from '../../../app.routes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [HomeCarousel, YutHone, SoftwareSliderHome, InfrastructureSliderHome, RouterLink],
})
export class HomeComponent {}