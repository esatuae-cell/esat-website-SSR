import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { RootServices } from '../../../../../services/root-services';
import { BusinessLineNav } from '../business-line-nav/business-line-nav';

@Component({
  selector: 'app-fixed-asset',
  standalone: true,
  imports: [CommonModule, RouterLink, BusinessLineNav],
  templateUrl: './fixed-asset.html',
  styleUrl: './fixed-asset.css',
})
export class FixedAsset implements OnInit, AfterViewInit {
  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit = true;
  public component = true;
  public var = 0;
  public _albums: any[] = [];
  private _lightbox: any;

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.module = this.$rootScope.allmoduleList[this.var];
    this.next = this.$rootScope.allmoduleList[this.var + 1];

    const webData = this.$rootScope.webData;

    const hasWebData = webData && typeof webData === 'object' && Object.keys(webData).length > 0;

    if (hasWebData && webData[this.module.pagelink] !== undefined) {
      this.dataValue = webData[this.module.pagelink];
    } else {
      if (isPlatformBrowser(this.platformId)) {
        this.http.get(this.$rootScope.httpLink + this.module.pagelink).subscribe((data) => {
          this.dataValue = data;
        });
      }
    }

    this._albums.push({
      src: `assets/images/dashboard/ERP Asset.png?v=${this.$rootScope.version}`,
      caption: 'Asset depreciation - Department wise',
      thumb: 'assets/images/dashboard/ERP Asset.png',
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const AOS = (await import('aos')).default;

      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    }
  }

  openLightbox(index: number): void {
    this._lightbox?.open(this._albums, index);
  }
}
