import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RootServices } from '../../../../services/root-services';
import { SwCommon } from '../sw-common/sw-common';

@Component({
  selector: 'app-esat-benefits',
  standalone: true,
  imports: [CommonModule, SwCommon],
  templateUrl: './esat-benefits.html',
  styleUrl: './esat-benefits.css',
})
export class EsatBenefits {

  public dataValue: any;
  public showExtra: boolean = false;

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {

    const webData = this.$rootScope.webData;

    const hasWebData =
      webData &&
      typeof webData === 'object' &&
      Object.keys(webData).length > 0;

    if (hasWebData && webData['267'] !== undefined) {
      this.dataValue = webData['267'];
    } else {

      // SSR SAFE HTTP CALL
      if (isPlatformBrowser(this.platformId)) {
        this.http
          .get(this.$rootScope.httpLink + '267')
          .subscribe(data => {
            this.dataValue = data;
          });
      }
    }
  }

  slideConfig = {
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    draggable: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
  };
}