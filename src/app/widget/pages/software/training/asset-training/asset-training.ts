import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { RootServices } from "../../../../../services/root-services";
import { TrainingSubMenu } from '../training-sub-menu/training-sub-menu';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-asset-training',
  standalone: true,
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './asset-training.html',
  styleUrl: './asset-training.css',
})
export class AssetTraining implements OnInit {

  public module: any;
  public next: any;
  public dataValue: any;

  public featureandbenifit = true;
  public component = true;

  public var = 0;
  public _albums: any[] = [];

  private isBrowser = false;

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    private titleService: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    this.titleService.setTitle(
      'Asset Management Company in Dubai | ESAT ERP - Asset Management'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'We provide trustful asset management services in the UAE for small and large organizations. ESAT is one of the best asset management companies in Dubai.'
    });
  }

  ngOnInit(): void {

    this.module = this.$rootScope?.allmoduleList?.[this.var];
    this.next = this.$rootScope?.allmoduleList?.[this.var + 1];

    const pagelink = this.module?.pagelink;

    if (
      this.$rootScope?.webData &&
      pagelink &&
      this.$rootScope.webData[pagelink]
    ) {
      this.dataValue = this.$rootScope.webData[pagelink];
    } else if (pagelink) {
      this.http
        .get(this.$rootScope.httpLink + pagelink)
        .subscribe({
          next: (data) => this.dataValue = data,
          error: (err) => console.error(err)
        });
    }

    const version = this.$rootScope?.version ?? '';

    this._albums = [
      {
        src: `assets/images/dashboard/ERP Asset.png?v=${version}`,
        caption: 'Asset depreciation - Department wise',
        thumb: 'assets/images/dashboard/ERP Asset.png'
      }
    ];


  }

  openLightbox(index: number): void {
    if (!this.isBrowser) return;
  }
}