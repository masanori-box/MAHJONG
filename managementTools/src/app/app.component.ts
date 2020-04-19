import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  //ユーザー情報
  users = [
    {id: "1", name: "朝原"},
    {id: "2", name: "金丸"},
    {id: "3", name: "田中"},
    {id: "4", name: "野田"}
  ]
}

let pushCount = 0;//ユーザーボタン押下の合計回数をカウント

window.onload = function(){
  let userBtnAll = document.querySelectorAll('.user-btn');//ユーザーボタン(全て)
  let resetBtn = document.getElementById('reset');//リセットボタン
  let sendBtn = document.getElementById('send');//送信ボタン
  let rankTable = document.querySelector('.rank-area').querySelectorAll('td');//順位表

  //ユーザーボタン押下時
  for(let i=1, len=userBtnAll.length; i<=len; i++){
    let userBtn = document.getElementById(`user${i}`);//ユーザーボタン(個人)
    userBtn.addEventListener('click', function(){
      if(pushCount === 4) return;//4人全て入力済み
      let userName = userBtn.querySelector('.user-name').textContent;//ユーザー名
      rankTable[pushCount].style.color = document.defaultView.getComputedStyle(userBtn, '').backgroundColor;//色変更
      rankTable[pushCount].textContent = userName;//順位表に入力
      userBtn.classList.add('ban-click');//一度押したボタンはクリック禁止
      pushCount++;
      switch (pushCount) {
        case 1:
          resetBtn.removeAttribute('disabled'); break;//初回はリセットボタンを活性化
        case 3:
          sendBtn.removeAttribute('disabled'); break;//3人入力時に送信ボタンを活性化
      }
    })
  }

  //リセットボタン押下時
  resetBtn.addEventListener('click', function(){
    for(let i=0, len=userBtnAll.length; i<len; i++){
      pushCount = 0;//カウント初期化
      rankTable[i].textContent = '';//順位表初期化
      //ボタン初期化
      userBtnAll[i].classList.remove('ban-click');
      resetBtn.setAttribute('disabled','true');
      sendBtn.setAttribute('disabled','true');
    }
  })

  //送信ボタン押下時
  sendBtn.addEventListener('click', function(){
    switch (pushCount) {
      case 3:
        alert('3麻の成績を送信します'); break;//3人入力時
      case 4:
        alert('4麻の成績を送信します'); break;//4人入力時
    }
  })
  
}

//データ取得
let resultURL = 'http://192.168.0.125:8060/result';
let resultRequest = new XMLHttpRequest();
resultRequest.open('GET', resultURL);
resultRequest.responseType = 'json';
resultRequest.send();
resultRequest.onload = function() {
  let result = resultRequest.response;
  console.log(result);
}