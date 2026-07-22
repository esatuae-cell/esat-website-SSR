import { Component, OnInit } from '@angular/core';
import { RootServices } from '../../../../services/root-services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwCommon } from "../sw-common/sw-common";

@Component({
  selector: 'app-software-support',
  imports: [SwCommon,RouterLink],
  templateUrl: './software-support.html',
  styleUrl: './software-support.css',
})
export class SoftwareSupport implements OnInit {
ChangeHover($event: Event) {
throw new Error('Method not implemented.');
}
  public textValue: string = '';
  public queone: boolean = false;
  public quetwo: boolean = false;
  public quethree: boolean = false;
  id: any;
  private sub: any;
  constructor(public route: ActivatedRoute, public $rootScope: RootServices, ) {
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    setTimeout(() => {
      this.changeCircle(this.id);
    }), 1000;
  }
  changeCircle(id: any) {
    throw new Error('Method not implemented.');
  }
 
}
