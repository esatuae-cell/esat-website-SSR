import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from "../../../../../services/root-services";
import { Component, OnInit } from '@angular/core';
import { BusinessInsustrySubmenu } from '../business-insustry-submenu/business-insustry-submenu';

@Component({
  selector: 'app-cmms',
  standalone: true,
  imports: [BusinessInsustrySubmenu, CommonModule, RouterLink],
  templateUrl: './cmms.html',
  styleUrl: './cmms.css',
})
export class Cmms implements OnInit {

  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: any = 9;
  public compomm: any = [];
  public _albums: any = [];
  private _lightbox: any;

  constructor(
    public http: HttpClient,
    public $rootScope: RootServices
  ) {}

  ngOnInit() {

    this.module = this.$rootScope.allModule[this.var];
    this.next = this.$rootScope.allModule[0];

    const webData = this.$rootScope.webData;

    if (
      webData &&
      Object.keys(webData).length !== 0 &&
      webData[this.module.pagelink] !== undefined
    ) {
      this.dataValue = webData[this.module.pagelink];
    } else {
      this.http
        .get(this.$rootScope.httpLink + this.module.pagelink)
        .subscribe(data => {
          this.dataValue = data;
        });
    }

    const selected = this.module.selected;

    this.$rootScope.allmoduleList.forEach((element: { id: any }) => {
      if (selected.includes(element.id)) {
        this.compomm.push(element);
      }
    });

    this.$rootScope.refreshVisible();

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