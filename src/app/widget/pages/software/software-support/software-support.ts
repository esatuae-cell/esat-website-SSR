import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RootServices } from '../../../../services/root-services';
import { SwCommon } from '../sw-common/sw-common';

@Component({
  selector: 'app-software-support',
  standalone: true,
  imports: [SwCommon, RouterLink],
  templateUrl: './software-support.html',
  styleUrl: './software-support.css',
})
export class SoftwareSupport implements OnInit {
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  public textValue = '';

  public queone = false;
  public quetwo = false;
  public quethree = false;

  public id: string = '';

  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  constructor(
    public route: ActivatedRoute,
    public $rootScope: RootServices,
  ) {}

  // --------------------------------------------------
  // Init
  // --------------------------------------------------

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'] || 'ser1';

      this.changeCircle(this.id);
    });
  }

  // --------------------------------------------------
  // Change active service
  // --------------------------------------------------

  changeCircle(id: string): void {
    switch (id) {
      case 'ser1':
        this.textValue = 'ser1';

        this.queone = false;
        this.quetwo = true;
        this.quethree = true;

        break;

      case 'ser2':
        this.textValue = 'ser2';

        this.queone = true;
        this.quetwo = false;
        this.quethree = true;

        break;

      case 'ser3':
        this.textValue = 'ser3';

        this.queone = true;
        this.quetwo = true;
        this.quethree = false;

        break;

      default:
        this.textValue = 'ser1';

        this.queone = false;
        this.quetwo = true;
        this.quethree = true;

        break;
    }
  }

  // --------------------------------------------------
  // Click outside
  // --------------------------------------------------

  ChangeHover(_event: Event): void {
    // Intentionally empty.
    //
    // This method exists because the template calls:
    //
    // (clickOutside)="ChangeHover($event)"
    //
    // Do not throw an error here.
    //
    // If you later need DOM manipulation, make it SSR-safe
    // with isPlatformBrowser().
  }
}
