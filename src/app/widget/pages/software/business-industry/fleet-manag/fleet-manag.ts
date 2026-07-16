import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from "../../../../../services/root-services";
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BusinessInsustrySubmenu } from '../business-insustry-submenu/business-insustry-submenu';

@Component({
  selector: 'app-fleet-manag',
  standalone: true,
  imports: [BusinessInsustrySubmenu, CommonModule, RouterLink],
  templateUrl: './fleet-manag.html',
  styleUrl: './fleet-manag.css',
})
export class FleetManag implements OnInit {

  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: any = 5;
  public compomm: any = [];
  public _albums: any = [];
  private _lightbox: any;

  constructor(
    public http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {

    this.module = this.$rootScope.allModule[this.var];
    this.next = this.$rootScope.allModule[6];

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

    const selected = this.module.selected;

    this.$rootScope.allmoduleList.forEach((element: { id: any }) => {
      if (selected.includes(element.id)) {
        this.compomm.push(element);
      }
    });

    // SSR SAFE UI CALL
    if (isPlatformBrowser(this.platformId)) {
      this.$rootScope.refreshVisible();
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