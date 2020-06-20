import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

//コピペしましたhttp://daikiojm.hatenablog.com/entry/2017/09/10/192714
export class AppComponent {
  links: any[];
  activeLinkIndex = 0;
  currentRoute = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.links = [
      { label: '登録', path: '' },
      { label: '成績', path: 'record' },
      { label: '集計', path: 'aggregate' },
    ];
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.slice(1);
        this.links.forEach((elm, index) => {
          if (elm.link === this.currentRoute) {
            this.activeLinkIndex = index;
          }
        });
      }
    });
  }
}
