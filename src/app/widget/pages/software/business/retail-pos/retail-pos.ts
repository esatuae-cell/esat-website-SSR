import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { RootServices } from "../../../../../services/root-services";
import { BusinessLineNav } from "../business-line-nav/business-line-nav";

@Component({
  selector: 'app-retail-pos',
  standalone: true,
  imports: [
    CommonModule,
    BusinessLineNav,
  ],
  templateUrl: './retail-pos.html',
  styleUrl: './retail-pos.css',
})
export class RetailPOS {

  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: any = 15;
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
      if (isPlatformBrowser(this.platformId)) {
        this.http
          .get(this.$rootScope.httpLink + this.module.pagelink)
          .subscribe(data => {
            this.dataValue = data;
          });
      }
    }

    const album = {
      src: `assets/images/dashboard/retail.png?v=${this.$rootScope.version}`,
      caption: 'retail process - Month wise',
      thumb: 'assets/images/dashboard/retail.png'
    };

    this._albums.push(album);
  }

  openLightbox(index: number): void {
    this._lightbox?.open(this._albums, index);
  }
}