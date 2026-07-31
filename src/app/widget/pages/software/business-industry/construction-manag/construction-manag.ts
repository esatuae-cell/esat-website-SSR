import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RootServices } from '../../../../../services/root-services';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BusinessInsustrySubmenu } from '../business-insustry-submenu/business-insustry-submenu';

@Component({
  selector: 'app-construction-manag',
  standalone: true,
  imports: [BusinessInsustrySubmenu, CommonModule, RouterLink],
  templateUrl: './construction-manag.html',
  styleUrl: './construction-manag.css',
})
export class ConstructionManag implements OnInit {
  public module: any;
  public next: any;
  public dataValue: any;
  public featureandbenifit: boolean = true;
  public component: boolean = true;
  public var: number = 3;
  public compomm: any[] = [];

  constructor(
    public http: HttpClient,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit() {
    // Safely get module
    this.module = this.$rootScope.allModule?.[this.var];
    this.next = this.$rootScope.allModule?.[4];

    // Prevent SSR crash if module doesn't exist
    if (!this.module) {
      console.error('ConstructionManag: module not found at index:', this.var);
      return;
    }

    const webData = this.$rootScope.webData;

    const hasWebData = webData && typeof webData === 'object' && Object.keys(webData).length > 0;

    if (hasWebData && this.module.pagelink && webData[this.module.pagelink] !== undefined) {
      this.dataValue = webData[this.module.pagelink];
    } else {
      // HTTP request only in browser
      if (isPlatformBrowser(this.platformId) && this.module.pagelink) {
        this.http.get(this.$rootScope.httpLink + this.module.pagelink).subscribe({
          next: (data) => {
            this.dataValue = data;
          },
          error: (error) => {
            console.error('Construction API Error:', error);
          },
        });
      }
    }

    // IMPORTANT:
    // selected may be undefined during SSR
    const selected = this.module.selected ?? [];

    this.$rootScope.allmoduleList?.forEach((element: { id: any }) => {
      if (selected.includes(element.id)) {
        this.compomm.push(element);
      }
    });

    // Browser-only logic
    if (isPlatformBrowser(this.platformId)) {
      this.$rootScope.refreshVisible();
    }
  }
}
