import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}
  //ユーザー情報
  users = [
    { id: '1', name: '朝原' },
    { id: '2', name: '金丸' },
    { id: '3', name: '田中' },
    { id: '4', name: '野田' },
  ];

  ngOnInit(): void {}

  toRecord(): void {
    this.router.navigate(['/record']);
  }

  ngAfterViewInit(): void {
    let pushCount = 0; //ユーザーボタン押下の合計回数をカウント

    const userBtnAll = document.querySelectorAll('.user-btn'); //ユーザーボタン(全て)
    const resetBtn = document.getElementById('reset'); //リセットボタン
    const sendBtn = document.getElementById('send'); //送信ボタン
    const rankTable = document
      .querySelector('.rank-area')
      .querySelectorAll('td'); //順位表

    //ユーザーボタン押下時
    for (let i = 1, len = userBtnAll.length; i <= len; i++) {
      let userBtn = document.getElementById(`user${i}`); //ユーザーボタン(個人)
      userBtn.addEventListener('click', function () {
        if (pushCount === 4) return; //4人全て入力済み
        let userName = userBtn.querySelector('.user-name').textContent; //ユーザー名

        rankTable[
          pushCount
        ].style.color = document.defaultView.getComputedStyle(
          userBtn,
          ''
        ).backgroundColor; //色変更

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
      });
    }

    //リセットボタン押下時
    resetBtn.addEventListener('click', function () {
      pushCount = 0; //カウント初期化
      //ボタン初期化
      resetBtn.setAttribute('disabled', 'true');
      sendBtn.setAttribute('disabled', 'true');

      for (let i = 0, len = userBtnAll.length; i < len; i++) {
        rankTable[i].textContent = ''; //順位表初期化
        userBtnAll[i].classList.remove('ban-click'); //名前ボタン初期化
      }
    });

    //送信ボタン押下時
    sendBtn.addEventListener('click', function () {
      switch (pushCount) {
        case 3:
          alert('3麻の成績を送信します');
          break; //3人入力時
        case 4:
          alert('4麻の成績を送信します');
          break; //4人入力時
      }
    });
  }
}
