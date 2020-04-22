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
      margin-left:2px;
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
    `mat-form-field >>> input + span{
    }`,
    `mat-form-field >>> input:focus + span > label{
      transform: translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);
      width: 133.33333333%;
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
  {date:'202001010', first: 'ネコ', second: 'カラス', third: 'ゾウ', forth: 'トラ'},  
  {date:'202001011', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001012', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001013', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001014', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001015', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001016', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001017', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001018', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001019', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001020', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001021', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
  {date:'202001022', first: 'トラ', second: 'ゾウ', third: 'カラス', forth: 'ネコ'},  
];

export interface PeriodicElement {
  date: string;
  first: string;
  second: string;
  third: string;
  forth: string;
}