import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from '../../../../../services/root-services';
import { BusinessLineNav } from '../business-line-nav/business-line-nav';

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { TransferState, makeStateKey } from '@angular/core';

import { catchError, of, timeout } from 'rxjs';

const CMMS_KEY = makeStateKey<any>('cmms-data');

@Component({
  selector: 'app-cmms',
  standalone: true,
  imports: [CommonModule, RouterLink, BusinessLineNav],
  templateUrl: './cmms.html',
  styleUrl: './cmms.css',
})
export class CMMS implements OnInit {
  public module: any;
  public next: any;
  public dataValue: any;

  public featureandbenifit = true;
  public component = true;
  public var = 18;

  public _albums: any[] = [];
  private _lightbox: any;

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    private transferState: TransferState,
    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {}

  ngOnInit() {
    this.module = this.$rootScope.allmoduleList[this.var];

    this.next = this.$rootScope.allmoduleList[this.var + 1];

    if (!this.module) {
      return;
    }

    const webData = this.$rootScope.webData;

    if (webData && webData[this.module.pagelink]) {
      this.dataValue = webData[this.module.pagelink];
    } else {
      this.loadData();
    }

    this._albums.push({
      src: 'assets/images/dashboard/cmms.png?v=' + this.$rootScope.version,

      caption: 'CMMS process - Month wise',

      thumb: 'assets/images/dashboard/cmms.png',
    });
  }

  private loadData() {
    // Browser hydration
    if (this.transferState.hasKey(CMMS_KEY)) {
      this.dataValue = this.transferState.get(CMMS_KEY, null);

      this.transferState.remove(CMMS_KEY);

      return;
    }

    this.http
      .get(this.$rootScope.httpLink + this.module.pagelink)
      .pipe(
        timeout(10000),

        catchError((error) => {
          console.error('CMMS API Error', error);

          return of(null);
        }),
      )
      .subscribe((data) => {
        this.dataValue = data;

        this.transferState.set(CMMS_KEY, data);
      });
  }

  openLightbox(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this._lightbox?.open(this._albums, index);
    }
  }
}
