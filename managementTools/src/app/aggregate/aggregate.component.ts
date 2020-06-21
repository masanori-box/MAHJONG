import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss'],
})
export class AggregateComponent implements OnInit {
  constructor() {}

  //入れ物
  record_three = [
    { tanaka1: 0, tanaka2: 0, tanaka3: 0 },
    { kanamaru1: 0, kanamaru2: 0, kanamaru3: 0 },
    { noda1: 0, noda2: 0, noda3: 0 },
    { asahara1: 0, asahara2: 0, asahara3: 0 },
  ];
  record_for = [
    { tanaka1: 0, tanaka2: 0, tanaka3: 0, tanaka4: 0 },
    { kanamaru1: 0, kanamaru2: 0, kanamaru3: 0, kanamaru4: 0 },
    { noda1: 0, noda2: 0, noda3: 0, noda4: 0 },
    { asahara1: 0, asahara2: 0, asahara3: 0, asahara4: 0 },
  ];

  RECORD_API = 'http://192.168.0.125:8060/result'; //url

  //データを取得するAPIを呼ぶ
  async callApi() {
    const res = await window.fetch(this.RECORD_API);
    const resJson = await res.json(); //受け取ったデータをjson形式に変換
    let i; //カウンター変数
    await resJson.forEach((value) => {
      if (value.type === 1) {
        for (i = 1; i <= 3; i++) {
          switch (eval(`value.rank_${i}`)) {
            case 1:
              eval(`this.record_three[0].tanaka${i}++`);
              break;
            case 2:
              eval(`this.record_three[1].kanamaru${i}++`);
              break;
            case 3:
              eval(`this.record_three[2].noda${i}++`);
              break;
            case 4:
              eval(`this.record_three[3].asahara${i}++`);
              break;
          }
        }
      } else {
        for (i = 1; i <= 4; i++) {
          switch (eval(`value.rank_${i}`)) {
            case 1:
              eval(`this.record_for[0].tanaka${i}++`);
              break;
            case 2:
              eval(`this.record_for[1].kanamaru${i}++`);
              break;
            case 3:
              eval(`this.record_for[2].noda${i}++`);
              break;
            case 4:
              eval(`this.record_for[3].asahara${i}++`);
              break;
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.callApi();
  }
}
