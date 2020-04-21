import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})

export class RecordComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toRegister(): void{
    this.router.navigate(['/record'])
  }

  info = ['date', 'first', 'second', 'third', 'forth'];
  dataSource = RECORD;
}

const RECORD = [
  {date:'4/1', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},
  {date:'4/2', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},
  {date:'4/3', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'}  
];