import { Component, OnInit } from '@angular/core';
const moment = require('moment');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}
  //ユーザー情報
  users = [
    { id: '1', name: '田中' },
    { id: '2', name: '金丸' },
    { id: '3', name: '野田' },
    { id: '4', name: '朝原' },
  ];

  //送信データ
  registerData = {
    user_id: 1,
    rank_1: 0,
    rank_2: 0,
    rank_3: 0,
    rank_4: null,
    rate: 1,
    event_date: moment().format().substring(0, 10),
  };

  //ラジオボタン押下時
  rateChange = (num) => {
    this.registerData.rate = num;
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let pushCount = 0; //ユーザーボタン押下の合計回数をカウント
    const _this = this;

    const userBtnAll = document.querySelectorAll('.user-btn'), //ユーザーボタン(全て)
      resetBtn = document.getElementById('reset'), //リセットボタン
      sendBtn = document.getElementById('send'), //送信ボタン
      rankTable = document.querySelector('.rank-area').querySelectorAll('td'), //順位表
      modal = document.querySelector('.modal-area'), //モーダル
      close = document.querySelector('.close'), //クローズアイコン
      errorText = document.querySelector('.error-text'), //エラー文
      loading = document
        .getElementById('fountainG')
        .querySelectorAll('.fountainG'), //ローディングアイコン
      RECORD_API = 'http://192.168.0.125:8060/result'; //url

    close.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    //初期化
    const reset = () => {
      pushCount = 0; //カウント初期化
      //送信・リセットボタン初期化、エラーテキスト非表示
      resetBtn.setAttribute('disabled', 'true');
      sendBtn.setAttribute('disabled', 'true');
      errorText.classList.remove('active');

      //送信データ初期化
      this.registerData = {
        user_id: 1,
        rank_1: 0,
        rank_2: 0,
        rank_3: 0,
        rank_4: null,
        rate: 1,
        event_date: moment().format().substring(0, 10),
      };
      for (let i = 0, len = userBtnAll.length; i < len; i++) {
        rankTable[i].textContent = ''; //順位表初期化
        userBtnAll[i].classList.remove('ban-click'); //名前ボタン初期化
      }
    };

    //ユーザーボタン押下時
    for (let i = 1, len = userBtnAll.length; i <= len; i++) {
      let userBtn = document.getElementById(`${i}`); //ユーザーボタン(個人)
      userBtn.addEventListener('click', function (this) {
        if (pushCount === 4) return; //4人全て入力済み
        let userName = this.querySelector('.user-name').textContent; //ユーザー名

        //テーブルに名前を追加して色を変更
        rankTable[
          pushCount
        ].style.color = document.defaultView.getComputedStyle(
          userBtn,
          ''
        ).backgroundColor;

        rankTable[pushCount].textContent = userName; //順位表に入力
        userBtn.classList.add('ban-click'); //一度押したボタンはクリック禁止
        pushCount++;
        switch (pushCount) {
          case 1:
            resetBtn.removeAttribute('disabled');
            break; //初回はリセットボタンを活性化
          case 3:
            sendBtn.removeAttribute('disabled');
            break; //3人入力時に送信ボタンを活性化
        }

        //順位
        switch (pushCount) {
          case 1:
            _this.registerData.rank_1 = Number(this.id);
            break;
          case 2:
            _this.registerData.rank_2 = Number(this.id);
            break;
          case 3:
            _this.registerData.rank_3 = Number(this.id);
            break;
          case 4:
            _this.registerData.rank_4 = Number(this.id);
            break;
        }
      });
    }

    //リセットボタン押下時
    resetBtn.addEventListener('click', function () {
      reset();
    });

    //送信ボタン押下時
    sendBtn.addEventListener('click', function () {
      //ボタン非活性
      resetBtn.setAttribute('disabled', 'true');
      sendBtn.setAttribute('disabled', 'true');
      errorText.classList.remove('active'); //エラーテキスト非表示
      console.log(_this.registerData);
      //ローディング表示
      loading.forEach((element) => {
        element.classList.add('active');
      });

      //データ送信
      window
        .fetch(RECORD_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(_this.registerData),
        })
        //通信成功
        .then(() => {
          setTimeout(() => {
            reset();
            modal.classList.add('active');
            loading.forEach((element) => {
              element.classList.remove('active');
            });
            setTimeout(() => {
              modal.classList.remove('active');
            }, 3500);
          }, 500);
        })
        //通信失敗
        .catch(() => {
          setTimeout(() => {
            resetBtn.removeAttribute('disabled');
            sendBtn.removeAttribute('disabled');
            errorText.classList.add('active');

            loading.forEach((element) => {
              element.classList.remove('active');
            });
          }, 500);
        });
    });
  }
}
