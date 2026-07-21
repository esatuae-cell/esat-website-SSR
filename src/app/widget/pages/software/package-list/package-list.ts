import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RootServices } from '../../../../services/root-services';
import { SwCommon } from '../sw-common/sw-common';
import { AboutRoutingModule } from "../../about/about-routing-module";
import { RouterLink } from '@angular/router';

declare var WOW: any;

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, SwCommon, AboutRoutingModule, RouterLink],
  templateUrl: './package-list.html',
  styleUrl: './package-list.css',
})
export class PackageList implements OnInit {

  public dataValue: any;
  public showExtra: boolean = false;

  slideConfig = {
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    draggable: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000
  };

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {

    // ✅ WOW.js only runs in browser (SSR safe)
    if (isPlatformBrowser(this.platformId)) {
      new WOW().init();
    }

    // ✅ Safe cached data usage
    const cachedData = this.$rootScope?.webData?.['267'];

    if (cachedData != null) {
      this.dataValue = cachedData;
    } else {

      // ⚠️ SSR-safe HTTP request
      this.http.get(this.$rootScope.httpLink + '267')
        .subscribe({
          next: (data) => {
            this.dataValue = data;
          },
          error: (err) => {
            console.error('API Error:', err);
          }
        });
    }
  }
}