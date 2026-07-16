import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from "../../../../../services/root-services";
import { BusinessLineNav } from "../business-line-nav/business-line-nav";
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BusinessLineNav,
  ],
  templateUrl: './crm.html',
  styleUrl: './crm.css',
})
export class Crm implements OnInit, AfterViewInit {

  public module: any;
  public next: any;
  public dataValue: any;

  public _albums: any = [];
  public featureandbenifit: boolean = true;
  public featureandbenifit2: boolean = false;
  public component: boolean = true;

  public var: any = 1;

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
      src: "assets/images/dashboard/CRM.png?v=" + this.$rootScope.version,
      caption: "Client conversion overview",
      thumb: "assets/images/dashboard/CRM.png"
    };

    this._albums.push(album);
  }

  ngAfterViewInit(): void {
    // ❌ do NOT throw errors in lifecycle hooks
  }


}