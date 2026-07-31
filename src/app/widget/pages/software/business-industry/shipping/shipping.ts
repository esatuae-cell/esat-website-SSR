import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from '../../../../../services/root-services';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BusinessInsustrySubmenu } from '../business-insustry-submenu/business-insustry-submenu';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [BusinessInsustrySubmenu, CommonModule, RouterLink],
  templateUrl: './shipping.html',
  styleUrl: './shipping.css',
})
export class Shipping implements OnInit {
  public module: any = null;
  public next: any = null;
  public dataValue: any = null;

  public featureandbenifit = true;
  public component = true;

  public var = 6;

  public compomm: any[] = [];
  public _albums: any[] = [];

  constructor(
    public http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    /*
     * Get current module safely
     */
    this.module = this.$rootScope.allModule?.[this.var];

    /*
     * Get next module safely
     */
    this.next = this.$rootScope.allModule?.[7];

    /*
     * Prevent SSR crash if module is unavailable
     */
    if (!this.module) {
      console.warn('Shipping module not found at index:', this.var);
      return;
    }

    const webData = this.$rootScope.webData;

    const hasWebData = webData && typeof webData === 'object' && Object.keys(webData).length > 0;

    /*
     * Use already-loaded data if available
     */
    if (hasWebData && this.module.pagelink && webData[this.module.pagelink] !== undefined) {
      this.dataValue = webData[this.module.pagelink];
    } else if (this.module.pagelink) {
      /*
       * API request is allowed during SSR.
       * Do not wrap this request with
       * isPlatformBrowser().
       */
      this.http.get(this.$rootScope.httpLink + this.module.pagelink).subscribe({
        next: (data: any) => {
          this.dataValue = data;
        },

        error: (error) => {
          console.error('Shipping API Error:', error);

          this.dataValue = null;
        },
      });
    }

    /*
     * Safely get selected modules.
     *
     * Prevents:
     * Cannot read properties of undefined
     * (reading 'includes')
     */
    const selected: any[] = Array.isArray(this.module.selected) ? this.module.selected : [];

    const moduleList: any[] = Array.isArray(this.$rootScope.allmoduleList)
      ? this.$rootScope.allmoduleList
      : [];

    this.compomm = [];

    moduleList.forEach((element: { id: any }) => {
      if (element && selected.includes(element.id)) {
        this.compomm.push(element);
      }
    });

    /*
     * refreshVisible() can depend on browser DOM,
     * so execute only in browser.
     */
    if (isPlatformBrowser(this.platformId)) {
      this.$rootScope.refreshVisible();
    }

    /*
     * Shipment dashboard image
     */
    const version = this.$rootScope.version ?? '';

    const album = {
      src: 'assets/images/dashboard/shipment.png?v=' + version,

      caption: 'Shipment process - Month wise',

      thumb: 'assets/images/dashboard/shipment.png',
    };

    this._albums.push(album);
  }
}
