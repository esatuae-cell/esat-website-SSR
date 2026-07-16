import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {


  private isBrowser: boolean;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {

    this.isBrowser = isPlatformBrowser(platformId);

  }



  addSchema(schema: any) {


    if (!this.isBrowser) {
      return;
    }


    const script =
      this.document.createElement('script');


    script.type =
      'application/ld+json';


    script.text =
      JSON.stringify(schema);



    this.document.head.appendChild(script);


  }

}