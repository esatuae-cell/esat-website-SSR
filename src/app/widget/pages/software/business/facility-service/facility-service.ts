import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from "../../../../../services/root-services";
import { BusinessLineNav } from "../business-line-nav/business-line-nav";
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-facility-service',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BusinessLineNav,
  ],
  templateUrl: './facility-service.html',
  styleUrl: './facility-service.css',
})
export class FacilityService implements OnInit {

  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: any = 2;
  public _albums: any = [];
  private _lightbox: any;

  constructor(
    public http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {

    this.module = this.$rootScope.allmoduleList[this.var];
    this.next = this.$rootScope.allmoduleList[this.var + 1];

    const webData = this.$rootScope.webData;

    const hasWebData =
      webData &&
      typeof webData === 'object' &&
      Object.keys(webData).length > 0;

    if (hasWebData && webData[this.module.pagelink] !== undefined) {
      this.dataValue = webData[this.module.pagelink];
    } else {

      // SSR SAFE HTTP CALL
      if (isPlatformBrowser(this.platformId)) {
        this.http
          .get(this.$rootScope.httpLink + this.module.pagelink)
          .subscribe(data => {
            this.dataValue = data;
          });
      }
    }

    const album = {
      src: "assets/images/dashboard/facility.png?v=" + this.$rootScope.version,
      caption: "Accommodation dashboard",
      thumb: "assets/images/dashboard/facility.png"
    };

    this._albums.push(album);
  }

  openLightbox(index: number): void {
    this._lightbox?.open(this._albums, index);
  }
}