import { Component, OnInit } from '@angular/core';

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
  record_three_money = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };
  record_three_average = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };
  record_three_win = {
    tanaka: '',
    kanamaru: '',
    noda: '',
    asahara: '',
  };
  record_three_sum = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };

  record_for = [
    { tanaka1: 0, tanaka2: 0, tanaka3: 0, tanaka4: 0 },
    { kanamaru1: 0, kanamaru2: 0, kanamaru3: 0, kanamaru4: 0 },
    { noda1: 0, noda2: 0, noda3: 0, noda4: 0 },
    { asahara1: 0, asahara2: 0, asahara3: 0, asahara4: 0 },
  ];
  record_for_money = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };
  record_for_average = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };
  record_for_win = {
    tanaka: '',
    kanamaru: '',
    noda: '',
    asahara: '',
  };
  record_for_sum = {
    tanaka: 0,
    kanamaru: 0,
    noda: 0,
    asahara: 0,
  };

  RECORD_API = 'http://192.168.0.125:8060/result'; //url

  //データを取得するAPIを呼ぶ
  async callApi() {
    const res = await window.fetch(this.RECORD_API);
    const resJson = await res.json(); //受け取ったデータをjson形式に変換
    let i; //カウンター変数
    await resJson.forEach((value) => {
      if (value.type === 1 || value.type === 3) {
        for (i = 1; i <= 3; i++) {
          switch (eval(`value.rank_${i}`)) {
            case 1:
              eval(`this.record_three[0].tanaka${i}++`);
              switch (i) {
                case 1:
                  this.record_three_money.tanaka += value.rate * 100;
                  break;
                case 3:
                  this.record_three_money.tanaka -= value.rate * 100;
                  break;
              }
              break;
            case 2:
              eval(`this.record_three[1].kanamaru${i}++`);
              switch (i) {
                case 1:
                  this.record_three_money.kanamaru += value.rate * 100;
                  break;
                case 3:
                  this.record_three_money.kanamaru -= value.rate * 100;
                  break;
              }
              break;
            case 3:
              eval(`this.record_three[2].noda${i}++`);
              switch (i) {
                case 1:
                  this.record_three_money.noda += value.rate * 100;
                  break;
                case 3:
                  this.record_three_money.noda -= value.rate * 100;
                  break;
              }
              break;
            case 4:
              eval(`this.record_three[3].asahara${i}++`);
              switch (i) {
                case 1:
                  this.record_three_money.asahara += value.rate * 100;
                  break;
                case 3:
                  this.record_three_money.asahara -= value.rate * 100;
                  break;
              }
              break;
          }
        }
      } else {
        for (i = 1; i <= 4; i++) {
          switch (eval(`value.rank_${i}`)) {
            case 1:
              eval(`this.record_for[0].tanaka${i}++`);
              switch (i) {
                case 1:
                  this.record_for_money.tanaka += value.rate * 100;
                  break;
                case 4:
                  this.record_for_money.tanaka -= value.rate * 100;
                  break;
              }
              break;
            case 2:
              eval(`this.record_for[1].kanamaru${i}++`);
              switch (i) {
                case 1:
                  this.record_for_money.kanamaru += value.rate * 100;
                  break;
                case 4:
                  this.record_for_money.kanamaru -= value.rate * 100;
                  break;
              }
              break;
            case 3:
              eval(`this.record_for[2].noda${i}++`);
              switch (i) {
                case 1:
                  this.record_for_money.noda += value.rate * 100;
                  break;
                case 4:
                  this.record_for_money.noda -= value.rate * 100;
                  break;
              }
              break;
            case 4:
              eval(`this.record_for[3].asahara${i}++`);
              switch (i) {
                case 1:
                  this.record_for_money.asahara += value.rate * 100;
                  break;
                case 4:
                  this.record_for_money.asahara -= value.rate * 100;
                  break;
              }
              break;
          }
        }
      }
    });
    //平均順位
    for (i = 1; i <= 3; i++) {
      this.record_three_average.tanaka += eval(
        `this.record_three[0].tanaka${i} * i`
      );
      this.record_three_average.kanamaru += eval(
        `this.record_three[1].kanamaru${i} * i`
      );
      this.record_three_average.noda += eval(
        `this.record_three[2].noda${i} * i`
      );
      this.record_three_average.asahara += eval(
        `this.record_three[3].asahara${i} * i`
      );
    }

    for (i = 1; i <= 4; i++) {
      this.record_for_average.tanaka += eval(
        `this.record_for[0].tanaka${i} * i`
      );
      this.record_for_average.kanamaru += eval(
        `this.record_for[1].kanamaru${i} * i`
      );
      this.record_for_average.noda += eval(`this.record_for[2].noda${i} * i`);
      this.record_for_average.asahara += eval(
        `this.record_for[3].asahara${i} * i`
      );
    }

    const _this = this;
    function average(name, num, game) {
      if (game === 'three') {
        eval(`_this.record_${game}_average.${name} /=
      _this.record_${game}[${num}].${name}1 +
      _this.record_${game}[${num}].${name}2 +
      _this.record_${game}[${num}].${name}3`);
      } else {
        eval(`_this.record_${game}_average.${name} /=
        _this.record_${game}[${num}].${name}1 +
        _this.record_${game}[${num}].${name}2 +
        _this.record_${game}[${num}].${name}3 +
        _this.record_${game}[${num}].${name}4`);
      }

      eval(`_this.record_${game}_average.${name} =
      Math.round(_this.record_${game}_average.${name} * 100) / 100`);
    }

    average('tanaka', 0, 'three');
    average('kanamaru', 1, 'three');
    average('noda', 2, 'three');
    average('asahara', 3, 'three');

    average('tanaka', 0, 'for');
    average('kanamaru', 1, 'for');
    average('noda', 2, 'for');
    average('asahara', 3, 'for');

    //勝率
    for (i = 1; i <= 3; i++) {
      this.record_three_sum.tanaka += eval(`this.record_three[0].tanaka${i}`);
      this.record_three_sum.kanamaru += eval(
        `this.record_three[1].kanamaru${i}`
      );
      this.record_three_sum.noda += eval(`this.record_three[2].noda${i}`);
      this.record_three_sum.asahara += eval(`this.record_three[3].asahara${i}`);
    }

    for (i = 1; i <= 4; i++) {
      this.record_for_sum.tanaka += eval(`this.record_for[0].tanaka${i}`);
      this.record_for_sum.kanamaru += eval(`this.record_for[1].kanamaru${i}`);
      this.record_for_sum.noda += eval(`this.record_for[2].noda${i}`);
      this.record_for_sum.asahara += eval(`this.record_for[3].asahara${i}`);
    }

    this.record_three_win.tanaka =
      Math.round(
        (this.record_three[0].tanaka1 / this.record_three_sum.tanaka) * 1000
      ) /
        10 +
      '%';
    this.record_three_win.kanamaru =
      Math.round(
        (this.record_three[1].kanamaru1 / this.record_three_sum.kanamaru) * 1000
      ) /
        10 +
      '%';
    this.record_three_win.noda =
      Math.round(
        (this.record_three[2].noda1 / this.record_three_sum.noda) * 1000
      ) /
        10 +
      '%';
    this.record_three_win.asahara =
      Math.round(
        (this.record_three[3].asahara1 / this.record_three_sum.asahara) * 1000
      ) /
        10 +
      '%';

    this.record_for_win.tanaka =
      Math.round(
        (this.record_for[0].tanaka1 / this.record_for_sum.tanaka) * 1000
      ) /
        10 +
      '%';
    this.record_for_win.kanamaru =
      Math.round(
        (this.record_for[1].kanamaru1 / this.record_for_sum.kanamaru) * 1000
      ) /
        10 +
      '%';
    this.record_for_win.noda =
      Math.round((this.record_for[2].noda1 / this.record_for_sum.noda) * 1000) /
        10 +
      '%';
    this.record_for_win.asahara =
      Math.round(
        (this.record_for[3].asahara1 / this.record_for_sum.asahara) * 1000
      ) /
        10 +
      '%';
  }

  ngOnInit(): void {
    this.callApi();
  }
}
