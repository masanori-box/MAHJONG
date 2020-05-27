import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  styles: [
    `
      mat-paginator >>> .ng-star-inserted {
        font-size: 12px;
      }
    `,
    `
      mat-paginator >>> .mat-form-field-flex {
        padding-bottom: 2px;
      }
    `,
    `
      mat-paginator >>> .mat-paginator-range-label {
        margin-top: 4px;
      }
    `,
    `
      .mat-sort >>> .mat-sort-header-container {
        justify-content: center;
        transform: translateX(9px);
      }
    `,
    `
      mat-form-field >>> .mat-form-field-label {
        transition: color 0s;
      }
    `,
  ],
})
export class RecordComponent implements OnInit {
  constructor(private router: Router) {}

  //麻雀成績
  RECORD = [];
  RECORD_API = '//192.168.0.125:8060/result';

  //データを取得するAPIを呼ぶ
  async callApi() {
    const res = await window.fetch(this.RECORD_API);
    const resJson = await res.json();
    let record_day; //取得するデータの受け入れ先
    let rank_day: string[]; //一時的な保管先
    await resJson.forEach((value) => {
      record_day = {
        date: '',
        first: '',
        second: '',
        third: '',
        forth: '',
      };

      rank_day = [];

      //日付を設定
      record_day.date = value.event_date.substring(0, 10);

      //名前を設定
      for (let i = 1; i < 5; i++) {
        switch (eval(`value.rank_${i}`)) {
          case 1:
            rank_day[i] = '田中';
            break;
          case 2:
            rank_day[i] = '金丸';
            break;
          case 3:
            rank_day[i] = '野田';
            break;
          case 4:
            rank_day[i] = '朝原';
            break;
        }
      }
      record_day.first = rank_day[1];
      record_day.second = rank_day[2];
      record_day.third = rank_day[3];

      if (!rank_day[4]) {
        rank_day[4] = '－';
      }
      record_day.forth = rank_day[4];

      this.RECORD.push(record_day);
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  info: string[] = ['date', 'first', 'second', 'third', 'forth'];
  dataSource = new MatTableDataSource(this.RECORD);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.callApi();
  }

  //表示後のイベント
  ngAfterViewInit(): void {
    (<HTMLElement>document.querySelector('.date-header')).click();
    (<HTMLElement>document.querySelector('.date-header')).click();
  }

  //コピペ
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //遷移先設定
  toRegister(): void {
    this.router.navigate(['/record']);
  }

  //テーブルのレイアウト崩れを修正
  placeFocus() {
    (<HTMLElement>document.querySelector('.mat-form-field-label')).style.color =
      'transparent';
  }
  placeBlur() {
    if (
      (<HTMLInputElement>document.querySelector('.mat-input-element')).value ===
      ''
    ) {
      (<HTMLElement>(
        document.querySelector('.mat-form-field-label')
      )).style.color = 'rgba(0,0,0,.54)';
    } else {
      (<HTMLElement>(
        document.querySelector('.mat-form-field-label')
      )).style.color = 'transparent';
    }
  }
}
