import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  styles:[
    `mat-paginator >>> .ng-star-inserted {
      font-size: 12px;
    }`,
    `mat-paginator >>> .mat-form-field-flex{
      padding-bottom:2px;
    }`,
    `mat-paginator >>> .mat-paginator-range-label{
      margin-top:4px;
    }`,
    `.mat-sort >>> .mat-sort-header-container{
      justify-content:center;
      transform: translateX(9px);
    } `,
    `mat-form-field >>> .mat-form-field-label{
      transition:color 0s;
    }`
  ]
})

export class RecordComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  info: string[] = ['date', 'first', 'second', 'third', 'forth'];
  dataSource = new MatTableDataSource(RECORD);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  placeFocus(){
    console.log('あいうえお');
    (<HTMLElement>document.querySelector('.mat-form-field-label')).style.color='transparent'
  }

  placeBlur(){
    if((<HTMLInputElement>document.querySelector('.mat-input-element')).value === ''){
      (<HTMLElement>document.querySelector('.mat-form-field-label')).style.color='rgba(0,0,0,.54)'
    }else{
      (<HTMLElement>document.querySelector('.mat-form-field-label')).style.color='transparent'
    }
  }

  toRegister(): void{
    this.router.navigate(['/record'])
  }
}

const RECORD : PeriodicElement[] = [
  {date:'20200101', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},
  {date:'20200102', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},
  {date:'20200103', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200104', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200105', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200106', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200107', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200108', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200109', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200110', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'20200111', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200112', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200113', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200114', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200115', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200116', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200117', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200118', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200119', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200120', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200121', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'20200122', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
];

export interface PeriodicElement {
  date: string;
  first: string;
  second: string;
  third: string;
  forth: string;
}