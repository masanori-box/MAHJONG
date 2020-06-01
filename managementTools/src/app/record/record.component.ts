import { Component, OnInit, ViewChild } from '@angular/core';
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
        top: 1.8em;
      }
    `,
  ],
})
export class RecordComponent implements OnInit {
  constructor(private router: Router) {}

  RECORD = []; //入れ物
  RECORD_API = 'http://192.168.0.125:8060/result'; //url

  //データを取得するAPIを呼ぶ
  async callApi() {
    const res = await window.fetch(this.RECORD_API);
    const resJson = await res.json(); //受け取ったデータをjson形式に変換
    let record_day; //取得するデータの受け入れ先
    let rank_day: string[]; //一時的な保管先
    await resJson.forEach((value) => {
      record_day = {
        id: '',
        date: '',
        first: '',
        second: '',
        third: '',
        forth: '',
        rate: '',
      };

      //idを設定
      record_day.id = value.result_id;

      //日付を設定
      record_day.date = value.event_date.substring(0, 10);

      rank_day = [];

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

      //レートを設定
      record_day.rate = value.rate * 100 + '円';

      this.RECORD.push(record_day); //データを順次保管する
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.deleteData();
  }

  info: string[] = [
    'id',
    'date',
    'first',
    'second',
    'third',
    'forth',
    'rate',
    'delete',
  ];
  dataSource = new MatTableDataSource(this.RECORD);

  modal; //モーダル
  jsYes; //はい
  jsNo; //いいえ

  resultId;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.callApi();
  }

  //表示後のイベント
  ngAfterViewInit(): void {
    this.modal = document.querySelector('.delete-modal'); //モーダル
    this.jsYes = document.querySelector('.js-yes'); //はい
    this.jsNo = document.querySelector('.js-no'); //いいえ

    //データを最新順に並べる
    (<HTMLElement>document.querySelector('.date-header')).click();
    (<HTMLElement>document.querySelector('.date-header')).click();

    //はい・いいえを押した時の処理
    const modalHidden = () => {
      // this.jsYes.setAttribute('disabled', 'true');
      this.jsNo.setAttribute('disabled', 'true');
    };

    //はい
    document.querySelector('.js-yes').addEventListener('click', (e) => {
      const deleteUrl = `${this.RECORD_API}{${this.resultId}}`;
      console.log(deleteUrl);
      fetch(deleteUrl, {
        method: 'DELETE',
      }).then(() => {
        modalHidden();
      });
    });

    //いいえ
    document.querySelector('.js-no').addEventListener('click', (e) => {
      modalHidden();
      this.modal.classList.remove('active');
    });

    //ページネーターにクリックイベントを設定
    document
      .querySelector('.mat-paginator-navigation-previous')
      .addEventListener('click', () => {
        this.deleteData();
      });
    document
      .querySelector('.mat-paginator-navigation-next')
      .addEventListener('click', () => {
        this.deleteData();
      });
    document
      .querySelector('.mat-paginator-navigation-first')
      .addEventListener('click', () => {
        this.deleteData();
      });
    document
      .querySelector('.mat-paginator-navigation-last')
      .addEventListener('click', () => {
        this.deleteData();
      });
  }

  //フィルター処理
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

  //ゴミ箱のクリックイベント
  deleteData() {
    let _this = this;
    let deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((element) => {
      element.addEventListener('click', function (e) {
        _this.modal.classList.add('active'); //モーダル開く
        //はい・いいえを活性化
        // _this.jsYes.removeAttribute('disabled');
        _this.jsNo.removeAttribute('disabled');
        //result_idを取得
        _this.resultId = (<HTMLElement>e.target)
          .closest('.mat-row')
          .querySelector('.mat-column-id').textContent;
      });
    });
  }
}
