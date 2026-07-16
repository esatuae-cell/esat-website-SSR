import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { RootServices } from "../../../../../services/root-services";
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BusinessInsustrySubmenu } from '../business-insustry-submenu/business-insustry-submenu';

@Component({
  selector: 'app-complete-manag',
  standalone: true,
  imports: [BusinessInsustrySubmenu, CommonModule, RouterLink,],
  templateUrl: './complete-manag.html',
  styleUrl: './complete-manag.css',
})
export class CompleteManag {
  
  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: any = 0;
  public _albums: any = [];
  private _lightbox: any;

  constructor(public http: HttpClient, public $rootScope: RootServices, ) {
   

  }

  ngOnInit() {
    this.module = this.$rootScope.allModule[this.var];
    this.next = this.$rootScope.allModule[1];
    this.$rootScope.refreshVisible();
    this.$rootScope.refreshVisible();
    const album = {
      src: "assets/images/dashboard/ERP Asset.png?v=" + this.$rootScope.version,
      caption: "Asset depreciation - Department wise",
      thumb: "assets/images/dashboard/ERP Asset.png"
    };
    this._albums.push(album);
  }
  
  openLightbox(index: number): void {
    this._lightbox.open(this._albums, index);
  }
}